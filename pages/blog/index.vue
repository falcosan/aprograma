<script setup>
const { seoStatic } = useSeo();
const { $languageCase } = useNuxtApp();
const { data: blog } = await useFetcher({ slug: 'blog' });
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
  <StoryblokComponent
    :key="blog.id"
    :blok="{ ...blog.content, id: blog.id }"
  />
</template>
