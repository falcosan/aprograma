<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: portfolio } = await useAsyncData(
  route.path,
  async () => await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value }),
  {
    watch: [languageGet]
  }
);
useHead(seo({ name: `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}` }));
</script>

<template>
  <StoryblokComponent
    :key="portfolio.data.story.content._uid"
    :blok="portfolio.data.story.content"
  />
</template>
