<script setup>
const { fetcher } = useFetcher({ slug: 'home' });
const { data: home } = await useAsyncData('home', fetcher);
</script>

<template>
  <StoryblokComponent :key="home.id" :blok="{ ...home.content, id: home.id }" />
</template>
