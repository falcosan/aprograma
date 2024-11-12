<script setup>
const { locale } = useI18n()
const { seoLayout } = useSeo()
const { data: layout } = await useFetcher('layout', { watcher: true })
watch(locale, (val) => seoLayout({ language: val }), { immediate: true })

console.log(layout)
</script>

<template>
  <Body>
    <component
      :is="resolveComponent(component.component)"
      v-for="component in layout.content?.body"
      :key="component._uid"
      :blok="component"
    >
      <template #header>
        <NuxtLoadingIndicator />
      </template>
      <template #main>
        <slot />
      </template>
    </component>
  </Body>
</template>
