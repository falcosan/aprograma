<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const { seoStatic } = useSeo();
const { $languageCase } = useNuxtApp();
const { languageGet } = storeToRefs(store.language());
const { data: about } = await useAsyncData(
  'about',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      params: { slug: 'about', lang: languageGet.value }
    });
    return story;
  },
  {
    watch: [languageGet]
  }
);
watch(
  about,
  val =>
    seoStatic({
      name: val.name,
      description: $languageCase('Something about me', 'Algo sobre mi', 'Qualcosa su di me')
    }),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="about.id" :blok="{ ...about.content, id: about.id }" />
</template>
