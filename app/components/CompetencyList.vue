<script setup lang="ts">
import type { Lang } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

const props = defineProps<{ items: Resume['competencies']; lang: Lang }>();
const t = computed(() => ui[props.lang]);
</script>

<template>
  <ul>
    <template v-for="l in items" :key="l.name"><li>{{ l }}</li></template>
  </ul>
</template>
