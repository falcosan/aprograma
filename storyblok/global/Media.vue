<template>
  <div
    :class="`media relative h-full flex flex-col justify-center overflow-hidden rounded ${
      !blok.remove_space ? (blok.title ? 'px-5 pt-5' : 'p-5') : ''
    }`"
  >
    <Modal
      v-if="blok.modal_mode"
      :class="[
        {
          'h-full': blok.height === 'full'
        }
      ]"
      close-mode
    >
      <template #activator="action">
        <ImageSet
          v-if="(blok && $imageValidation(blok.media.filename)) || image"
          :class="[
            `${getClass}-image`,
            {
              'w-full': blok.width === 'full'
            },
            blok.height === 'full'
              ? 'h-full object-cover'
              : /[a-zA-Z]/.test(blok.height)
              ? 'object-cover'
              : 'object-contain',
            'my-0 mx-auto object-center rounded cursor-pointer select-none'
          ]"
          lazy
          :file="blok.media"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          :width="blok ? (/[a-zA-Z]/.test(blok.width) ? 'auto' : blok.width) : width"
          :height="blok ? (/[a-zA-Z]/.test(blok.height) ? 'auto' : blok.height) : height"
          :sizes="checkSizes"
          @click="action.open()"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="[
            `${getClass}-video`,
            {
              'w-full': blok.width === 'full'
            },
            blok.height === 'full'
              ? 'h-full object-cover'
              : /[a-zA-Z]/.test(blok.height)
              ? 'object-cover'
              : 'object-contain',
            'my-0 mx-auto object-center rounded cursor-pointer select-none'
          ]"
          :width="blok ? (/[a-zA-Z]/.test(blok.width) ? 'auto' : blok.width) : width"
          :height="blok ? (/[a-zA-Z]/.test(blok.height) ? 'auto' : blok.height) : height"
          playsinline
          autoplay
          muted
          :loop="blok.loop"
          @click="action.open()"
        >
          <source
            :src="blok && blok.media.filename ? blok.media.filename : src"
            :type="`video/${
              blok && blok.media.filename
                ? blok.media.filename.toLowerCase().split('.').pop()
                : src.toLowerCase().split('.').pop()
            }`"
          />
        </video>
      </template>
      <template #body>
        <ImageSet
          v-if="(blok && $imageValidation(blok.media.filename)) || image"
          :class="`${getClass}-image my-0 mx-auto object-contain object-center select-none`"
          original
          :file="blok.media"
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
          width="1920"
          height="1980"
          sizes="xs:380px sm:514px md:711px lg:804px xl:1680px 2xl:1920px"
        />
        <video
          v-else-if="(blok && blok.media.filename) || video"
          :class="`${getClass}-video my-0 mx-auto object-contain object-center select-none`"
          width="1920"
          height="auto"
          playsinline
          autoplay
          muted
          loop
        >
          <source
            :src="blok && blok.media.filename ? blok.media.filename : src"
            :type="`video/${
              blok && blok.media.filename
                ? blok.media.filename.toLowerCase().split('.').pop()
                : src.toLowerCase().split('.').pop()
            }`"
          />
        </video>
      </template>
    </Modal>
    <template v-else>
      <ImageSet
        v-if="(blok && $imageValidation(blok.media.filename)) || image"
        :class="[
          `${getClass}-image`,
          {
            'w-full': blok.width === 'full'
          },
          blok.height === 'full'
            ? 'h-full object-cover'
            : /[a-zA-Z]/.test(blok.height)
            ? 'object-cover'
            : 'object-contain',
          'my-0 mx-auto object-center rounded pointer-events-none select-none'
        ]"
        lazy
        :file="blok.media"
        :src="blok && blok.media.filename ? blok.media.filename : src"
        :alt="blok && blok.media.filename ? blok.media.alt : alt ? alt : ''"
        :width="blok ? (/[a-zA-Z]/.test(blok.width) ? 'auto' : blok.width) : width"
        :height="blok ? (/[a-zA-Z]/.test(blok.height) ? 'auto' : blok.height) : height"
        :sizes="checkSizes"
      />
      <video
        v-else-if="(blok && blok.media.filename) || video"
        :class="[
          `${getClass}-image`,
          {
            'w-full': blok.width === 'full'
          },
          blok.height === 'full'
            ? 'h-full object-cover'
            : /[a-zA-Z]/.test(blok.height)
            ? 'object-cover'
            : 'object-contain',
          'my-0 mx-auto object-center rounded pointer-events-none select-none'
        ]"
        :width="blok ? (/[a-zA-Z]/.test(blok.width) ? 'auto' : blok.width) : width"
        :height="blok ? (/[a-zA-Z]/.test(blok.height) ? 'auto' : blok.height) : height"
        playsinline
        autoplay
        muted
        :loop="blok.loop"
      >
        <source
          :src="blok && blok.media.filename ? blok.media.filename : src"
          :type="`video/${
            blok && blok.media.filename
              ? blok.media.filename.toLowerCase().split('.').pop()
              : src.toLowerCase().split('.').pop()
          }`"
        />
      </video>
    </template>
    <p
      v-if="(blok && blok.title) || title"
      class="media-title p-5 text-center"
      :style="`color: ${blok && blok.title_color.color ? blok.title_color.color : false};`"
      v-text="blok && blok.title ? blok.title : title"
    />
  </div>
</template>

<script>
import Modal from './Modal';
export default {
  components: { Modal },
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    carouselMode: {
      type: Boolean,
      default: false
    },
    containerWidth: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    image: {
      type: Boolean,
      default: false
    },
    video: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkSizes() {
      if (/100%|full|auto/.test(this.blok.width)) {
        if (/100%|full|auto/.test(this.blok.height)) {
          return 'xs:125vw';
        } else {
          return `xs:${Math.round(this.blok.height.replace(/\D/g, '') / 1.19)}vw`;
        }
      } else {
        return `xs:${Math.round(this.blok.width.replace(/\D/g, '') / 1.15)}px sm:${Math.round(
          this.blok.width.replace(/\D/g, '') / 1.12
        )}px md:${Math.round(this.blok.width.replace(/\D/g, '') / 1.09)}px lg:${Math.round(
          this.blok.width.replace(/\D/g, '') / 1.06
        )}px xl:${Math.round(this.blok.width.replace(/\D/g, '') / 1.03)}px`;
      }
    },
    getClass() {
      return this.blok
        ? this.blok.media.filename
            ?.split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '')
        : this.src
            ?.split(/[\\/]/)
            .pop()
            .replace(/\.[^/.]+$/, '');
    }
  }
};
</script>
