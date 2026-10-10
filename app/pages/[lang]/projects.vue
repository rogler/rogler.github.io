<script setup lang="ts">
const lang = useLang();
const t = useUi();
const resume = await useResume();
usePageMeta('projects', resume);
</script>

<template>
  <div>
    <h1 class="page-title">{{ t.nav.projects }}</h1>
    <ProjectList :items="resume.projects" :lang="lang" />
  </div>
</template>
