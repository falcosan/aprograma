<template>
  <NuxtImg
    v-if="imageType === 'svg+xml' || original"
    class="image"
    :alt="alt || $languageCase('alternative text', 'texto alternativo', 'testo alternativo')"
    :type="`image/${imageType}`"
    draggable="false"
    loading="lazy"
    :src="src"
    :width="width"
    :height="height"
  />
  <NuxtImg
    v-else
    class="image"
    :alt="alt || $languageCase('alternative text', 'texto alternativo', 'testo alternativo')"
    :type="`image/${imageType}`"
    draggable="false"
    loading="lazy"
    :src="src"
    :width="width"
    :height="height"
    :modifiers="file ? { filters: { focal: file.focus ?? 0 } } : undefined"
    :fit="file?.focus ? undefined : 'in'"
    format="webp"
    :sizes="sizes || undefined"
  />
</template>
<script>
export default defineNuxtComponent({
  props: {
    file: {
      type: Object,
      default: () => {}
    },
    sizes: {
      type: [String, Boolean],
      required: true
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    original: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    console.log(ctx);
    const imageType = computed(() => {
      switch (props.src.toLowerCase().split('.').pop()) {
        case 'jpg':
        case 'jpeg':
          return 'jpeg';
        case 'png':
          return 'png';
        case 'svg':
          return 'svg+xml';
        case 'gif':
          return 'gif';
        default:
          return 'webp';
      }
    });
    return {
      imageType
    };
  }
});
</script>
