<script setup lang="ts">
const lang = useLang();
// Lock to light theme so the PDF never comes out dark.
useHead({ htmlAttrs: { lang, 'data-theme': 'light', 'data-theme-lock': '' }, meta: [{ name: 'robots', content: 'noindex' }] });
</script>

<template>
  <div class="print-sheet"><slot /></div>
</template>
