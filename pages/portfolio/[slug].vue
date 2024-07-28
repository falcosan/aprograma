<script setup>
const route = useRoute()
const { seoDynamic } = useSeo()
const { data: project } = await useFetcher(`portfolio/${route.params.slug}`)
watch(project, (val) => seoDynamic(val), { immediate: true })
</script>

<template>
  <StoryblokComponent
    :key="project.id"
    :blok="{ ...project.content, id: project.id }"
  />
</template>
