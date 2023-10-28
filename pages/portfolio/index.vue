<script setup>
const { locale } = useI18n();
const { seoStatic } = useSeo();
const config = useRuntimeConfig();
const { $languageCase } = useNuxtApp();
const { data: portfolio } = await useAsyncData('portfolio', async () => {
  const { story } = await $fetch('/api/storyblok', {
    headers: { 'x-auth': config.public.envXAuth },
    params: { slug: 'portfolio', lang: locale.value }
  });
  return story;
});
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
