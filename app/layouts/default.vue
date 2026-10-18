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
          <a
            href="https://github.com/rogler"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn"
            title="GitHub Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/rogler"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn"
            title="LinkedIn Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
            </svg>
          </a>
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
