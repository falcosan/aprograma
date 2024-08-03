<template>
  <footer
    class="px-5 pt-20 pb-40 rounded-t footer"
    :style="`background-color:${blok.transparency ? `${backgroundColor}B3` : backgroundColor};`"
  >
    <div class="grid gap-5 text-center footer-content h-52">
      <div
        :class="`icon-container relative grid gap-5 grid-flow-col-dense items-end self-baseline justify-center text-md ${
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
              { 'opacity-0': checkColorMode?.light }
            ]"
            size="w-6"
            tooltip="Light theme"
            @click="changeColorMode('dark')"
          />
          <IconComponent
            eye
            :class="[
              'col-start-1 col-end-1 row-start-1 row-end-1 cursor-pointer transition-opacity',
              { 'opacity-0': checkColorMode?.dark }
            ]"
            size="w-6"
            tooltip="Dark theme"
            @click="changeColorMode('light')"
          />
        </button>
      </div>
      <div
        :class="`messages-container ${
          backgroundColor && $themeColor(backgroundColor) ? 'text-white' : ''
        }`"
      >
        <span class="text-xs footer-messages">
          {{ blok.text_static ? blok.text_static : '' }}{{ typewriter }}
        </span>
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
    const { locale } = useI18n()
    const { $mode, $binaryControl, $languageCase, $scrollToSmoothly } =
      useNuxtApp()
    const state = reactive({
      charIndex: 0,
      typewriter: '',
      typewriterIndex: 0,
      playTypeText: undefined,
      playEraseText: undefined,
      currentYear: new Date().getFullYear()
    })
    const webName = Data.name
    const {
      charIndex,
      typewriter,
      currentYear,
      playTypeText,
      playEraseText,
      typewriterIndex
    } = toRefs(state)
    const words = computed(() => {
      if (props.blok.text_typewriter.length) {
        const texts = props.blok.text_typewriter[typewriterIndex.value]
          .split('; ')
          .filter((text) => text)
        return $languageCase(texts[0], texts[1], texts[2])
      }
      return ''
    })
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
    const eraseText = () => {
      if (words.value && charIndex.value) {
        typewriter.value = words.value.substring(0, charIndex.value - 1)
        charIndex.value--
        playEraseText.value = setTimeout(eraseText, 50)
      } else {
        typewriterIndex.value++
        playEraseText.value = 0
        if (typewriterIndex.value >= props.blok.text_typewriter.length) {
          typewriterIndex.value = 0
        }
        playTypeText.value = setTimeout(typeText, 50)
      }
    }
    const typeText = () => {
      if (words.value && charIndex.value < words.value.length) {
        typewriter.value += words.value.charAt(charIndex.value)
        charIndex.value++
        playTypeText.value = setTimeout(typeText, 50)
      } else {
        if (typewriterIndex.value >= props.blok.text_typewriter.length) {
          typewriterIndex.value = 0
        }
        playTypeText.value = 0
        playEraseText.value = setTimeout(eraseText, 1500)
      }
    }
    const restartTypewriter = () => {
      if (words.value) {
        clearTimeout(playTypeText.value)
        clearTimeout(playEraseText.value)
        playTypeText.value = 0
        playEraseText.value = 0
        typewriter.value = ''
        charIndex.value = 0
        typewriterIndex.value = 0
        setTimeout(typeText, 400)
      }
    }
    typeText()
    watch(locale, restartTypewriter)
    return {
      webName,
      typewriter,
      currentYear,
      checkColorMode,
      backgroundColor,
      changeColorMode
    }
  }
})
</script>
