<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const { seoStatic } = useSeo();
const { $languageCase } = useNuxtApp();
const { languageGet } = storeToRefs(store.language());
const { data: blog } = await useAsyncData(
  'blog',
  async () => {
    const { story } = await $fetch(`/api/storyblok?slug=blog&lang=${languageGet.value}`);
    return story;
  },
  {
    watch: [languageGet]
  }
);
watch(
  blog,
  val =>
    seoStatic({
      name: val.name,
      description: $languageCase(
        'Articles and publications',
        'Artículos y publicaciones',
        'Articoli e pubblicazioni'
      )
    }),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="blog.content._uid" :blok="blog.content" />
</template>
