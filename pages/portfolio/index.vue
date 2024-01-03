<script setup>
const { seoStatic } = useSeo();
const { $languageCase } = useNuxtApp();
const { fetcher } = useFetcher({ slug: 'portfolio' });
const { data: portfolio } = await useAsyncData('portfolio', fetcher);
watch(
  portfolio,
  val =>
    seoStatic({
      name: val.name,
      description: $languageCase(
        'Some projects and skills',
        'Algunos proyectos y habilidades',
        'Alcuni progetti e abiltá'
      )
    }),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="portfolio.id" :blok="{ ...portfolio.content, id: portfolio.id }" />
</template>
