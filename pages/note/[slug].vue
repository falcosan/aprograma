<script setup>
const route = useRoute()
definePageMeta({ layout: 'blank' })
const { data: note } = await useFetcher(`note/${route.params.slug}`)
</script>

<template>
  <StoryblokComponent
    :key="note.id"
    :blok="{ ...note.content, id: note.id, title: note.name }"
  />
</template>
