<script setup>
const route = useRoute();
const { seoDynamic } = useSeo();
const { fetcher } = useFetcher({ slug: `blog/${route.params.slug}` });
const { data: post } = await useAsyncData('post', fetcher);
watch(post, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.id" :blok="{ ...post.content, id: post.id }" />
</template>
