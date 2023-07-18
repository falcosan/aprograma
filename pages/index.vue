<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const { languageGet } = storeToRefs(store.language());
const { data: home } = await useAsyncData(
  'home',
  async () => {
    const { story } = await $fetch(`/api/storyblok?slug=home&lang=${languageGet.value}`);
    return story;
  },
  {
    watch: [languageGet]
  }
);
</script>

<template>
  <StoryblokComponent :key="home.id" :blok="{ ...home.content, id: home.id }" />
</template>
