<script setup lang="ts">
// Бегущая лента «Спонсоры и партнёры».
// Тёмная СТЕКЛЯННАЯ лента (полупрозрачное стекло + blur) с тонкими золотыми
// линиями сверху/снизу и мягким золотым свечением — вписана в тёмно-золотой фон.
// Логотипы — белые монохром-силуэты (сгенерированы в /sponsors/mono), крупные,
// приглушённые; при наведении проявляются ярче. Никаких отдельных плашек.
// Движение бесшовно зациклено (удвоенный набор + сдвиг трека на половину ширины).
interface Logo { src: string, alt: string }

const names: { file: string, alt: string }[] = [
  { file: 'sport-ministry', alt: 'Министерство культуры и спорта Грузии' },
  { file: 'georgian-olympic-committee', alt: 'Национальный олимпийский комитет Грузии' },
  { file: 'tbilisi-city-hall', alt: 'Мэрия Тбилиси' },
  { file: 'sport-for-all', alt: 'Sport for All Georgia' },
  { file: 'coca-cola', alt: 'Coca-Cola' },
  { file: 'wilson', alt: 'Wilson' },
  { file: 'porsche-club', alt: 'Porsche Club Georgia' },
  { file: 'lider-group', alt: 'Lider Group' },
  { file: 'bee-group', alt: 'Bee Group Georgia' },
  { file: 'kompava', alt: 'Kompava' },
  { file: 'american-sports-culture', alt: 'American Sports & Culture Association' },
  { file: 'georgian-historic-vehicles', alt: 'Georgian Historic Vehicles Association' },
  { file: 'sasroleti', alt: 'Sasroleti' },
  { file: 'sponsor-d', alt: 'Darbazit' },
]
// Цветные лого с белой подложкой ровно по форме (сгенерированы в /sponsors/matte)
const logos: Logo[] = names.map(n => ({ src: `/sponsors/matte/${n.file}.webp`, alt: n.alt }))

// Удвоенный набор для бесшовной петли (вторая половина скрыта от скринридеров)
const loop = [...logos, ...logos]
</script>

<template>
  <div class="marquee" role="group" aria-label="Спонсоры и партнёры">
    <!-- Тёмная стеклянная лента-подложка с золотыми линиями -->
    <div class="marquee__band" aria-hidden="true" />
    <div class="marquee__track">
      <img
        v-for="(l, i) in loop"
        :key="i"
        class="marquee__logo"
        :src="l.src"
        :alt="i >= logos.length ? '' : l.alt"
        :aria-hidden="i >= logos.length ? 'true' : undefined"
        loading="lazy"
        decoding="async"
      >
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 40px 0;
  /* края ленты растворяются влево/вправо в тёмный фон */
  -webkit-mask: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
  mask: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
}

/* ===== Тёмная стеклянная лента ===== */
.marquee__band {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: clamp(118px, 14vw, 156px);
  background:
    linear-gradient(180deg, rgba(28, 24, 17, 0.5) 0%, rgba(10, 9, 6, 0.66) 100%);
  -webkit-backdrop-filter: blur(11px) saturate(1.05);
  backdrop-filter: blur(11px) saturate(1.05);
  /* золотые волосяные линии сверху и снизу */
  border-top: 1px solid rgba(230, 200, 102, 0.55);
  border-bottom: 1px solid rgba(230, 200, 102, 0.55);
  /* мягкое золотое свечение наружу + глубина внутрь */
  box-shadow:
    0 0 60px rgba(230, 200, 102, 0.12),
    inset 0 1px 0 rgba(255, 246, 214, 0.18),
    inset 0 -1px 0 rgba(255, 246, 214, 0.12),
    inset 0 0 50px rgba(0, 0, 0, 0.45);
}
/* тонкий золотой блик, медленно идущий по стеклу */
.marquee__band::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    transparent 38%,
    rgba(230, 200, 102, 0.1) 48%,
    rgba(255, 246, 214, 0.16) 50%,
    rgba(230, 200, 102, 0.1) 52%,
    transparent 62%
  );
  background-size: 240% 100%;
  background-repeat: no-repeat;
  animation: sheen 4.5s linear infinite;
  pointer-events: none;
}
@keyframes sheen {
  from { background-position: 160% 0; }
  to { background-position: -160% 0; }
}

/* ===== Трек с крупными белыми лого ===== */
.marquee__track {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  width: max-content;
  /* сдвиг на половину = ровно один набор → бесшовно */
  animation: marquee 32s linear infinite;
  will-change: transform;
}
.marquee:hover .marquee__track,
.marquee:hover .marquee__band::after { animation-play-state: paused; }

@keyframes marquee {
  to { transform: translateX(-50%); }
}

/* Лого — цветные, белая подложка по форме; разделитель через margin (для петли) */
.marquee__logo {
  flex: 0 0 auto;
  height: clamp(76px, 9.6vw, 104px);
  width: auto;
  max-width: clamp(200px, 24vw, 300px);
  margin: 0 clamp(30px, 4vw, 60px);
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.55));
  transition: transform 0.3s ease, filter 0.3s ease;
}
.marquee__logo:hover {
  transform: translateY(-2px) scale(1.05);
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.6));
}

@media (max-width: 760px) {
  .marquee { padding: 28px 0; }
  .marquee__band { height: clamp(92px, 26vw, 116px); }
  .marquee__logo {
    height: clamp(58px, 17vw, 80px);
    max-width: clamp(140px, 44vw, 200px);
    margin: 0 clamp(22px, 6vw, 40px);
  }
  .marquee__track { animation-duration: 24s; }
}

/* Уважаем «меньше движения»: лента и блик замирают, лого видны статично */
@media (prefers-reduced-motion: reduce) {
  .marquee__track,
  .marquee__band::after { animation: none; }
  .marquee__track { transform: none; }
  .marquee { overflow-x: auto; }
}
</style>
