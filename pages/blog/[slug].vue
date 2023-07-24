<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seoDynamic } = useSeo();
const { languageGet } = storeToRefs(store.language());
const { data: post } = await useAsyncData(
  'post',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      params: { slug: route.path, lang: languageGet.value }
    });
    return story;
  },
  {
    watch: [languageGet]
  }
);
watch(post, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.id" :blok="{ ...post.content, id: post.id }" />
</template>
