<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const {
  data: {
    value: {
      data: { story }
    }
  }
} = await useAsyncData(
  async () =>
    await storyblokApi.get('cdn/stories/home', {
      language: languageGet.value
    }),
  {
    watch: [languageGet]
  }
);
</script>
<template>
  <PageComponent :key="story.content._uid" :blok="story.content" />
</template>
