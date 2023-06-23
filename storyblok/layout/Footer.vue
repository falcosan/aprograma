<template>
  <footer
    v-if="sizes.md && isDesktop"
    v-click-outside="expandOut"
    :style="`background-color: ${backgroundColors};`"
    :class="`footer w-full fixed z-40 bottom-0 transition-height duration-200 ease-in-out ${
      expanded ? 'h-28' : 'h-0'
    }`"
  >
    <div
      :style="`background-color: ${
        expanded ? backgroundColors : blok.background_color_menu.color
      };`"
      class="top-kick absolute h-16 w-16 lg:w-20 lg:h-20 flex right-0 -top-16 lg:-top-20 items-center justify-center z-10 rounded-tl cursor-pointer transition-all duration-200"
      @click="$scrollToSmoothly(0)"
    >
      <IconComponent
        arrow
        size="w-auto h-auto"
        :class="`justify-center transform rotate-90 cursor-pointer ${
          expanded && $themeColor(blok.icon_color.color) ? 'text-white' : ''
        }`"
        :style="`color: ${blok.icon_color.color};`"
      />
    </div>
    <div class="content-container h-full overflow-hidden" @mouseover="expandIn">
      <div class="open-footer absolute w-20 left-0 -top-16 lg:-top-20">
        <div
          class="icon-open h-16 w-16 lg:w-20 lg:h-20 flex justify-center items-center rounded-tr transition-all duration-200"
          :style="`background-color: ${
            expanded ? backgroundColors : blok.background_color_menu.color
          };`"
        >
          <transition
            enter-active-class="duration-300 in-out"
            leave-active-class="duration-300 out-in"
            enter-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <IconComponent
              v-if="currentEye"
              key="eye-bold"
              eye-bold
              tooltip="Kiosco Antonio"
              :style="`color: ${blok.icon_color.color};`"
              :class="`${
                expanded && $themeColor(blok.icon_color.color) ? 'text-white' : ''
              } absolute easter-egg`"
            />
            <IconComponent
              v-else
              key="eye"
              eye
              tooltip="Kiosco Antonio"
              :style="`color: ${blok.icon_color.color};`"
              :class="`${
                expanded && $themeColor(blok.icon_color.color) ? 'text-white' : ''
              } absolute easter-egg`"
            />
          </transition>
        </div>
      </div>
      <div
        :class="`footer-content h-full w-full grid grid-flow-col auto-cols-fr gap-5 items-center px-5 transition-opacity duration-200 ${
          expanded ? '' : 'opacity-0'
        }`"
      >
        <div class="messages-container">
          <span
            :class="`footer-messages text-xs ${
              backgroundColors && $themeColor(backgroundColors) ? '' : ''
            }`"
          >
            {{ blok.text_static ? blok.text_static : '' }}{{ typewriter }}
          </span>
        </div>
        <div
          :class="`footer-info grid gap-y-1.5 justify-self-center whitespace-nowrap text-center ${
            backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''
          }`"
        >
          <span class="footer-copyright text-sm">
            © 2020 - {{ currentYear }}, <strong>{{ webName }}</strong></span
          >
          <span class="footer-powered text-xs leading-relaxed"
            >{{ $languageCase('Made with', 'Hecho con', 'Creato con') }}
            <a
              class="nuxtjs-link"
              href="https://nuxtjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              ><span class="nuxtjs underline">Nuxt.js</span></a
            >,
            <a
              class="netlify-link"
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
              ><span class="netlify underline">Netlify</span></a
            >
            {{ $languageCase('and', 'y', 'e') }}
            <a
              class="storyblok-link"
              href="https://www.storyblok.com/"
              target="_blank"
              rel="noopener noreferrer"
              ><span class="storyblok underline">Storyblok</span></a
            ></span
          >
        </div>
        <ul
          :class="`social-links flex flex-wrap items-center justify-end -m-1.5 ${
            backgroundColors && $themeColor(backgroundColors) ? 'invert' : ''
          }`"
        >
          <template v-for="iconLink in $contentByName(blok.body, 'Route')">
            <li
              v-if="iconLink.title || (iconLink.icon_item && iconLink.body.length)"
              :key="iconLink._uid"
              class="link-item m-1.5"
            >
              <RouteComponent :blok="iconLink" class="social-icon opacity-80 hover:opacity-100" />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </footer>
  <footer
    v-else
    class="footer px-5 pt-20 pb-40 rounded-t"
    :style="`background-color: ${blok.transparency ? `${backgroundColors}B3` : backgroundColors};`"
  >
    <div class="footer-content h-52 grid gap-5 text-center">
      <div
        :class="`input-footer relative grid gap-5 grid-flow-col-dense items-end justify-center bottom-6 text-md ${
          backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''
        }`"
      >
        <transition
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
          enter-active-class="transition duration-300"
          leave-active-class="transition duration-300"
        >
          <IconComponent
            v-if="currentEye"
            key="eye-bold"
            eye-bold
            class="col-start-1 col-end-1 row-start-1 row-end-1"
            size="w-6"
          />
          <IconComponent
            v-else
            key="eye"
            eye
            class="col-start-1 col-end-1 row-start-1 row-end-1"
            size="w-6"
          />
        </transition>
      </div>
      <div
        :class="`messages-container ${
          backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''
        }`"
      >
        <span class="footer-messages text-xs">
          {{ blok.text_static ? blok.text_static : '' }}{{ typewriter }}
        </span>
      </div>
      <div
        :class="`footer-info grid gap-y-1.5 ${
          backgroundColors && $themeColor(backgroundColors) ? 'text-white' : ''
        }`"
      >
        <span class="footer-copyright text-sm">
          © 2020 - {{ currentYear }}, <strong>{{ webName }}</strong></span
        >
        <span class="footer-powered text-xs leading-relaxed"
          >{{ $languageCase('Made with', 'Hecho con', 'Creato con') }}
          <a
            class="nuxtjs-link"
            href="https://nuxt.com/"
            target="_blank"
            rel="noopener noreferrer"
            ><span class="nuxtjs underline">Nuxt.js</span></a
          >,
          <a
            class="netlify-link"
            href="https://www.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
            ><span class="netlify underline">Netlify</span></a
          >
          {{ $languageCase('and', 'y', 'e') }}
          <a
            class="storyblok-link"
            href="https://www.storyblok.com/"
            target="_blank"
            rel="noopener noreferrer"
            ><span class="storyblok underline">Storyblok</span></a
          ></span
        >
      </div>
      <ul
        :class="`social-links flex flex-wrap -m-1.5 justify-center items-center ${
          backgroundColors && $themeColor(backgroundColors) ? 'invert' : ''
        }`"
      >
        <template v-for="iconLink in $contentByName(blok.body, 'Route')">
          <li
            v-if="iconLink.title || (iconLink.icon_item && iconLink.body.length)"
            :key="iconLink._uid"
            class="link-item m-1.5"
          >
            <RouteComponent :blok="iconLink" class="social-icon transition-all duration-700" />
          </li>
        </template>
      </ul>
    </div>
  </footer>
</template>

<script>
import { storeToRefs } from 'pinia';
import RouteComponent from '@/storyblok/global/Route';
import IconComponent from '@/storyblok/global/Icon';
import enums from '@/enum';
import store from '@/store';
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  components: { IconComponent, RouteComponent },
  setup(props) {
    const { $languageCase } = useNuxtApp();
    const { isDesktop } = useDevice();
    const { sizes, scrollPosition } = useScreen();
    const { languageGet } = storeToRefs(store.language());
    const state = reactive({
      charIndex: 0,
      typewriter: '',
      expanded: false,
      currentEye: false,
      setEyes: undefined,
      typewriterIndex: 0,
      playTypeText: undefined,
      playEraseText: undefined,
      currentYear: new Date().getFullYear()
    });
    const webName = enums.name;
    const {
      setEyes,
      expanded,
      charIndex,
      currentEye,
      typewriter,
      currentYear,
      playTypeText,
      playEraseText,
      typewriterIndex
    } = toRefs(state);
    const words = computed(() => {
      if (props.blok.text_typewriter.length) {
        const texts = props.blok.text_typewriter[typewriterIndex.value]
          .split('; ')
          .filter(text => text);
        return $languageCase(texts[0], texts[1], texts[2]);
      } else return '';
    });
    const backgroundColors = computed(() => {
      if (props.blok.background_color.color) {
        const colors = props.blok.background_color.color.split('; ');
        if (colors.length > 1) {
          if (sizes.value.md && isDesktop) return colors[0];
          else return colors.length > 1 ? colors[1] : colors[0];
        } else return props.blok.background_color.color;
      } else return '';
    });
    const expandIn = () => {
      if (!expanded.value) expanded.value = true;
    };
    const expandOut = () => {
      if (expanded.value) expanded.value = false;
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
    const showEyes = () => {
      clearInterval(setEyes.value);
      setEyes.value = setInterval(() => {
        currentEye.value = !currentEye.value;
      }, '1000');
    };
    watch(scrollPosition, () => expandOut());
    watch(languageGet, () => restartTypewriter());
    watch(currentEye, showEyes, { immediate: true });
    typeText();
    return {
      sizes,
      webName,
      expanded,
      expandIn,
      expandOut,
      isDesktop,
      currentEye,
      typewriter,
      currentYear,
      backgroundColors
    };
  }
});
</script>
