<template>
  <header class="header flex justify-center">
    <nav class="navbar-up w-full h-10 fixed flex justify-center top-0 z-40 shadow-sm rounded-b">
      <div
        class="navbar-up-flat absolute h-full w-full -z-10"
        :style="`background-color: ${backgroundColor};`"
      />
      <div
        class="menu-wrapper wrapper-up w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl flex justify-between"
      >
        <RouteComponent
          set-active="pb-1 border-t-4 border-gray-300"
          icon-item
          :class="[
            'home-link w-2/12 h-full rounded-bl',
            $themeColor(backgroundColor) ? 'text-white' : ''
          ]"
          :aria-label="webName"
          to="/"
        >
          <template #icon>
            <IconComponent home size="w-5 h-5" class="home-link h-full w-full cursor-pointer" />
          </template>
        </RouteComponent>
        <LogoComponent
          transition
          :color-a="logoColors[0]"
          :color-p="logoColors[1]"
          class="absolute -top-0.5 right-1/2 p-1 transform translate-x-1/2 rounded-b-full border border-gray-200 bg-white"
          size="2.75rem"
        />
        <TranslateComponent
          v-click-outside:[false]="toggleExpanded"
          translate-transition
          :class="[
            'translate-header w-2/12',
            expanded ? '' : 'rounded-br',
            $themeColor(backgroundColor) ? 'text-white' : ''
          ]"
          :style-current-language="`h-full flex items-center justify-center relative z-10 ${
            expanded ? '' : 'rounded-br'
          }`"
          :style-translate-list="`rounded-b w-full transition-transform duration-200 ease-out ${
            expanded
              ? 'translate-y-0 border-b border-x border-gray-200 border-opacity-20'
              : '-translate-y-full'
          }`"
          style-translate-item="p-3 text-center"
          :blok="$contentByName(blok.body, 'Translate')"
          :parent-background-color="backgroundColor"
          @translate-list-action="toggleExpanded(false)"
          @current-lang-action="expanded = !expanded"
          @mouseenter="$device.isDesktopOrTablet ? expandStill() : undefined"
          @mouseleave="$device.isDesktopOrTablet ? expandOut() : toggleExpanded(false)"
        />
      </div>
    </nav>
    <div class="header-loader header-loader-responsive"><slot name="header" /></div>
    <nav
      class="navbar-down fixed w-full h-16 flex items-center justify-center bottom-0 z-40 rounded-t shadow-[0_20px_20px_0_#0000000d]"
      :style="`background-color: ${backgroundColor};`"
    >
      <ul
        class="menu-wrapper wrapper-down w-full h-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl grid grid-cols-3"
      >
        <li
          v-for="item in $contentByName(blok.body, 'Route')"
          :key="item._uid"
          class="link-menu no-underline"
        >
          <RouteComponent class="h-full" icon-item icon-style="w-full h-full" :blok="item" />
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import LogoComponent from '@/storyblok/global/Logo';
import IconComponent from '@/storyblok/global/Icon';
import RouteComponent from '@/storyblok/global/Route';
import TranslateComponent from '@/storyblok/layout/Translate';
export default defineNuxtComponent({
  components: { TranslateComponent, LogoComponent, RouteComponent, IconComponent },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { $binaryControl } = useNuxtApp();
    const state = reactive({
      timer: 0,
      expanded: false
    });
    const { expanded, timer } = toRefs(state);
    const webName = enums.name;
    const backgroundColor = computed(() => $binaryControl(props.blok.background_color, 'color'));
    const backgroundColorMenu = computed(() =>
      $binaryControl(props.blok.background_color_menu, 'color')
    );
    const logoColors = computed(() => {
      const colors = props.blok.logo_colors.color;
      if (colors.length) return colors;
      else return [props.blok.logo_colors.color, props.blok.logo_colors.color];
    });
    const toggleExpanded = state => (expanded.value = state);

    const expandOut = () => {
      if (expanded.value) {
        timer.value = setTimeout(() => {
          toggleExpanded(false);
        }, 700);
      }
    };
    const expandStill = () => {
      if (expanded.value) {
        clearTimeout(timer.value);
        timer.value = 0;
      }
    };
    return {
      webName,
      expanded,
      expandOut,
      expandStill,
      logoColors,
      toggleExpanded,
      backgroundColor,
      backgroundColorMenu
    };
  }
});
</script>
<style>
.header-loader > * {
  background: #eeeeee !important;
}
.header-loader-responsive > * {
  @apply !top-10 !z-[1] mx-1 rounded-b-3xl;
}
</style>
