<script setup lang="ts">
const { t } = useLocale()
await navigateTo('/eagles/index.html', { external: true })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 text-center">
    <p class="text-white/70">{{ t.teams.redirecting }}</p>
  </div>
</template>
