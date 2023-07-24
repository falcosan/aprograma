<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const { seoStatic } = useSeo();
const { $languageCase } = useNuxtApp();
const { languageGet } = storeToRefs(store.language());
const { data: portfolio } = await useAsyncData(
  'portfolio',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      params: { slug: 'portfolio', lang: languageGet.value }
    });
    return story;
  },
  {
    watch: [languageGet]
  }
);
watch(
  portfolio,
  val =>
    seoStatic({
      name: val.name,
      description: $languageCase(
        'Some projects and skills',
        'Algunos proyectos y habilidades',
        'Alcuni progetti e abiltá'
      )
    }),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="portfolio.id" :blok="{ ...portfolio.content, id: portfolio.id }" />
</template>
