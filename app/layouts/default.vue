<script setup lang="ts">
const lang = useLang();
const t = useUi();
const route = useRoute();
const resume = await useResume();
const abs = useAbsoluteUrl();

const sub = computed(() => (route.params.lang ? route.path.split('/').filter(Boolean).slice(1).join('/') : ''));
const other = computed(() => locales.find((l) => l !== lang.value)!);
const navKeys = ['home', 'experience', 'academics', 'skills', 'projects', 'more'] as const;
const to = (key: string) => (key === 'home' ? `/${lang.value}` : `/${lang.value}/${key}`);
const pdf = computed(() => `${useRuntimeConfig().app.baseURL}resume-${lang.value}.pdf`);

useHead({
  htmlAttrs: { lang },
  link: () => [
    { rel: 'canonical', href: abs(`/${lang.value}${sub.value ? `/${sub.value}` : ''}`) },
    ...locales.map((l) => ({ rel: 'alternate', hreflang: l, href: abs(`/${l}${sub.value ? `/${sub.value}` : ''}`) })),
  ],
});
</script>

<template>
  <div class="shell">
    <a class="skip" href="#content">{{ t.skip }}</a>
    <header class="site-header">
      <div class="bar">
        <NuxtLink class="brand" :to="to('home')">{{ resume.basics.name }}</NuxtLink>
        <nav class="nav" :aria-label="t.menu">
          <NuxtLink v-for="k in navKeys" :key="k" :to="to(k)">{{ t.nav[k] }}</NuxtLink>
        </nav>
        <div class="tools">
          <NuxtLink :to="`/${other}${sub ? `/${sub}` : ''}`" :lang="other" :hreflang="other">{{ t.switchTo }}</NuxtLink>
          <a :href="pdf" :title="t.downloadPdf">{{ t.pdf }}</a>
          <ThemeToggle />
        </div>
      </div>
    </header>
    <main id="content" class="page-wrap"><slot /></main>
    <footer class="site-footer">
      <p>© {{ new Date().getFullYear() }} {{ resume.basics.name }}. {{ t.rights }}</p>
      <p>{{ t.builtWith }}</p>
    </footer>
  </div>
</template>
