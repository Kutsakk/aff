// Параметры блока «Федерация» (секция intro на главной), которыми крутят из панели:
// силуэт (размер + сдвиг), лого Black Sea Bowl (размер + сдвиг),
// лого IFAF (размер + сдвиг) и сдвиг всего блока. Хранится в localStorage.

export interface IntroControls {
  figScale: number // масштаб трофея (× к базовой ширине)
  figX: number     // сдвиг трофея по X, px
  figY: number     // сдвиг трофея по Y, px
  figBright: number // яркость/блики трофея (× brightness)
  bsbSize: number  // ширина лого Black Sea Bowl, px
  bsbX: number     // сдвиг лого BSB по X, px
  bsbY: number     // сдвиг лого BSB по Y, px
  ifafSize: number // высота лого IFAF, px
  ifafX: number    // сдвиг лого IFAF по X, px
  ifafY: number    // сдвиг лого IFAF по Y, px
  blockX: number   // сдвиг всего блока по X, px
  blockY: number   // сдвиг всего блока по Y, px
}

export const INTRO_DEFAULTS: IntroControls = {
  // Зафиксированная композиция из панели (?edit) — одинаково для всех посетителей
  figScale: 1.03,
  figX: -304,
  figY: -33,
  figBright: 0.57,
  bsbSize: 138,
  bsbX: 4,
  bsbY: 14,
  ifafSize: 107,
  ifafX: 0,
  ifafY: 26,
  blockX: -8,
  blockY: 99,
}

const STORAGE_KEY = 'aff-intro-controls'

export function useIntroControls() {
  const controls = useState<IntroControls>('intro-controls', () => ({ ...INTRO_DEFAULTS }))

  function load() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) controls.value = { ...INTRO_DEFAULTS, ...JSON.parse(raw) }
    } catch { /* пустой/битый стор */ }
  }

  function save() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(controls.value))
    } catch { /* приватный режим */ }
  }

  function set<K extends keyof IntroControls>(key: K, value: IntroControls[K]) {
    controls.value = { ...controls.value, [key]: value }
    save()
  }

  function reset() {
    controls.value = { ...INTRO_DEFAULTS }
    save()
  }

  // Готовые стили для привязки в шаблоне.
  // Трофей: базовая ширина 560px × масштаб, привязан к правому краю и центру по вертикали,
  // сдвиги figX/figY поверх, блики через filter brightness/saturate.
  const figureStyle = computed(() => ({
    width: `min(96%, ${Math.round(560 * controls.value.figScale)}px)`,
    transform: `translate(${controls.value.figX}px, calc(-50% + ${controls.value.figY}px))`,
    filter: `brightness(${controls.value.figBright}) saturate(${(0.85 + controls.value.figBright * 0.2).toFixed(2)})`,
  }))
  const bsbStyle = computed(() => ({
    width: `${controls.value.bsbSize}px`,
    transform: `translate(${controls.value.bsbX}px, ${controls.value.bsbY}px)`,
  }))
  const ifafStyle = computed(() => ({
    height: `${controls.value.ifafSize}px`,
    transform: `translate(${controls.value.ifafX}px, ${controls.value.ifafY}px)`,
  }))
  const blockStyle = computed(() => ({
    transform: `translate(${controls.value.blockX}px, ${controls.value.blockY}px)`,
  }))

  return { controls, load, save, set, reset, figureStyle, bsbStyle, ifafStyle, blockStyle }
}
