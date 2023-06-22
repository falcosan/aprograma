<template>
  <main class="main min-h-screen overflow-x-hidden">
    <div
      :class="['main-wrapper relative pt-10 overflow-hidden', { 'md:pt-20 md:mb-20': isDesktop }]"
    >
      <div
        v-if="blok.show_background_mask"
        :class="`main-background absolute max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl inset-0 mt-20 mx-auto -z-10 overflow-hidden rounded-b ${
          !isDesktop ? '' : 'md:rounded-t'
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
      <div
        :class="`max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl my-0 mx-auto rounded-b ${
          !isDesktop ? '' : 'md:rounded-t'
        }`"
      >
        <slot name="main" />
      </div>
    </div>
    <transition enter-active-class="duration-100" enter-class="opacity-0">
      <ImageComponent
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
import ImageComponent from '@/storyblok/global/Image';
export default defineNuxtComponent({
  components: { ImageComponent },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { isDesktop } = useDevice();
    const { windowWidth } = useScreen();
    const route = useRoute();
    const state = reactive({ index: { background: 0, mask: 0 } });
    const { index } = toRefs(state);
    const randomBackgroundColor = computed(
      () => props.blok.background_color.color.split('; ')[index.value.background]
    );
    const randomBackgroundColorMask = computed(
      () => props.blok.background_color_mask.color.split('; ')[index.value.mask]
    );
    const backgroundLevel = computed(() => {
      if (props.blok.background_index) return 'z-0';
      else return '-z-20';
    });
    const backgroundPosition = computed(() => {
      if (!isDesktop || windowWidth.value < 768) {
        return 'object-center';
      } else if (props.blok.background_position === 'up') {
        return 'object-bottom';
      } else if (props.blok.background_position === 'down') {
        return 'object-center';
      } else {
        return 'object-top';
      }
    });
    const setBackgroundColor = () => {
      index.value.background =
        ~~(Math.random() * (props.blok.background_color.color.split('; ').length - 0)) + 0;
      index.value.mask =
        ~~(Math.random() * (props.blok.background_color_mask.color.split('; ').length - 0)) + 0;
    };
    onBeforeMount(() => {
      if (props.blok.body_color.color) {
        document.body.style.backgroundColor = props.blok.body_color.color;
      }
    });
    watch(
      () => route.path,
      () => {
        if (props.blok.background_color.color || props.blok.background_color_mask.color) {
          setBackgroundColor();
        }
      },
      { immediate: true }
    );
    return {
      isDesktop,
      backgroundLevel,
      backgroundPosition,
      randomBackgroundColor,
      randomBackgroundColorMask
    };
  }
});
</script>
