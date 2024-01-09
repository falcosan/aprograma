<template>
  <div
    class="note-body w-full p-5 rounded"
    :style="`background-color:${$binaryControl(blok.background_color, 'color', '#e0e0e0')};`"
  >
    <article
      :style="`color: ${$binaryControl(blok.text_color, 'color')};`"
      class="note-article markdown block mb-5"
      v-html="markdownToHtml(blok.long_text)"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { markdownToHtml } = useMarkdown();
    return { markdownToHtml };
  }
};
</script>
