<script setup>
const route = useRoute();
definePageMeta({ layout: 'empty' });
const { fetcher } = useFetcher({ slug: `note/${route.params.slug}` });
const { data: note } = await useAsyncData('note', fetcher);
</script>

<template>
  <StoryblokComponent :key="note.id" :blok="{ ...note.content, id: note.id }" />
</template>
