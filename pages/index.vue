<script setup>
const { data: home } = await useFetcher('home');
</script>

<template>
  <StoryblokComponent
    :key="home.id"
    :blok="{ ...home.content, id: home.id }"
  />
</template>
