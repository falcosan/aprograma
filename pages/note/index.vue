<script setup lang="ts">
import RouteComponent from '@/storyblok/global/Route'

definePageMeta({ layout: 'blank' })
const { data: notes } = await useFetcher('notes', { startsWith: 'note' })
</script>

<template>
  <div class="p-5">
    <RouteComponent
      v-for="note in notes"
      :key="note.id"
      class="underline text-blue-500 hover:text-blue-600"
      :to="{ name: 'note-slug', params: { slug: note.slug } }"
    >
      {{ note.name }}
    </RouteComponent>
  </div>
</template>
