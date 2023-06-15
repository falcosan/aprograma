<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: project } = await useAsyncData(
  route.params.slug,
  async () => await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value }),
  {
    watch: [languageGet]
  }
);
useHeadSafe(seo(project.value.data.story));
</script>

<template>
  <StoryblokComponent :key="project.data.story.content._uid" :blok="project.data.story.content" />
</template>
