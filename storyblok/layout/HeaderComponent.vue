<template>
  <header v-if="sizes.md && isDesktop" class="header fixed w-full top-0 z-40">
    <nav class="navbar">
      <div class="menu-wrapper h-0 grid grid-flow-col-dense justify-between">
        <div class="logo-home relative h-16 w-16 lg:w-20 lg:h-20 z-20">
          <Link
            icon-item
            class="home-link flex items-center justify-center p-1 lg:p-1.5 transition-shadow duration-300 rounded-br"
            to=""
            :aria-label="webName"
            :style="`background-color: ${backgroundColorMenu};`"
          >
            <template #icon>
              <Logo transition :color-a="logoColors[0]" :color-p="logoColors[1]" size="100%" />
            </template>
          </Link>
        </div>
        <div
          :class="`menu-expanded h-10 grid grid-flow-col gap-5 transform transition ${
            expanded
              ? topPosition
                ? 'translate-y-5 rounded'
                : 'rounded-b'
              : '-translate-y-10 opacity-0'
          }`"
          :style="`background-color: ${
            backgroundColor
              ? topPosition
                ? backgroundColor
                : `${backgroundColor}B3`
              : 'transparent'
          }; backdrop-filter: blur(4px);`"
        >
          <ul class="link-list grid grid-flow-col auto-cols-fr">
            <li
              v-for="item in $contentByName(blok.body, 'Link')"
              :key="item._uid"
              :class="`link-menu w-20 hover:shadow-sm ${topPosition ? 'rounded' : 'rounded-b'}`"
            >
              <Link
                class="flex items-center justify-center py-2 px-3 text-sm truncate"
                :blok="item"
              />
            </li>
          </ul>
          <Translate
            :show-background="topPosition"
            class="translate-header grid h-full p-1"
            style-translate-list="grid grid-flow-col auto-cols-fr"
            style-translate-item="w-full flex items-center justify-center py-2 px-3 text-center rounded"
            :blok="$contentByName(blok.body, 'Translate')"
          />
        </div>
        <Icon
          animate-menu
          tag="button"
          class="open-menu relative h-16 w-16 lg:w-20 lg:h-20 z-10 cursor-pointer rounded-bl"
          size="w-5 h-5"
          :color-icon-animated-menu="blok.icon_color.color"
          :style="`background-color: ${backgroundColorMenu};`"
          @click="expanded = !expanded"
        />
      </div>
    </nav>
  </header>
  <header v-else class="header flex justify-center">
    <nav
      class="navbar-up w-full h-10 fixed flex justify-center top-0 z-40 shadow-sm rounded-b"
      :style="`background-color: ${backgroundColor};`"
    >
      <div
        class="menu-wrapper wrapper-up w-full h-full max-w-sm xs:max-w-md sm:max-w-lg flex justify-between"
      >
        <Link
          active="exact"
          set-active="border-t-2 pb-0.5 border-gray-300"
          icon-item
          class="home-link w-2/12 rounded-bl bg-neutral-800 text-white"
          :aria-label="webName"
          to=""
        >
          <template #icon>
            <Icon home tag="button" size="w-5 h-5" class="home-link h-full w-full" />
          </template>
        </Link>
        <Logo
          transition
          :color-a="logoColors[0]"
          :color-p="logoColors[1]"
          class="absolute -top-0.5 right-1/2 p-1 transform translate-x-1/2 rounded-b-full drop-shadow-md bg-white"
          size="2.75rem"
        />
        <Translate
          translate-transition
          :class="`translate-header w-2/12 text-white bg-neutral-800 ${
            expanded ? '' : 'rounded-br'
          }`"
          :style-current-language="`h-full flex items-center justify-center relative z-10 bg-neutral-800 text-white ${
            expanded ? '' : 'rounded-br'
          }`"
          :style-translate-list="`rounded-b w-full transform transition-transform duration-200 ease-out bg-neutral-800 ${
            expanded ? 'translate-y-0' : '-translate-y-full'
          }`"
          style-translate-item="p-3 text-center"
          :blok="$contentByName(blok.body, 'Translate')"
          @translateListAction.passive="expanded = false"
          @currentLangAction.passive="expanded = !expanded"
          @mouseenter="isDesktop ? expandStill() : ''"
          @mouseleave.passive="isDesktop ? expandOut() : (expanded = false)"
        />
      </div>
    </nav>
    <nav
      class="navbar-down fixed w-full h-16 flex items-center justify-center bottom-0 z-40 rounded-t drop-shadow-2xl"
      :style="`background-color: ${backgroundColor};`"
    >
      <ul
        class="menu-wrapper wrapper-down w-full h-full max-w-sm xs:max-w-md sm:max-w-lg grid grid-cols-3"
      >
        <li
          v-for="item in $contentByName(blok.body, 'Link')"
          :key="item._uid"
          class="link-menu no-underline"
        >
          <Link icon-item icon-style="w-full h-full" :blok="item" />
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import Logo from '../global/LogoComponent';
import Translate from './TranslateComponent';
import enums from '@/enum';
import screen from '@/mixins/screen';
export default defineNuxtComponent({
  components: { Translate, Logo },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { isDesktop } = useDevice();
    const { sizes, windowWidth } = screen();
    const state = reactive({
      timer: 0,
      expanded: false,
      topPosition: false
    });
    const { topPosition, expanded, timer } = toRefs(state);
    const webName = enums.name;
    const backgroundColor = computed(() => {
      const colors = props.blok.background_color.color.split('; ');
      if (colors.length > 1) {
        if (sizes.value.md && isDesktop) {
          return colors[0];
        } else {
          return colors.length > 1 ? colors[1] : colors[0];
        }
      } else {
        return props.blok.background_color.color;
      }
    });
    const backgroundColorMenu = computed(() => {
      const colors = props.blok.background_color_menu.color.split('; ');
      if (colors.length > 1) {
        if (sizes.value.md && isDesktop) {
          return colors[0];
        } else {
          return colors.length > 1 ? colors[1] : colors[0];
        }
      } else {
        return props.blok.background_color_menu.color;
      }
    });
    const logoColors = computed(() => {
      const colors = props.blok.logo_colors.color.split('; ');
      if (colors.length > 1) {
        return colors;
      } else {
        return [props.blok.logo_colors.color, props.blok.logo_colors.color];
      }
    });
    const headerPosition = () => {
      if (window.pageYOffset <= 1) topPosition.value = true;
      else topPosition.value = false;
    };
    const expandOut = () => {
      if (expanded.value) {
        timer.value = setTimeout(() => {
          expanded.value = false;
        }, 700);
      }
    };
    const expandStill = () => {
      if (expanded.value) {
        clearTimeout(timer.value);
        timer.value = 0;
      }
    };
    watch(
      () => [isDesktop, windowWidth],
      () => (expanded.value = false)
    );
    watch(
      () => expanded,
      () => headerPosition()
    );
    return {
      sizes,
      webName,
      expanded,
      isDesktop,
      expandOut,
      expandStill,
      logoColors,
      topPosition,
      backgroundColor,
      backgroundColorMenu
    };
  }
});
</script>
