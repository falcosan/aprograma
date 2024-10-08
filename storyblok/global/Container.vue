<template>
  <div
    v-if="blok.body.length"
    ref="container"
    :class="`container-cover w-full ${
      carouselMode || sliderMode || containerMode ? 'grid' : 'parent-cover'
    }`"
  >
    <span
      v-if="blok.title"
      :class="[
        'container-title block break-words text-xl',
        sliderMode || carouselMode || containerMode
          ? blok.remove_space
            ? 'm-5'
            : 'my-5 ml-10 mr-5'
          : 'sm:text-2xl mb-5',
        {
          'dark:invert':
            !blok.title_color.color &&
            !parent?.background_color_component?.color
        }
      ]"
      :style="`color: ${$binaryControl(blok.title_color, 'color')};`"
    >
      {{ blok.title }}
    </span>
    <div
      :key="widthContainer"
      :class="`container-content h-full rounded ${
        blok.slider_mode === 'slider' ? 'overflow-hidden' : ''
      }`"
      :style="`background-color: ${$binaryControl(blok.background_color_container, 'color')};`"
    >
      <div
        v-if="
          blok.body.length > 1 &&
          (blok.slider_mode === 'slider' || blok.slider_mode === 'carousel')
        "
        :class="[
          'slider-wrapper relative',
          { 'flex justify-center': sliderMode || containerMode },
          { 'p-5': !blok.remove_space }
        ]"
        @mouseenter="
          blok.slider_mode === 'carousel' && focusContainer(carouselSlide[0])
        "
      >
        <IconComponent
          v-show="
            (blok.slider_mode === 'slider' ||
              windowWidth < 768 ||
              !$device.isDesktop ||
              sliderMode ||
              carouselMode ||
              blok.row_container) &&
            !blok.hide_controllers
          "
          previous
          :class="`previous-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm cursor-pointer text-white bg-gray-500 ${
            blok.slider_mode === 'slider'
              ? 'top-1/2 -translate-y-1/2'
              : sliderMode || carouselMode
                ? !blok.hide_dots
                  ? 'bottom-3.5'
                  : '-bottom-3.5'
                : !blok.hide_dots
                  ? 'bottom-7'
                  : '-bottom-7'
          } ${sliderMode ? (fullWidth > 295 ? 'left-10' : 'left-5') : 'left-2'}`"
          :size="`${sliderMode || carouselMode ? 'w-5 h-5 p-1.5' : 'w-6 h-6 p-2'}`"
          @click="previous(true)"
        />
        <div
          v-show="
            (blok.slider_mode === 'carousel' &&
              windowWidth >= 768 &&
              $device.isDesktop &&
              !sliderMode &&
              !carouselMode &&
              !blok.row_container) ||
            blok.hide_controllers
          "
          class="previous-control control h-full w-full absolute top-0 z-[1] -left-1/2 cursor-previous-black dark:cursor-previous-white"
          @click="previous(true)"
        />
        <IconComponent
          v-show="
            (blok.slider_mode === 'slider' ||
              windowWidth < 768 ||
              !$device.isDesktop ||
              sliderMode ||
              carouselMode ||
              blok.row_container) &&
            !blok.hide_controllers
          "
          next
          :class="`next-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm cursor-pointer text-white bg-gray-500 ${
            blok.slider_mode === 'slider'
              ? 'top-1/2 -translate-y-1/2'
              : sliderMode || carouselMode
                ? !blok.hide_dots
                  ? 'bottom-3.5'
                  : '-bottom-3.5'
                : !blok.hide_dots
                  ? 'bottom-7'
                  : '-bottom-7'
          } ${sliderMode ? (fullWidth > 295 ? 'right-10' : 'right-5') : 'right-2'}`"
          :size="`${sliderMode || carouselMode ? 'w-5 h-5 p-1.5' : 'w-6 h-6 p-2'}`"
          @click="next(true)"
        />
        <div
          v-show="
            (blok.slider_mode === 'carousel' &&
              windowWidth >= 768 &&
              $device.isDesktop &&
              !sliderMode &&
              !carouselMode &&
              !blok.row_container) ||
            blok.hide_controllers
          "
          class="next-control control h-full w-full absolute top-0 z-[1] -right-1/2 cursor-next-black dark:cursor-next-white"
          @click="next(true)"
        />
        <div
          ref="sliderBox"
          :class="`slider-box w-full rounded ${blok.slider_mode ? 'overflow-hidden' : ''}`"
        >
          <div v-if="blok.slider_mode === 'slider'" class="slider-container">
            <ul
              :style="`min-height:${$binaryControl(blok, 'height')}; transform: translateX(${-(
                (containerWidth + spaceFix) *
                sliderIndex
              )}px); gap: ${spaceFix}px;`"
              class="slider relative grid grid-flow-col-dense transition-transform"
            >
              <li
                v-for="component in elements"
                :key="component._uid"
                ref="sliderSlide"
                :tabindex="!blok.hide_controllers ? '0' : undefined"
                :style="`width: ${containerWidth}px; background-color: ${$binaryControl(
                  blok.background_color_component,
                  'color'
                )};`"
                :class="`slider-slide slide flex justify-self-center rounded ${setHorizontalAlign} ${setVerticalAlign} ${
                  !blok.hide_controllers ? 'outline-none' : ''
                } ${sliderMode || carouselMode || containerMode ? '' : 'parent-slide'}`"
                @keydown.right.prevent="
                  !blok.hide_controllers ? next(true) : null
                "
                @keydown.left.prevent="
                  !blok.hide_controllers ? previous(true) : null
                "
                @mouseenter="focusContainer(sliderSlide[0])"
              >
                <StoryblokComponent
                  :class="`${component.name.toLowerCase()}-component my-0 mx-auto`"
                  :blok="component"
                  slider-mode
                  :container-width="containerWidth"
                />
              </li>
            </ul>
          </div>
          <div v-else class="carousel-container">
            <TransitionGroup
              tag="ul"
              class="carousel relative grid justify-center rounded"
              enter-from-class="opacity-0"
              leave-to-class="opacity-0"
              enter-active-class="transition duration-500"
              leave-active-class="transition duration-500"
              :style="`min-height:${$binaryControl(blok, 'height')};`"
            >
              <li
                v-for="(component, index) in elements"
                v-show="widthContainer ? index === currentSlide : true"
                :key="component._uid"
                ref="carouselSlide"
                :tabindex="!blok.hide_controllers ? '0' : undefined"
                :class="`carousel-slide slide md:relative w-full flex row-start-1 row-end-1 col-start-1 col-end-1 md:z-[1] rounded ${setHorizontalAlign} ${setVerticalAlign} ${
                  !blok.hide_controllers ? 'outline-none' : ''
                } ${index === currentSlide ? 'show' : 'hidden'} ${
                  sliderMode || carouselMode || containerMode
                    ? ''
                    : 'parent-slide'
                }`"
                :style="`background-color:${$binaryControl(
                  blok.background_color_component,
                  'color'
                )};`"
                @keydown.right.prevent="
                  !blok.hide_controllers ? next(true) : null
                "
                @keydown.left.prevent="
                  !blok.hide_controllers ? previous(true) : null
                "
              >
                <StoryblokComponent
                  :class="`${component.name.toLowerCase()}-component my-0 mx-auto`"
                  :blok="component"
                  carousel-mode
                  :container-width="fullWidth"
                />
              </li>
            </TransitionGroup>
            <div
              v-if="!blok.hide_dots"
              class="dot-container relative w-max max-w-1/2 flex flex-wrap justify-center z-20 my-10 mx-auto"
            >
              <span
                v-for="dot in elements.length"
                :key="dot"
                :class="`dot-number_${dot} w-2.5 h-2.5 inline-block m-1.5 rounded-full shadow-inner select-none cursor-pointer transform scale-90 transition-all duration-200 ${
                  !$device.isDesktop ? '' : 'dot-desktop'
                } ${dot === currentSlide + 1 ? 'bg-gray-300' : 'bg-gray-500'}`"
                :style="
                  dot === currentSlide + 1
                    ? 'box-shadow: 0 0 0 2px #d1d5db;'
                    : undefined
                "
                @click="changeDot(dot)"
              >
                <span
                  v-if="$device.isDesktop"
                  class="dot-text absolute w-5 h-5 flex justify-center items-center left-1/2 top-0 rounded-full text-xs text-white bg-opacity-70 bg-gray-500"
                  >{{ dot }}</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="container-box h-full overflow-hidden">
        <div
          :class="[
            'container-components h-full flex flex-wrap rounded -m-2.5',
            { 'p-5': !blok.remove_space }
          ]"
          :style="`min-height:${$binaryControl(blok, 'height')};`"
        >
          <div
            v-for="component in elements"
            :key="component._uid"
            :style="`flex: ${
              component.row_container
                ? `1 ${(100 - (maxElements > 1 ? spaceFix : 0)) / maxElements}%`
                : '100%'
            }; background-color: ${
              !blok.background_color_component.color ||
              component.component.toLowerCase() === 'blank'
                ? 'unset'
                : blok.background_color_component.color
            };`"
            :class="`${component.name.toLowerCase()}-container ${
              sliderMode || carouselMode || containerMode
                ? ''
                : 'parent-container'
            } ${
              component.component.toLowerCase() === 'blank'
                ? ''
                : `${
                    setHorizontalAlign ? `flex ${setHorizontalAlign}` : ''
                  } ${setVerticalAlign} m-2.5 rounded`
            }`"
          >
            <StoryblokComponent
              :class="`${component.name.toLowerCase()}-component`"
              :blok="component"
              container-mode
              :container-width="fullWidth"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconComponent from '@/storyblok/global/Icon'
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      required: true
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
  components: { IconComponent },
  provide() {
    return {
      parent: this.blok
    }
  },
  setup(props) {
    const { $rangeItems } = useNuxtApp()
    const { windowWidth, elementSize } = useScreen()
    const container = ref(null)
    const sliderBox = ref(null)
    const sliderSlide = ref(null)
    const carouselSlide = ref(null)
    const state = reactive({
      spaceFix: 20,
      fullWidth: 0,
      sliderIndex: 0,
      setAutoPlay: 0,
      currentSlide: 0,
      containerWidth: 0,
      focusDisable: false,
      max: Number(props.blok.max_slides),
      columnSet: Number(props.blok.column_container)
    })
    const {
      max,
      spaceFix,
      fullWidth,
      columnSet,
      sliderIndex,
      setAutoPlay,
      focusDisable,
      currentSlide,
      containerWidth
    } = toRefs(state)
    const { width: widthContainer } = elementSize(container)
    const { width: widthSliderBox } = elementSize(sliderBox)
    const elements = computed(() => {
      if (
        props.blok.slider_mode === 'slider' ||
        props.blok.slider_mode === 'carousel'
      ) {
        return props.blok.body
      } else {
        return props.blok.body.filter((component) =>
          component.resolution_show
            ? fullWidth.value >=
              Number(component.resolution_show.split('; ')[0])
            : component
        )
      }
    })
    const rowComponent = computed(() => {
      return elements.value.filter((item) => item.row_container)
    })
    const defaultMax = computed(() => {
      if (fullWidth.value >= 1239) {
        return $rangeItems(elements.value.length - 1, 5)
      } else if (fullWidth.value >= 983) {
        return $rangeItems(elements.value.length - 1, 4)
      } else if (fullWidth.value >= 727) {
        return $rangeItems(elements.value.length - 1, 3)
      }
      return fullWidth.value >= 535
        ? $rangeItems(elements.value.length - 1, 2)
        : 1
    })
    const maxElements = computed(() => {
      if (
        (props.blok.slider_mode === 'slider' ||
          props.blok.slider_mode === 'carousel') &&
        elements.value.length > 1
      ) {
        const setterMax =
          max.value && max.value <= defaultMax.value
            ? max.value
            : defaultMax.value
        if (fullWidth.value >= 1239) return $rangeItems(setterMax, 5)
        else if (fullWidth.value >= 983) return $rangeItems(setterMax, 4)
        else if (fullWidth.value >= 727) return $rangeItems(setterMax, 3)
        else return fullWidth.value >= 535 ? $rangeItems(setterMax, 2) : 1
      } else if (columnSet.value && elements.value.length > 1) {
        if (
          fullWidth.value + spaceFix.value * $rangeItems(defaultMax.value, 3) >=
          1239
        ) {
          return $rangeItems(columnSet.value, 3)
        } else {
          return fullWidth.value +
            spaceFix.value * $rangeItems(defaultMax.value, 3) >=
            535
            ? $rangeItems(columnSet.value, 2)
            : 1
        }
      } else if (fullWidth.value >= 983)
        return $rangeItems(rowComponent.value.length, 3)
      else
        return fullWidth.value >= 535
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
          return 'justify-start'
        case 'center':
          return 'justify-center'
        case 'right':
          return 'justify-end'
        default:
          return ''
      }
    })
    const parent = computed(() => parentInjection())
    const parentInjection = () =>
      props.sliderMode || props.carouselMode || props.containerMode
        ? inject('parent')
        : undefined
    const previous = (autoFocus = false) => {
      if (props.blok.auto_play) {
        setPrevious()
        clearAutoPlay()
        autoPlay()
      } else {
        setPrevious()
      }
      if (autoFocus && !props.blok.hide_controllers) {
        if (
          props.blok.slider_mode === 'slider' &&
          sliderSlide.value != null &&
          Array.isArray(sliderSlide.value)
        ) {
          focusContainer(sliderSlide.value[0])
        } else if (
          props.blok.slider_mode === 'carousel' &&
          carouselSlide.value != null &&
          Array.isArray(carouselSlide.value)
        ) {
          focusContainer(carouselSlide.value[currentSlide.value])
        }
      }
    }
    const setPrevious = () => {
      if (props.blok.slider_mode === 'slider') {
        if (
          -((containerWidth.value + spaceFix.value) * sliderIndex.value) +
            containerWidth.value <=
          1
        ) {
          sliderIndex.value--
        } else {
          sliderIndex.value = elements.value.length - maxElements.value
          if (props.blok.auto_play) clearAutoPlay()
        }
      } else if (props.blok.slider_mode === 'carousel') {
        if (currentSlide.value) {
          currentSlide.value--
        } else {
          currentSlide.value = elements.value.length - 1
          if (props.blok.auto_play) clearAutoPlay()
        }
      }
    }
    const next = (autoFocus = false) => {
      if (props.blok.auto_play) {
        setNext()
        clearAutoPlay()
        autoPlay()
      } else {
        setNext()
      }
      if (autoFocus && !props.blok.hide_controllers) {
        if (
          props.blok.slider_mode === 'slider' &&
          sliderSlide.value != null &&
          Array.isArray(sliderSlide.value)
        ) {
          focusContainer(sliderSlide.value[0])
        } else if (
          props.blok.slider_mode === 'carousel' &&
          carouselSlide.value != null &&
          Array.isArray(carouselSlide.value)
        ) {
          focusContainer(carouselSlide.value[currentSlide.value])
        }
      }
    }
    const setNext = () => {
      if (props.blok.slider_mode === 'slider') {
        if (
          -((containerWidth.value + spaceFix.value) * sliderIndex.value) -
            widthSliderBox.value >=
          -(
            (containerWidth.value + spaceFix.value) *
            (elements.value.length - 1)
          )
        ) {
          sliderIndex.value++
        } else {
          sliderIndex.value = 0
          if (props.blok.auto_play) clearAutoPlay()
        }
      } else if (props.blok.slider_mode === 'carousel') {
        if (elements.value.length - 1 > currentSlide.value) currentSlide.value++
        else {
          currentSlide.value = 0
          if (props.blok.auto_play) clearAutoPlay()
        }
      }
    }
    const changeDot = (input) => {
      if (props.blok.auto_play) {
        clearAutoPlay()
        autoPlay()
      }
      currentSlide.value = input - 1
    }
    const autoPlay = () => {
      setAutoPlay.value = setTimeout(
        () => next(true),
        props.blok.slider_time || '5000'
      )
    }
    const clearAutoPlay = () => {
      clearTimeout(setAutoPlay.value)
      setAutoPlay.value = 0
    }
    const getContainerWidth = () => {
      const containerSelect =
        props.blok.body.length > 1 &&
        (props.blok.slider_mode === 'slider' ||
          props.blok.slider_mode === 'carousel')
          ? widthSliderBox.value
          : widthContainer.value
      fullWidth.value = containerSelect
      containerWidth.value =
        containerSelect / maxElements.value -
        (spaceFix.value / maxElements.value) * (maxElements.value - 1)
    }
    const focusContainer = (element) => {
      if (!focusDisable.value)
        nextTick(() => element.focus({ preventScroll: true }))
    }
    const clearAll = () => {
      focusDisable.value = true
      if (
        (props.blok.slider_mode === 'slider' ||
          props.blok.slider_mode === 'carousel') &&
        props.blok.auto_play
      ) {
        clearAutoPlay()
      }
    }
    onBeforeMount(() => {
      if (
        (props.blok.slider_mode === 'slider' ||
          props.blok.slider_mode === 'carousel') &&
        props.blok.auto_play
      ) {
        autoPlay()
      }
    })
    onBeforeUnmount(clearAll)
    watch(fullWidth, () => (sliderIndex.value = 0))
    watch([widthContainer, widthSliderBox], getContainerWidth)
    return {
      next,
      parent,
      elements,
      container,
      previous,
      changeDot,
      spaceFix,
      fullWidth,
      sliderBox,
      maxElements,
      windowWidth,
      sliderSlide,
      sliderIndex,
      currentSlide,
      carouselSlide,
      widthContainer,
      focusContainer,
      containerWidth,
      setVerticalAlign,
      setHorizontalAlign
    }
  }
})
</script>
<style scoped>
.parent-cover > .container-content > .container-components {
  position: relative;
  top: 10px;
  margin-top: -20px;
}

.hidden {
  pointer-events: none;
  cursor: none;
  visibility: hidden;
}

.show > * {
  position: relative;
  z-index: 1;
}

.slider-box .slider .slider-slide {
  transform: translate3d(0, 0, 0);
}

.dot-desktop .dot-text {
  opacity: 0;
  pointer-events: none;
  transform: translate(-10.5px, -25px);
  transition: opacity 0.2s ease;
}

.dot-desktop:hover .dot-text {
  opacity: 1;
}
</style>
