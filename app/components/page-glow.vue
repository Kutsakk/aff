<script setup lang="ts">
// Глобальный фон сайта: премиальный чёрно-золотой. Диагональный тёмный
// градиент + едва заметная тёплая золотая дымка (НЕ снизу) + тонкое зерно.
// Фиксированный слой под всем контентом.
</script>

<template>
  <div class="page-glow" aria-hidden="true" />
</template>

<style scoped>
.page-glow {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    /* тёплая золотая дымка сверху по центру — даёт объём, не свечение снизу */
    radial-gradient(72% 55% at 50% -12%, rgba(214, 180, 96, 0.12) 0%, rgba(214, 180, 96, 0) 60%),
    /* мягкий золотой акцент справа по центру */
    radial-gradient(42% 60% at 100% 40%, rgba(201, 168, 76, 0.08) 0%, rgba(201, 168, 76, 0) 55%),
    /* прохладный золотой акцент слева сверху — баланс */
    radial-gradient(40% 50% at 0% 12%, rgba(154, 122, 46, 0.07) 0%, rgba(154, 122, 46, 0) 55%),
    /* базовый диагональный чёрно-золотой градиент */
    linear-gradient(145deg, #000000 0%, #000000 42%, #000000 72%, #000000 100%);
}

/* Тонкое зерно поверх — премиальная текстура «чёрное золото» */
.page-glow::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
