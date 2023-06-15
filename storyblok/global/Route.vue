<template>
  <component
    :is="blok.external_link ? 'a' : RouteLink"
    v-if="blok && (blok.title || (blok.icon_item && blok.body.length))"
    :class="[
      'item-link h-full cursor-pointer',
      { 'w-full': sliderMode },
      sliderMode || carouselMode || containerMode
        ? 'flex items-center justify-center self-center'
        : 'block',
      blok.external_link
        ? ''
        : !iconItem && !blok.icon_item
        ? 'rounded opacity-60 bg-opacity-40 bg-gray-300'
        : 'pt-0.5 border-b-2 border-gray-300'
    ]"
    :to="blok.external_link ? undefined : blok.path"
    :href="blok.external_link ? blok.path : undefined"
    :rel="blok.external_link ? 'noopener noreferrer' : undefined"
    :target="blok.external_link ? '_blank' : undefined"
    :title="blok.title && blok.icon_item ? blok.title : undefined"
  >
    <span
      v-if="blok.title && !iconItem && !blok.icon_item"
      class="item-text break-words"
      :style="`color: ${$binaryControl(blok.text_color, 'color', '#212121')};`"
    >
      {{ blok.title }}
    </span>
    <IconComponent
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
    :is="externalLink ? 'a' : RouteLink"
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
            : 'rounded opacity-60 bg-opacity-40 bg-gray-300'
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
            : 'rounded opacity-60 bg-opacity-40 bg-gray-300'
          : setActive
          ? setActive
          : 'pt-0.5 border-b-2 border-gray-300'
        : ''
    "
    :to="externalLink ? undefined : to"
    :href="externalLink ? to : undefined"
    :rel="externalLink ? 'noopener noreferrer' : undefined"
    :target="externalLink ? '_blank' : undefined"
    :title="title && iconItem ? title : undefined"
  >
    <span v-if="title && !iconItem" class="item-text break-words">{{ title }}</span>
    <slot v-else name="icon" />
  </component>
</template>
<script>
import IconComponent from '@/storyblok/global/Icon';
export default defineNuxtComponent({
  components: { IconComponent },
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ''
    },
    active: {
      type: String,
      default: ''
    },
    setActive: {
      type: String,
      default: ''
    },
    iconTag: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    iconItem: {
      type: Boolean,
      default: false
    },
    iconStyle: {
      type: String,
      default: ''
    },
    containerWidth: {
      type: Number,
      default: 0
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    },
    containerMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const RouteLink = resolveComponent('NuxtLink');
    return { RouteLink };
  }
});
</script>
