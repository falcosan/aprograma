<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seoDynamic } = useSeo();
const config = useRuntimeConfig();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: project } = await useAsyncData(
  route.params.slug,
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
watch(project, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="project.content._uid" :blok="project.content" />
</template>
