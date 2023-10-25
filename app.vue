<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage :page-key="route => route.name.split('_')[0]" />
  </NuxtLayout>
</template>
