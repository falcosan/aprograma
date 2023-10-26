<script setup>
const { locale } = useI18n();
const { seoStatic } = useSeo();
const config = useRuntimeConfig();
const { $languageCase } = useNuxtApp();
const { data: blog } = await useAsyncData(
  'blog',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      headers: { 'x-auth': config.public.envXAuth },
      params: { slug: 'blog', lang: locale.value }
    });
    return story;
  },
  { watch: [locale] }
);
watch(
  blog,
  val =>
    seoStatic({
      name: val.name,
      description: $languageCase(
        'Articles and publications',
        'Artículos y publicaciones',
        'Articoli e pubblicazioni'
      )
    }),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="blog.id" :blok="{ ...blog.content, id: blog.id }" />
</template>
