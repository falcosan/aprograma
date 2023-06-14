<template>
  <section v-if="!blok.hide" :class="`${blok.name.toLowerCase()}-page p-5`">
    <h1 v-if="blok.title" class="page-title mb-5 text-xl sm:text-2xl break-words">
      {{ blok.title }}
    </h1>
    <div class="page-components relative flex flex-wrap -m-2.5">
      <StoryblokComponent
        v-for="component in components"
        :key="component._uid"
        :blok="component"
        :style="`flex: ${
          component.row_container
            ? `1 ${(100 - (maxComponents > 1 ? spaceFix : 0)) / $rangeItems(maxComponents, 3)}%`
            : '100%'
        };`"
        :class="[
          `${component.component.toLowerCase()}-content`,
          {
            [`${setAlignContent} m-2.5`]: component.component.toLowerCase() !== 'blank'
          },
          {
            'overflow-hidden':
              component.component.toLowerCase() === 'container' &&
              component.slider_mode === 'slider'
          }
        ]"
      />
    </div>
  </section>
  <section
    v-else
    class="page-maintenance fixed max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl flex items-center justify-center inset-0 px-5"
  >
    <h1
      class="maintenance-text p-20 text-xs xs:text-base sm:text-lg text-center pointer-events-none rounded uppercase italic bg-opacity-80 bg-white"
    >
      {{
        $languageCase(
          'This page is in maintenance, sorry for the inconvenience',
          'Esta página está en mantenimiento, disculpe las molestias',
          "Questa pagina è in manutenzione, scusa per l'inconveniente"
        )
      }}
    </h1>
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { windowWidth } = useScreen();
    const { $rangeItems, $noscroll } = useNuxtApp();
    const state = reactive({ spaceFix: 20 });
    const { spaceFix } = toRefs(state);
    const rowComponent = computed(() => props.blok.body.filter(item => item.row_container));
    const components = computed(() =>
      props.blok.body.filter(component =>
        component.resolution_show
          ? windowWidth.value >= component.resolution_show.split('; ')[1]
          : component
      )
    );
    const maxComponents = computed(() => {
      if (Number(props.blok.column_container)) {
        if (windowWidth.value >= 1440) {
          return $rangeItems(Number(props.blok.column_container), 3);
        }
        return windowWidth.value >= 768 ? $rangeItems(Number(props.blok.column_container), 2) : 1;
      } else {
        if (windowWidth.value >= 1440) {
          return $rangeItems(rowComponent.value.length, 3);
        }
        return windowWidth.value >= 768 ? $rangeItems(rowComponent.value.length, 2) : 1;
      }
    });
    const setAlignContent = computed(() => {
      switch (props.blok.align_content) {
        case 'start':
          return 'self-start';
        case 'center':
          return 'self-center';
        case 'end':
          return 'self-end';
        default:
          return 'self-baseline';
      }
    });
    (() => $noscroll(props.blok.hide))();
    return {
      spaceFix,
      components,
      maxComponents,
      setAlignContent
    };
  }
};
</script>
