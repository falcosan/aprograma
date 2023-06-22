<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
import LogoComponent from '@/storyblok/global/Logo';
const config = useRuntimeConfig();
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const checkComponent = ({ component: data }, name) => data.toLowerCase() === name;
const { data: layout } = useAsyncData(
  'layout',
  async () =>
    await storyblokApi.get('cdn/stories/layout', {
      language: languageGet.value,
      version: config.public.apiVersion
    }),
  {
    watch: [languageGet]
  }
);
</script>

<template>
  <section
    v-if="layout.data.story.content.body && !layout.data.story.content.maintenance"
    class="aprograma-theme"
  >
    <component
      :is="resolveComponent(component.component)"
      v-for="component in layout.data.story.content.body"
      :key="component._uid"
      :blok="component"
    >
      <NuxtLoadingIndicator v-if="checkComponent(component, 'header')" />
      <slot v-else-if="checkComponent(component, 'main')" />
    </component>
  </section>
  <section
    v-else-if="layout.data.story.content.body"
    class="aprograma-maintenance h-screen flex flex-col justify-center p-5"
  >
    <LogoComponent transition class="rounded max-w-full mx-auto my-0" size="50vh" />
    <h1
      class="maintenance-text text-xs xs:text-base sm:text-lg text-center xs:whitespace-nowrap pointer-events-none uppercase italic"
    >
      {{ $languageCase('under maintenance', 'en mantenimiento', 'in manutenzione') }}
    </h1>
  </section>
</template>
