import type { Lang, Ui } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

export function useLang() {
  const route = useRoute();
  return computed<Lang>(() => (route.params.lang === 'fr' ? 'fr' : 'en'));
}

export function useUi() {
  const lang = useLang();
  return computed(() => ui[lang.value]);
}

/** Loads the resume for the current language from the Nuxt Content collection. */
export async function useResume() {
  const lang = useLang();
  const { data } = await useAsyncData(`resume-${lang.value}`, () =>
    queryCollection(`resume_${lang.value}` as 'resume_en').first(),
  );
  if (!data.value) throw createError({ statusCode: 500, message: `No resume data for "${lang.value}"` });
  return data as unknown as Ref<Resume>;
}

/** Absolute URL for canonical / hreflang tags. */
export function useAbsoluteUrl() {
  const config = useRuntimeConfig();
  const base = config.app.baseURL.replace(/\/$/, '');
  return (path: string) => `${config.public.siteUrl}${base}${path}`;
}

export function usePageMeta(key: keyof Ui['nav'], resume: Ref<Resume>) {
  const t = useUi();
  const title = computed(() =>
    key === 'home'
      ? `${resume.value.basics.name}, ${resume.value.basics.label}`
      : `${t.value.nav[key]} | ${resume.value.basics.name}`,
  );
  useSeoMeta({ title, description: () => resume.value.basics.summary.slice(0, 160) });
}
