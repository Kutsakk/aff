<script setup lang="ts">
const { t } = useLocale()
const teams = computed(() => t.value.teams.list)
</script>

<template>
  <div class="pt-24 pb-20">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="section-title">{{ t.teams.title }}</h1>
      <div class="gold-underline" />

      <div class="grid md:grid-cols-2 gap-6">
        <template v-for="team in teams" :key="team.name">
          <a
            v-if="team.href"
            :href="team.href"
            class="gaff-card block p-0 overflow-hidden"
          >
            <img :src="team.image" :alt="team.name" class="w-full h-64 object-cover" />

            <div class="p-6 text-center">
              <div
                class="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden"
                :style="{ border: '2px solid ' + team.color + '40' }"
              >
                <img :src="team.image" :alt="team.name" class="w-full h-full object-cover" />
              </div>

              <h3 class="text-xl font-semibold mb-1" :style="{ color: team.color }">{{ team.name }}</h3>
              <p class="text-white/40 text-sm mb-3">{{ team.city }}</p>
              <p class="text-white/60 text-sm">{{ team.description }}</p>
            </div>
          </a>

          <article v-else class="gaff-card block p-0 overflow-hidden">
            <img :src="team.image" :alt="team.name" class="w-full h-64 object-cover" />

            <div class="p-6 text-center">
              <div
                class="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden"
                :style="{ border: '2px solid ' + team.color + '40' }"
              >
                <img :src="team.image" :alt="team.name" class="w-full h-full object-cover" />
              </div>

              <h3 class="text-xl font-semibold mb-1" :style="{ color: team.color }">{{ team.name }}</h3>
              <p class="text-white/40 text-sm mb-3">{{ team.city }}</p>
              <p class="text-white/60 text-sm">{{ team.description }}</p>
            </div>
          </article>
        </template>
      </div>
    </div>
  </div>
</template>
