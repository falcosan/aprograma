<script setup>
const { locale } = useI18n();
const { seoStatic } = useSeo();
const config = useRuntimeConfig();
const { $languageCase } = useNuxtApp();
const { data: about } = await useAsyncData('about', async () => {
  const { story } = await $fetch('/api/storyblok', {
    headers: { 'x-auth': config.public.envXAuth },
    params: { slug: 'about', lang: locale.value }
  });
  return story;
});
watch(
  about,
  val =>
    seoStatic({
      name: val.name,
      description: $languageCase('Something about me', 'Algo sobre mi', 'Qualcosa su di me')
    }),
  { immediate: true }
);
</script>

<template>
  <StoryblokComponent :key="about.id" :blok="{ ...about.content, id: about.id }" />
</template>
