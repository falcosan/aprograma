<script setup>
import HeaderComponent from '@/storyblok/layout/Header';
const { locale } = useI18n();
const { seoLayout } = useSeo();
const { data: layout } = await useFetcher({ slug: 'layout', watching: true });
watch(locale, val => seoLayout({ language: val }), { immediate: true });
</script>

<template>
  <div class="aprograma-blank relative pt-10 mb-10">
    <HeaderComponent :blok="$contentByName(layout.content.body, 'Header')[0]" blank />
    <slot />
  </div>
</template>
