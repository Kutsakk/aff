<script setup lang="ts">
const mobileOpen = ref(false)
const { locale, setLocale, t } = useLocale()

const navItems = computed(() => [
  { label: t.value.nav.home, to: '/' },
  { label: t.value.nav.about, to: '/about' },
  { label: t.value.nav.events, to: '/events' },
  { label: t.value.nav.teams, to: '/teams' },
])

function toggleLocale() {
  setLocale(locale.value === 'ka' ? 'en' : 'ka')
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/federation.png" alt="GAFF" class="w-10 h-10" />
        <span class="text-lg font-bold" style="color: var(--color-gold)">GAFF</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
        >
          {{ item.label }}
        </NuxtLink>

        <button
          class="lang-switch"
          :title="locale === 'ka' ? 'Switch to English' : 'ქართულად'"
          @click="toggleLocale"
        >
          <span :class="{ active: locale === 'ka' }">KA</span>
          <span class="divider">/</span>
          <span :class="{ active: locale === 'en' }">EN</span>
        </button>
      </nav>

      <!-- Mobile toggle -->
      <button class="md:hidden text-white" @click="mobileOpen = !mobileOpen">
        <UIcon :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile nav -->
    <Transition name="slide">
      <nav v-if="mobileOpen" class="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link text-lg"
          @click="mobileOpen = false"
        >
          {{ item.label }}
        </NuxtLink>

        <button class="lang-switch self-start" @click="toggleLocale">
          <span :class="{ active: locale === 'ka' }">KA</span>
          <span class="divider">/</span>
          <span :class="{ active: locale === 'en' }">EN</span>
        </button>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  cursor: pointer;
  background: transparent;
}
.lang-switch:hover {
  border-color: var(--color-gold);
  color: #fff;
}
.lang-switch .active {
  color: var(--color-gold);
}
.lang-switch .divider {
  opacity: 0.3;
}
</style>
