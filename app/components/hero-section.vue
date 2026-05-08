<script setup lang="ts">
const { t } = useLocale()
const spotlights = ref<boolean[]>([])
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

    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 class="text-3xl md:text-5xl font-bold mb-4" style="color: var(--color-gold)">
        {{ t.hero.title }}
      </h1>
      <p class="text-lg md:text-xl text-white/70 max-w-2xl mb-8">
        {{ t.hero.subtitle }}
      </p>
      <div class="flex gap-4">
        <UButton to="/about" size="lg" variant="solid" class="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-black font-semibold">
          {{ t.hero.aboutBtn }}
        </UButton>
        <UButton to="/events" size="lg" variant="outline" class="border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10">
          {{ t.hero.eventsBtn }}
        </UButton>
      </div>
    </div>
  </div>
</template>
