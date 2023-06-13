<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data } = await useAsyncData(
  route.path,
  async () => await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value }),
  {
    watch: [languageGet]
  }
);
</script>

<template>
  <StoryblokComponent :key="data.data.story.content._uid" :blok="data.data.story.content" />
</template>
