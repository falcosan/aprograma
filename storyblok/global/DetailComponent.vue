<template>
  <div class="detail">
    <component
      :is="sliderMode || carouselMode || containerMode ? 'h2' : 'h1'"
      v-if="blok.title"
      :class="`detail-title text-lg ${
        sliderMode || carouselMode || containerMode
          ? blok.remove_space
            ? 'm-5'
            : 'mt-5 ml-10 mr-5'
          : 'sm:text-xl'
      }`"
      v-text="blok.title"
    />
    <div class="detail-content grid gap-5 md:grid-flow-col auto-cols-fr rounded">
      <ul
        :class="`image-container grid gap-5 w-full justify-items-center auto-rows-max ${
          $store.state.data.windowWidth >= 768
            ? blok.invert_direction
              ? 'col-start-2 col-end-2'
              : ''
            : ''
        }`"
        :style="`grid-template-columns: repeat(${
          blok.column_container ? $rangeItems(Number(blok.column_container), 3) : blok.media.length
        }, 1fr)`"
      >
        <li v-for="media in blok.media" :key="media.id" class="image-item w-full">
          <Modal v-if="blok.modal_mode" class="detail-modal" close-mode>
            <template #activator="action">
              <ImageSet
                v-if="$imageValidation(media.filename)"
                :file="media"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(
                    /\.[^/.]+$/,
                    ''
                  )}-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
                lazy
                :src="media.filename"
                :alt="media.alt"
                width="711"
                height="711"
                sizes="xs:299px sm:380px md:514px lg:711px"
                @click="action.open()"
              />
              <video
                v-else
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(
                    /\.[^/.]+$/,
                    ''
                  )}-video my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
                width="auto"
                height="auto"
                autoplay
                muted
                playsinline
                :loop="blok.loop"
                @click="action.open()"
              >
                <source
                  :src="media.filename"
                  :type="`video/${media.filename.toLowerCase().split('.').pop()}`"
                />
              </video>
            </template>
            <template #body>
              <ImageSet
                v-if="$imageValidation(media.filename)"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(
                    /\.[^/.]+$/,
                    ''
                  )}-image my-0 mx-auto object-contain object-center select-none`"
                width="1920"
                height="auto"
                original
                sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
                :src="media.filename"
                :alt="media.alt"
                :file="media"
              />
              <video
                v-else
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(
                    /\.[^/.]+$/,
                    ''
                  )}-video my-0 mx-auto object-contain object-center select-none`"
                width="auto"
                height="auto"
                :src="media.filename"
                :alt="media.alt"
                playsinline
                autoplay
                muted
                loop
              >
                <source
                  :src="media.filename"
                  :type="`video/${media.filename.toLowerCase().split('.').pop()}`"
                />
              </video>
            </template>
          </Modal>
          <template v-else>
            <ImageSet
              v-if="$imageValidation(media.filename)"
              :file="media"
              :class="`${media.filename
                .split(/[\\/]/)
                .pop()
                .replace(
                  /\.[^/.]+$/,
                  ''
                )}-image my-0 mx-auto object-contain object-center rounded pointer-events-none cursor-pointer select-none`"
              lazy
              :src="media.filename"
              :alt="media.alt"
              width="711"
              height="711"
              sizes="xs:299px sm:380px md:514px lg:711px"
            />
            <video
              v-else
              :class="`${
                blok && media.filename
                  ? media.filename
                  : src
                      .split(/[\\/]/)
                      .pop()
                      .replace(/\.[^/.]+$/, '')
              }-video my-0 mx-auto object-contain object-center rounded pointer-events-none cursor-pointer select-none`"
              width="auto"
              height="auto"
              playsinline
              autoplay
              muted
              :loop="blok.loop"
            >
              <source
                :src="media.filename"
                :type="`video/${media.filename.toLowerCase().split('.').pop()}`"
              />
            </video>
          </template>
        </li>
      </ul>
      <div
        :class="`text-container w-full max-w-full flex flex-col self-start rounded ${
          !blok.remove_space ? 'p-5' : ''
        }`"
        :style="`background-color: ${blok.background_color.color}; color: ${blok.text_color.color};`"
      >
        <div
          :class="`detail-text markdown block max-w-none rounded ${setAlignText}`"
          v-html="markdownToHtml(blok.text)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Modal from './ModalComponent';
import markdown from '~/mixins/markdown';
export default {
  components: { Modal },
  mixins: [markdown],
  props: {
    blok: {
      type: Object,
      required: true
    },
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
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
    }
  },
  methods: {
    imageType(media) {
      switch (media.filename.toLowerCase().split('.').pop()) {
        case 'jpg':
          return 'jpeg';
        case 'png':
          return 'png';
        case 'svg':
          return 'svg+xml';
        case 'gif':
          return 'gif';
      }
    }
  }
};
</script>
