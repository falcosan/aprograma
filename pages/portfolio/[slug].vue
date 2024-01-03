<script setup>
const route = useRoute();
const { seoDynamic } = useSeo();
const { fetcher } = useFetcher({ slug: `portfolio/${route.params.slug}` });
const { data: project } = await useAsyncData('project', fetcher);
watch(project, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="project.id" :blok="{ ...project.content, id: project.id }" />
</template>
