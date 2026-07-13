<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const { t } = useLocale()
const router = useRouter()
const spotlights = ref<boolean[]>([])
const activeRealIndex = ref(0)

function onSwiperClick(swiper: any) {
  const clicked = swiper.clickedSlide as HTMLElement | undefined
  if (!clicked) return
  const activeSlide = swiper.slides[swiper.activeIndex] as HTMLElement | undefined
  // Клик по боковой карточке → только подвинуть её в центр, без перехода
  if (clicked !== activeSlide) return
  // Клик по уже активной (центральной) → переходим на страницу
  const target = clicked.querySelector<HTMLElement>('[data-href]')
  const href = target?.dataset.href
  if (href) router.push(href)
}

function onSlideChange(swiper: any) {
  const baseLen = slides.value.length
  activeRealIndex.value = swiper.realIndex % baseLen
}

function goToDot(swiper: any, index: number) {
  const baseLen = slides.value.length
  const currentReal = swiper.realIndex % baseLen
  const diff = index - currentReal
  if (diff === 0) return
  if (diff > 0) {
    for (let i = 0; i < diff; i++) swiper.slideNext()
  } else {
    for (let i = 0; i < -diff; i++) swiper.slidePrev()
  }
}

const swiperRef = ref<any>(null)
function onSwiperInit(swiper: any) {
  swiperRef.value = swiper
  activeRealIndex.value = swiper.realIndex % slides.value.length
}

const flashLeft = ref(false)
const flashRight = ref(false)
const timers: ReturnType<typeof setTimeout>[] = []

const spotlightPositions = [
  { top: '8%', left: '12%' },
  { top: '5%', left: '20%' },
  { top: '3%', left: '28%' },
  { top: '2%', left: '36%' },
  { top: '1.5%', left: '44%' },
  { top: '1.5%', left: '52%' },
  { top: '2%', left: '60%' },
  { top: '3%', left: '68%' },
  { top: '5%', left: '76%' },
  { top: '8%', left: '84%' },
]

const slides = computed(() => [
  {
    to: '/about',
    image: '/cup.jpg',
    images: null as string[] | null,
    title: t.value.home.aboutTitle,
    desc: t.value.home.aboutDesc,
    tag: t.value.nav.about,
  },
  {
    to: '/events',
    image: '/event1.jpg',
    images: null as string[] | null,
    title: t.value.home.eventsTitle,
    desc: t.value.home.eventsDesc,
    tag: t.value.nav.events,
  },
  {
    to: '/teams',
    image: '',
    images: ['/crusaders.jpg', '/eagles.jpg', '/titans.png', '/rustavi.jpg'] as string[] | null,
    title: t.value.home.teamsTitle,
    desc: t.value.home.teamsDesc,
    tag: t.value.nav.teams,
  },
])

// Дублируем слайды x2 чтобы у Swiper было достаточно слайдов для корректного loop
// при slidesPerView > 1. Порядок при этом остаётся (About,Events,Teams,About,Events,Teams).
const loopSlides = computed(() => [...slides.value, ...slides.value])

const swiperModules = [EffectCoverflow, Mousewheel]

onMounted(() => {
  spotlights.value = new Array(spotlightPositions.length).fill(false)

  timers.push(setTimeout(() => {
    flashLeft.value = true
    timers.push(setTimeout(() => {
      flashRight.value = true
    }, 200))

    timers.push(setTimeout(() => {
      spotlightPositions.forEach((_, i) => {
        timers.push(setTimeout(() => {
          spotlights.value[i] = true
        }, i * 120))
      })
    }, 600))
  }, 4200))
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
})
</script>

<template>
  <div class="hero-bg-container">
    <div class="hero-bg" />

    <div :class="['side-flash side-flash-left', { flash: flashLeft }]" />
    <div :class="['side-flash side-flash-right', { flash: flashRight }]" />

    <div
      v-for="(pos, i) in spotlightPositions"
      :key="i"
      :class="['spotlight-source', { on: spotlights[i] }]"
      :style="{
        top: pos.top,
        left: pos.left,
      }"
    >
      <div class="spotlight-core" />
      <div class="spotlight-halo" />
    </div>

    <div
      v-for="(pos, i) in spotlightPositions"
      :key="'beam-' + i"
      :class="['spotlight-beam', { on: spotlights[i] }]"
      :style="{
        top: pos.top,
        left: pos.left,
      }"
    >
      <div class="spotlight-beam-core" />
      <div class="spotlight-beam-fade" />
    </div>

    <div class="hero-bg-overlay" />

    <div class="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24 pb-16">
      <div class="hero-slider-wrap">
        <Swiper
          :modules="swiperModules"
          effect="coverflow"
          :slides-per-view="'auto'"
          :loop="true"
          :centered-slides="true"
          :grab-cursor="true"
          :slide-to-clicked-slide="true"
          :speed="500"
          :mousewheel="{ forceToAxis: true, sensitivity: 0.6, thresholdDelta: 20, thresholdTime: 250 }"
          :coverflow-effect="{
            rotate: 62,
            stretch: 0,
            depth: 170,
            modifier: 1.15,
            slideShadows: true,
          }"
          :navigation="false"
          :pagination="false"
          class="hero-swiper"
          @click="onSwiperClick"
          @swiper="onSwiperInit"
          @slide-change="onSlideChange"
        >
          <SwiperSlide v-for="(slide, idx) in loopSlides" :key="idx + '-' + slide.to">
            <div class="slide-card" :data-href="slide.to">
              <div v-if="slide.images" class="slide-collage">
                <div
                  v-for="(img, i) in slide.images"
                  :key="i"
                  class="collage-cell"
                  :style="{ backgroundImage: `url(${img})` }"
                />
              </div>
              <div v-else class="slide-image" :style="{ backgroundImage: `url(${slide.image})` }" />
              <div class="slide-overlay" />
              <div class="slide-content">
                <span class="slide-tag">{{ slide.tag }}</span>
                <h3 class="slide-title">{{ slide.title }}</h3>
                <p class="slide-desc">{{ slide.desc }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="custom-pagination">
          <button
            v-for="(slide, i) in slides"
            :key="slide.to"
            class="dot"
            :class="{ active: activeRealIndex === i }"
            :aria-label="`Go to ${slide.title}`"
            @click="goToDot(swiperRef, i)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-slider-wrap {
  width: 100%;
  max-width: 900px;
}

.hero-swiper {
  width: 100%;
  padding: 40px 10px 60px;
  overflow: visible;
}

.hero-swiper :deep(.swiper-wrapper) {
  align-items: stretch;
}

.hero-swiper :deep(.swiper-slide) {
  width: 320px;
  max-width: 78vw;
  height: auto;
  display: flex;
  transition: filter 0.5s ease, opacity 0.5s ease;
  opacity: 0.65;
  filter: brightness(0.7);
}

/* Боковые карточки — курсор обычный, без hover-подъёма */
.hero-swiper :deep(.swiper-slide) .slide-card {
  cursor: default;
}
.hero-swiper :deep(.swiper-slide) .slide-card:hover {
  transform: none;
  border-color: rgba(201, 168, 76, 0.25);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
}
.hero-swiper :deep(.swiper-slide) .slide-card:hover .slide-image {
  transform: none;
}

.hero-swiper :deep(.swiper-slide-active) {
  opacity: 1;
  filter: brightness(1);
  z-index: 2;
}

/* Активная (центральная) карточка — кликабельная, с hover-эффектом */
.hero-swiper :deep(.swiper-slide-active) .slide-card {
  cursor: pointer;
}
.hero-swiper :deep(.swiper-slide-active) .slide-card:hover {
  transform: translateY(-6px);
  border-color: rgba(201, 168, 76, 0.7);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(201, 168, 76, 0.25);
}
.hero-swiper :deep(.swiper-slide-active) .slide-card:hover .slide-image {
  transform: scale(1.06);
}

.slide-card {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.25);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.slide-card:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 4px;
}

.slide-card:hover {
  transform: translateY(-6px);
  border-color: rgba(201, 168, 76, 0.7);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(201, 168, 76, 0.25);
}

.slide-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
}

.slide-card:hover .slide-image {
  transform: scale(1.06);
}

/* 2x2 collage for Teams slide */
.slide-collage {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3px;
  background: #000;
  transition: transform 0.6s ease;
}

.collage-cell {
  background-size: cover;
  background-position: center;
}

.hero-swiper :deep(.swiper-slide-active) .slide-card:hover .slide-collage {
  transform: scale(1.04);
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.55) 55%,
    rgba(0, 0, 0, 0.95) 100%
  );
}

.slide-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: #fff;
}

.slide-tag {
  align-self: flex-start;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gold);
  background: rgba(201, 168, 76, 0.12);
  border: 1px solid rgba(201, 168, 76, 0.4);
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.slide-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-gold);
  margin: 0 0 6px;
}

.slide-desc {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.4;
  margin: 0;
}

.slide-content {
  padding: 16px;
}

.slide-tag {
  font-size: 0.62rem;
  padding: 3px 8px;
  margin-bottom: 8px;
}


/* Custom pagination — 3 dots regardless of duplicated loop slides */
.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 0;
  transition: background 0.25s ease, transform 0.25s ease;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.55);
}

.dot.active {
  background: var(--color-gold);
  transform: scale(1.3);
}

@media (max-width: 640px) {
  /* Уже карточка → по краям выглядывают соседние (coverflow-эффект виден и на мобилке) */
  .hero-swiper :deep(.swiper-slide) {
    width: 260px;
    max-width: 68vw;
  }
  .slide-title {
    font-size: 1.05rem;
  }
  .slide-desc {
    font-size: 0.78rem;
  }
}
</style>