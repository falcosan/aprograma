<template>
  <section
    v-if="blok.hide"
    class="page-maintenance fixed w-full h-full flex items-center justify-center inset-0 px-5"
  >
    <h1
      class="maintenance-text p-10 lg:p-20 text-center pointer-events-none rounded uppercase italic bg-opacity-80 bg-white"
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
  <section v-else :class="`${blok.name.toLowerCase()}-page p-5`">
    <h1
      v-if="blok.title"
      class="page-title block mb-5 break-words"
      :style="`color: ${$binaryControl(blok.title_color, 'color')};`"
      v-text="blok.title"
    />
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
          `${component.component.toLowerCase()}-content m-2.5`,
          {
            [`${setHorizontalAlign} ${setVerticalAlign}`]:
              component.component.toLowerCase() !== 'blank'
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
</template>

<script>
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { windowWidth } = useScreen()
    const { $rangeItems, $noscroll } = useNuxtApp()
    const state = reactive({ spaceFix: 20 })
    const { spaceFix } = toRefs(state)
    const rowComponent = computed(() =>
      props.blok.body.filter((item) => item.row_container)
    )
    const components = computed(() =>
      props.blok.body.filter((component) =>
        component.resolution_show
          ? windowWidth.value >= component.resolution_show.split('; ')[1]
          : component
      )
    )
    const maxComponents = computed(() => {
      if (Number(props.blok.column_container)) {
        if (windowWidth.value >= 1440)
          return $rangeItems(Number(props.blok.column_container), 3)
        else
          return windowWidth.value >= 768
            ? $rangeItems(Number(props.blok.column_container), 2)
            : 1
      } else if (windowWidth.value >= 1440)
        return $rangeItems(rowComponent.value.length, 3)
      else
        return windowWidth.value >= 768
          ? $rangeItems(rowComponent.value.length, 2)
          : 1
    })
    const setVerticalAlign = computed(() => {
      switch (props.blok.vertical_align) {
        case 'center':
          return 'self-center'
        case 'end':
          return 'self-end'
        default:
          return 'self-start'
      }
    })
    const setHorizontalAlign = computed(() => {
      switch (props.blok.horizontal_align) {
        case 'left':
          return 'flex justify-start'
        case 'center':
          return 'flex justify-center'
        case 'right':
          return 'flex justify-end'
        default:
          return ''
      }
    })
    onBeforeMount(() => $noscroll(props.blok.hide))
    return {
      spaceFix,
      components,
      maxComponents,
      setVerticalAlign,
      setHorizontalAlign
    }
  }
})
</script>
