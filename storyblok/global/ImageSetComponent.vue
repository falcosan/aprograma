<template>
  <component
    :style="!loaded ? `opacity: 0;` : null"
    :is="imageType === 'svg+xml' ? 'img' : 'NuxtImg'"
    :loading="lazy ? 'lazy' : null"
    :class="['image transition', { 'pointer-events-none': !loaded }]"
    :alt="alt"
    @load="setImageLoaded"
    :type="`image/${imageType}`"
    draggable="false"
    :src="src"
    :width="width"
    :height="height"
    :modifiers="
      imageType === 'svg+xml' || original
        ? null
        : { filters: { focal: file.focus ?? 0 } }
    "
    :fit="imageType === 'svg+xml' || file.focus ? null : 'in'"
    :format="imageType === 'svg+xml' ? null : 'webp'"
    :sizes="imageType === 'svg+xml' ? null : sizes ? sizes : null"
  />
</template>
<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    sizes: {
      type: [String, Boolean],
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    original: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    imageType() {
      switch (this.src.toLowerCase().split(".").pop()) {
        case "jpg":
        case "jpeg":
          return "jpeg";
        case "png":
          return "png";
        case "svg":
          return "svg+xml";
        case "gif":
          return "gif";
      }
    },
  },
  methods: {
    setImageLoaded() {
      this.loaded = true;
    },
  },
};
</script>
