<template>
  <footer
    class="px-5 pt-20 pb-40 rounded-t footer"
    :style="`background-color:${blok.transparency ? `${backgroundColor}B3` : backgroundColor};`"
  >
    <div class="grid gap-5 text-center footer-content h-32">
      <div
        :class="`icon-container relative flex justify-center items-center text-md ${
          backgroundColor && $themeColor(backgroundColor) ? 'text-white' : ''
        }`"
      >
        <button
          class="grid col-start-1 col-end-1 row-start-1 row-end-1 icon-wrapper"
        >
          <IconComponent
            eye-bold
            :class="[
              'col-start-1 col-end-1 row-start-1 row-end-1 cursor-pointer transition-opacity',
              { 'opacity-0': checkColorMode.light }
            ]"
            size="w-6"
            tooltip="Light theme"
            @click="changeColorMode('dark')"
          />
          <IconComponent
            eye
            :class="[
              'col-start-1 col-end-1 row-start-1 row-end-1 cursor-pointer transition-opacity',
              { 'opacity-0': checkColorMode.dark }
            ]"
            size="w-6"
            tooltip="Dark theme"
            @click="changeColorMode('light')"
          />
        </button>
      </div>
      <div
        :class="[
          'footer-info grid gap-y-1.5',
          { 'text-white': backgroundColor && $themeColor(backgroundColor) }
        ]"
      >
        <span class="text-sm footer-copyright">
          © 2020 - {{ currentYear }}, <strong>{{ webName }}</strong>
        </span>
      </div>
      <ul
        :class="`social-links flex flex-wrap -m-1.5 justify-center items-center ${
          backgroundColor && $themeColor(backgroundColor) ? 'invert' : ''
        }`"
      >
        <template v-for="iconLink in $contentByName(blok.body, 'Route')">
          <li
            v-if="
              iconLink.title || (iconLink.icon_item && iconLink.body.length)
            "
            :key="iconLink._uid"
            class="link-item m-1.5"
          >
            <RouteComponent
              :blok="iconLink"
              class="h-full transition-all duration-700 social-icon"
            />
          </li>
        </template>
      </ul>
    </div>
  </footer>
</template>

<script>
import { Data } from '@/schema/enums'
import IconComponent from '@/storyblok/global/Icon'
import RouteComponent from '@/storyblok/global/Route'
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  components: { IconComponent, RouteComponent },
  setup(props) {
    const { $mode, $binaryControl, $scrollToSmoothly } = useNuxtApp()
    const state = reactive({
      currentYear: new Date().getFullYear()
    })
    const webName = Data.name
    const { currentYear } = toRefs(state)
    const backgroundColor = computed(() =>
      $binaryControl(props.blok.background_color, 'color')
    )
    const checkColorMode = computed(() => ({
      dark: $mode.value === 'dark',
      light: $mode.value === 'light'
    }))
    const changeColorMode = (mode) => {
      $mode.value = mode
      $scrollToSmoothly(0, 150)
    }

    return {
      webName,
      currentYear,
      checkColorMode,
      backgroundColor,
      changeColorMode
    }
  }
})
</script>
