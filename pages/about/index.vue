<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: about } = await useAsyncData(
  route.path,
  async () => await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value }),
  {
    watch: [languageGet]
  }
);
useHead(seo({ name: `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}` }));
</script>

<template>
  <StoryblokComponent :key="about.data.story.content._uid" :blok="about.data.story.content" />
</template>
