<script setup lang="ts">
// Панель управления надписью hero: перетаскивание мышью, размер, точные
// сдвиги, золотая черта. Плюс группа фото. Пишет в localStorage.
const { controls, editing, load, set, reset } = useHeroControls()

const open = ref(false)

onMounted(load)

type NumKey = 'imgScale' | 'imgX' | 'imgY' | 'titleScale' | 'titleX' | 'titleY'
const onRange = (key: NumKey, e: Event) =>
  set(key, +(e.target as HTMLInputElement).value)

// Пошаговое изменение значения кнопками −/+ с ограничением диапазона
const bump = (key: NumKey, delta: number, min: number, max: number) =>
  set(key, Math.min(max, Math.max(min, +(controls.value[key] + delta).toFixed(2))))
</script>

<template>
  <button type="button" class="fab" :class="{ 'fab--on': open }" @click="open = !open">
    <span class="fab__icon">✎</span>
    <span>{{ open ? 'Закрыть' : 'Надпись' }}</span>
  </button>

  <Transition name="panel">
    <aside v-if="open" class="panel">
      <header class="panel__head">
        <h2>Надпись</h2>
        <button type="button" class="reset" @click="reset">Сброс</button>
      </header>

      <!-- Главное: включить перетаскивание мышью -->
      <button
        type="button"
        class="drag-toggle"
        :class="{ on: editing }"
        @click="editing = !editing"
      >
        <span class="drag-toggle__dot" />
        {{ editing ? 'Перетаскивание включено' : 'Включить перетаскивание' }}
      </button>
      <p class="hint">Включи и тащи надпись прямо по экрану. Точная подгонка — ниже.</p>

      <section class="group">
        <label class="field">
          <span>Размер<b>{{ Math.round(controls.titleScale * 100) }}%</b></span>
          <div class="row">
            <button type="button" class="step" @click="bump('titleScale', -0.05, 0.5, 2.5)">−</button>
            <input type="range" min="0.5" max="2.5" step="0.01" :value="controls.titleScale" @input="onRange('titleScale', $event)">
            <button type="button" class="step" @click="bump('titleScale', 0.05, 0.5, 2.5)">+</button>
          </div>
        </label>
        <label class="field">
          <span>Сдвиг ↔<b>{{ controls.titleX }}</b></span>
          <input type="range" min="-45" max="45" step="0.5" :value="controls.titleX" @input="onRange('titleX', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↕<b>{{ controls.titleY }}</b></span>
          <input type="range" min="-45" max="45" step="0.5" :value="controls.titleY" @input="onRange('titleY', $event)">
        </label>
        <label class="check">
          <input type="checkbox" :checked="controls.showRule" @change="set('showRule', ($event.target as HTMLInputElement).checked)">
          <span>Золотая черта над текстом</span>
        </label>
      </section>

      <section class="group">
        <span class="group__title">Фото</span>
        <label class="field">
          <span>Размер<b>{{ controls.imgScale.toFixed(2) }}×</b></span>
          <input type="range" min="0.8" max="2.2" step="0.01" :value="controls.imgScale" @input="onRange('imgScale', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↔<b>{{ controls.imgX }}%</b></span>
          <input type="range" min="0" max="100" step="1" :value="controls.imgX" @input="onRange('imgX', $event)">
        </label>
        <label class="field">
          <span>Сдвиг ↕<b>{{ controls.imgY }}%</b></span>
          <input type="range" min="0" max="100" step="1" :value="controls.imgY" @input="onRange('imgY', $event)">
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
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.08em;
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

/* Переключатель перетаскивания — главная кнопка панели */
.drag-toggle {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.4);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.82);
  font: 600 12.5px/1 'Noto Sans Georgian', sans-serif;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.drag-toggle__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  transition: background 0.2s ease, box-shadow 0.2s ease;
}
.drag-toggle.on {
  border-color: rgba(230, 200, 102, 0.8);
  background: rgba(201, 168, 76, 0.14);
  color: #fff;
}
.drag-toggle.on .drag-toggle__dot {
  background: #e6c866;
  box-shadow: 0 0 10px rgba(230, 200, 102, 0.9);
}
.hint {
  margin: -6px 0 2px;
  font-size: 10.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.4);
}

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

/* Ряд «− слайдер +» для размера */
.row { display: flex; align-items: center; gap: 8px; }
.row input[type="range"] { flex: 1; }
.step {
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  border: 1px solid rgba(201, 168, 76, 0.4);
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-gold-light, #e6c866);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.step:hover { background: rgba(201, 168, 76, 0.16); border-color: rgba(230, 200, 102, 0.75); }

.check { display: flex; align-items: center; gap: 9px; font-size: 11.5px; color: rgba(255, 255, 255, 0.72); cursor: pointer; }
.check input { accent-color: var(--color-gold, #c9a84c); width: 15px; height: 15px; }

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
