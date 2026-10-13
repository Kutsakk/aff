<template>
  <div class="min-h-screen bg-[#0b0b0c] relative">
    <PageGlow />
    <SiteNavbar />
    <ScrollProgress />

    <main class="relative z-10">
      <slot />
    </main>
  </div>
</template>
