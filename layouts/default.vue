<template>
  <section v-if="story.content.body && !story.content.maintenance" class="aprograma-theme">
    <component
      :is="layout.component"
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
    <Logo transition class="rounded max-w-full mx-auto my-0" size="50vh" />
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
import Logo from '@/storyblok/global/LogoComponent';
import Main from '@/storyblok/layout/MainComponent';
import Header from '@/storyblok/layout/HeaderComponent';
import Footer from '@/storyblok/layout/FooterComponent';
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Logo, Header, Main, Footer },
  setup() {
    const story = ref({ content: {} });
    const storyblokApi = useStoryblokApi();
    const { languageGet } = storeToRefs(store.language());
    (async () => {
      const { data } = await storyblokApi.get('cdn/stories/layout', {
        language: languageGet.value
      });
      story.value = data.story;
    })();
    return { story };
  }
};
</script>
