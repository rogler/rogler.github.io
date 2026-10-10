<script setup lang="ts">
import type { Resume } from '~~/shared/schema';

defineProps<{ items: Resume['skills'] }>();
</script>

<template>
  <section v-for="g in items" :id="`skill-${g.id}`" :key="g.id" class="entry entry--skills">
    <h2 class="group-title">{{ g.title }}</h2>
    <ul class="tags"><li v-for="s in g.items" :key="s">{{ s }}</li></ul>
  </section>
</template>
