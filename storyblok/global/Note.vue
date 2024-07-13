<template>
  <div class="note p-5">
    <div class="note-editor flex justify-end flex-auto mb-5">
      <RouteComponent class="note-editor-button px-3 py-2 rounded hover:opacity-80" external-link :to="setEditorPath"
        :style="`background-color: ${$binaryControl(
          blok.background_color,
          'color',
          '#e0e0e0'
        )}; color: ${$binaryControl(blok.text_color, 'color')};`"
        :title="$languageCase('Edit', 'Editar', 'Modifica')" />
    </div>
    <div class="note-body w-full rounded"
      :style="`background-color: ${$binaryControl(blok.background_color, 'color', '#e0e0e0')};`">
      <article :style="`color: ${$binaryControl(blok.text_color, 'color')};`" class="note-article markdown block p-5"
        v-html="markdownToHtml(blok.long_text)" />
    </div>
  </div>
</template>

<script>
import RouteComponent from '@/storyblok/global/Route';
export default {
  components: {
    RouteComponent
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { markdownToHtml } = useMarkdown();
    const setEditorPath = computed(() => `${enums.editor.host}?id=${props.blok.id}`);
    return { markdownToHtml, setEditorPath };
  }
};
</script>
