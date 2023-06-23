<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seoDynamic } = useSeo();
const config = useRuntimeConfig();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: post } = await useAsyncData(
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
watch(post, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.content._uid" :blok="post.content" />
</template>
