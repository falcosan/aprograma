<script setup>
const route = useRoute();
const { seoDynamic } = useSeo();
const { data: post } = await useFetcher(`blog/${route.params.slug}`);
watch(post, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent
    :key="post.id"
    :blok="{ ...post.content, id: post.id }"
  />
</template>
