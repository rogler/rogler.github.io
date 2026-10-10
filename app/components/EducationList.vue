<script setup lang="ts">
import type { Lang } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

defineProps<{ items: Resume['education']; lang: Lang }>();
</script>

<template>
  <article v-for="e in items" :key="e.id" class="entry">
    <p class="when">{{ range(e.start, e.end, lang) }}</p>
    <div>
      <h3>{{ e.institution }}</h3>
      <p class="org">{{ e.degree }}, {{ e.location }}</p>
    </div>
  </article>
</template>
