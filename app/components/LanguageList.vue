<script setup lang="ts">
import type { Lang } from '~/utils/ui';
import type { Resume } from '~~/shared/schema';

const props = defineProps<{ items: Resume['languages']; lang: Lang }>();
const t = computed(() => ui[props.lang]);
</script>

<template>
  <dl class="pairs">
    <template v-for="l in items" :key="l.name"><dt>{{ l.name }}</dt><dd>{{ t.levels[l.level] }}</dd></template>
  </dl>
</template>
