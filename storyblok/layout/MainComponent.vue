<template>
  <main class="main min-h-screen overflow-x-hidden">
    <div
      :class="`main-wrapper relative overflow-hidden ${
        !$device.isDesktop ? 'pt-10' : 'pt-10 md:py-20'
      }`"
    >
      <div
        v-if="blok.show_background_mask"
        :class="`main-background absolute max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl inset-0 mt-20 mx-auto -z-10 overflow-hidden rounded-b ${
          !$device.isDesktop ? '' : 'md:rounded-t'
        } ${blok.color_animation ? 'color-animation' : ''}`"
        :style="`background-color: ${
          randomBackgroundColorMask
            ? blok.transparency
              ? `${randomBackgroundColorMask}b3`
              : randomBackgroundColorMask
            : blok.transparency
            ? '#ffffffb3'
            : '#ffffff'
        };`"
      />
      <div
        :class="`main-flat fixed w-full h-full inset-0 -z-20 ${
          blok.color_animation ? 'color-animation' : ''
        }`"
        :style="`background-color: ${randomBackgroundColor};`"
      />
      <slot
        :class="`max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl my-0 mx-auto rounded-b ${
          !$device.isDesktop ? '' : 'md:rounded-t'
        }`"
      />
    </div>
    <transition appear appear-active-class="duration-100" appear-class="opacity-0">
      <ImageSet
        v-if="$imageValidation(blok.background_media.filename)"
        :class="`media-image w-full h-full fixed inset-0 object-cover pointer-events-none ${backgroundPosition} ${backgroundLevel} ${
          blok.color_animation ? 'color-animation' : ''
        }`"
        :src="blok.background_media.filename"
        :file="blok.background_media"
        :alt="blok.background_media.alt"
        width="2560"
        height="1440"
        sizes="xs:514px sm:711px md:804px lg:1680px xl:1920px 2xl:2560px"
      />
      <video
        v-else-if="blok.background_media.filename"
        :class="`media-video w-full h-full fixed inset-0 object-cover pointer-events-none ${backgroundPosition} ${backgroundLevel} ${
          blok.color_animation ? 'color-animation' : ''
        }`"
        playsinline
        autoplay
        muted
        loop
      >
        <source
          :src="blok.background_media.filename"
          :type="`video/${blok.background_media.filename.toLowerCase().split('.').pop()}`"
        />
      </video>
    </transition>
  </main>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      index: {
        background: 0,
        mask: 0
      }
    };
  },
  computed: {
    randomBackgroundColor() {
      return this.blok.background_color.color.split('; ')[this.index.background];
    },
    randomBackgroundColorMask() {
      return this.blok.background_color_mask.color.split('; ')[this.index.mask];
    },
    backgroundLevel() {
      if (this.blok.background_index) {
        return 'z-0';
      } else {
        return '-z-20';
      }
    },
    backgroundPosition() {
      if (!this.$device.isDesktop || this.$store.state.data.windowWidth < 768) {
        return 'object-center';
      } else if (this.blok.background_position === 'up') {
        return 'object-bottom';
      } else if (this.blok.background_position === 'down') {
        return 'object-center';
      } else {
        return 'object-top';
      }
    }
  },
  watch: {
    $route() {
      if (this.blok.background_color.color || this.blok.background_color_mask.color) {
        this.setBackgroundColor();
      }
    }
  },
  created() {
    if (this.blok.body_color.color) {
      document.body.style.backgroundColor = this.blok.body_color.color;
    }
    if (this.blok.background_color.color || this.blok.background_color_mask.color) {
      this.setBackgroundColor();
    }
  },
  methods: {
    setBackgroundColor() {
      this.index.background =
        ~~(Math.random() * (this.blok.background_color.color.split('; ').length - 0)) + 0;
      this.index.mask =
        ~~(Math.random() * (this.blok.background_color_mask.color.split('; ').length - 0)) + 0;
    },
    imageType() {
      if (this.$imageValidation(this.blok.background_media.filename)) {
        switch (this.blok.background_media.filename.toLowerCase().split('.').pop()) {
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
  }
};
</script>
