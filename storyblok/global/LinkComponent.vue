<template>
  <component
    :is="blok.external_link ? 'a' : 'NuxtLink'"
    v-if="blok && (blok.title || (blok.icon_item && blok.body.length > 0))"
    :class="[
      'item-link h-full cursor-pointer',
      { 'w-full': sliderMode },
      sliderMode || carouselMode || containerMode
        ? 'flex items-center justify-center self-center'
        : 'block',
    ]"
    :active-class="
      blok.external_link
        ? ''
        : !iconItem && !blok.icon_item
        ? 'opacity-40 font-semibold'
        : 'pt-0.5 border-b-2 border-gray-300'
    "
    :to="blok.external_link ? false : `${blok.path}/`"
    :href="blok.external_link ? blok.path : false"
    :rel="blok.external_link ? 'noopener noreferrer' : false"
    :target="blok.external_link ? '_blank' : false"
    :title="blok.title && blok.icon_item ? blok.title : false"
  >
    <span
      v-if="blok.title && !iconItem && !blok.icon_item"
      class="item-text break-words"
      :style="`color: ${$binaryControl(blok.text_color, 'color', '#212121')};`"
    >
      {{ blok.title }}
    </span>
    <Icon
      v-else-if="iconItem || blok.icon_item"
      :class="`item-icon ${iconStyle}`"
      :tag="blok.body[0].tag"
      :blok="blok.body[0]"
      :slider-mode="sliderMode"
      :carousel-mode="carouselMode"
      :container-mode="containerMode"
    />
  </component>
  <component
    :is="externalLink ? 'a' : 'NuxtLink'"
    v-else
    :class="`item-link h-full cursor-pointer ${
      sliderMode || carouselMode || containerMode
        ? 'flex items-center justify-center self-center'
        : 'block'
    }`"
    :active-class="
      active === 'active'
        ? !iconItem
          ? setActive
            ? setActive
            : 'opacity-40 font-semibold'
          : setActive
          ? setActive
          : 'pt-0.5 border-b-2 border-gray-300'
        : ''
    "
    :exact-active-class="
      active === 'exact'
        ? !iconItem
          ? setActive
            ? setActive
            : 'opacity-40 font-semibold'
          : setActive
          ? setActive
          : 'pt-0.5 border-b-2 border-gray-300'
        : ''
    "
    :to="externalLink ? false : `${to}/`"
    :href="externalLink ? to : false"
    :rel="externalLink ? 'noopener noreferrer' : false"
    :target="externalLink ? '_blank' : false"
    :title="title && iconItem ? title : false"
  >
    <span v-if="title && !iconItem" class="item-text break-words">{{
      title
    }}</span>
    <slot v-else name="icon" />
  </component>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined,
    },
    externalLink: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: "",
    },
    active: {
      type: String,
      default: "",
    },
    setActive: {
      type: String,
      default: "",
    },
    iconTag: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    iconItem: {
      type: Boolean,
      default: false,
    },
    iconStyle: {
      type: String,
      default: "",
    },
    containerWidth: {
      type: Number,
      default: 0,
    },
    sliderMode: {
      type: Boolean,
      default: false,
    },
    carouselMode: {
      type: Boolean,
      default: false,
    },
    containerMode: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
