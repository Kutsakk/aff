<script setup lang="ts">
// Язык документа следует за выбранной локалью — от этого зависит грузинский шрифт (:lang(ka))
const { locale } = useLocale()
useHead({ htmlAttrs: { lang: locale } })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
