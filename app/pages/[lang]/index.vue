<script setup lang="ts">
const lang = useLang();
const t = useUi();
const resume = await useResume();
usePageMeta('home', resume);
</script>

<template>
  <div class="hero">
    <h1>{{ resume.basics.name }}</h1>
    <p class="label">{{ resume.basics.label }}</p>
    <p class="summary">{{ resume.basics.summary }}</p>
    <p class="actions">
      <NuxtLink class="btn btn-primary" :to="`/${lang}/experience`">{{ t.seeExperience }}</NuxtLink>
      <NuxtLink class="btn" :to="`/${lang}/more`">{{ t.getInTouch }}</NuxtLink>
    </p>
    <CareerBar :experience="resume.experience" :lang="lang" />
    <dl class="metrics">
      <div v-for="m in resume.metrics" :key="m.label">
        <dt>{{ m.value }}</dt>
        <dd>{{ m.label }}</dd>
      </div>
    </dl>
  </div>
</template>
