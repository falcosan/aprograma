<script setup>
const route = useRoute();
const { data: note } = await useFetcher({ slug: `note/${route.params.slug}` });
</script>

<template>
  <StoryblokComponent :key="note.id" :blok="{ ...note.content, id: note.id, title: note.name }" />
</template>
