<template>
  <img
    v-if="imageType === 'svg+xml' || original"
    :loading="lazy ? 'lazy' : undefined"
    class="image"
    :alt="alt || $languageCase('quantum vacuum', 'vacío cuántico', 'vuoto quantistico')"
    :type="`image/${imageType}`"
    draggable="false"
    :src="src"
    :width="width"
    :height="height"
  />
  <NuxtImg
    v-else
    :loading="lazy ? 'lazy' : undefined"
    class="image"
    :alt="alt || $languageCase('quantum vacuum', 'vacío cuántico', 'vuoto quantistico')"
    :type="`image/${imageType}`"
    draggable="false"
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
    lazy: {
      type: Boolean,
      default: false
    },
    original: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
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
