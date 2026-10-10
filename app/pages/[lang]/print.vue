<script setup lang="ts">
definePageMeta({ layout: 'print' });
const lang = useLang();
const t = useUi();
const resume = await useResume();
usePageMeta('home', resume);
const b = computed(() => resume.value.basics);
const loc = computed(() => b.value.location);
</script>

<template>
  <header>
    <h1>{{ b.name }}</h1>
    <p class="label">{{ b.label }}</p>
    <ul class="contact">
      <li><a :href="`mailto:${b.email}`">{{ b.email }}</a></li>
      <li v-if="b.phone">{{ b.phone.value }}</li>
      <li>{{ loc.address }}, {{ loc.postal_code }} {{ loc.city }}, {{ loc.country }}</li>
    </ul>
    <p class="summary">{{ b.summary }}</p>
  </header>

  <section>
    <h2>{{ t.sections.competencies }}</h2>
    <ul class="plain"><li v-for="c in resume.competencies" :key="c">{{ c }}</li></ul>
  </section>
  <section>
    <h2>{{ t.sections.experience }}</h2>
    <ExperienceList :items="resume.experience" :lang="lang" />
  </section>
  <section>
    <h2>{{ t.sections.skills }}</h2>
    <dl class="pairs pairs--skills">
      <template v-for="g in resume.skills" :key="g.id"><dt>{{ g.title }}</dt><dd>{{ g.items.join(', ') }}</dd></template>
    </dl>
  </section>
  <section>
    <h2>{{ t.sections.education }}</h2>
    <EducationList :items="resume.education" :lang="lang" />
  </section>
  <section>
    <h2>{{ t.sections.certifications }}</h2>
    <CertificationList :items="resume.certifications" :lang="lang" />
  </section>
  <section>
    <h2>{{ t.sections.projects }}</h2>
    <ProjectList :items="resume.projects" :lang="lang" />
  </section>
  <section>
    <h2>{{ t.sections.languages }}</h2>
    <LanguageList :items="resume.languages" :lang="lang" />
  </section>
  <section>
    <h2>{{ t.sections.hobbies }}</h2>
    <p>{{ resume.hobbies.join(', ') }}</p>
  </section>
</template>
