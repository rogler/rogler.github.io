<script setup lang="ts">
import type { Lang } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

defineProps<{ items: Resume['experience']; lang: Lang; tags?: boolean }>();
</script>

<template>
  <article v-for="e in items" :id="`exp-${e.id}`" :key="e.id" class="entry" :class="{ 'entry--long': e.sections }">
    <p class="when">
      {{ range(e.start, e.end, lang) }}<template v-if="e.duration"><br />{{ e.duration }}</template>
    </p>
    <div>
      <h3>{{ e.position }}</h3>
      <p class="org"><strong>{{ e.company }}</strong><template v-if="e.sector">, {{ e.sector }}</template>, {{ e.location }}</p>
      <p v-if="e.description" class="desc">{{ e.description }}</p>
      <ul v-if="e.highlights"><li v-for="h in e.highlights" :key="h">{{ h }}</li></ul>
      <template v-for="s in e.sections" :key="s.title">
        <h4>{{ s.title }}</h4>
        <ul><li v-for="h in s.highlights" :key="h">{{ h }}</li></ul>
      </template>
      <ul v-if="tags && e.tags?.length" class="tags"><li v-for="tag in e.tags" :key="tag">{{ tag }}</li></ul>
    </div>
  </article>
</template>
