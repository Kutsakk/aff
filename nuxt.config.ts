// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      { name: 'Noto Sans Georgian', provider: 'google' }
    ]
  },
  app: {
    head: {
      title: 'GAFF - საქართველოს ამერიკული ფეხბურთის ფედერაცია',
      htmlAttrs: { lang: 'ka' },
      meta: [
        { name: 'description', content: 'საქართველოს ამერიკული ფეხბურთის ფედერაცია - Georgian American Football Federation' }
      ]
    }
  }
})
