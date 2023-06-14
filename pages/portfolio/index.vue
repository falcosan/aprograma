<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const { $languageCase } = useNuxtApp();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: portfolio } = await useAsyncData(
  route.path,
  async () => await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value }),
  {
    watch: [languageGet]
  }
);
useHeadSafe(
  seo({
    name: `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}`,
    description: $languageCase(
      'Some projects and skills',
      'Algunos proyectos y habilidades',
      'Alcuni progetti e abiltá'
    )
  })
);
</script>

<template>
  <StoryblokComponent
    :key="portfolio.data.story.content._uid"
    :blok="portfolio.data.story.content"
  />
</template>
