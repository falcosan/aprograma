<template>
  <div class="post p-5">
    <div class="post-head relative w-full mb-5">
      <h1 class="post-title text-2xl sm:text-3xl" v-text="blok.title" />
      <div v-if="showButtonEditor" class="flex justify-end flex-auto mb-5">
        <RouteComponent
          class="px-3 py-2 rounded hover:opacity-80"
          external-link
          :style="`background-color: ${$binaryControl(
            blok.background_color,
            'color',
            '#e0e0e0'
          )}; color: ${$binaryControl(blok.text_color, 'color')};`"
          :title="$languageCase('Edit', 'Editar', 'Modifica')"
          :to="blok.editor.href"
        />
      </div>
      <div
        :class="`post-file-container w-full h-full overflow-hidden rounded ${
          blok.file.filename ? '' : 'bg-black'
        }`"
      >
        <component
          :is="lookFile"
          :format="checkFile ? 'webp' : false"
          class="post-file w-full h-full aspect-[13/8] object-center select-none object-cover"
          :alt="
            blok.file.alt || $languageCase('quantum vacuum', 'vacío cuántico', 'vuoto quantistico')
          "
          :src="setFile"
          :file="blok.file"
          :width="checkFile ? '1366' : false"
          :height="checkFile ? '707' : false"
          :sizes="checkFile ? 'xs:380px sm:514px md:711px lg:804px xl:1366px' : false"
        />
      </div>
    </div>
    <div
      class="post-body w-full justify-center rounded"
      :style="`background-color: ${$binaryControl(blok.background_color, 'color', '#e0e0e0')};`"
    >
      <div class="post-action flex flex-wrap justify-end pt-5 px-5">
        <IconComponent
          arrow
          :style="`background-color: ${$binaryControl(
            blok.background_color,
            'color',
            '#e0e0e0'
          )}; color: ${$binaryControl(blok.text_color, 'color')};`"
          class="post-close rounded shadow cursor-pointer"
          size="p-3 w-10 h-10"
          @click="$goBack('blog')"
        />
      </div>
      <div class="post-article w-full max-w-prose p-5 mx-auto my-0">
        <h2
          :style="`color: ${$binaryControl(blok.text_color, 'color')};`"
          class="post-intro text-xl sm:text-2xl"
          v-text="blok.intro"
        />
        <div class="post-info">
          <p
            :style="`color: ${$binaryControl(blok.text_color, 'color')};`"
            class="post-author text-sm font-semibold"
          >
            {{ $languageCase('by', 'de', 'di') }}
            {{ blok.author ? blok.author : $languageCase('Anonymous', 'Anónimo', 'Anonimo') }}
          </p>
          <p
            :style="`color: ${$binaryControl(blok.text_color, 'color')};`"
            class="post-date mt-2.5 text-xs"
            v-text="changeDate(blok.date)"
          />
          <ul class="post-categories flex flex-wrap justify-end mt-5 -mb-1.5 -mx-1.5">
            <li
              v-for="(category, index) in sortedCategories"
              :key="index"
              class="post-category self-start m-1.5 p-2 text-center text-xs rounded shadow italic brightness-90"
              :style="`background-color: ${$binaryControl(
                blok.background_color,
                'color',
                '#e0e0e0'
              )}; color: ${$binaryControl(blok.text_color, 'color')};`"
            >
              {{ category }}
            </li>
          </ul>
        </div>
        <article
          :style="`color: ${$binaryControl(blok.text_color, 'color')};`"
          :class="`post-article markdown block my-5 ${setAlignText}`"
          v-html="markdownToHtml(blok.long_text)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import IconComponent from '@/storyblok/global/Icon';
import RouteComponent from '@/storyblok/global/Route';
export default defineNuxtComponent({
  components: { IconComponent, RouteComponent },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { $languageCase } = useNuxtApp();
    const { markdownToHtml } = useMarkdown();
    const config = useRuntimeConfig();
    const showButtonEditor = config.public.envApiVersion === 'draft';
    const lookFile = computed(() => {
      switch (props.blok.file.filename.toLowerCase().split('.').pop()) {
        case 'pdf':
          return 'embed';
        default:
          return resolveComponent('Image');
      }
    });
    const setFile = computed(() => {
      return props.blok.file.filename
        ? props.blok.file.filename
        : 'https://a.storyblok.com/f/106240/4065x1468/5c83c3e7de/noimeageteaser.png';
    });
    const sortedCategories = computed(() => {
      return props.blok.categories
        .map(category => category.toLowerCase().split('; ')[$languageCase(0, 1, 2)])
        .sort();
    });
    const checkFile = computed(
      () => typeof lookFile.value === 'object' || !props.postContent.file.filename
    );
    const setAlignText = computed(() => {
      switch (props.blok.align_text) {
        case 'right':
          return 'text-right';
        case 'center':
          return 'text-center';
        case 'justify':
          return 'text-justify';
        default:
          return 'text-left';
      }
    });
    const changeDate = date => {
      const currentDateTime = new Date(date.replace(' ', 'T'));
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`;
      return formattedDate.toString();
    };
    return {
      setFile,
      lookFile,
      checkFile,
      changeDate,
      setAlignText,
      markdownToHtml,
      sortedCategories,
      showButtonEditor
    };
  }
});
</script>
<style scoped>
@supports not (aspect-ratio: 1 / 1) {
  .post-file::before {
    content: '';
    @apply float-left pt-[calc((8_/_13)_*_100%)];
  }
  .post-file::after {
    content: '';
    @apply block clear-both;
  }
}
</style>
