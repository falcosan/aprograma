<template>
  <div
    v-if="blok.text"
    :key="blok._uid"
    :style="`background-color: ${$binaryControl(blok.background_color, 'color')}; color: ${blok.hidden ? 'transparent' : $binaryControl(blok.text_color, 'color')
    };`"
    :class="[
      'text-container flex flex-col rounded',
      blok.hidden
        ? `absolute w-0 h-0 top-0 -z-50 mx-auto select-none ${setPositionText}`
        : ['w-full max-w-full h-full', { 'dark:invert': !blok.background_color.color }]
    ]"
  >
    <div
      :class="[
        'text-content markdown block max-w-none rounded',
        setAlignText,
        { 'p-5': !blok.remove_space },
        { 'w-0 h-0 select-none': blok.hidden }
      ]"
      v-html="markdownToHtml(blok.text)"
    />
  </div>
</template>
<script>
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      required: true
    },
    containerWidth: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
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
    const setPositionText = computed(() => {
      switch (props.blok.align_text) {
        case 'right':
          return 'right-0';
        case 'center':
          return 'left-0 right-0';
        case 'justify':
          return 'left-0 right-0';
        default:
          return 'text-left';
      }
    });
    return {
      setAlignText,
      markdownToHtml,
      setPositionText
    };
  }
});
</script>
