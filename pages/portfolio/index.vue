<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seoStatic } = useSeo();
const config = useRuntimeConfig();
const { $languageCase } = useNuxtApp();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: portfolio } = await useAsyncData(
  route.path,
  async () => {
    const { data } = await storyblokApi.get(`cdn/stories/${route.path}`, {
      language: languageGet.value,
      version: config.public.version
    });
    return data.story;
  },
  {
    watch: [languageGet]
  }
);
watch(
  portfolio,
  val =>
    seoStatic({
      name: val.name,
      description: $languageCase(
        'Some projects and skills',
        'Algunos proyectos y habilidades',
        'Alcuni progetti e abiltá'
      )
    }),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="portfolio.content._uid" :blok="portfolio.content" />
</template>
