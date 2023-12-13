<script setup>
const route = useRoute();
const { locale } = useI18n();
const { seoDynamic } = useSeo();
const config = useRuntimeConfig();
const { data: post } = await useAsyncData(
  route.params.slug,
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      headers: { 'x-auth': config.public.envXAuth },
      params: { slug: `blog/${route.params.slug}`, lang: locale.value }
    });
    return story;
  },
  { watch: [locale] }
);
watch(post, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.id" :blok="{ ...post.content, id: post.id }" />
</template>
