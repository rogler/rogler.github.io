<script setup lang="ts">
const t = useUi();
const resume = await useResume();
usePageMeta('skills', resume);
const toc = computed(() => resume.value.skills.map((g) => ({ id: `skill-${g.id}`, label: g.title })));
</script>

<template>
  <div class="with-toc">
    <div>
      <h1 class="page-title">{{ t.nav.skills }}</h1>
      <SkillGroups :items="resume.skills" />
    </div>
    <PageToc :items="toc" :title="t.onThisPage" />
  </div>
</template>
