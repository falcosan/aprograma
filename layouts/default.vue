<script setup>
import MainComponent from '@/storyblok/layout/Main'
import HeaderComponent from '@/storyblok/layout/Header'
import FooterComponent from '@/storyblok/layout/Footer'
const { locale } = useI18n()
const { seoLayout } = useSeo()
const layout = useState('layout')
const config = useRuntimeConfig()

const data = await useAsyncStoryblok('layout', {
  language: locale.value,
  version: config.public.envApiVersion
})
layout.value = data.value

seoLayout({ language: locale.value })
</script>

<template>
  <Body>
    <HeaderComponent :blok="$contentByName(layout.content.body, 'Header')[0]">
      <NuxtLoadingIndicator />
    </HeaderComponent>
    <MainComponent :blok="$contentByName(layout.content.body, 'Main')[0]">
      <slot />
    </MainComponent>
    <FooterComponent :blok="$contentByName(layout.content.body, 'Footer')[0]" />
  </Body>
</template>
