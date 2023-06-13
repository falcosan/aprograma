<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: home } = await useAsyncData(
  'home',
  async () => await storyblokApi.get('cdn/stories/home', { language: languageGet.value }),
  {
    watch: [languageGet]
  }
);
</script>

<template>
  <StoryblokComponent :key="home.data.story.content._uid" :blok="home.data.story.content" />
</template>
