<script setup lang="ts">
const props = defineProps<{ items: { id: string; label: string }[]; title: string }>();
const active = ref('');

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => { for (const e of entries) if (e.isIntersecting) active.value = e.target.id; },
    { rootMargin: '-15% 0px -75% 0px' },
  );
  for (const i of props.items) {
    const el = document.getElementById(i.id);
    if (el) observer.observe(el);
  }
  onBeforeUnmount(() => observer.disconnect());
});
</script>

<template>
  <nav class="toc" :aria-label="title">
    <p class="toc-title">{{ title }}</p>
    <ul>
      <li v-for="i in items" :key="i.id">
        <a :href="`#${i.id}`" :aria-current="active === i.id ? 'location' : undefined">{{ i.label }}</a>
      </li>
    </ul>
  </nav>
</template>
