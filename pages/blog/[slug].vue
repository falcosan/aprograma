<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const config = useRuntimeConfig();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const { data: post } = await useAsyncData(
  route.params.slug,
  async () =>
    await storyblokApi.get(`cdn/stories/${route.path}`, {
      language: languageGet.value,
      version: config.public.apiVersion
    }),
  {
    watch: [languageGet]
  }
);
watch(post, val => useSeoMeta(seo(val.data.story)), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.data.story.content._uid" :blok="post.data.story.content" />
</template>
