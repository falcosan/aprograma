<template>
  <component
    :is="imageType === 'svg+xml' ? 'img' : 'NuxtImg'"
    v-if="imageType"
    :style="!loaded ? `opacity: 0;` : null"
    :loading="lazy ? 'lazy' : null"
    :class="['image transition', { 'pointer-events-none': !loaded }]"
    :alt="alt"
    :type="`image/${imageType}`"
    draggable="false"
    :src="src"
    :width="width"
    :height="height"
    :modifiers="
      imageType === 'svg+xml' || original ? null : { filters: { focal: file.focus ?? 0 } }
    "
    :fit="imageType === 'svg+xml' || file.focus ? null : 'in'"
    :format="imageType === 'svg+xml' ? null : 'webp'"
    :sizes="imageType === 'svg+xml' ? null : sizes ? sizes : null"
    @load="setImageLoaded"
  />
</template>
<script>
export default {
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
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    imageType() {
      switch (this.src.toLowerCase().split('.').pop()) {
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
          return null;
      }
    }
  },
  methods: {
    setImageLoaded() {
      this.loaded = true;
    }
  }
};
</script>
