<script setup lang="ts">
const lang = useLang();
const t = useUi();
const resume = await useResume();
usePageMeta('competencies', resume);
const toc = computed(() => resume.value.competencies.map((c) => ({ id: `comp-${c}`, label: c })));
</script>

<template>
  <div class="with-toc">
    <div>
      <h1 class="page-title">{{ t.nav.competencies }}</h1>
      <CompetencyList :items="resume.competencies" :lang="lang" />
    </div>
  </div>
</template>
