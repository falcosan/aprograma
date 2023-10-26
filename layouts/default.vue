<script setup>
import LogoComponent from '@/storyblok/global/Logo';
const { locale } = useI18n();
const { seoLayout } = useSeo();
const config = useRuntimeConfig();
const { data: layout } = await useAsyncData(
  'layout',
  async () => {
    const { story } = await $fetch('/api/storyblok', {
      headers: { 'x-auth': config.public.envXAuth },
      params: { slug: 'layout', lang: locale.value }
    });
    return story;
  },
  { watch: [locale] }
);
watch(locale, val => seoLayout({ language: val }), { immediate: true });
</script>

<template>
  <div
    v-if="layout.content.maintenance"
    class="aprograma-maintenance h-screen flex flex-col justify-center p-5"
  >
    <LogoComponent transition class="rounded max-w-full mx-auto my-0" size="50vh" />
    <h1
      class="maintenance-text text-xs xs:text-base sm:text-lg text-center xs:whitespace-nowrap pointer-events-none uppercase italic"
    >
      {{ $languageCase('under maintenance', 'en mantenimiento', 'in manutenzione') }}
    </h1>
  </div>
  <div v-else class="aprograma-theme">
    <component
      :is="resolveComponent(component.component)"
      v-for="component in layout.content.body"
      :key="component._uid"
      :blok="component"
    >
      <template #header><NuxtLoadingIndicator /></template>
      <template #main><slot /></template>
    </component>
  </div>
</template>
