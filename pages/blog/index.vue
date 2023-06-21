<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seo } = useSeo();
const { $languageCase } = useNuxtApp();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const {
  public: { apiVersion: version }
} = useRuntimeConfig();
const { data: blog } = await useAsyncData(
  route.path,
  async () =>
    await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value, version }),
  {
    watch: [languageGet]
  }
);
watch(
  languageGet,
  () =>
    useHeadSafe(
      seo({
        name: `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}`,
        description: $languageCase(
          'Articles and publications',
          'Artículos y publicaciones',
          'Articoli e pubblicazioni'
        )
      })
    ),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="blog.data.story.content._uid" :blok="blog.data.story.content" />
</template>
