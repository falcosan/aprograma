<script setup>
const { seoStatic } = useSeo();
const { $languageCase } = useNuxtApp();
const { data: about } = await useFetcher({ slug: 'about' });
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
  <StoryblokComponent
    :key="about.id"
    :blok="{ ...about.content, id: about.id }"
  />
</template>
