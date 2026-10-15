<script setup lang="ts">
// Панель управления блоком «Федерация»: силуэт, лого Black Sea Bowl,
// лого IFAF и сдвиг всего блока. Чёрный фон, золотой акцент. localStorage.
import type { IntroControls } from '~/composables/useIntroControls'

const { controls, load, set, reset } = useIntroControls()

const open = ref(false)

onMounted(load)

const onRange = (key: keyof IntroControls, e: Event) =>
  set(key, +(e.target as HTMLInputElement).value)
</script>

<template>
  <button type="button" class="fab" :class="{ 'fab--on': open }" @click="open = !open">
    <span class="fab__icon">⚙</span>
    <span>{{ open ? 'Закрыть' : 'Блок' }}</span>
  </button>

  <Transition name="panel">
    <aside v-if="open" class="panel">
      <header class="panel__head">
        <h2>Блок «Федерация»</h2>
        <button type="button" class="reset" @click="reset">Сброс</button>
      </header>

      <section class="group">
        <span class="group__title">Трофей (стадион)</span>
        <label class="field">
          <span>Размер<b>{{ controls.figScale.toFixed(2) }}×</b></span>
          <input type="range" min="0.4" max="2.4" step="0.01" :value="controls.figScale" @input="onRange('figScale', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↔<b>{{ controls.figX }}px</b></span>
          <input type="range" min="-800" max="400" step="1" :value="controls.figX" @input="onRange('figX', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↕<b>{{ controls.figY }}px</b></span>
          <input type="range" min="-400" max="400" step="1" :value="controls.figY" @input="onRange('figY', $event)">
        </label>
        <label class="field">
          <span>Блики / яркость<b>{{ controls.figBright.toFixed(2) }}×</b></span>
          <input type="range" min="0.5" max="1.8" step="0.01" :value="controls.figBright" @input="onRange('figBright', $event)">
        </label>
      </section>

      <section class="group">
        <span class="group__title">Лого Black Sea Bowl</span>
        <label class="field">
          <span>Размер<b>{{ controls.bsbSize }}px</b></span>
          <input type="range" min="60" max="280" step="1" :value="controls.bsbSize" @input="onRange('bsbSize', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↔<b>{{ controls.bsbX }}px</b></span>
          <input type="range" min="-200" max="300" step="1" :value="controls.bsbX" @input="onRange('bsbX', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↕<b>{{ controls.bsbY }}px</b></span>
          <input type="range" min="-200" max="200" step="1" :value="controls.bsbY" @input="onRange('bsbY', $event)">
        </label>
      </section>

      <section class="group">
        <span class="group__title">Лого IFAF</span>
        <label class="field">
          <span>Размер<b>{{ controls.ifafSize }}px</b></span>
          <input type="range" min="24" max="160" step="1" :value="controls.ifafSize" @input="onRange('ifafSize', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↔<b>{{ controls.ifafX }}px</b></span>
          <input type="range" min="-200" max="300" step="1" :value="controls.ifafX" @input="onRange('ifafX', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↕<b>{{ controls.ifafY }}px</b></span>
          <input type="range" min="-200" max="200" step="1" :value="controls.ifafY" @input="onRange('ifafY', $event)">
        </label>
      </section>

      <section class="group">
        <span class="group__title">Весь блок</span>
        <label class="field">
          <span>Сдвиг ↔<b>{{ controls.blockX }}px</b></span>
          <input type="range" min="-300" max="300" step="1" :value="controls.blockX" @input="onRange('blockX', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↕<b>{{ controls.blockY }}px</b></span>
          <input type="range" min="-300" max="300" step="1" :value="controls.blockY" @input="onRange('blockY', $event)">
        </label>
      </section>
    </aside>
  </Transition>
</template>

<style scoped>
.fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid rgba(201, 168, 76, 0.4);
  border-radius: 999px;
  background: #000000;
  color: var(--color-gold-light, #e6c866);
  font: 500 13px/1 'Noto Sans Georgian', sans-serif;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.fab:hover { transform: translateY(-2px); border-color: rgba(230, 200, 102, 0.75); }
.fab--on { right: 300px; }
.fab__icon { font-size: 15px; }

.panel {
  position: fixed;
  top: 104px;
  right: 16px;
  bottom: 16px;
  z-index: 39;
  width: 268px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px;
  overflow-y: auto;
  border: 1px solid rgba(201, 168, 76, 0.22);
  border-radius: 18px;
  background: #000000;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
  color: #fff;
}

.panel__head { display: flex; align-items: center; justify-content: space-between; }
.panel__head h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-gold-light, #e6c866);
}
.reset {
  padding: 5px 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  cursor: pointer;
}
.reset:hover { background: rgba(255, 255, 255, 0.06); }

.group { display: flex; flex-direction: column; gap: 11px; }
.group__title {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

.field { display: flex; flex-direction: column; gap: 6px; font-size: 11.5px; color: rgba(255, 255, 255, 0.7); }
.field span { display: flex; justify-content: space-between; align-items: baseline; }
.field b { color: #fff; font-weight: 600; font-size: 12px; }

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  outline: none;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--color-gold-light, #e6c866);
  border: 2px solid #000;
  box-shadow: 0 0 8px rgba(230, 200, 102, 0.6);
}
input[type="range"]::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--color-gold-light, #e6c866);
  border: 2px solid #000;
}

.panel-enter-active, .panel-leave-active { transition: transform 0.28s ease, opacity 0.28s ease; }
.panel-enter-from, .panel-leave-to { transform: translateX(20px); opacity: 0; }

@media (max-width: 640px) {
  .panel { top: auto; right: 12px; left: 12px; bottom: 12px; width: auto; max-height: 60vh; }
  .fab--on { right: 20px; bottom: calc(60vh + 24px); }
}
</style>
