<script setup lang="ts">
const visible = ref(true)
const fadeOut = ref(false)
let fadeTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  fadeTimer = setTimeout(() => {
    fadeOut.value = true
    hideTimer = setTimeout(() => {
      visible.value = false
    }, 1200)
  }, 4000)
})

onBeforeUnmount(() => {
  if (fadeTimer) {
    clearTimeout(fadeTimer)
  }

  if (hideTimer) {
    clearTimeout(hideTimer)
  }
})
</script>

<template>
  <div v-if="visible" :class="['splash-overlay', { 'fade-out': fadeOut }]">
    <img src="/federation.png" alt="GAFF" class="splash-logo" />
    <div class="splash-text">American Football Federation of Georgia</div>
    <div class="splash-line" />
  </div>
</template>
