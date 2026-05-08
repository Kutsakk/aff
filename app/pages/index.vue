<script setup lang="ts">
const { t } = useLocale()
</script>

<template>
  <div>
    <HeroSection />

    <!-- Quick info cards -->
    <section class="max-w-7xl mx-auto px-4 -mt-20 relative z-10 pb-20">
      <div class="grid md:grid-cols-3 gap-6">
        <NuxtLink to="/about" class="gaff-card text-center">
          <UIcon name="i-lucide-users" class="w-10 h-10 mx-auto mb-4" style="color: var(--color-gold)" />
          <h3 class="text-xl font-semibold mb-2" style="color: var(--color-gold)">{{ t.home.aboutTitle }}</h3>
          <p class="text-white/60">{{ t.home.aboutDesc }}</p>
        </NuxtLink>

        <NuxtLink to="/events" class="gaff-card text-center">
          <UIcon name="i-lucide-calendar" class="w-10 h-10 mx-auto mb-4" style="color: var(--color-gold)" />
          <h3 class="text-xl font-semibold mb-2" style="color: var(--color-gold)">{{ t.home.eventsTitle }}</h3>
          <p class="text-white/60">{{ t.home.eventsDesc }}</p>
        </NuxtLink>

        <NuxtLink to="/teams" class="gaff-card text-center">
          <UIcon name="i-lucide-shield" class="w-10 h-10 mx-auto mb-4" style="color: var(--color-gold)" />
          <h3 class="text-xl font-semibold mb-2" style="color: var(--color-gold)">{{ t.home.teamsTitle }}</h3>
          <p class="text-white/60">{{ t.home.teamsDesc }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
