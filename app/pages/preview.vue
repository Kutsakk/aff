<script setup lang="ts">
// Инструмент адаптива + визуальный редактор.
// Рамка телефона с живым сайтом в <iframe> (ровно в ширине устройства —
// настоящий мобильный рендер). В режиме «Редактор» можно ткнуть в любой
// элемент, двигать его мышью, менять размер/цвет/текст, и выгрузить CSS.
// Служебная страница, в навигацию не вынесена: открывать /preview.
definePageMeta({ layout: false })
useHead({ title: 'Адаптив · редактор' })

interface Device { name: string, w: number, h: number, group: 'Android' | 'iPhone' | 'Планшет' }
const devices: Device[] = [
  { name: 'Galaxy S8', w: 360, h: 740, group: 'Android' },
  { name: 'Galaxy S10/S20', w: 360, h: 800, group: 'Android' },
  { name: 'Galaxy A5x/A7x', w: 412, h: 914, group: 'Android' },
  { name: 'Pixel 7', w: 412, h: 915, group: 'Android' },
  { name: 'iPhone SE', w: 375, h: 667, group: 'iPhone' },
  { name: 'iPhone 12/13/14', w: 390, h: 844, group: 'iPhone' },
  { name: 'iPhone 15/16', w: 393, h: 852, group: 'iPhone' },
  { name: 'iPhone Pro Max', w: 430, h: 932, group: 'iPhone' },
  { name: 'iPad Mini', w: 768, h: 1024, group: 'Планшет' },
  { name: 'iPad Pro 11"', w: 834, h: 1194, group: 'Планшет' },
]
const pages = [
  { label: 'Главная', path: '/' },
  { label: 'О нас', path: '/about' },
  { label: 'Правила', path: '/rules' },
  { label: 'Играть', path: '/play' },
  { label: 'События', path: '/events' },
]

const device = ref<Device>(devices[0]!)
const page = ref(pages[0]!)
const landscape = ref(false)
const editorOn = ref(false)

const vw = computed(() => (landscape.value ? device.value.h : device.value.w))
const vh = computed(() => (landscape.value ? device.value.w : device.value.h))

/* ===== Масштаб рамки под высоту окна ===== */
const scale = ref(1)
function fit() {
  if (typeof window === 'undefined') return
  const availH = window.innerHeight - 140
  const availW = (editorOn.value ? window.innerWidth - 340 : window.innerWidth) - 60
  scale.value = Math.min(1, availH / vh.value, availW / vw.value)
}
onMounted(() => { fit(); window.addEventListener('resize', fit) })
onBeforeUnmount(() => window.removeEventListener('resize', fit))
watch([vw, vh, editorOn], () => nextTick(fit))

/* ===== Правки: selector -> набор стилей/текста ===== */
type Override = {
  fontSize?: number
  color?: string
  background?: string
  tx?: number
  ty?: number
  scale?: number
  rotate?: number
  text?: string
}
const overrides = reactive<Record<string, Override>>({})
const STORE = 'aff-preview-overrides'

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORE)
    if (raw) Object.assign(overrides, JSON.parse(raw))
  }
  catch { /* приватный режим */ }
})
function persist() {
  try { localStorage.setItem(STORE, JSON.stringify(overrides)) }
  catch { /* noop */ }
}

/* ===== Доступ к iframe (same-origin) ===== */
const iframeEl = ref<HTMLIFrameElement>()
const selSelector = ref<string>('')
const selTag = ref<string>('')

function doc(): Document | null {
  try { return iframeEl.value?.contentDocument ?? null }
  catch { return null }
}

// Стабильный CSS-путь к элементу
function cssPath(el: Element): string {
  const parts: string[] = []
  let node: Element | null = el
  while (node && node.nodeType === 1 && node.tagName !== 'BODY' && node.tagName !== 'HTML') {
    let sel = node.tagName.toLowerCase()
    const parent: Element | null = node.parentElement
    if (parent) {
      const sameTag = Array.from(parent.children).filter(c => c.tagName === node!.tagName)
      if (sameTag.length > 1) sel += `:nth-of-type(${sameTag.indexOf(node) + 1})`
    }
    parts.unshift(sel)
    node = parent
  }
  return parts.join(' > ')
}

function ensure(sel: string): Override {
  if (!overrides[sel]) overrides[sel] = {}
  return overrides[sel]!
}

// Применить все правки к текущему документу iframe
function applyAll() {
  const d = doc()
  if (!d) return
  for (const [sel, ov] of Object.entries(overrides)) {
    let el: HTMLElement | null = null
    try { el = d.querySelector(sel) }
    catch { el = null }
    if (!el) continue
    applyOne(el, ov)
  }
}
function applyOne(el: HTMLElement, ov: Override) {
  if (ov.fontSize != null) el.style.fontSize = ov.fontSize + 'px'
  if (ov.color) el.style.color = ov.color
  if (ov.background) el.style.background = ov.background
  const tx = ov.tx ?? 0, ty = ov.ty ?? 0, sc = ov.scale ?? 1, rot = ov.rotate ?? 0
  if (tx || ty || sc !== 1 || rot)
    el.style.transform = `translate(${tx}px, ${ty}px) scale(${sc}) rotate(${rot}deg)`
  if (ov.text != null) el.textContent = ov.text
}

/* ===== Выбор / подсветка ===== */
function injectEditorCSS(d: Document) {
  if (d.getElementById('__prev_css')) return
  const s = d.createElement('style')
  s.id = '__prev_css'
  s.textContent = `
    .__prev_hover { outline: 1.5px dashed rgba(230,200,102,.7) !important; outline-offset: 2px !important; cursor: pointer !important; }
    .__prev_sel { outline: 2px solid #e6c866 !important; outline-offset: 2px !important; }
  `
  d.head.appendChild(s)
}
let hovered: Element | null = null
function clearSelClasses(d: Document) {
  d.querySelectorAll('.__prev_sel').forEach(e => e.classList.remove('__prev_sel'))
}

function select(el: Element) {
  const d = doc()
  if (!d) return
  clearSelClasses(d)
  el.classList.add('__prev_sel')
  selSelector.value = cssPath(el)
  selTag.value = el.tagName.toLowerCase()
}

const selOv = computed<Override>(() => (selSelector.value ? ensure(selSelector.value) : {}))

function setProp<K extends keyof Override>(key: K, val: Override[K]) {
  if (!selSelector.value) return
  const ov = ensure(selSelector.value)
  ov[key] = val
  const d = doc()
  const el = d?.querySelector<HTMLElement>(selSelector.value)
  if (el) applyOne(el, ov)
  persist()
}

// Прочитать текущее вычисленное значение для инициализации полей
function currentFontSize(): number {
  const el = doc()?.querySelector<HTMLElement>(selSelector.value)
  if (selOv.value.fontSize != null) return selOv.value.fontSize
  if (!el) return 16
  return Math.round(parseFloat(getComputedStyle(el).fontSize))
}

/* ===== Drag выбранного элемента ===== */
let dragging = false
let sx = 0, sy = 0, baseTx = 0, baseTy = 0

function onDown(e: PointerEvent) {
  if (!editorOn.value) return
  const d = doc()
  if (!d) return
  const target = e.target as Element
  if (!target || target.id?.startsWith('__prev')) return
  const selEl = selSelector.value ? d.querySelector(selSelector.value) : null
  // Клик по уже выбранному (или его потомку) — начинаем перетаскивание
  if (selEl && (target === selEl || selEl.contains(target))) {
    dragging = true
    sx = e.clientX; sy = e.clientY
    const ov = ensure(selSelector.value)
    baseTx = ov.tx ?? 0; baseTy = ov.ty ?? 0
    e.preventDefault()
  }
  else {
    // Иначе — выбираем новый элемент
    select(target)
    e.preventDefault()
  }
  e.stopPropagation()
}
function onMove(e: PointerEvent) {
  if (!editorOn.value) return
  const d = doc()
  if (!d) return
  if (dragging) {
    const dx = (e.clientX - sx) / scale.value
    const dy = (e.clientY - sy) / scale.value
    setProp('tx', Math.round(baseTx + dx))
    setProp('ty', Math.round(baseTy + dy))
    return
  }
  // hover-подсветка
  const t = e.target as Element
  if (t === hovered) return
  hovered?.classList.remove('__prev_hover')
  if (t && !t.id?.startsWith('__prev')) { t.classList.add('__prev_hover'); hovered = t }
}
function onUp() { dragging = false }

// Навесить обработчики и применить правки после загрузки iframe
function onIframeLoad() {
  const d = doc()
  if (!d) return
  injectEditorCSS(d)
  applyAll()
  // чистим старые слушатели нельзя (новый документ) — вешаем заново
  d.addEventListener('pointerdown', onDown, true)
  d.addEventListener('pointermove', onMove, true)
  d.addEventListener('pointerup', onUp, true)
  // Блокируем переходы по ссылкам в режиме редактора
  d.addEventListener('click', (e) => { if (editorOn.value) { e.preventDefault(); e.stopPropagation() } }, true)
  selSelector.value = ''
}

watch(editorOn, (on) => {
  const d = doc()
  if (d && !on) { clearSelClasses(d); hovered?.classList.remove('__prev_hover'); selSelector.value = '' }
})

/* ===== Сброс и экспорт ===== */
function resetSelected() {
  if (!selSelector.value) return
  delete overrides[selSelector.value]
  persist()
  // перезагружаем iframe, чтобы снять inline-стили
  reload()
}
function resetAll() {
  for (const k of Object.keys(overrides)) delete overrides[k]
  persist()
  reload()
}

const showExport = ref(false)
const exportText = computed(() => {
  const lines: string[] = ['/* Правки из /preview — оберните в нужный @media при переносе */']
  for (const [sel, ov] of Object.entries(overrides)) {
    const decls: string[] = []
    if (ov.fontSize != null) decls.push(`  font-size: ${ov.fontSize}px;`)
    if (ov.color) decls.push(`  color: ${ov.color};`)
    if (ov.background) decls.push(`  background: ${ov.background};`)
    const tx = ov.tx ?? 0, ty = ov.ty ?? 0, sc = ov.scale ?? 1, rot = ov.rotate ?? 0
    if (tx || ty || sc !== 1 || rot)
      decls.push(`  transform: translate(${tx}px, ${ty}px) scale(${sc}) rotate(${rot}deg);`)
    if (decls.length) lines.push(`${sel} {\n${decls.join('\n')}\n}`)
    if (ov.text != null) lines.push(`/* ${sel} → текст: ${ov.text} */`)
  }
  return lines.join('\n\n')
})
async function copyExport() {
  try { await navigator.clipboard.writeText(exportText.value) }
  catch { /* noop */ }
}

const reloadKey = ref(0)
const reload = () => { reloadKey.value++ }
const src = computed(() => page.value.path)
</script>

<template>
  <div class="tool" :class="{ 'tool--edit': editorOn }">
    <!-- Верхняя панель -->
    <header class="bar">
      <div class="bar__title"><span class="dot" />Адаптив</div>

      <div class="group">
        <label>Устройство</label>
        <select v-model="device" class="sel">
          <optgroup v-for="g in (['Android', 'iPhone', 'Планшет'] as const)" :key="g" :label="g">
            <option v-for="d in devices.filter(x => x.group === g)" :key="d.name" :value="d">
              {{ d.name }} · {{ d.w }}×{{ d.h }}
            </option>
          </optgroup>
        </select>
      </div>

      <div class="group">
        <label>Страница</label>
        <select v-model="page" class="sel">
          <option v-for="p in pages" :key="p.path" :value="p">{{ p.label }}</option>
        </select>
      </div>

      <button class="btn" :class="{ on: landscape }" @click="landscape = !landscape">
        {{ landscape ? 'Альбомная' : 'Книжная' }}
      </button>
      <button class="btn btn--edit" :class="{ on: editorOn }" @click="editorOn = !editorOn">
        ✎ Редактор {{ editorOn ? 'вкл' : '' }}
      </button>
      <button class="btn" @click="reload">↻</button>
      <button v-if="editorOn" class="btn" @click="showExport = true">Экспорт CSS</button>

      <div class="size">{{ vw }} × {{ vh }} · {{ Math.round(scale * 100) }}%</div>
    </header>

    <div class="body">
      <!-- Рамка устройства -->
      <div class="stage">
        <div
          class="phone"
          :style="{ width: vw + 'px', height: vh + 'px', transform: `scale(${scale})` }"
        >
          <iframe
            ref="iframeEl"
            :key="page.path + reloadKey"
            :src="src"
            class="screen"
            title="preview"
            @load="onIframeLoad"
          />
        </div>
      </div>

      <!-- Панель редактора -->
      <aside v-if="editorOn" class="panel">
        <div v-if="!selSelector" class="hint">
          Ткни в любой элемент на телефоне, чтобы выбрать его.
          Потом перетаскивай его мышью или меняй параметры ниже.
        </div>

        <template v-else>
          <div class="pick">
            <code>&lt;{{ selTag }}&gt;</code>
            <button class="mini" @click="resetSelected">сбросить элемент</button>
          </div>

          <label class="row">
            Текст
            <textarea
              :value="selOv.text ?? doc()?.querySelector(selSelector)?.textContent?.trim() ?? ''"
              rows="2"
              @input="setProp('text', ($event.target as HTMLTextAreaElement).value)"
            />
          </label>

          <label class="row">
            <span>Размер шрифта <b>{{ selOv.fontSize ?? currentFontSize() }}px</b></span>
            <input
              type="range" min="8" max="90" :value="selOv.fontSize ?? currentFontSize()"
              @input="setProp('fontSize', +($event.target as HTMLInputElement).value)"
            >
          </label>

          <label class="row">
            <span>Масштаб <b>{{ ((selOv.scale ?? 1) * 100).toFixed(0) }}%</b></span>
            <input
              type="range" min="0.3" max="2.5" step="0.05" :value="selOv.scale ?? 1"
              @input="setProp('scale', +($event.target as HTMLInputElement).value)"
            >
          </label>

          <label class="row">
            <span>Поворот <b>{{ selOv.rotate ?? 0 }}°</b></span>
            <input
              type="range" min="-45" max="45" :value="selOv.rotate ?? 0"
              @input="setProp('rotate', +($event.target as HTMLInputElement).value)"
            >
          </label>

          <div class="row2">
            <label>Сдвиг X <b>{{ selOv.tx ?? 0 }}</b>
              <input type="range" min="-300" max="300" :value="selOv.tx ?? 0"
                @input="setProp('tx', +($event.target as HTMLInputElement).value)">
            </label>
            <label>Сдвиг Y <b>{{ selOv.ty ?? 0 }}</b>
              <input type="range" min="-300" max="300" :value="selOv.ty ?? 0"
                @input="setProp('ty', +($event.target as HTMLInputElement).value)">
            </label>
          </div>

          <div class="row2">
            <label>Цвет текста
              <input type="color" :value="selOv.color ?? '#ffffff'"
                @input="setProp('color', ($event.target as HTMLInputElement).value)">
            </label>
            <label>Цвет фона
              <input type="color" :value="selOv.background ?? '#000000'"
                @input="setProp('background', ($event.target as HTMLInputElement).value)">
            </label>
          </div>
          <button class="mini" @click="setProp('background', 'transparent')">фон прозрачный</button>
        </template>

        <div class="panel__foot">
          <button class="mini danger" @click="resetAll">Сбросить всё</button>
        </div>
      </aside>
    </div>

    <!-- Экспорт -->
    <div v-if="showExport" class="modal" @click.self="showExport = false">
      <div class="modal__box">
        <div class="modal__head">
          <b>CSS правок</b>
          <div>
            <button class="mini" @click="copyExport">Скопировать</button>
            <button class="mini" @click="showExport = false">Закрыть</button>
          </div>
        </div>
        <textarea class="modal__code" readonly :value="exportText" />
        <p class="modal__note">
          Это инлайновые правки. Пришли этот CSS мне — я оберну в нужный
          <code>@media</code> и вшью в проект как чистую мобильную вёрстку.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tool {
  min-height: 100vh;
  background: radial-gradient(60% 40% at 50% 0%, rgba(201, 168, 76, 0.08), transparent 70%), #0a0a0c;
  color: #fff;
  font-family: 'Manrope', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
}
.bar {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px 14px;
  padding: 12px 18px;
  background: rgba(0, 0, 0, 0.75);
  border-bottom: 1px solid rgba(201, 168, 76, 0.25);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.bar__title { display: flex; align-items: center; gap: 8px; font-weight: 700; color: #e6c866; }
.dot { width: 9px; height: 9px; border-radius: 50%; background: #e6c866; box-shadow: 0 0 10px rgba(230, 200, 102, 0.8); }
.group { display: flex; flex-direction: column; gap: 3px; }
.group label { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255, 255, 255, 0.5); }
.sel {
  padding: 7px 10px; border-radius: 9px; background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(201, 168, 76, 0.3); color: #fff; font-size: 0.85rem; cursor: pointer;
}
.sel option, .sel optgroup { background: #15151a; color: #fff; }
.btn {
  padding: 8px 13px; border-radius: 9px; background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.18); color: rgba(255, 255, 255, 0.85);
  font-size: 0.82rem; font-weight: 600; cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.btn:hover { border-color: rgba(201, 168, 76, 0.5); color: #fff; }
.btn.on { color: #1a1206; background: linear-gradient(145deg, #e6c866, #c9a84c); border-color: transparent; }
.btn--edit { border-color: rgba(201, 168, 76, 0.5); }
.size { margin-left: auto; font-size: 0.8rem; color: rgba(255, 255, 255, 0.55); font-variant-numeric: tabular-nums; }

.body { flex: 1; display: flex; min-height: 0; }
.stage {
  flex: 1; display: flex; align-items: flex-start; justify-content: center;
  padding: 36px 20px; overflow: auto;
}
.phone {
  flex: none; transform-origin: top center; border-radius: 38px; padding: 12px;
  background: linear-gradient(160deg, #2a2a30, #0c0c0f);
  box-shadow: 0 0 0 2px rgba(201, 168, 76, 0.35), 0 40px 90px -30px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
.screen { width: 100%; height: 100%; border: none; border-radius: 26px; background: #000; display: block; }

/* ===== Панель редактора ===== */
.panel {
  width: 320px; flex: none; padding: 16px; overflow-y: auto;
  background: rgba(0, 0, 0, 0.55);
  border-left: 1px solid rgba(201, 168, 76, 0.25);
  display: flex; flex-direction: column; gap: 14px;
}
.hint { font-size: 0.85rem; line-height: 1.5; color: rgba(255, 255, 255, 0.6); }
.pick { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.pick code { color: #e6c866; font-size: 0.9rem; }
.row { display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem; color: rgba(255, 255, 255, 0.75); }
.row span { display: flex; justify-content: space-between; }
.row b, .row2 b { color: #e6c866; font-variant-numeric: tabular-nums; }
.row textarea, .modal__code {
  width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(201, 168, 76, 0.25);
  border-radius: 8px; color: #fff; padding: 8px; font-size: 0.82rem; resize: vertical;
}
.row input[type="range"] { width: 100%; accent-color: #e6c866; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.75rem; color: rgba(255, 255, 255, 0.7); }
.row2 label { display: flex; flex-direction: column; gap: 5px; }
.row2 input[type="color"] { width: 100%; height: 32px; background: none; border: 1px solid rgba(201, 168, 76, 0.3); border-radius: 8px; cursor: pointer; }
.row2 input[type="range"] { width: 100%; accent-color: #e6c866; }
.mini {
  padding: 6px 10px; border-radius: 7px; background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18); color: rgba(255, 255, 255, 0.8);
  font-size: 0.74rem; cursor: pointer;
}
.mini:hover { color: #fff; border-color: rgba(201, 168, 76, 0.5); }
.mini.danger { color: #ff8b8b; border-color: rgba(255, 90, 90, 0.4); }
.panel__foot { margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.08); }

/* ===== Экспорт ===== */
.modal { position: fixed; inset: 0; z-index: 10; display: flex; align-items: center; justify-content: center; background: rgba(0, 0, 0, 0.7); padding: 20px; }
.modal__box { width: min(640px, 100%); background: #121216; border: 1px solid rgba(201, 168, 76, 0.3); border-radius: 16px; padding: 18px; }
.modal__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.modal__head > div { display: flex; gap: 8px; }
.modal__code { height: 280px; font-family: ui-monospace, monospace; font-size: 0.78rem; }
.modal__note { margin: 10px 0 0; font-size: 0.78rem; color: rgba(255, 255, 255, 0.55); line-height: 1.5; }
.modal__note code { color: #e6c866; }
</style>
