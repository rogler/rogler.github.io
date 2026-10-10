<template>
  <NuxtLayout>
    <!-- Remount on every URL so switching language reloads that language's data. -->
    <NuxtPage :page-key="(route) => route.fullPath" />
  </NuxtLayout>
</template>
