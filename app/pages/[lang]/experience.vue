<script setup lang="ts">
const lang = useLang();
const t = useUi();
const resume = await useResume();
usePageMeta('experience', resume);
const toc = computed(() => resume.value.experience.map((e) => ({ id: `exp-${e.id}`, label: e.company })));
</script>

<template>
  <div class="with-toc">
    <div>
      <h1 class="page-title">{{ t.nav.experience }}</h1>
      <ExperienceList :items="resume.experience" :lang="lang" tags />
    </div>
    <PageToc :items="toc" :title="t.onThisPage" />
  </div>
</template>
