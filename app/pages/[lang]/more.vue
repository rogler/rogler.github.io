<script setup lang="ts">
const lang = useLang();
const t = useUi();
const resume = await useResume();
usePageMeta('more', resume);
const b = computed(() => resume.value.basics);
const showPhone = computed(() => b.value.phone && !b.value.phone.print_only);
const pdf = computed(() => `${useRuntimeConfig().app.baseURL}resume-${lang.value}.pdf`);
const toc = computed(() => [
  { id: 'contact', label: t.value.contact },
  { id: 'languages', label: t.value.sections.languages },
  { id: 'hobbies', label: t.value.sections.hobbies },
]);
const obfuscate = (email) =>
  email.replace('@', ' at ').replace(/\./g, ' dot ')

const openMail = (email) => {
  window.location.href = `mailto:${email}`
}
</script>

<template>
  <div class="with-toc">
    <div>
      <h1 class="page-title">{{ t.nav.more }}</h1>
      <section id="contact" class="block">
        <h2>{{ t.contact }}</h2>
        <dl class="pairs">
          <dt>{{ t.email }}</dt><dd><a href="#" @click.prevent="openMail(b.email)">{{ obfuscate(b.email) }}</a></dd>
          <template v-if="showPhone"><dt>{{ t.phone }}</dt><dd>{{ b.phone!.value }}</dd></template>
          <dt>{{ t.location }}</dt><dd>{{ b.location.city }}, {{ b.location.country }}</dd>
        </dl>
        <p class="actions"><a class="btn btn-primary" :href="pdf">{{ t.downloadPdf }}</a></p>
      </section>
      <section id="languages" class="block">
        <h2>{{ t.sections.languages }}</h2>
        <LanguageList :items="resume.languages" :lang="lang" />
      </section>
      <section id="hobbies" class="block">
        <h2>{{ t.sections.hobbies }}</h2>
        <p>{{ resume.hobbies.join(', ') }}</p>
      </section>
    </div>
    <PageToc :items="toc" :title="t.onThisPage" />
  </div>
</template>
