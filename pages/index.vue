<script setup>
const { locale } = useI18n();
const { data: home } = await useAsyncData(
  'home',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      params: { slug: 'home', lang: locale.value }
    });
    return story;
  },
  { watch: [locale] }
);
</script>

<template>
  <StoryblokComponent :key="home.id" :blok="{ ...home.content, id: home.id }" />
</template>
