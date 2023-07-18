<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const route = useRoute();
const { seoDynamic } = useSeo();
const { languageGet } = storeToRefs(store.language());
const { data: project } = await useAsyncData(
  'project',
  async () => {
    const { story } = await $fetch(`/api/storyblok?slug=${route.path}&lang=${languageGet.value}`);
    return story;
  },
  {
    watch: [languageGet]
  }
);
watch(project, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="project.id" :blok="{ ...project.content, id: project.id }" />
</template>
