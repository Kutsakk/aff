<script setup lang="ts">
// Главная — hero + блок «Федерация». Все размеры/позиции зашиты в дефолты
// composable'ов (useHeroControls / useIntroControls), панели настройки убраны.
const route = useRoute()
const { t } = useLocale()
const { controls, editing, set } = useHeroControls()
const { figureStyle, bsbStyle, ifafStyle, blockStyle, load: loadIntro } = useIntroControls()

// Панель настройки надписи показываем только по адресу ?edit — на боевом сайте её нет
const showPanel = computed(() => 'edit' in route.query)

// Ручные сдвиги/размеры блока «Федерация» подобраны под десктоп — на узких
// экранах их отключаем, иначе контент уезжает за край.
const isDesktop = ref(true)
onMounted(() => {
  // Старая панель hero удалена: стираем случайно сохранённые правки фото/надписи,
  // чтобы hero всегда показывался с запечённой композицией (HERO_DEFAULTS).
  try { localStorage.removeItem('aff-hero-controls') } catch { /* приватный режим */ }
  loadIntro() // подхватываем сохранённые размер/позицию/блики трофея
  const mq = window.matchMedia('(min-width: 900px)')
  const apply = () => { isDesktop.value = mq.matches }
  apply()
  mq.addEventListener('change', apply)
})

// ===== Перетаскивание надписи мышью/пальцем (только в режиме editing) =====
const dragging = ref(false)
let startX = 0, startY = 0, baseX = 0, baseY = 0

function onTitleDown(e: PointerEvent) {
  if (!editing.value) return
  dragging.value = true
  startX = e.clientX
  startY = e.clientY
  baseX = controls.value.titleX
  baseY = controls.value.titleY
  try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* noop */ }
  e.preventDefault()
}
function onTitleMove(e: PointerEvent) {
  if (!dragging.value) return
  // Сдвиг в пикселях → в vw/vh (как хранятся titleX/titleY)
  const dvw = (e.clientX - startX) / window.innerWidth * 100
  const dvh = (e.clientY - startY) / window.innerHeight * 100
  controls.value = {
    ...controls.value,
    titleX: Math.round((baseX + dvw) * 10) / 10,
    titleY: Math.round((baseY + dvh) * 10) / 10,
  }
}
function onTitleUp() {
  if (!dragging.value) return
  dragging.value = false
  set('titleX', controls.value.titleX) // фиксируем в localStorage
  set('titleY', controls.value.titleY)
}

// ===== Перетаскивание фонового фото (imgX/imgY, в % как хранятся) =====
const draggingImg = ref(false)
let iStartX = 0, iStartY = 0, iBaseX = 0, iBaseY = 0
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

function onImgDown(e: PointerEvent) {
  if (!editing.value) return
  draggingImg.value = true
  iStartX = e.clientX
  iStartY = e.clientY
  iBaseX = controls.value.imgX
  iBaseY = controls.value.imgY
  try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) } catch { /* noop */ }
  e.preventDefault()
}
function onImgMove(e: PointerEvent) {
  if (!draggingImg.value) return
  const dx = (e.clientX - iStartX) / window.innerWidth * 100
  const dy = (e.clientY - iStartY) / window.innerHeight * 100
  controls.value = {
    ...controls.value,
    imgX: clamp(Math.round((iBaseX + dx) * 10) / 10, 0, 100),
    imgY: clamp(Math.round((iBaseY + dy) * 10) / 10, 0, 100),
  }
}
function onImgUp() {
  if (!draggingImg.value) return
  draggingImg.value = false
  set('imgX', controls.value.imgX)
  set('imgY', controls.value.imgY)
}
</script>

<template>
  <section class="hero">
    <picture
      class="hero-bg"
      :class="{ 'is-edit': editing, 'is-drag': draggingImg }"
      @pointerdown="onImgDown"
      @pointermove="onImgMove"
      @pointerup="onImgUp"
      @pointercancel="onImgUp"
    >
      <img
        src="/hero-gold.png"
        alt="American Football Federation of Georgia"
        :style="{
          transform: `scale(${controls.imgScale}) translate(${controls.imgX - 50}%, ${controls.imgY - 50}%)`,
        }"
      >
    </picture>

    <div class="hero-veil" />

    <div
      class="hero-content"
      :style="{ transform: `translate(${controls.titleX}vw, ${controls.titleY}vh)` }"
    >
      <span v-if="controls.showRule" class="hero-rule" />
      <h1
        class="hero-title"
        :class="{ 'is-edit': editing, 'is-drag': dragging }"
        :style="{ fontSize: `calc(clamp(2.1rem, 5.6vw, 5rem) * ${controls.titleScale})` }"
        @pointerdown="onTitleDown"
        @pointermove="onTitleMove"
        @pointerup="onTitleUp"
        @pointercancel="onTitleUp"
      >
        <span>{{ t.home.heroLine1 }}</span>
        <span>{{ t.home.heroLine2 }}</span>
        <span>{{ t.home.heroLine3 }}</span>
      </h1>

      <p class="hero-tag">
        <span class="hero-tag__line">
          <span
            v-for="(tok, i) in t.home.heroTag.line1"
            :key="'l1-' + i"
            class="hero-tag__w"
            :class="{ 'is-shine': tok.shine }"
          >{{ tok.t }}</span>
        </span>
        <span class="hero-tag__line hero-tag__line--2">
          <span
            v-for="(tok, i) in t.home.heroTag.line2"
            :key="'l2-' + i"
            class="hero-tag__w"
            :class="{ 'is-shine': tok.shine }"
          >{{ tok.t }}</span>
        </span>
      </p>

      <div class="hero-actions">
        <NuxtLink to="/play" class="hero-btn hero-btn--gold">
          {{ t.nav.play }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </NuxtLink>
        <MetallicButton
          :label="t.nav.rules"
          to="/rules"
          width="188px"
          face-gradient="linear-gradient(145deg, #6b4e1b 0%, #2a1f0b 42%, #000000 100%)"
        />
      </div>
    </div>

  </section>

  <!-- Панель управления трофеем/логотипами блока «Федерация» (по ?edit) -->
  <IntroControls v-if="showPanel" />

  <!-- Всё под hero на золотом grunge-фоне (мазки по краям, тёмный центр) -->
  <div class="below-hero">
  <!-- Золотой grunge-фон отдельным фиксированным слоём: cover относительно
       экрана, поэтому мазки видны по краям и на телефоне (как на десктопе). -->
  <div class="grunge-bg" aria-hidden="true" />
  <!-- Бесшовное появление фонового свечения после hero -->
  <div class="after-hero-fade" aria-hidden="true" />

  <!-- Кто мы + цифры -->
  <section class="intro" :style="isDesktop ? blockStyle : undefined">
    <div class="intro__figure" aria-hidden="true">
      <img src="/trophy-cup.webp" class="intro__trophy" :style="figureStyle" alt="" aria-hidden="true">
    </div>

    <div class="intro__text">
      <span class="eyebrow">{{ t.home.introEyebrow }}</span>
      <h2>{{ t.home.introH2 }}</h2>
      <p>{{ t.home.introP }}</p>
      <NuxtLink to="/about" class="link-more">{{ t.home.introLink }}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </NuxtLink>
    </div>
    <div class="stats">
      <div class="stat"><b>2011</b><span>{{ t.home.statFounded }}</span></div>
      <div class="stat"><b>15+</b><span>{{ t.home.statYears }}</span></div>
      <div class="stat stat--bsb">
        <img src="/blackseaball.webp" alt="Black Sea Bowl" class="stat__logo" :style="isDesktop ? bsbStyle : undefined">
        <span>{{ t.home.statNations }}</span>
      </div>
      <div class="stat stat--ifaf">
        <img src="/logo-mark.png" alt="IFAF" class="stat__mark" :style="isDesktop ? ifafStyle : undefined">
        <span>{{ t.home.statIfaf }}</span>
      </div>
    </div>
  </section>

  <!-- Начать играть -->
  <section class="band">
    <header class="band__head">
      <span class="eyebrow">{{ t.home.joinEyebrow }}</span>
      <h2>{{ t.home.joinH2 }}</h2>
      <p>{{ t.home.joinP }}</p>
    </header>
    <div class="play-cards">
      <NuxtLink to="/play" class="play-card play-card--kids">
        <div class="play-card__photo" aria-hidden="true" />
        <div class="play-card__body">
          <h3>{{ t.home.flagTitle }}</h3>
          <p>{{ t.home.flagDesc }}</p>
          <span class="play-card__go">{{ t.home.flagCta }} →</span>
        </div>
        <span class="beam" aria-hidden="true" />
      </NuxtLink>
      <NuxtLink to="/play" class="play-card play-card--teens">
        <div class="play-card__photo" aria-hidden="true" />
        <div class="play-card__body">
          <h3>{{ t.home.tackleTitle }}</h3>
          <p>{{ t.home.tackleDesc }}</p>
          <span class="play-card__go">{{ t.home.tackleCta }} →</span>
        </div>
        <span class="beam beam--delay" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>

  <!-- Правила -->
  <section class="rules-teaser">
    <div class="rules-teaser__photo" aria-hidden="true" />
    <div class="rules-teaser__text">
      <span class="eyebrow">{{ t.home.rulesEyebrow }}</span>
      <h2>{{ t.home.rulesH2 }}</h2>
      <p>{{ t.home.rulesP }}</p>
      <NuxtLink to="/rules" class="btn-gold"><span>{{ t.home.rulesCta }}</span></NuxtLink>
    </div>
  </section>

  <!-- События -->
  <section class="band">
    <header class="band__head">
      <span class="eyebrow">{{ t.home.eventsEyebrow }}</span>
      <h2>{{ t.home.eventsH2 }}</h2>
      <p>{{ t.home.eventsP }}</p>
    </header>
    <div class="events events--single">
      <NuxtLink to="/events" class="event event--feature">
        <div class="event__photo" aria-hidden="true" />
        <div class="event__body">
          <span class="event__live"><i /> {{ t.home.evLive }}</span>
          <span class="event__date">{{ t.home.evDate }}</span>
          <b>🇬🇪 Georgia — Great Britain Dev.</b>
          <span class="event__place">{{ t.home.evPlace }}</span>
          <span class="event__cta">{{ t.home.evCta }} →</span>
        </div>
        <span class="beam beam--neon" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 1; /* над фиксированным .grunge-bg: в зоне hero золото не просвечивает */
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background: #000000;
}

/* Низ hero плавно растворяется в чёрный — без шва при переходе к grunge-фону */
.hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34vh;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.55) 55%, #000000 100%);
}

/* Золотой grunge-фон под всеми секциями кроме hero.
   isolation — локальный контекст наложения: фон-слой уходит под контент,
   а весь контент (секции) поднимается над ним. */
.below-hero {
  position: relative;
  isolation: isolate;
  background-color: #000000;
}
/* Фон-слой: НЕ background-attachment: fixed (глючит на iOS/мобильных),
   а реальный фиксированный элемент. cover считается от вьюпорта, поэтому
   золотые мазки по краям картинки видны на любом экране — и на телефоне. */
.grunge-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.62)),
    url('/gold-brush-bg.webp') center center / cover no-repeat;
}
/* Весь контент блока — над фон-слоём */
.below-hero > :not(.grunge-bg) {
  position: relative;
  z-index: 1;
}
/* На узком портретном экране — отдельная вертикальная версия картинки
   (повёрнутый кроп): золото по краям и углам, центр тёмный. cover без повтора,
   цельная композиция — никакого тайлинга. */
@media (max-width: 860px) {
  .grunge-bg {
    background:
      linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58)),
      url('/gold-brush-bg-mobile.webp') center center / cover no-repeat;
  }
}

/* Нижнее затемнение отражения временно отключено — фото показываем как есть */

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
/* Режим редактирования: фон-фото можно схватить и перетащить */
.hero-bg.is-edit { cursor: grab; touch-action: none; }
.hero-bg.is-drag { cursor: grabbing; }

.hero-bg img {
  width: 100%;
  height: 100%;
  /* contain — показываем ВСЮ картинку без обрезки; кадрирование/масштаб крутишь через панель */
  object-fit: contain;
  object-position: center center;
  display: block;
  transform-origin: center center;
  transition: transform 0.15s ease, object-position 0.15s ease;
}

/* Тёмная вуаль сверху — читаемость навбара и заголовка на огненном небе */
.hero-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.22) 26%,
    transparent 48%
  );
}

.hero-content {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 clamp(20px, 6vw, 90px);
  text-align: left;
  /* Сквозной слой: пустая область пропускает клик к фото, таскается только сама надпись */
  pointer-events: none;
}
.hero-title { pointer-events: auto; }

/* Золотая черта-акцент над заголовком */
.hero-rule {
  width: 64px;
  height: 3px;
  margin-bottom: 1.4rem;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--color-gold-light, #e6c866), transparent);
}

.hero-title {
  margin: 0;
  font-family: 'Goldman', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.02;
  letter-spacing: 0.015em;
  font-size: clamp(2.1rem, 5.6vw, 5rem);
}

/* Режим редактирования: надпись можно схватить и перетащить мышью/пальцем */
.hero-title.is-edit {
  cursor: grab;
  touch-action: none;
  outline: 1.5px dashed rgba(230, 200, 102, 0.55);
  outline-offset: 12px;
  border-radius: 4px;
}
.hero-title.is-drag { cursor: grabbing; }

.hero-title span {
  display: block;
  background: linear-gradient(
    180deg,
    #fff6d4 0%,
    #f7e09a 30%,
    #e9c25a 52%,
    #d8a63c 66%,
    #f4d884 84%,
    #fff3c4 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter:
    drop-shadow(0 2px 10px rgba(0, 0, 0, 0.55))
    drop-shadow(0 0 34px rgba(230, 200, 102, 0.5));
}

/* ===== Слоган hero: единый бело-золотой перелив, один шрифт для всех языков ===== */
.hero-tag {
  margin: clamp(26px, 4.4vh, 48px) 0 0;
  font-family: 'Manrope', 'Noto Sans Georgian', sans-serif;
  font-weight: 600;
  font-size: clamp(1.18rem, 1.85vw, 1.8rem);
  line-height: 1.3;
  letter-spacing: 0.005em;
}
.hero-tag__line { display: block; }
/* Вторая строка — лёгкой ступенькой */
.hero-tag__line--2 { margin-left: 1.8em; }
/* Статичный золотой градиент (как «тело» кнопки Rules): светлое золото → бронза, без свечения */
.hero-tag__w {
  background: linear-gradient(160deg, #f6e4a8 0%, #dcbf74 36%, #b9923f 70%, #8f6e2a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
}

/* ===== Кнопки hero ===== */
.hero-actions {
  display: flex;
  flex-direction: column; /* Rules — под Start playing */
  align-items: flex-start;
  gap: 16px;
  margin-top: clamp(36px, 5.6vh, 64px);
  pointer-events: auto; /* hero-content сквозной для перетаскивания — кнопки возвращаем в клик */
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background-position 0.5s ease, background 0.3s ease, border-color 0.2s ease, color 0.2s ease;
}
.hero-btn svg { width: 15px; height: 15px; transition: transform 0.2s ease; }
/* Основная — золотая заливка */
.hero-btn--gold {
  color: #1a1206;
  background: linear-gradient(100deg, #9a7a2e 0%, #e6c866 28%, #fff6d6 48%, #e6c866 68%, #9a7a2e 100%);
  background-size: 200% 100%;
  box-shadow: 0 10px 28px rgba(201, 168, 76, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}
.hero-btn--gold:hover {
  transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 16px 38px rgba(201, 168, 76, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}
.hero-btn--gold:hover svg { transform: translateX(3px); }
/* Вторичная — контурная, без золота */
.hero-btn--ghost {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.hero-btn--ghost:hover {
  transform: translateY(-2px);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

/* ======================= Секции ниже hero ======================= */
.eyebrow {
  display: inline-block;
  margin-bottom: 14px;
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold-light, #e6c866);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 0.9);
}
.intro h2,
.band__head h2,
.rules-teaser h2 {
  margin: 0 0 16px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.1;
  font-size: clamp(1.5rem, 3.2vw, 2.4rem);
  color: #fff;
  /* Тень привязана к буквам — читаемость поверх grunge-фона без тёмной плашки */
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.92), 0 1px 3px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 0.9);
}

/* Растворитель свечения на стыке hero → контент (full-bleed, не занимает поток) */
.after-hero-fade {
  position: relative;
  height: 0;
  z-index: 1;
}
.after-hero-fade::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 46vh;
  pointer-events: none;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.72) 32%, rgba(0, 0, 0, 0.3) 62%, transparent 100%);
}

/* Интро + цифры */
.intro {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: clamp(28px, 5vw, 70px);
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(70px, 10vh, 120px) clamp(20px, 6vw, 48px);
  /* visible — трофей не обрезается при настройке позиции/размера из панели */
  overflow: visible;
}

/* Фон секции «Федерация» — только трофей-кубок + мягкое золотое свечение.
   Никаких прямоугольных тёмных слоёв и масок: grunge-фон просвечивает,
   трофей показан целиком и не обрезается. Читаемость — через ореолы у текста/цифр. */
.intro__figure {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
/* Трофей-кубок — отдельный <img>, управляется из панели (размер, сдвиги, блики).
   Привязан к правому краю и центру по вертикали; остальное задаёт :style. */
.intro__trophy {
  position: absolute;
  right: 0;
  top: 50%;
  height: auto;
  will-change: transform, filter;
}

.intro__text,
.stats { position: relative; z-index: 1; }
.intro p { margin: 0 0 22px; font-size: 1.02rem; line-height: 1.7; color: rgba(255, 255, 255, 0.82); text-shadow: 0 1px 8px rgba(0, 0, 0, 0.95), 0 0 2px rgba(0, 0, 0, 0.9); }
.link-more {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
  color: var(--color-gold-light, #e6c866);
  text-decoration: none;
}
.link-more svg { width: 16px; height: 16px; transition: transform 0.2s ease; }
.link-more:hover svg { transform: translateX(3px); }
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px 32px;
  align-items: stretch;
}
.stat {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  text-align: center;
}
.stat b {
  display: block;
  /* Атлетический condensed — табло/джерси */
  font-family: 'Teko', 'Oswald', sans-serif;
  font-size: 2.9rem;
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: 0.01em;
  background: linear-gradient(180deg, #fff6d4, #e6c866, #c9a84c);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* плотный тёмный контур — читаемость золотых цифр поверх яркого трофея */
  filter:
    drop-shadow(0 0 1px rgba(0, 0, 0, 1))
    drop-shadow(0 1px 2px rgba(0, 0, 0, 1))
    drop-shadow(0 2px 10px rgba(0, 0, 0, 0.95));
}
.stat span {
  margin-top: auto; /* подпись прижата к низу ячейки — ряды ровные */
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.86);
  text-shadow: 0 0 3px rgba(0, 0, 0, 1), 0 1px 7px rgba(0, 0, 0, 0.98);
}

/* Лого в ячейках: выровнены по верху, подписи — по низу (.stat span) */
.stat--bsb .stat__logo,
.stat--ifaf .stat__mark {
  display: block;
  width: auto;
  pointer-events: none;
}
.stat--ifaf .stat__mark { filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5)); }

/* Общая лента-секция */
.band {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(100px, 15vh, 180px) clamp(20px, 6vw, 48px) clamp(60px, 8vh, 100px);
}
.band__head { text-align: center; max-width: 620px; margin: 0 auto 48px; }
.band__head p { margin: 0; font-size: 1rem; color: rgba(255, 255, 255, 0.6); }

/* Карточки «начать играть» — крупные, с ховер-фото и золотым бордером-кометой */
.play-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 24px; }
.play-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 420px;
  padding: 34px;
  border-radius: 22px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.play-card--kids { background: radial-gradient(130% 90% at 0% 0%, rgba(201, 168, 76, 0.14), transparent 55%), rgba(255, 255, 255, 0.02); border-color: rgba(201, 168, 76, 0.3); }
.play-card--teens { background: radial-gradient(130% 90% at 0% 0%, rgba(58, 144, 200, 0.16), transparent 55%), rgba(255, 255, 255, 0.02); border-color: rgba(58, 144, 200, 0.32); }
.play-card:hover { transform: translateY(-5px); box-shadow: 0 26px 60px -26px rgba(0, 0, 0, 0.85); }

/* Фото: приглушённый атмосферный фон по умолчанию, яркое при наведении */
.play-card__photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.55;
  transform: scale(1.04);
  transition: opacity 0.55s ease, transform 0.7s ease;
}
.play-card--kids .play-card__photo { background-image: url('/flafball.webp'); }
.play-card--teens .play-card__photo { background-image: url('/helmet-bench.webp'); }
/* Затемнение для читаемости текста; по умолчанию плотнее снизу, на hover мягче */
.play-card__photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.55) 48%, rgba(0, 0, 0, 0.92) 100%);
  transition: background 0.55s ease;
}
.play-card:hover .play-card__photo { opacity: 1; transform: scale(1); }
.play-card:hover .play-card__photo::after {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.45) 52%, rgba(0, 0, 0, 0.9) 100%);
}

.play-card__body {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.play-card h3 { margin: 0; font-family: 'Oswald', sans-serif; font-weight: 600; text-transform: uppercase; font-size: 1.6rem; color: #fff; }
.play-card p { margin: 0; font-size: 0.95rem; line-height: 1.55; color: rgba(255, 255, 255, 0.72); }
.play-card__go { margin-top: 8px; font-weight: 600; font-size: 0.95rem; }
.play-card--kids .play-card__go,
.play-card--teens .play-card__go { color: var(--color-gold-light, #e6c866); }

/* Border-beam: золотая комета бежит по рамке (конический градиент + XOR-маска) */
@property --beam-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
.beam {
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 0%,
    #9a7a2e 6%,
    #e6c866 10%,
    #fff6d6 12%,
    #e6c866 14%,
    transparent 22%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: beamSpin 5s linear infinite;
}
.beam--delay { animation-delay: -2.5s; }
/* Неоновый вариант — голубой→оранжевый с неоновым свечением (под фото-шлем) */
.beam--neon {
  padding: 2.5px;
  background: conic-gradient(
    from var(--beam-angle),
    transparent 0%,
    #00cfff 5%,
    #6fe3ff 9%,
    #ffffff 11%,
    #ff9a4d 13%,
    #ff6a00 17%,
    transparent 25%
  );
  filter: drop-shadow(0 0 6px rgba(255, 138, 61, 0.85)) drop-shadow(0 0 5px rgba(0, 207, 255, 0.7));
  animation: beamSpin 4s linear infinite;
}
@keyframes beamSpin { to { --beam-angle: 360deg; } }
@media (prefers-reduced-motion: reduce) { .beam { animation: none; } }

/* Правила-тизер — фон-фото без швов, текст по центру */
.rules-teaser {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(90px, 14vh, 150px) clamp(20px, 6vw, 48px);
  overflow: hidden;
}
/* Тактическая доска в блоке правил. Края растворяются в прозрачность масками
   по обеим осям (как силуэт) — фото ложится на градиентный фон без швов. */
.rules-teaser__photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('/rulse.webp') center / cover no-repeat;
  opacity: 0.52;
  -webkit-mask:
    linear-gradient(90deg, transparent 2%, #000 34%, #000 66%, transparent 98%),
    linear-gradient(180deg, transparent 2%, #000 36%, #000 64%, transparent 98%);
  -webkit-mask-composite: source-in;
  mask:
    linear-gradient(90deg, transparent 2%, #000 34%, #000 66%, transparent 98%),
    linear-gradient(180deg, transparent 2%, #000 36%, #000 64%, transparent 98%);
  mask-composite: intersect;
}
.rules-teaser__photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.3) 45%, rgba(0, 0, 0, 0.6) 100%);
}
.rules-teaser__text { position: relative; z-index: 1; max-width: 640px; }
.rules-teaser p { margin: 0 auto 30px; font-size: 1.05rem; line-height: 1.7; color: rgba(255, 255, 255, 0.82); }

/* Кнопка: чёрная, золотые буквы; при наведении золото «заливается» слева направо */
.btn-gold {
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  padding: 15px 36px;
  border-radius: 999px;
  border: 1.5px solid var(--color-gold, #c9a84c);
  background: #000;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5);
}
.btn-gold span {
  position: relative;
  z-index: 1;
  color: var(--color-gold-light, #e6c866);
  transition: color 0.4s ease 0.05s;
}
.btn-gold::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(100deg, #9a7a2e, #e6c866 42%, #fff6d6 50%, #e6c866 58%, #9a7a2e);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}
.btn-gold:hover::before,
.btn-gold:focus-visible::before { transform: scaleX(1); }
.btn-gold:hover span,
.btn-gold:focus-visible span { color: #1a1206; }

/* Событие — одна крупная кликабельная карточка */
.events--single { display: flex; justify-content: center; }
.event--feature {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 720px;
  min-height: 300px;
  padding: 34px 38px;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  background: #000000;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
/* Фон — неоновый шлем справа, слева притемнён под текст */
.event__photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('/12441.webp') right center / cover no-repeat;
}
.event__photo::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.78) 38%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.15) 100%);
}
.event__body {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.event--feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 56px -24px rgba(0, 0, 0, 0.9);
}
.event__live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(220, 38, 38, 0.14);
  border: 1px solid rgba(220, 38, 38, 0.4);
  color: #ff6b6b;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.event__live i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff3b3b;
  box-shadow: 0 0 0 0 rgba(255, 59, 59, 0.7);
  animation: livePulse 1.4s ease-out infinite;
}
@keyframes livePulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 59, 59, 0.6); }
  70% { box-shadow: 0 0 0 9px rgba(255, 59, 59, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 59, 59, 0); }
}
.event__date { font-family: 'Oswald', sans-serif; font-weight: 600; color: var(--color-gold-light, #e6c866); letter-spacing: 0.03em; }
.event b { color: #fff; font-size: 1.5rem; font-family: 'Oswald', sans-serif; font-weight: 600; }
.event__place { font-size: 0.9rem; color: rgba(255, 255, 255, 0.6); }
.event__cta { margin-top: 6px; font-weight: 600; color: var(--color-gold-light, #e6c866); }
@media (prefers-reduced-motion: reduce) { .event__live i { animation: none; } }

@media (max-width: 900px) {
  /* Мобильный hero: не absolute-наложение на весь экран, а чистая колонка —
     заголовок сверху, фото ниже. Так нет пустого чёрного поля и текст не
     налезает на шлемы. */
  .hero {
    min-height: auto;
    display: flex;
    flex-direction: column;
    background: #000;
  }
  /* Нижнее затемнение в flow-раскладке не нужно — убираем шов поверх фото */
  .hero::after { display: none; }
  .hero-veil { display: none; }

  /* Фото — в потоке, под заголовком. Композиция сдвинута вправо (шлем+мяч),
     поэтому cover с фокусом на правую часть: шлем крупно заполняет кадр,
     пустой чёрный слева обрезается. */
  .hero-bg {
    position: relative;
    order: 2;
    width: 100%;
    height: 40vh;
  }
  .hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover !important;
    object-position: 72% center;
    transform: none !important;
  }

  /* Заголовок — над фото, по центру, с отступом под плавающий навбар */
  .hero-content {
    position: relative;
    order: 1;
    inset: auto;
    transform: none !important;
    align-items: center;
    text-align: center;
    padding: 120px 20px 14px;
  }
  .hero-rule { margin-left: auto; margin-right: auto; }
  /* !important — перебиваем инлайновый font-size (titleScale) из шаблона */
  .hero-title { font-size: clamp(1.9rem, 8vw, 3rem) !important; }
  /* Слоган и кнопки — по центру под заголовком */
  .hero-tag { font-size: clamp(1.2rem, 5.2vw, 1.75rem); text-align: center; }
  .hero-tag__line--2 { margin-left: 0; } /* на мобильном без ступеньки — по центру */
  .hero-actions { align-items: center; }
  .intro {
    grid-template-columns: 1fr;
    transform: none !important;
    padding-top: clamp(56px, 9vh, 90px);
  }
  /* На телефоне контент в один столбец — трофей сверху-по центру, мягко приглушён */
  .intro__figure {
    background:
      radial-gradient(60% 40% at 50% 22%, rgba(230, 200, 102, 0.16) 0%, transparent 70%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.86) 45%, rgba(0, 0, 0, 0.92) 100%),
      url('/trophy-cup.webp');
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-size: cover, cover, 92% auto;
    background-position: center, center, center top 6%;
    opacity: 1;
  }
  .stat b { font-size: 2.4rem; }
  .stat--bsb .stat__logo { width: 120px !important; }
  .stat--ifaf .stat__mark { height: 70px !important; transform: none !important; }

  /* Трофей на мобильном рисуется фоном секции (.intro__figure). Отдельную
     картинку-кубок скрываем, иначе кубок/стадион двоится. */
  .intro__trophy { display: none !important; }

  /* Компактные отступы: на телефоне vh-паддинги раздувались в огромные
     чёрные пустоты между секциями. Делаем плотно, «как десктоп, но мельче». */
  .band {
    padding: 56px clamp(18px, 5vw, 40px) 36px;
  }
  .band__head { margin-bottom: 30px; }
  .rules-teaser { padding: 56px clamp(18px, 5vw, 40px); }
  .play-card { min-height: 340px; padding: 26px; }
  .event--feature { min-height: 240px; }
}
@media (max-width: 420px) {
  .stats { grid-template-columns: 1fr 1fr; gap: 20px 18px; }
  .event--feature { padding: 26px 24px; min-height: 260px; }
}
</style>
