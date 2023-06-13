<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const { addProjects } = store.projects();
const { languageGet } = storeToRefs(store.language());
const route = useRoute();
const storyblokApi = useStoryblokApi();
const { data: portfolio, refresh: refreshPortfolio } = await useAsyncData(
  route.path,
  async () => await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value })
);
const { refresh: refreshProjects } = await useAsyncData(
  'projects',
  async () => await addProjects()
);
watch(languageGet, () => {
  refreshPortfolio();
  refreshProjects();
});
</script>

<template>
  <StoryblokComponent
    :key="portfolio.data.story.content._uid"
    :blok="portfolio.data.story.content"
  />
</template>
