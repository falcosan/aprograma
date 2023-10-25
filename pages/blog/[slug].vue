<script setup>
const { locale } = useI18n();
const route = useRoute();
const { seoDynamic } = useSeo();
const { data: post } = await useAsyncData(
  'post',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      params: { slug: route.path, lang: locale.value }
    });
    return story;
  },
  {
    watch: [locale]
  }
);
watch(post, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.id" :blok="{ ...post.content, id: post.id }" />
</template>
