<template>
  <component
    :is="blok.external_link ? 'a' : NuxtLink"
    v-if="blok && (blok.title || (blok.icon_item && blok.body.length))"
    :class="[
      'item-link cursor-pointer',
      { 'w-full': sliderMode },
      { 'bg-opacity-40 bg-gray-300': activated },
      { 'rounded opacity-60': !iconItem && !blok.icon_item },
      sliderMode || carouselMode || containerMode
        ? 'flex items-center justify-center self-center'
        : 'block'
    ]"
    :to="blok.external_link ? undefined : localePath(blok.path)"
    :href="blok.external_link ? blok.path : undefined"
    :rel="blok.external_link ? 'noopener noreferrer' : undefined"
    :target="blok.external_link ? '_blank' : undefined"
    :title="blok.title || undefined"
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
    <slot v-else />
  </component>
  <component
    :is="externalLink ? 'a' : NuxtLink"
    v-else
    :class="[
      `item-link cursor-pointer ${
        sliderMode || carouselMode || containerMode
          ? 'flex items-center justify-center self-center'
          : 'block'
      }`,
      [
        {
          [!iconItem
            ? setActive || 'rounded opacity-60 bg-opacity-40 bg-gray-300'
            : setActive]: activated
        }
      ]
    ]"
    :to="externalLink ? undefined : localePath(to)"
    :href="externalLink ? to : undefined"
    :rel="externalLink ? 'noopener noreferrer' : undefined"
    :target="externalLink ? '_blank' : undefined"
    :title="title || undefined"
  >
    <span v-if="title && !iconItem" class="item-text break-words">{{
      title
    }}</span>
    <slot v-else-if="slots.icon" name="icon" />
    <slot />
  </component>
</template>
<script>
import { Data } from '@/schema/enums'
import IconComponent from '@/storyblok/global/Icon'
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
      type: [String, Object],
      default: ''
    },
    setActive: {
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
  setup(props) {
    const slots = useSlots()
    const route = useRoute()
    const NuxtLink = resolveComponent('NuxtLink')
    const activated = computed(() => {
      const targetRoute = props.blok?.path ?? props.to
      const regex = new RegExp(
        `/(${Object.values(Data.rss)
          .map((item) => {
            if (item instanceof Object) return item.language
            else return ''
          })
          .filter(Boolean)
          .join('|')})\\b`
      )
      const currentRoute = route.path.replace(regex, '') || '/'
      if (currentRoute === targetRoute) {
        for (const [key, value] of Object.entries(route.query)) {
          if (!targetRoute.includes(`${key}=${value}`)) return false
        }
        return true
      } else if (currentRoute.startsWith(`${targetRoute}/`)) {
        for (const [key, value] of Object.entries(route.query)) {
          if (!targetRoute.includes(`${key}=${value}`)) return false
        }
        return true
      }
      return false
    })
    return { NuxtLink, activated, slots }
  }
})
</script>
