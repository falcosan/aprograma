<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage :page-key="route => route.fullPath" />
  </NuxtLayout>
</template>
