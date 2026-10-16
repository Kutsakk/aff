<script setup lang="ts">
// Coverflow-галерея (Swiper). Десктоп: вращается перетаскиванием мышью/тачпадом
// и горизонтальной прокруткой тачпада. Телефон: свайпы и тап. Клик по фото —
// увеличение на весь экран (lightbox). Пагинация-точки снизу.
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

interface Slide { src: string, alt?: string }
const props = withDefaults(defineProps<{
  images: Slide[]
  loop?: boolean
}>(), { loop: true })

const modules = [EffectCoverflow, Mousewheel]

// Swiper отключает loop, если слайдов мало (его предупреждение советует «make
// duplicates»). Иначе у коротких галерей (4–5 фото) появляется пустота сбоку от
// центрального кадра. Поэтому размножаем фото до достаточного числа — карусель
// становится симметричной и бесконечной.
const MIN_SLIDES = 8
const displayImages = computed(() => {
  const imgs = props.images
  if (!props.loop || imgs.length === 0 || imgs.length >= MIN_SLIDES) return imgs
  const times = Math.ceil(MIN_SLIDES / imgs.length)
  return Array.from({ length: times }, () => imgs).flat()
})

// Своя пагинация: по одной точке на РЕАЛЬНОЕ фото (а не на размноженные слайды),
// один ряд по центру. Встроенная Swiper-пагинация считала бы дубли и плодила точки.
let swiperRef: SwiperClass | null = null
const activeDot = ref(0)
function syncDot(sw: SwiperClass) {
  const n = props.images.length || 1
  activeDot.value = ((sw.realIndex % n) + n) % n
}
function onSwiper(sw: SwiperClass) { swiperRef = sw; syncDot(sw) }
function goTo(i: number) { swiperRef?.slideToLoop(i) }

// Lightbox: увеличенное фото по клику
const lightbox = ref<string | null>(null)
function openLightbox(src: string) {
  lightbox.value = src
}
function closeLightbox() {
  lightbox.value = null
}
// Esc закрывает lightbox
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLightbox()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="pc">
    <ClientOnly>
      <Swiper
        :modules="modules"
        effect="coverflow"
        :grab-cursor="true"
        slides-per-view="auto"
        :centered-slides="true"
        :loop="props.loop"
        :coverflow-effect="{ rotate: 52, stretch: 0, depth: 220, modifier: 1.15, slideShadows: true }"
        :mousewheel="{ forceToAxis: true, sensitivity: 1 }"
        class="pc__swiper"
        @swiper="onSwiper"
        @slide-change="syncDot"
      >
        <SwiperSlide v-for="(img, i) in displayImages" :key="i" class="pc__slide">
          <img
            :src="img.src"
            :alt="img.alt || ''"
            decoding="async"
            @click="openLightbox(img.src)"
          >
        </SwiperSlide>
      </Swiper>

      <!-- Своя пагинация: по точке на реальное фото, один ряд по центру -->
      <div v-if="props.images.length > 1" class="pc__dots">
        <button
          v-for="(img, i) in props.images"
          :key="i"
          class="pc__dot"
          :class="{ on: i === activeDot }"
          :aria-label="`Фото ${i + 1}`"
          @click="goTo(i)"
        />
      </div>

      <!-- Фолбэк без JS/до гидрации: просто первое фото, чтобы не было пусто -->
      <template #fallback>
        <div class="pc__fallback">
          <img v-if="props.images[0]" :src="props.images[0].src" :alt="props.images[0].alt || ''">
        </div>
      </template>
    </ClientOnly>

    <!-- Увеличенное фото (клик по фону или фото закрывает) -->
    <Teleport to="body">
      <div v-if="lightbox" class="pc__lightbox" @click.self="closeLightbox">
        <img :src="lightbox" class="pc__lightbox-img" alt="" @click="closeLightbox">
        <button class="pc__lightbox-close" aria-label="Закрыть" @click="closeLightbox">×</button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.pc {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
}
.pc__swiper {
  width: 100%;
  height: clamp(300px, 42vh, 440px);
}
.pc__slide {
  width: clamp(240px, 32vw, 360px);
  border-radius: 16px;
  overflow: hidden;
  background: #0c0c0f;
}
.pc__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 16px;
  cursor: zoom-in;
}
.pc__fallback {
  width: clamp(240px, 32vw, 360px);
  height: clamp(300px, 42vh, 440px);
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
}
.pc__fallback img { width: 100%; height: 100%; object-fit: cover; }

/* Своя пагинация — один ряд золотых точек по центру */
.pc__dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  margin-top: 18px;
}
.pc__dot {
  width: 7px;
  height: 7px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.32);
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
}
.pc__dot:hover { background: rgba(255, 255, 255, 0.6); }
.pc__dot.on {
  background: var(--color-gold-light, #e6c866);
  transform: scale(1.3);
  box-shadow: 0 0 8px rgba(230, 200, 102, 0.6);
}
/* Золотая рамка активного слайда */
.pc :deep(.swiper-slide-active) {
  box-shadow: 0 0 0 1.5px rgba(230, 200, 102, 0.5), 0 30px 60px -28px rgba(0, 0, 0, 0.9);
}

/* ===== Lightbox ===== */
.pc__lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 48px);
  background: rgba(0, 0, 0, 0.9);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  cursor: zoom-out;
}
.pc__lightbox-img {
  max-width: 94vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 0 1.5px rgba(230, 200, 102, 0.4), 0 40px 100px rgba(0, 0, 0, 0.85);
}
.pc__lightbox-close {
  position: absolute;
  top: clamp(14px, 3vw, 26px);
  right: clamp(14px, 3vw, 30px);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(201, 168, 76, 0.45);
  color: var(--color-gold-light, #e6c866);
  font-size: 1.7rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.pc__lightbox-close:hover { background: rgba(201, 168, 76, 0.18); border-color: rgba(201, 168, 76, 0.8); }
</style>
