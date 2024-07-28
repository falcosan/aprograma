<template>
  <div class="detail">
    <span
      v-if="blok.title"
      :class="`detail-title block break-words text-lg ${
        sliderMode || carouselMode || containerMode
          ? blok.remove_space
            ? 'm-5'
            : 'my-5 ml-10 mr-5'
          : 'sm:text-xl mb-5'
      }`"
    >
      {{ blok.title }}
    </span>
    <div
      class="detail-content grid gap-5 md:grid-flow-col auto-cols-fr rounded"
    >
      <ul
        :class="[
          'image-container grid gap-5 w-full justify-items-center auto-rows-max',
          { 'md:col-start-2 md:col-end-2': blok.invert_direction }
        ]"
        :style="`grid-template-columns: repeat(${
          blok.column_container
            ? $rangeItems(Number(blok.column_container), 3)
            : blok.media.length
        }, 1fr)`"
      >
        <li
          v-for="media in blok.media"
          :key="media.id"
          class="image-item w-full"
        >
          <ModalComponent
            v-if="blok.modal_mode"
            class="detail-modal"
            close-mode
          >
            <template #activator="action">
              <ImageComponent
                v-if="$imageValidation(media.filename)"
                :file="media"
                :class="`${media.filename
                  .split(/[\\/]/)
                  .pop()
                  .replace(
                    /\.[^/.]+$/,
                    ''
                  )}-image my-0 mx-auto object-contain object-center rounded cursor-pointer select-none`"
                :src="media.filename"
                :alt="media.alt"
                width="711"
                height="711"
                sizes="xs:380px sm:514px md:711px lg:804px"
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
              <ImageComponent
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
                sizes="xs:380px sm:514px md:711px lg:804px xl:1240px 2xl:1680px"
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
          </ModalComponent>
          <template v-else>
            <ImageComponent
              v-if="$imageValidation(media.filename)"
              :file="media"
              :class="`${media.filename
                .split(/[\\/]/)
                .pop()
                .replace(
                  /\.[^/.]+$/,
                  ''
                )}-image my-0 mx-auto object-contain object-center rounded pointer-events-none cursor-pointer select-none`"
              :src="media.filename"
              :alt="media.alt"
              width="711"
              height="711"
              sizes="xs:380px sm:514px md:711px lg:804px"
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
        :style="`background-color: ${$binaryControl(
          blok.background_color,
          'color'
        )}; color: ${$binaryControl(blok.text_color, 'color')};`"
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
import ModalComponent from '@/storyblok/global/Modal'
import ImageComponent from '@/storyblok/global/Image'
export default defineNuxtComponent({
  components: { ModalComponent, ImageComponent },
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
  setup(props) {
    const { markdownToHtml } = useMarkdown()
    const setAlignText = computed(() => {
      switch (props.blok.align_text) {
        case 'right':
          return 'text-right'
        case 'center':
          return 'text-center'
        case 'justify':
          return 'text-justify'
        default:
          return 'text-left'
      }
    })
    const imageType = (media) => {
      switch (media.filename.toLowerCase().split('.').pop()) {
        case 'jpg':
        case 'jpeg':
          return 'jpeg'
        case 'png':
          return 'png'
        case 'svg':
          return 'svg+xml'
        case 'gif':
          return 'gif'
        default:
          return 'webp'
      }
    }
    return {
      imageType,
      setAlignText,
      markdownToHtml
    }
  }
})
</script>
