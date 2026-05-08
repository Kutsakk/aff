<script setup lang="ts">
const { t } = useLocale()
</script>

<template>
  <div class="pt-24 pb-20">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="section-title">{{ t.about.title }}</h1>
      <div class="gold-underline" />

      <div class="gaff-card mb-8">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <img src="/federation.png" alt="GAFF" class="w-40 flex-shrink-0" />
          <div>
            <h2 class="text-2xl font-semibold mb-4" style="color: var(--color-gold)">
              {{ t.about.federationName }}
            </h2>
            <p class="text-white/70 leading-relaxed mb-4">
              {{ t.about.p1 }}
            </p>
            <p class="text-white/70 leading-relaxed">
              {{ t.about.p2 }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="gaff-card">
          <UIcon name="i-lucide-target" class="w-8 h-8 mb-4" style="color: var(--color-gold)" />
          <h3 class="text-lg font-semibold mb-2" style="color: var(--color-gold)">{{ t.about.missionTitle }}</h3>
          <p class="text-white/60">
            {{ t.about.missionDesc }}
          </p>
        </div>
        <div class="gaff-card">
          <UIcon name="i-lucide-eye" class="w-8 h-8 mb-4" style="color: var(--color-gold)" />
          <h3 class="text-lg font-semibold mb-2" style="color: var(--color-gold)">{{ t.about.visionTitle }}</h3>
          <p class="text-white/60">
            {{ t.about.visionDesc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
