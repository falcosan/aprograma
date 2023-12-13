<script setup>
const route = useRoute();
const { locale } = useI18n();
const { seoDynamic } = useSeo();
const config = useRuntimeConfig();
const { data: project } = await useAsyncData(
  route.params.slug,
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      headers: { 'x-auth': config.public.envXAuth },
      params: { slug: `portfolio/${route.params.slug}`, lang: locale.value }
    });
    return story;
  },
  { watch: [locale] }
);
watch(project, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="project.id" :blok="{ ...project.content, id: project.id }" />
</template>
