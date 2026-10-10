import { defineContentConfig, defineCollection } from '@nuxt/content';
import { resumeSchema } from './shared/schema';

// One collection per language; both validated by the same schema.
const resume = (lang: string) =>
  defineCollection({ type: 'data', source: `resume.${lang}.yaml`, schema: resumeSchema });

export default defineContentConfig({
  collections: { resume_en: resume('en'), resume_fr: resume('fr') },
});
