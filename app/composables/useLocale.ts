import { messages, type Locale, type Messages } from '~/i18n/messages'

const STORAGE_KEY = 'gaff-locale'
const DEFAULT_LOCALE: Locale = 'ka'

export function useLocale() {
  const locale = useState<Locale>('locale', () => DEFAULT_LOCALE)

  if (import.meta.client) {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved === 'ka' || saved === 'en') {
      if (locale.value !== saved) {
        locale.value = saved
      }
    }
  }

  function setLocale(next: Locale) {
    locale.value = next
    if (import.meta.client) {
      window.localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.lang = next
    }
  }

  const t = computed<Messages>(() => messages[locale.value])

  useHead({
    htmlAttrs: { lang: locale.value },
  })

  return { locale, setLocale, t }
}
