<script setup lang="ts">
import type { Lang } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

defineProps<{ items: Resume['projects']; lang: Lang }>();
</script>

<template>
  <article v-for="p in items" :key="p.id" class="entry">
    <p class="when">{{ range(p.start, p.end, lang) }}</p>
    <div>
      <h3>{{ p.name }}</h3>
      <p class="org">{{ p.role }}</p>
      <p class="desc">{{ p.description }}</p>
    </div>
  </article>
</template>
