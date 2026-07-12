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

// Блокируем прокрутку страницы, пока открыто полноэкранное меню
watch(mobileOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
        <img src="/federation.png" alt="GAFF" class="w-10 h-10" />
        <span class="text-lg font-bold" style="color: var(--color-gold)">AFF.GE</span>
      </NuxtLink>

      <!-- Desktop right side: federation name + language switch -->
      <div class="hidden md:flex items-center gap-6">
        <span class="federation-name">American Football Federation of Georgia</span>

        <button
          class="lang-switch"
          :title="locale === 'ka' ? 'Switch to English' : 'ქართულად'"
          @click="toggleLocale"
        >
          <span :class="{ active: locale === 'ka' }">KA</span>
          <span class="divider">/</span>
          <span :class="{ active: locale === 'en' }">EN</span>
        </button>
      </div>

      <!-- Mobile toggle -->
      <button class="md:hidden text-white" @click="mobileOpen = !mobileOpen">
        <UIcon :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile nav — полноэкранный оверлей с затемнением (телепорт в body,
         чтобы backdrop-filter шапки не ограничивал fixed-позиционирование) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="mobileOpen"
          class="mobile-overlay md:hidden"
          @click.self="mobileOpen = false"
        >
          <button
            class="mobile-close"
            aria-label="Close menu"
            @click="mobileOpen = false"
          >
            <UIcon name="i-lucide-x" class="w-7 h-7" />
          </button>

          <nav class="mobile-nav">
            <span class="federation-name text-center">American Football Federation of Georgia</span>

            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="mobile-nav-link"
              @click="mobileOpen = false"
            >
              {{ item.label }}
            </NuxtLink>

            <button class="lang-switch" @click="toggleLocale">
              <span :class="{ active: locale === 'ka' }">KA</span>
              <span class="divider">/</span>
              <span :class="{ active: locale === 'en' }">EN</span>
            </button>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
/* Полноэкранное мобильное меню */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 84px 24px 40px;
}

.mobile-close {
  position: absolute;
  top: 18px;
  right: 18px;
  color: rgba(255, 255, 255, 0.85);
  padding: 6px;
  transition: color 0.2s ease, transform 0.2s ease;
}
.mobile-close:hover,
.mobile-close:active {
  color: var(--color-gold);
  transform: scale(1.1);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
}

.mobile-nav-link {
  font-size: 1.6rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.02em;
  transition: color 0.2s ease, transform 0.2s ease;
}
.mobile-nav-link:hover,
.mobile-nav-link:active {
  color: var(--color-gold);
  transform: scale(1.05);
}

.mobile-nav .federation-name {
  white-space: normal;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.mobile-nav .lang-switch {
  margin-top: 10px;
  padding: 8px 18px;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.federation-name {
  color: var(--color-gold);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

@media (max-width: 1100px) {
  .federation-name {
    font-size: 0.85rem;
  }
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