<script setup lang="ts">
// Навбар в стиле onspot.ge — единая плавающая glass-«пилюля» по центру сверху.
// Всё внутри одной пилюли: лого · ссылки · разделитель · язык · CTA.
// Бордер бело-золотой с бегущим зеркальным бликом + стеклянный sheen.
const route = useRoute()
const { locale, setLocale, t } = useLocale()

interface NavItem { label: string, to: string }

const nav = computed<NavItem[]>(() => [
  { label: t.value.nav.home, to: '/' },
  { label: t.value.nav.about, to: '/about' },
  { label: t.value.nav.rules, to: '/rules' },
  { label: t.value.nav.play, to: '/play' },
  { label: t.value.nav.events, to: '/events' },
  { label: t.value.nav.teams, to: '/teams' },
])

const ctaLabel = computed(
  () => ({ ka: 'დაგვიკავშირდით', ru: 'Связаться', en: 'Get in touch' }[locale.value] ?? 'Связаться'),
)

const open = ref(false) // мобильное меню

// Выбор языка из мобильного меню закрывает само меню
function chooseLang(l: 'ka' | 'ru' | 'en') {
  setLocale(l)
  open.value = false
}

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

// Затемняющая подложка появляется при скролле — чтобы лого и текст не сливались
const scrolled = ref(false)
// Навбар прячется при скролле вниз и сразу возвращается при скролле вверх
const hidden = ref(false)
let lastY = 0
function onScroll() {
  const y = window.scrollY || 0
  scrolled.value = y > 24
  // Пока открыто мобильное меню — навбар не прячем
  if (!open.value) {
    if (y > lastY && y > 120) hidden.value = true       // вниз — скрываем
    else if (y < lastY) hidden.value = false            // вверх — сразу показываем
  }
  lastY = y
}
onMounted(() => {
  lastY = window.scrollY || 0
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav-wrap" :class="{ scrolled, hidden }">
    <!-- Лого — слева, отдельно от пилюли (как было) -->
    <NuxtLink to="/" class="brand" @click="open = false">
      <img src="/logoaff.webp" alt="AFF" class="brand-logo">
      <span class="brand-title">AFF</span>
    </NuxtLink>

    <div class="pill">
      <!-- Ссылки (десктоп) -->
      <nav class="links">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="link"
          :class="{ on: isActive(item.to), 'link--live': item.to === '/events' }"
        >
          {{ item.label }}
          <span v-if="item.to === '/events'" class="live-dot" aria-hidden="true" />
        </NuxtLink>
      </nav>

      <!-- Правая группа внутри пилюли: язык + CTA -->
      <div class="tail">
        <span class="divider" />
        <div class="lang">
          <button
            v-for="l in (['ka', 'ru', 'en'] as const)"
            :key="l"
            class="lang-btn"
            :class="{ active: locale === l }"
            @click="setLocale(l)"
          >
            {{ l }}
          </button>
        </div>
        <a href="#" class="cta">
          {{ ctaLabel }}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
    </div>

    <!-- Бургер (мобайл) -->
    <button
      class="burger"
      :class="{ open }"
      :aria-expanded="open"
      aria-label="Menu"
      @click="open = !open"
    >
      <span /><span /><span />
    </button>

    <!-- Мобильное меню -->
    <Transition name="drop">
      <nav v-if="open" class="mobile-menu">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="m-link"
          :class="{ active: isActive(item.to) }"
          @click="open = false"
        >
          {{ item.label }}
        </NuxtLink>

        <div class="mobile-foot">
          <div class="lang">
            <button
              v-for="l in (['ka', 'ru', 'en'] as const)"
              :key="l"
              class="lang-btn"
              :class="{ active: locale === l }"
              @click="chooseLang(l)"
            >
              {{ l }}
            </button>
          </div>
          <a href="#" class="cta" @click="open = false">
            {{ ctaLabel }}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.nav-wrap {
  position: fixed;
  inset: 0 0 auto 0;
  top: 16px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(16px, 4vw, 44px);
  pointer-events: none;
  transition: transform 0.38s ease, opacity 0.38s ease;
}
.nav-wrap > * { pointer-events: auto; position: relative; z-index: 1; }

/* Скрытие навбара при скролле вниз (уезжает вверх и гаснет),
   возврат при скролле вверх — мгновенно-плавный */
.nav-wrap.hidden {
  transform: translateY(-140%);
  opacity: 0;
  pointer-events: none;
}
.nav-wrap.hidden::before { opacity: 0; }

/* Затемняющая подложка под навбаром — проявляется при скролле */
.nav-wrap::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 96px;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.72) 45%, rgba(0, 0, 0, 0) 100%);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  -webkit-mask: linear-gradient(180deg, #000 55%, transparent 100%);
  mask: linear-gradient(180deg, #000 55%, transparent 100%);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.nav-wrap.scrolled::before { opacity: 1; }

/* ===== Пилюля с бело-золотым бордером и бегущим бликом ===== */
.pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 30px);
  padding: 9px 9px 9px 22px;
  border: 1.5px solid transparent;
  border-radius: 999px;
  /* Двойной фон: стеклянная подложка (padding-box) + бело-золотая
     рамка-градиент (border-box), которую гоняет анимация блика. */
  background:
    linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.5)) padding-box,
    linear-gradient(
      110deg,
      rgba(255, 255, 255, 0.28) 0%,
      #c9a84c 16%,
      #fff6d6 30%,
      #e6c866 44%,
      #9a7a2e 60%,
      #fff6d6 74%,
      rgba(255, 255, 255, 0.28) 100%
    ) border-box;
  background-size: 100% 100%, 240% 100%;
  background-position: 0 0, 0 0;
  backdrop-filter: blur(22px) saturate(1.4);
  -webkit-backdrop-filter: blur(22px) saturate(1.4);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(201, 168, 76, 0.14),
    0 18px 50px -22px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  animation: borderShine 7s linear infinite;
}

/* Зеркальный sheen — светлая полоса медленно пробегает по стеклу */
.pill::after {
  content: "";
  position: absolute;
  top: 0;
  left: -60%;
  width: 45%;
  height: 100%;
  background: linear-gradient(
    100deg,
    transparent,
    rgba(255, 255, 255, 0.14) 45%,
    rgba(255, 255, 255, 0.28) 50%,
    rgba(255, 255, 255, 0.14) 55%,
    transparent
  );
  transform: skewX(-18deg);
  pointer-events: none;
  animation: sheen 7s ease-in-out infinite;
}

@keyframes borderShine {
  to { background-position: 0 0, 240% 0; }
}
@keyframes sheen {
  0%, 100% { left: -60%; }
  45%, 55% { left: 115%; }
}

/* ===== Лого — слева, отдельно ===== */
.brand {
  position: absolute;
  left: clamp(16px, 4vw, 44px);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
}
.brand-logo {
  height: 52px;
  width: auto;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.4));
}
.brand-title {
  font-family: 'Notable', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.05em;
  background: linear-gradient(90deg, #e0cfb4, #c9a84c 55%, #e6c866);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* ===== Ссылки ===== */
.links {
  display: flex;
  align-items: center;
  /* center + постоянный gap: пробелы между ссылками не «перетекают»
     при смене языка, а фикс. ширина держит пилюлю на месте */
  justify-content: center;
  gap: clamp(4px, 1vw, 10px);
  width: 740px;
}
.link {
  position: relative;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 500;
  color: rgba(236, 232, 245, 0.68);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}
/* Ховер неактивных — лёгкий золотистый подсвет */
.link:not(.on):hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

/* Активный раздел — тёмная пилюля с яркой золотой светящейся обводкой
   (мини-версия пилюли навбара), чёрный текст */
.link.on {
  color: #0d0a03;
  font-weight: 700;
  background:
    radial-gradient(120% 150% at 50% 48%, rgba(214, 176, 92, 0.95) 0%, rgba(150, 120, 54, 0.9) 42%, rgba(60, 47, 20, 0.95) 80%, rgba(20, 16, 8, 0.96) 100%);
  box-shadow:
    inset 0 0 0 2px rgba(246, 227, 160, 0.92),
    inset 0 0 14px rgba(230, 200, 102, 0.35),
    0 0 18px -2px rgba(230, 200, 102, 0.55),
    0 6px 18px -8px rgba(0, 0, 0, 0.85);
}
.link--live { position: relative; }
.live-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-left: 5px;
  border-radius: 50%;
  background: #ff3b3b;
  vertical-align: middle;
  box-shadow: 0 0 0 0 rgba(255, 59, 59, 0.7);
  animation: navLive 1.4s ease-out infinite;
}
@keyframes navLive {
  0% { box-shadow: 0 0 0 0 rgba(255, 59, 59, 0.65); }
  70% { box-shadow: 0 0 0 7px rgba(255, 59, 59, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 59, 59, 0); }
}
@media (prefers-reduced-motion: reduce) { .live-dot { animation: none; } }

/* ===== Хвост: разделитель + язык + CTA ===== */
.tail {
  display: flex;
  align-items: center;
  gap: 12px;
}
.divider {
  width: 1px;
  height: 24px;
  background: linear-gradient(to bottom, transparent, rgba(201, 168, 76, 0.5), transparent);
}
.lang {
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 2px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.3);
}
.lang-btn {
  min-width: 30px;
  padding: 5px 7px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(236, 232, 245, 0.62);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}
.lang-btn:hover { color: #fff; }
.lang-btn.active {
  color: #1a1206;
  background: linear-gradient(145deg, #e6c866, #c9a84c);
  box-shadow: 0 2px 8px rgba(201, 168, 76, 0.4);
}

.cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1206;
  text-decoration: none;
  white-space: nowrap;
  background: linear-gradient(100deg, #9a7a2e 0%, #e6c866 26%, #fff6d6 42%, #e6c866 58%, #c9a84c 76%, #9a7a2e 100%);
  background-size: 200% 100%;
  box-shadow: 0 6px 18px rgba(201, 168, 76, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-position 0.5s ease;
}
/* Фикс. ширина CTA под самый длинный язык (ka) — хвост не меняет
   размер при смене языка, поэтому пилюля не прыгает */
.pill .cta {
  min-width: 190px;
  justify-content: center;
}
.cta svg { width: 14px; height: 14px; transition: transform 0.2s ease; }
.cta:hover {
  transform: translateY(-1px);
  background-position: 100% 0;
  box-shadow: 0 10px 26px rgba(201, 168, 76, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}
.cta:hover svg { transform: translateX(2px); }

/* ===== Бургер ===== */
.burger {
  position: absolute;
  right: clamp(16px, 4vw, 44px);
  top: 50%;
  transform: translateY(-50%);
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(201, 168, 76, 0.4);
  backdrop-filter: blur(10px);
  cursor: pointer;
}
.burger span {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--color-gold-light, #e6c866);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ===== Мобильное меню ===== */
.mobile-menu {
  position: absolute;
  top: 70px;
  left: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(22px);
  border: 1px solid rgba(201, 168, 76, 0.3);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.6);
}
.m-link {
  padding: 12px;
  border-radius: 12px;
  font-size: 0.98rem;
  color: rgba(236, 232, 245, 0.82);
  text-decoration: none;
}
.m-link:hover { color: #fff; background: rgba(255, 255, 255, 0.06); }
/* Активный раздел в мобильном меню — тёмная пилюля с золотой обводкой, чёрный текст */
.m-link.active {
  color: #0d0a03;
  font-weight: 700;
  background:
    radial-gradient(120% 150% at 50% 48%, rgba(214, 176, 92, 0.95) 0%, rgba(150, 120, 54, 0.9) 42%, rgba(60, 47, 20, 0.95) 80%, rgba(20, 16, 8, 0.96) 100%);
  box-shadow:
    inset 0 0 0 2px rgba(246, 227, 160, 0.92),
    inset 0 0 14px rgba(230, 200, 102, 0.35),
    0 0 18px -2px rgba(230, 200, 102, 0.55);
}
.mobile-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 10px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.drop-enter-active,
.drop-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.drop-enter-from,
.drop-leave-to { opacity: 0; transform: translateY(-8px); }

/* ===== Адаптив ===== */
@media (max-width: 860px) {
  .pill { display: none; }
  .burger { display: flex; }
  /* Лого и бургер были прижаты к самому верху — опускаем ниже */
  .nav-wrap { top: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .pill, .pill::after, .cta { animation: none; }
}
</style>
