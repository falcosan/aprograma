<script setup>
const route = useRoute();
const nuxtApp = useNuxtApp();
const { locale } = useI18n();
const { seoDynamic } = useSeo();
const config = useRuntimeConfig();
const { data: post } = await useAsyncData(
  'post',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      headers: { 'x-auth': config.public.envXAuth },
      params: { slug: `blog/${route.params.slug}`, lang: locale.value }
    });
    return story;
  },
  { watch: [locale], getCachedData: key => nuxtApp.payload.static[key] ?? nuxtApp.payload.data[key] }
);
watch(post, val => seoDynamic(val), { immediate: true });
</script>

<template>
  <StoryblokComponent :key="post.id" :blok="{ ...post.content, id: post.id }" />
</template>
