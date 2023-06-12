<template>
  <section v-if="story.content.body && !story.content.maintenance" class="aprograma-theme">
    <component
      :is="`${layout.component}Component`"
      v-for="layout in story.content.body"
      :key="layout._uid"
      :blok="layout"
    >
      <slot />
    </component>
  </section>
  <section
    v-else-if="story.content.body"
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

<script>
import { storeToRefs } from 'pinia';
import store from '@/store';
import LogoComponent from '@/storyblok/global/Logo';
import MainComponent from '@/storyblok/layout/Main';
import HeaderComponent from '@/storyblok/layout/Header';
import FooterComponent from '@/storyblok/layout/Footer';
export default {
  components: { LogoComponent, HeaderComponent, MainComponent, FooterComponent },
  setup() {
    const story = ref({ content: {} });
    const storyblokApi = useStoryblokApi();
    const { languageGet } = storeToRefs(store.language());
    watch(
      () => languageGet.value,
      async () => {
        const { data } = await storyblokApi.get('cdn/stories/layout', {
          language: languageGet.value
        });
        story.value = data.story;
      },
      { immediate: true }
    );
    return { story };
  }
};
</script>
