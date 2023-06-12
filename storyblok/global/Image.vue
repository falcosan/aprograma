<template>
  <img
    v-if="imageType === 'svg+xml' || original"
    :loading="lazy ? 'lazy' : undefined"
    class="image"
    :alt="alt"
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
    :alt="alt"
    :type="`image/${imageType}`"
    draggable="false"
    :src="src"
    :width="width"
    :height="height"
    :modifiers="{ filters: { focal: file.focus ?? 0 } }"
    :fit="file.focus ? undefined : 'in'"
    format="webp"
    :sizes="sizes ?? undefined"
  />
</template>
<script>
export default defineNuxtComponent({
  props: {
    file: {
      type: Object,
      required: true
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
        case 'webp':
          return 'webp';
        case 'png':
          return 'png';
        case 'svg':
          return 'svg+xml';
        case 'gif':
          return 'gif';
        default:
          return null;
      }
    });
    return {
      imageType
    };
  }
});
</script>
