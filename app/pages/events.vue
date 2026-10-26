<script setup lang="ts">
// Страница события: Georgia — Great Britain Dev. Постер + детали матча.
useHead({ title: 'Georgia — Great Britain · 11 октября — American Football Federation of Georgia' })

const { t } = useLocale()

const meta = computed(() => [
  { label: t.value.event.labelDate, value: t.value.event.valDate },
  { label: t.value.event.labelTime, value: '18:00' },
  { label: t.value.event.labelPlace, value: t.value.event.valPlace },
  { label: t.value.event.labelTournament, value: 'IFAF Level 2' },
  { label: t.value.event.labelBroadcast, value: 'Silk Sport 2' },
])
</script>

<template>
  <main class="event-page">
    <div class="event-page__bg" aria-hidden="true" />
    <section class="ev">
      <div class="ev__info">
        <span class="ev__live"><i aria-hidden="true" /> {{ t.event.live }}</span>
        <h1 class="ev__title">
          <span class="ev__ge">{{ t.event.teamGe }}</span>
          <span class="ev__vs">{{ t.event.vs }}</span>
          <span class="ev__gb">{{ t.event.teamGb }}</span>
        </h1>
        <p class="ev__lead">{{ t.event.lead }}</p>

        <ul class="ev__meta">
          <li v-for="m in meta" :key="m.label">
            <span>{{ m.label }}</span>
            <b>{{ m.value }}</b>
          </li>
        </ul>

      </div>

      <figure class="ev__poster">
        <img src="/ivent.webp" alt="Georgia — Great Britain, 11 октября, Хвамли Арена">
      </figure>
    </section>
  </main>
</template>

<style scoped>
.event-page { position: relative; background: transparent; }
/* Притемнённый фон-иллюстрация, чтобы не кричал */
.event-page__bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: url('/235724766_11034270.webp') center / cover no-repeat;
  opacity: 0.38;
}
.event-page__bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.42) 50%, rgba(0, 0, 0, 0.68) 100%);
}
.ev {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(130px, 18vh, 200px) clamp(20px, 6vw, 48px) clamp(80px, 12vh, 140px);
}

.ev__live {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(220, 38, 38, 0.14);
  border: 1px solid rgba(220, 38, 38, 0.4);
  color: #ff6b6b;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.ev__live i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff3b3b;
  box-shadow: 0 0 0 0 rgba(255, 59, 59, 0.7);
  animation: evLive 1.4s ease-out infinite;
}
@keyframes evLive {
  0% { box-shadow: 0 0 0 0 rgba(255, 59, 59, 0.6); }
  70% { box-shadow: 0 0 0 10px rgba(255, 59, 59, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 59, 59, 0); }
}

.ev__title {
  margin: 20px 0 0;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.02;
  font-size: clamp(2.2rem, 5vw, 4rem);
}
.ev__title span { display: block; }
.ev__ge { color: #fff; }
.ev__vs {
  margin: 4px 0;
  font-size: 0.5em;
  color: var(--color-gold-light, #e6c866);
  letter-spacing: 0.1em;
}
.ev__gb {
  background: linear-gradient(90deg, #e0cfb4, #c9a84c 55%, #e6c866);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.ev__lead {
  margin: 22px 0 28px;
  max-width: 520px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.72);
}

.ev__meta {
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px;
  background: rgba(201, 168, 76, 0.12);
  border: 1px solid rgba(201, 168, 76, 0.12);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.ev__meta li {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px 18px;
  background: rgba(0, 0, 0, 0.4);
}
.ev__meta span { font-size: 0.74rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255, 255, 255, 0.45); }
.ev__meta b { font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 1.05rem; color: #fff; }

.ev__actions { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
.ev__btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  padding: 15px 36px;
  border-radius: 999px;
  border: 1.5px solid var(--color-gold, #c9a84c);
  background: #000;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}
.ev__btn span { position: relative; z-index: 1; color: var(--color-gold-light, #e6c866); transition: color 0.4s ease 0.05s; }
.ev__btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(100deg, #9a7a2e, #e6c866 42%, #fff6d6 50%, #e6c866 58%, #9a7a2e);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}
.ev__btn:hover::before { transform: scaleX(1); }
.ev__btn:hover span { color: #1a1206; }
.ev__stream {
  color: var(--color-gold-light, #e6c866);
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}
.ev__stream:hover { opacity: 0.75; }

/* Постер */
.ev__poster {
  margin: 0;
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.3);
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.9), 0 0 60px -20px rgba(201, 168, 76, 0.3);
}
.ev__poster img { display: block; width: 100%; height: auto; }

@media (max-width: 880px) {
  .ev { grid-template-columns: 1fr; }
  .ev__poster { order: -1; max-width: 460px; margin: 0 auto; }
  /* без blur на мобилке — backdrop-filter тормозит скролл */
  .ev__meta { -webkit-backdrop-filter: none; backdrop-filter: none; background: rgba(28, 24, 16, 0.5); }
}
</style>
