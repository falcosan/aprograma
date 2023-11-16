<template>
  <footer
    class="footer px-5 pt-20 pb-40 rounded-t"
    :style="`background-color: ${blok.transparency ? `${backgroundColor}B3` : backgroundColor};`"
  >
    <div class="footer-content h-52 grid gap-5 text-center">
      <div
        :class="`icon-container relative grid gap-5 grid-flow-col-dense items-end self-baseline justify-center text-md ${
          backgroundColor && $themeColor(backgroundColor) ? 'text-white' : ''
        }`"
      >
        <Transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="transition duration-300"
          leave-active-class="transition duration-300"
        >
          <button
            v-if="colorModeLoaded"
            class="icon-wrapper grid col-start-1 col-end-1 row-start-1 row-end-1"
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
          <div
            v-else
            :class="[
              'icon-loading w-6 h-6 col-start-1 col-end-1 row-start-1 row-end-1 rounded-xl blur-sm',
              backgroundColor && $themeColor(backgroundColor) ? 'bg-white' : 'bg-slate-500'
            ]"
            style="transform: rotateX(45deg)"
          />
        </Transition>
      </div>
      <div
        :class="`messages-container ${
          backgroundColor && $themeColor(backgroundColor) ? 'text-white' : ''
        }`"
      >
        <span class="footer-messages text-xs">
          {{ blok.text_static ? blok.text_static : '' }}{{ typewriter }}
        </span>
      </div>
      <div
        :class="`footer-info grid gap-y-1.5 ${
          backgroundColor && $themeColor(backgroundColor) ? 'text-white' : ''
        }`"
      >
        <span class="footer-copyright text-sm">
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
            v-if="iconLink.title || (iconLink.icon_item && iconLink.body.length)"
            :key="iconLink._uid"
            class="link-item m-1.5"
          >
            <RouteComponent
              :blok="iconLink"
              class="social-icon h-full transition-all duration-700"
            />
          </li>
        </template>
      </ul>
    </div>
  </footer>
</template>

<script>
import IconComponent from '@/storyblok/global/Icon';
import RouteComponent from '@/storyblok/global/Route';
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  components: { IconComponent, RouteComponent },
  setup(props) {
    const { locale } = useI18n();
    const colorMode = useColorMode();
    const { $binaryControl, $languageCase, $scrollToSmoothly } = useNuxtApp();
    const state = reactive({
      charIndex: 0,
      typewriter: '',
      typewriterIndex: 0,
      colorModeLoaded: false,
      playTypeText: undefined,
      playEraseText: undefined,
      currentYear: new Date().getFullYear()
    });
    const webName = enums.name;
    const {
      charIndex,
      typewriter,
      currentYear,
      playTypeText,
      playEraseText,
      typewriterIndex,
      colorModeLoaded
    } = toRefs(state);
    const words = computed(() => {
      if (props.blok.text_typewriter.length) {
        const texts = props.blok.text_typewriter[typewriterIndex.value]
          .split('; ')
          .filter(text => text);
        return $languageCase(texts[0], texts[1], texts[2]);
      } else return '';
    });
    const backgroundColor = computed(() => $binaryControl(props.blok.background_color, 'color'));
    const checkColorMode = computed(() => ({
      dark: colorMode?.value === 'dark',
      light: colorMode?.value === 'light'
    }));
    const changeColorMode = mode => {
      colorMode.preference = mode;
      $scrollToSmoothly(0, 150);
    };
    const eraseText = () => {
      if (words.value && charIndex.value) {
        typewriter.value = words.value.substring(0, charIndex.value - 1);
        charIndex.value--;
        playEraseText.value = setTimeout(eraseText, 50);
      } else {
        typewriterIndex.value++;
        playEraseText.value = 0;
        if (typewriterIndex.value >= props.blok.text_typewriter.length) {
          typewriterIndex.value = 0;
        }
        playTypeText.value = setTimeout(typeText, 50);
      }
    };
    const typeText = () => {
      if (words.value && charIndex.value < words.value.length) {
        typewriter.value += words.value.charAt(charIndex.value);
        charIndex.value++;
        playTypeText.value = setTimeout(typeText, 50);
      } else {
        if (typewriterIndex.value >= props.blok.text_typewriter.length) {
          typewriterIndex.value = 0;
        }
        playTypeText.value = 0;
        playEraseText.value = setTimeout(eraseText, 1500);
      }
    };
    const restartTypewriter = () => {
      if (words.value) {
        clearTimeout(playTypeText.value);
        clearTimeout(playEraseText.value);
        playTypeText.value = 0;
        playEraseText.value = 0;
        typewriter.value = '';
        charIndex.value = 0;
        typewriterIndex.value = 0;
        setTimeout(typeText, 400);
      }
    };
    typeText();
    onMounted(() => (colorModeLoaded.value = true));
    watch(locale, restartTypewriter);
    return {
      webName,
      colorMode,
      typewriter,
      currentYear,
      checkColorMode,
      colorModeLoaded,
      backgroundColor,
      changeColorMode
    };
  }
});
</script>
