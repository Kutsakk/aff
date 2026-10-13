// Параметры hero, которыми можно крутить из панели: масштаб и положение
// фона, размер заголовка, видимость золотой черты. Сохраняется в localStorage.

export interface HeroControls {
  imgScale: number  // масштаб фонового фото
  imgX: number      // положение кадра по X, %
  imgY: number      // положение кадра по Y, %
  titleScale: number // множитель размера заголовка
  titleX: number    // сдвиг заголовка по X, vw
  titleY: number    // сдвиг заголовка по Y, vh
  showRule: boolean  // золотая черта над заголовком
}

export const HERO_DEFAULTS: HeroControls = {
  // Зафиксированная композиция из панели (?edit) — одинаково для всех посетителей
  imgScale: 0.86,
  imgX: 55,
  imgY: 69,
  titleScale: 0.92,
  titleX: 13.5,
  titleY: -1,
  showRule: false,
}

const STORAGE_KEY = 'aff-hero-controls'

export function useHeroControls() {
  const controls = useState<HeroControls>('hero-controls', () => ({ ...HERO_DEFAULTS }))
  // Режим перетаскивания надписи мышью (общий для панели и hero). Не сохраняется.
  const editing = useState<boolean>('hero-editing', () => false)

  function load() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) controls.value = { ...HERO_DEFAULTS, ...JSON.parse(raw) }
    } catch { /* пустой/битый стор */ }
  }

  function save() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(controls.value))
    } catch { /* приватный режим */ }
  }

  function set<K extends keyof HeroControls>(key: K, value: HeroControls[K]) {
    controls.value = { ...controls.value, [key]: value }
    save()
  }

  function reset() {
    controls.value = { ...HERO_DEFAULTS }
    save()
  }

  return { controls, editing, load, save, set, reset }
}
