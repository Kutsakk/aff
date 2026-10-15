<template>
  <div class="min-h-screen bg-[#000000] relative">
    <PageGlow />
    <SiteNavbar />
    <ScrollProgress />

    <main class="relative z-10">
      <slot />
    </main>
  </div>
</template>
