// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Серверные секреты (не попадают на клиент). Значения — из env NUXT_*.
  runtimeConfig: {
    supabaseUrl: '',
    supabaseServiceKey: '',
    telegramBotToken: '',
    telegramChatId: '',
  },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Noto Serif Georgian', provider: 'google', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
      { name: 'Noto Sans Georgian', provider: 'google' },
      { name: 'Notable', provider: 'google' },
      { name: 'Graduate', provider: 'google' },
      { name: 'Oswald', provider: 'google' },
      { name: 'Manrope', provider: 'google' },
      { name: 'Audiowide', provider: 'google' },
      { name: 'Goldman', provider: 'google' }
    ]
  },
  app: {
    head: {
      // Название федерации — бренд, не переводим ни на один язык
      title: 'American Football Federation of Georgia',
      htmlAttrs: { lang: 'ka' },
      meta: [
        { name: 'description', content: 'American Football Federation of Georgia' }
      ]
    }
  }
})
