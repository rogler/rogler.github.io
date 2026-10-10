<script setup lang="ts">
const base = useRuntimeConfig().app.baseURL;
useHead({
  title: 'François Rogler',
  meta: [{ 'http-equiv': 'refresh', content: `1;url=${base}${defaultLocale}` }],
  script: [
    {
      tagPosition: 'head',
      innerHTML: `var l=(navigator.languages||[navigator.language]).map(function(x){return x.slice(0,2).toLowerCase()}).find(function(x){return ${JSON.stringify(locales)}.indexOf(x)>-1});location.replace(${JSON.stringify(base)}+(l||${JSON.stringify(defaultLocale)}));`,
    },
  ],
});
definePageMeta({ layout: false });
</script>

<template>
  <noscript>
    <p v-for="l in locales" :key="l"><NuxtLink :to="`/${l}`">{{ l.toUpperCase() }}</NuxtLink></p>
  </noscript>
</template>
