// Параметры блока «Федерация» (секция intro на главной), которыми крутят из панели:
// силуэт (размер + сдвиг), лого Black Sea Bowl (размер + сдвиг),
// лого IFAF (размер + сдвиг) и сдвиг всего блока. Хранится в localStorage.

export interface IntroControls {
  figScale: number // масштаб силуэта (× к базовой ширине)
  figX: number     // сдвиг силуэта по X, px
  figY: number     // сдвиг силуэта по Y, px
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
  figScale: 1.21,
  figX: 11,
  figY: -14,
  bsbSize: 150,
  bsbX: 0,
  bsbY: 0,
  ifafSize: 117,
  ifafX: 0,
  ifafY: 21,
  blockX: -82,
  blockY: 37,
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

  // Готовые стили для привязки в шаблоне
  const figureStyle = computed(() => ({
    width: `min(92%, ${Math.round(760 * controls.value.figScale)}px)`,
    transform: `translate(${controls.value.figX}px, ${controls.value.figY}px)`,
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
