<template>
  <div class="project grid gap-5 auto-cols-fr p-5">
    <h1
      class="project-title col-start-1 col-end-4 xl:col-end-3 m-0 text-2xl sm:text-3xl break-words"
    >
      {{ blok.title }}
    </h1>
    <div
      v-if="$store.state.data.windowWidth >= 1280"
      class="project-action min-w-0 flex items-center justify-end"
    >
      <Link
        v-if="blok.url_project"
        icon-item
        external-link
        :to="blok.url_project"
        :title="`${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}`"
      >
        <template #icon>
          <Icon
            link
            :class="`project-external mr-2.5 rounded ${
              !$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
            }`"
            :style="`background-color: ${$binaryControl(
              blok.background_color,
              'color',
              '#e0e0e0'
            )}; color: ${$binaryControl(blok.text_color, 'color')};`"
            size="w-10 h-10 p-3"
          />
        </template>
      </Link>
      <span
        v-else
        class="project-private mr-5 text-xs"
        v-text="
          !blok.url_project
            ? $languageCase('private project', 'proyecto privado', 'progetto privato')
            : ''
        "
      />
      <Link
        v-if="blok.url_repository"
        icon-item
        external-link
        :to="blok.url_repository"
        title="repository"
      >
        <template #icon>
          <Icon
            git
            :class="`project-repository mr-2.5 rounded ${
              !$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
            }`"
            :style="`background-color: ${$binaryControl(
              blok.background_color,
              'color',
              '#e0e0e0'
            )}; color: ${$binaryControl(blok.text_color, 'color')};`"
            size="w-10 h-10 p-3"
          />
        </template>
      </Link>
      <Icon
        arrow
        tag="button"
        :style="`background-color: ${$binaryControl(
          blok.background_color,
          'color',
          '#e0e0e0'
        )}; color: ${$binaryControl(blok.text_color, 'color')};`"
        :class="`project-back rounded ${
          !$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
        }`"
        size="w-10 h-10 p-3"
        @click="$goBack"
      />
    </div>
    <div class="project-intro grid gap-5 auto-cols-fr col-start-1 col-end-4">
      <Modal
        v-if="blok.image.filename"
        class="modal-project w-full row-start-1 row-end-1 xl:col-start-1 xl:col-end-3"
        close-mode
      >
        <template #activator="action">
          <div class="image-container w-full my-0 mx-auto cursor-pointer" @click="action.open()">
            <Image
              class="intro-image h-full w-full aspect-[11/10] md:aspect-[11/9] border-t-2 border-b-2 object-cover rounded select-none"
              :src="blok.image.filename"
              :file="blok.image"
              :alt="blok.image.alt"
              width="984"
              height="805"
              :style="`border-color: ${$binaryControl(blok.background_color, 'color', 'e0e0e0')}`"
              sizes="xs:299px sm:380px md:514px lg:711px xl:804px 2xl:984px"
            />
          </div>
        </template>
        <template #body>
          <Image
            class="image-project select-none"
            width="1920"
            height="auto"
            sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
            :src="blok.image.filename"
            :alt="blok.image.alt"
            :file="blok.image"
            original
          />
        </template>
      </Modal>
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
        <p class="date-to text-center">
          {{ $languageCase('to', 'hasta', 'al') }}
        </p>
        <span class="date-end text-left">
          {{
            blok.end_date
              ? changeDate(blok.end_date)
              : $languageCase('present', 'presente', 'presente')
          }}
        </span>
      </div>
      <div
        v-if="$store.state.data.windowWidth < 1280"
        class="project-action min-w-0 flex items-center justify-end row-start-2 row-end-3 xl:col-start-2 xl:col-end-3"
      >
        <Link
          v-if="blok.url_project"
          icon-item
          external-link
          :to="blok.url_project"
          :title="`${$languageCase('link to', 'enlace por', 'link per')} ${blok.title}`"
        >
          <template #icon>
            <Icon
              link
              :class="`project-external mr-2.5 rounded ${
                !$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
              }`"
              :style="`background-color: ${$binaryControl(
                blok.background_color,
                'color',
                'e0e0e0'
              )}; color: ${$binaryControl(blok.text_color, 'color')};`"
              size="w-10 h-10 p-3"
            />
          </template>
        </Link>
        <span
          v-else
          class="project-private mr-5 text-xs"
          v-text="
            !blok.url_project
              ? $languageCase('private project', 'proyecto privado', 'progetto privato')
              : ''
          "
        />
        <Link
          v-if="blok.url_repository"
          icon-item
          external-link
          :to="blok.url_repository"
          title="repository"
        >
          <template #icon>
            <Icon
              git
              :class="`project-repository mr-2.5 rounded ${
                !$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
              }`"
              :style="`background-color: ${$binaryControl(
                blok.background_color,
                'color',
                'e0e0e0'
              )}; color: ${$binaryControl(blok.text_color, 'color')};`"
              size="w-10 h-10 p-3"
            />
          </template>
        </Link>
        <Icon
          arrow
          tag="button"
          :style="`background-color: ${$binaryControl(
            blok.background_color,
            'color',
            'e0e0e0'
          )}; color: ${$binaryControl(blok.text_color, 'color')};`"
          :class="`project-back rounded ${
            !$device.isDesktop ? '' : 'hover:shadow transition-shadow duration-100'
          }`"
          size="w-10 h-10 p-3"
          @click="$goBack"
        />
      </div>
    </div>
    <div v-if="checkDetail" class="project-details grid gap-5 col-start-1 col-end-4 mt-10">
      <h1 class="detail-project text-xl sm:text-2xl">
        {{ $languageCase('Project details', 'Detalles del proyecto', 'Dettagli del progetto') }}
      </h1>
      <component
        :is="description.component"
        v-for="description in blok.body"
        :key="description._uid"
        :blok="description"
      />
    </div>
  </div>
</template>
<script>
import Modal from '../global/ModalComponent';
import markdown from '~/mixins/markdown';
export default {
  components: { Modal },
  mixins: [markdown],
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    setAlignText() {
      switch (this.blok.align_text) {
        case 'right':
          return 'text-right';
        case 'center':
          return 'text-center';
        case 'justify':
          return 'text-justify';
      }
      return '';
    },
    checkDetail() {
      return this.blok.body?.length > 0;
    }
  },
  methods: {
    changeDate(date) {
      const currentDateTime = new Date(date.replace(' ', 'T'));
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`;
      return formattedDate.toString();
    }
  }
};
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
