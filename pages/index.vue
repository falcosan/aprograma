<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const config = useRuntimeConfig();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: home } = await useAsyncData(
  'home',
  async () => {
    const { data } = await storyblokApi.get('cdn/stories/home', {
      language: languageGet.value,
      version: config.public.envApiVersion
    });
    return data.story;
  },
  {
    watch: [languageGet]
  }
);
</script>

<template>
  <StoryblokComponent :key="home.content._uid" :blok="home.content" />
</template>
