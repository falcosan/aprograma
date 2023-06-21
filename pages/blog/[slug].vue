<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const {
  public: { apiVersion: version }
} = useRuntimeConfig();
const { data: post } = await useAsyncData(
  route.params.slug,
  async () =>
    await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value, version }),
  {
    watch: [languageGet]
  }
);
watch(post, val => useHeadSafe(seo(val.data.story)), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.data.story.content._uid" :blok="post.data.story.content" />
</template>
