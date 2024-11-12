<script setup>
import MainComponent from '@/storyblok/layout/Main'
import HeaderComponent from '@/storyblok/layout/Header'
const { locale } = useI18n()
const { seoLayout } = useSeo()
const { data: layout } = await useFetcher('layout', { watcher: true })
watch(locale, (val) => seoLayout({ language: val }), { immediate: true })
</script>

<template>
  <Body>
    <HeaderComponent
      :blok="$contentByName(layout.content.body, 'Header')[0]"
      layout="blank"
    >
      <NuxtLoadingIndicator />
    </HeaderComponent>
    <MainComponent
      :blok="$contentByName(layout.content.body, 'Main')[0]"
      layout="blank"
    >
      <slot />
    </MainComponent>
  </Body>
</template>
