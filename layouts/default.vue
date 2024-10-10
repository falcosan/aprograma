<script setup>
import LogoComponent from '@/storyblok/global/Logo'
const { locale } = useI18n()
const { seoLayout } = useSeo()
const { data } = await useFetcher('layout', { watcher: true })
watch(locale, (val) => seoLayout({ language: val }), { immediate: true })

const layout = computed(() =>
  data.value?.content ? data.value : { content: { maintenance: true } }
)
</script>

<template>
  <Body>
    <div
      v-if="layout.content.maintenance"
      class="maintenance h-screen flex flex-col justify-center p-5"
    >
      <LogoComponent
        transition
        class="rounded max-w-full mx-auto my-0"
        size="50vh"
      />
      <h1
        class="maintenance-text xs:whitespace-nowrap pointer-events-none uppercase italic"
      >
        {{
          $languageCase(
            'under maintenance',
            'en mantenimiento',
            'in manutenzione'
          )
        }}
      </h1>
    </div>
    <template v-else>
      <component
        :is="resolveComponent(component.component)"
        v-for="component in layout.content.body"
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
    </template>
  </Body>
</template>
