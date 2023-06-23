<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seoStatic } = useSeo();
const config = useRuntimeConfig();
const { $languageCase } = useNuxtApp();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: about } = await useAsyncData(
  route.path,
  async () => {
    const { data } = await storyblokApi.get(`cdn/stories/${route.path}`, {
      language: languageGet.value,
      version: config.public.version
    });
    seoStatic({
      name: data.story.name,
      description: $languageCase('Something about me', 'Algo sobre mi', 'Qualcosa su di me')
    });
    return data.story;
  },
  {
    watch: [languageGet]
  }
);
</script>

<template>
  <StoryblokComponent :key="about.content._uid" :blok="about.content" />
</template>
