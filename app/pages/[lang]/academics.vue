<script setup lang="ts">
const lang = useLang();
const t = useUi();
const resume = await useResume();
usePageMeta('academics', resume);
const toc = computed(() => [
  { id: 'education', label: t.value.sections.education },
  { id: 'certifications', label: t.value.sections.certifications },
]);
</script>

<template>
  <div class="with-toc">
    <div>
      <h1 class="page-title">{{ t.nav.academics }}</h1>
      <section id="education" class="block">
        <h2>{{ t.sections.education }}</h2>
        <EducationList :items="resume.education" :lang="lang" />
      </section>
      <section id="certifications" class="block">
        <h2>{{ t.sections.certifications }}</h2>
        <CertificationList :items="resume.certifications" :lang="lang" />
      </section>
    </div>
    <PageToc :items="toc" :title="t.onThisPage" />
  </div>
</template>
