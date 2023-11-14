<script setup>
const { locale } = useI18n();
const config = useRuntimeConfig();
const { data: home } = await useAsyncData('home', async () => {
  const { story } = await $fetch('/api/storyblok', {
    headers: { 'x-auth': config.public.envXAuth },
    params: { slug: 'home', lang: locale.value }
  });
  return story;
});
</script>

<template>
  <StoryblokComponent :key="home.id" :blok="{ ...home.content, id: home.id }" />
</template>
