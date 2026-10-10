const locales = ['en', 'fr'];
const pages = ['experience', 'academics', 'skills', 'projects', 'more', 'print'];

// User site (<username>.github.io): BASE_PATH stays '/'. Project site: BASE_PATH='/<repo>/'.
const baseURL = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/content'],
  css: [
    '@fontsource-variable/bricolage-grotesque',
    '@fontsource-variable/source-serif-4',
    '~/assets/css/main.css',
  ],
  app: {
    baseURL,
    head: {
      meta: [{ name: 'color-scheme', content: 'light dark' }],
      // Applies the saved theme before first paint (no flash). The print layout locks itself to light.
      script: [
        {
          innerHTML:
            "try{var r=document.documentElement;if(!r.hasAttribute('data-theme-lock')){var t=localStorage.getItem('theme');if(t)r.dataset.theme=t}}catch(e){}",
          tagPosition: 'head',
        },
      ],
    },
  },
  runtimeConfig: {
    public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://YOUR-USERNAME.github.io' },
  },
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', ...locales.flatMap((l) => [`/${l}`, ...pages.map((p) => `/${l}/${p}`)])],
    },
  },
});
