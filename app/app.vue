<script setup lang="ts">
const GA_ID = 'G-3QVB0YN65J' // Google Analytics ID

useHead({
  script: [
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
      async: true,
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <!-- Remount on every URL so switching language reloads that language's data. -->
    <NuxtPage :page-key="(route) => route.fullPath" />
  </NuxtLayout>
</template>