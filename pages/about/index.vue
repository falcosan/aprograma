<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const config = useRuntimeConfig();
const { $languageCase } = useNuxtApp();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: about } = await useAsyncData(
  route.path,
  async () =>
    await storyblokApi.get(`cdn/stories/${route.path}`, {
      language: languageGet.value,
      version: config.public.apiVersion
    }),
  {
    watch: [languageGet]
  }
);
watch(
  languageGet,
  () =>
    useHeadSafe(
      seo({
        name: `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}`,
        description: $languageCase('Something about me', 'Algo sobre mi', 'Qualcosa su di me')
      })
    ),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="about.data.story.content._uid" :blok="about.data.story.content" />
</template>
