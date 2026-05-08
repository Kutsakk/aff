<script setup lang="ts">
const currentYear = new Date().getFullYear()
const { t } = useLocale()
</script>

<template>
  <footer class="bg-black/30 border-t border-white/10 py-8 mt-20">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <img src="/federation.png" alt="GAFF" class="w-16 mx-auto mb-4 opacity-60" />
      <p class="text-white/40 text-sm">
        &copy; {{ currentYear }} {{ t.footer.copyright }}
      </p>
    </div>
  </footer>
</template>
