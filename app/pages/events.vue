<script setup lang="ts">
import type { EventItem } from '~/i18n/messages'

const { t } = useLocale()
const events = computed(() => t.value.events.list)

const selectedEvent = ref<EventItem | null>(null)

function openEvent(event: EventItem) {
  selectedEvent.value = event
}

function closeEvent() {
  selectedEvent.value = null
}

function mapUrl(coords: string) {
  // coords format: "lat,lng" — Google Maps embed reliably resolves coordinates without an API key.
  return `https://maps.google.com/maps?q=${encodeURIComponent(coords)}&z=15&output=embed`
}
</script>

<template>
  <div class="pt-24 pb-20">
    <div class="max-w-5xl mx-auto px-4">
      <h1 class="section-title">{{ t.events.title }}</h1>
      <div class="gold-underline" />

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(event, index) in events"
          :key="`${event.image}-${index}`"
          class="gaff-card p-0 overflow-hidden cursor-pointer"
          @click="openEvent(event)"
        >
          <img :src="event.image" :alt="event.title" class="w-full h-52 object-cover" />
          <div class="p-5">
            <h3 class="text-lg font-semibold mb-1" style="color: var(--color-gold)">{{ event.title }}</h3>
            <span v-if="event.date" class="text-sm text-white/40">{{ event.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="selectedEvent" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeEvent">
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" @click="closeEvent" />
        <div class="relative z-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-[#111] rounded-2xl border border-white/10 shadow-2xl">
          <button
            class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            @click="closeEvent"
          >
            <UIcon name="i-lucide-x" class="w-5 h-5" />
          </button>
          <img :src="selectedEvent.image" :alt="selectedEvent.title" class="w-full max-h-[50vh] object-cover" />
          <div class="p-6">
            <h2 class="text-xl font-bold mb-2" style="color: var(--color-gold)">{{ selectedEvent.title }}</h2>
            <p v-if="selectedEvent.date" class="text-white/50 text-sm mb-2">
              <UIcon name="i-lucide-calendar" class="w-4 h-4 inline-block mr-1 align-text-bottom" />
              {{ selectedEvent.date }}
            </p>
            <p v-if="selectedEvent.description" class="text-white/70 mb-4">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 inline-block mr-1 align-text-bottom" />
              {{ selectedEvent.description }}
            </p>
            <div v-if="selectedEvent.coords" class="rounded-xl overflow-hidden border border-white/10">
              <iframe
                :src="mapUrl(selectedEvent.coords)"
                width="100%"
                height="250"
                style="border: 0"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}
</style>
