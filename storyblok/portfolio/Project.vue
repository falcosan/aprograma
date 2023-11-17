<template>
  <div class="project grid gap-5 auto-cols-fr p-5">
    <h1 class="project-title col-start-1 col-end-4 xl:col-end-3 m-0 break-words">
      {{ blok.title }}
    </h1>
    <div class="project-action min-w-0 flex items-end justify-end col-start-3 col-end-4">
      <RouteComponent
        v-if="blok.url_project"
        icon-item
        external-link
        :to="blok.url_project"
        :title="`${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}`"
      >
        <template #icon>
          <IconComponent
            link
            :class="`project-external mr-2.5 rounded ${
              !isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
            }`"
            :style="`background-color: ${$binaryControl(
              blok.background_color,
              'color',
              '#e0e0e0'
            )}; color: ${$binaryControl(blok.text_color, 'color')};`"
            size="w-10 h-10 p-3"
          />
        </template>
      </RouteComponent>
      <RouteComponent
        v-if="blok.url_repository"
        icon-item
        external-link
        :to="blok.url_repository"
        title="repository"
      >
        <template #icon>
          <IconComponent
            git
            :class="`project-repository mr-2.5 rounded ${
              !isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
            }`"
            :style="`background-color: ${$binaryControl(
              blok.background_color,
              'color',
              '#e0e0e0'
            )}; color: ${$binaryControl(blok.text_color, 'color')};`"
            size="w-10 h-10 p-3"
          />
        </template>
      </RouteComponent>
      <IconComponent
        arrow
        :style="`background-color: ${$binaryControl(
          blok.background_color,
          'color',
          '#e0e0e0'
        )}; color: ${$binaryControl(blok.text_color, 'color')};`"
        :class="`project-back rounded cursor-pointer ${
          !isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
        }`"
        size="w-10 h-10 p-3"
        @click="$goBack('portfolio')"
      />
    </div>
    <div class="project-intro grid gap-5 auto-cols-fr col-start-1 col-end-4">
      <ModalComponent
        v-if="blok.image.filename"
        class="modal-project w-full row-start-1 row-end-1 xl:col-start-1 xl:col-end-3"
        close-mode
      >
        <template #activator="action">
          <div class="image-container w-full my-0 mx-auto cursor-pointer" @click="action.open()">
            <ImageComponent
              class="intro-image h-full w-full aspect-[11/10] md:aspect-[11/9] border-t-2 border-b-2 object-cover rounded select-none"
              :src="blok.image.filename"
              :file="blok.image"
              :alt="blok.image?.alt"
              width="984"
              height="805"
              :style="`border-color: ${$binaryControl(blok.background_color, 'color', 'e0e0e0')}`"
              sizes="xs:380px sm:514px md:711px lg:804px xl:1240px"
            />
          </div>
        </template>
        <template #body>
          <ImageComponent
            class="image-project select-none"
            width="1920"
            height="auto"
            sizes="xs:380px sm:514px md:711px lg:804px xl:1240px 2xl:1680px"
            :src="blok.image.filename"
            :alt="blok.image?.alt"
            :file="blok.image"
            original
          />
        </template>
      </ModalComponent>
      <div
        :style="`background-color: ${$binaryControl(
          blok.background_color,
          'color',
          '#e0e0e0'
        )}; color: ${$binaryControl(blok.text_color, 'color')};`"
        :class="`intro-text markdown block self-start xl:row-start-1 xl:row-end-1 xl:col-start-3 xl:col-end-3 rounded ${setAlignText} ${
          !blok.remove_space ? 'p-5' : ''
        }`"
        v-html="markdownToHtml(blok.intro)"
      />
      <div
        class="project-date flex flex-col ss:flex-row flex-wrap justify-evenly items-center xl:col-start-1 xl:col-end-3 p-2.5 rounded text-xs"
        :style="`background-color: ${$binaryControl(
          blok.background_color,
          'color',
          '#e0e0e0'
        )}; color: ${$binaryControl(blok.text_color, 'color')};`"
      >
        <span class="date-start text-right">
          {{ changeDate(blok.start_date) }}
        </span>
        <span class="date-to text-center font-medium" v-text="'-'" />
        <span class="date-end text-left">
          {{
            blok.end_date
              ? changeDate(blok.end_date)
              : $languageCase('present', 'presente', 'presente')
          }}
        </span>
      </div>
    </div>
    <div v-if="blok.body?.length" class="project-details grid gap-5 col-start-1 col-end-4 mt-10">
      <h2 class="detail-project block mb-5 text-xl sm:text-2xl">
        {{ $languageCase('Project details', 'Detalles del proyecto', 'Dettagli del progetto') }}
      </h2>
      <StoryblokComponent
        :is="description.component"
        v-for="description in blok.body"
        :key="description._uid"
        :blok="description"
      />
    </div>
  </div>
</template>
<script>
import IconComponent from '@/storyblok/global/Icon';
import RouteComponent from '@/storyblok/global/Route';
import ImageComponent from '@/storyblok/global/Image';
import ModalComponent from '@/storyblok/global/Modal';
export default defineNuxtComponent({
  components: { ModalComponent, ImageComponent, RouteComponent, IconComponent },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { isDesktop } = useDevice();
    const { markdownToHtml } = useMarkdown();
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
    return { isDesktop, setAlignText, markdownToHtml, changeDate };
  }
});
</script>
<style scoped>
@supports not (aspect-ratio: 1 / 1) {
  .image-container {
    @apply h-full;
  }
  .intro-image::before {
    content: '';
    @apply float-left pt-[calc((10_/_11)_*_100%)] md:pt-[calc((9_/_11)_*_100%)];
  }
  .intro-image::after {
    content: '';
    @apply block clear-both;
  }
}
</style>
