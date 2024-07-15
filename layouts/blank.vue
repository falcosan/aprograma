<script setup>
import MainComponent from '@/storyblok/layout/Main';
import HeaderComponent from '@/storyblok/layout/Header';
const { locale } = useI18n();
const { seoLayout } = useSeo();
const { data: layout } = await useFetcher({ slug: 'layout', watching: true });
watch(locale, val => seoLayout({ language: val }), { immediate: true });
</script>

<template>
  <div class="aprograma-theme">
    <HeaderComponent
      :blok="$contentByName(layout.content.body, 'Header')[0]"
      layout="blank"
    />
    <MainComponent
      :blok="$contentByName(layout.content.body, 'Main')[0]"
      layout="blank"
    >
      <template #main>
        <slot />
      </template>
    </MainComponent>
  </div>
</template>
