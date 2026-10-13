<script setup lang="ts">
// Кастомный вертикальный скроллбар слева — в стиле навбара:
// тёмная стеклянная дорожка + золотой градиентный ползунок с бликом.
// Двигается при прокрутке страницы и его можно тащить мышью.
const track = ref<HTMLElement | null>(null)
const thumbTop = ref(0) // % от высоты дорожки
const thumbHeight = ref(15) // % от высоты дорожки
const visible = ref(false)

let dragging = false
let rafId = 0

function metrics() {
  const doc = document.documentElement
  const scrollTop = window.scrollY || doc.scrollTop
  const scrollHeight = doc.scrollHeight
  const clientHeight = window.innerHeight
  const maxScroll = scrollHeight - clientHeight
  return { scrollTop, scrollHeight, clientHeight, maxScroll }
}

function update() {
  const { scrollTop, scrollHeight, clientHeight, maxScroll } = metrics()
  // Страница не скроллится — прячем бегунок
  visible.value = maxScroll > 4
  if (!visible.value) return
  thumbHeight.value = Math.max(8, (clientHeight / scrollHeight) * 100)
  const available = 100 - thumbHeight.value
  thumbTop.value = (scrollTop / maxScroll) * available
}

function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(update)
}

// Перетаскивание ползунка
function scrollToPointer(clientY: number) {
  const el = track.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const { maxScroll } = metrics()
  const thumbPx = (thumbHeight.value / 100) * rect.height
  // Хотим, чтобы курсор был по центру ползунка
  let ratio = (clientY - rect.top - thumbPx / 2) / (rect.height - thumbPx)
  ratio = Math.min(1, Math.max(0, ratio))
  window.scrollTo({ top: ratio * maxScroll })
}

function onThumbDown(e: PointerEvent) {
  e.preventDefault()
  dragging = true
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
}
function onMove(e: PointerEvent) {
  if (dragging) scrollToPointer(e.clientY)
}
function onUp() {
  dragging = false
  document.body.style.userSelect = ''
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
}
// Клик по дорожке — прыгаем туда
function onTrackDown(e: PointerEvent) {
  scrollToPointer(e.clientY)
  onThumbDown(e)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  onUp()
})
</script>

<template>
  <div
    v-show="visible"
    ref="track"
    class="scroll-rail"
    @pointerdown="onTrackDown"
  >
    <div
      class="scroll-thumb"
      :style="{ top: thumbTop + '%', height: thumbHeight + '%' }"
      @pointerdown.stop="onThumbDown"
    />
  </div>
</template>

<style scoped>
.scroll-rail {
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 7px;
  height: min(72vh, 620px);
  border-radius: 999px;
  background: rgba(12, 11, 13, 0.55);
  border: 1px solid rgba(201, 168, 76, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 60;
  cursor: pointer;
}

.scroll-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-height: 34px;
  border-radius: 999px;
  overflow: hidden;
  /* Переливающийся золотой градиент — медленно «течёт» по ползунку */
  background: linear-gradient(
    180deg,
    #9a7a2e 0%,
    #c9a84c 14%,
    #fff6d6 28%,
    #e6c866 40%,
    #fff6d6 52%,
    #c9a84c 66%,
    #e6c866 80%,
    #9a7a2e 100%
  );
  background-size: 100% 260%;
  background-position: 0 0;
  box-shadow:
    0 4px 14px rgba(201, 168, 76, 0.5),
    0 0 10px rgba(230, 200, 102, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -1px 0 rgba(154, 122, 46, 0.5);
  transition: box-shadow 0.25s ease;
  /* Синхронно с навбаром: 7s, тот же ритм бегущего блика */
  animation: thumbFlow 7s linear infinite;
}

/* Бегущий зеркальный блик по ползунку */
.scroll-thumb::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -55%;
  height: 45%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(255, 255, 255, 0.18) 42%,
    rgba(255, 255, 255, 0.65) 50%,
    rgba(255, 255, 255, 0.18) 58%,
    transparent
  );
  pointer-events: none;
  animation: thumbSheen 7s ease-in-out infinite;
}

.scroll-rail:hover .scroll-thumb,
.scroll-thumb:active {
  box-shadow:
    0 6px 22px rgba(201, 168, 76, 0.7),
    0 0 16px rgba(230, 200, 102, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    inset 0 -1px 0 rgba(154, 122, 46, 0.55);
}

@keyframes thumbFlow {
  to { background-position: 0 -260%; }
}
@keyframes thumbSheen {
  0%, 100% { top: -55%; }
  45%, 55% { top: 110%; }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-thumb { animation: none; }
  .scroll-thumb::after { display: none; }
}

@media (max-width: 860px) {
  .scroll-rail { display: none; }
}
</style>
