<script setup>
const { locale } = useI18n();
const route = useRoute();
const { seoDynamic } = useSeo();

const { data: project } = await useAsyncData(
  'project',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      params: { slug: route.path, lang: locale.value }
    });
    return story;
  },
  {
    watch: [locale]
  }
);
watch(project, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="project.id" :blok="{ ...project.content, id: project.id }" />
</template>
