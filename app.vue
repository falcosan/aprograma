<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
import LogoComponent from '@/storyblok/global/Logo';
const { seoLayout } = useSeo();
const config = useRuntimeConfig();
const layout = ref({ content: {} });
const storyblokApi = useStoryblokApi();
const { languageGet } = storeToRefs(store.language());
const checkComponent = ({ component: data }, name) => data.toLowerCase() === name;
watch(
  languageGet,
  async language => {
    const { data } = await storyblokApi.get('cdn/stories/layout', {
      language,
      cv: 'CURRENT_TIMESTAMP',
      version: config.public.version
    });
    layout.value = data.story;
    seoLayout({ language });
  },
  { immediate: true }
);
</script>

<template>
  <section v-if="layout.content.body && !layout.content.maintenance" class="aprograma-theme">
    <component
      :is="resolveComponent(component.component)"
      v-for="component in layout.content.body"
      :key="component._uid"
      :blok="component"
    >
      <NuxtLoadingIndicator v-if="checkComponent(component, 'header')" />
      <NuxtPage v-else-if="checkComponent(component, 'main')" />
    </component>
  </section>
  <section
    v-else-if="layout.content.body"
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
