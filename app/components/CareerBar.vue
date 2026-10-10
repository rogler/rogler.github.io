<script setup lang="ts">
import type { Lang } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

const props = defineProps<{ experience: Resume['experience']; lang: Lang }>();
const t = computed(() => ui[props.lang]);
const now = new Date().getFullYear();
const items = computed(() =>
  [...props.experience]
    .sort((a, b) => a.start - b.start)
    .map((e) => ({ id: e.id, company: e.company, span: Math.max((e.end ?? now) - e.start, 0.6) })),
);
const first = computed(() => Math.min(...props.experience.map((e) => e.start)));
</script>

<template>
  <div class="career">
    <div class="career-bar" role="group" :aria-label="t.careerLabel">
      <NuxtLink
        v-for="i in items"
        :key="i.id"
        :to="{ path: `/${lang}/experience`, hash: `#exp-${i.id}` }"
        :style="{ flex: `${i.span} 1 0` }"
        :title="i.company"
        :aria-label="i.company"
      >
        <span>{{ i.company }}</span>
      </NuxtLink>
    </div>
    <p class="career-axis"><span>{{ first }}</span><span>{{ t.present }}</span></p>
  </div>
</template>
