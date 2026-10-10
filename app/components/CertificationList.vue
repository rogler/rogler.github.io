<script setup lang="ts">
import type { Lang } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

const props = defineProps<{ items: Resume['certifications']; lang: Lang }>();
const t = computed(() => ui[props.lang]);
</script>

<template>
  <article v-for="c in items" :key="c.name" class="entry">
    <p class="when">{{ month(c.issued, lang) }}</p>
    <div>
      <h3><a v-if="c.url" :href="c.url">{{ c.name }}</a><template v-else>{{ c.name }}</template></h3>
      <p class="org">
        {{ c.issuer }}<template v-if="c.expires">, {{ isPast(c.expires) ? t.expired : t.expires }} {{ month(c.expires, lang) }}</template>
      </p>
    </div>
  </article>
</template>
