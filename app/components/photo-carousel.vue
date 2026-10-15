<script setup lang="ts">
// Coverflow-галерея (Swiper). Десктоп: вращается перетаскиванием мышью/тачпадом
// (grab-cursor). Телефон: обычные свайпы и тап. Пагинация-точки снизу.
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

interface Slide { src: string, alt?: string }
const props = withDefaults(defineProps<{
  images: Slide[]
  loop?: boolean
}>(), { loop: true })

const modules = [EffectCoverflow, Pagination]
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
        :coverflow-effect="{ rotate: 38, stretch: 0, depth: 110, modifier: 1, slideShadows: true }"
        :pagination="{ clickable: true }"
        class="pc__swiper"
      >
        <SwiperSlide v-for="(img, i) in props.images" :key="i" class="pc__slide">
          <img :src="img.src" :alt="img.alt || ''" decoding="async">
        </SwiperSlide>
      </Swiper>

      <!-- Фолбэк без JS/до гидрации: просто первое фото, чтобы не было пусто -->
      <template #fallback>
        <div class="pc__fallback">
          <img v-if="props.images[0]" :src="props.images[0].src" :alt="props.images[0].alt || ''">
        </div>
      </template>
    </ClientOnly>
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
  padding-bottom: 46px !important;
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
}
.pc__fallback {
  width: clamp(240px, 32vw, 360px);
  height: clamp(300px, 42vh, 440px);
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
}
.pc__fallback img { width: 100%; height: 100%; object-fit: cover; }

/* Точки пагинации — золотые под фирменный стиль */
.pc :deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.4);
  opacity: 1;
}
.pc :deep(.swiper-pagination-bullet-active) {
  background: var(--color-gold-light, #e6c866);
}
/* Золотая рамка активного слайда */
.pc :deep(.swiper-slide-active) {
  box-shadow: 0 0 0 1.5px rgba(230, 200, 102, 0.5), 0 30px 60px -28px rgba(0, 0, 0, 0.9);
}
</style>
