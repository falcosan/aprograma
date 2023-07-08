<template>
  <div
    v-if="blok.text"
    :key="blok._uid"
    :style="`background-color: ${$binaryControl(
      blok.background_color,
      'color'
    )}; color: ${$binaryControl(blok.text_color, 'color')};`"
    class="text-container w-full max-w-full h-full flex flex-col rounded"
  >
    <div
      :class="`text-content markdown block max-w-none rounded ${setAlignText} ${
        !blok.remove_space ? 'p-5' : ''
      }`"
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
    return {
      setAlignText,
      markdownToHtml
    };
  }
});
</script>
