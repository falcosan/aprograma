<template>
  <div
    v-if="blok.body.length"
    ref="container"
    :class="`container-cover w-full ${
      carouselMode || sliderMode || containerMode ? 'grid' : 'parent-cover'
    }`"
  >
    <component
      :is="sliderMode || carouselMode || containerMode ? 'h2' : 'h1'"
      v-if="blok.title"
      :class="`container-title break-words text-xl ${
        sliderMode || carouselMode || containerMode
          ? blok.remove_space
            ? 'm-5'
            : 'mt-5 ml-10 mr-5'
          : 'sm:text-2xl'
      }`"
      :style="`color: ${blok.title_color.color};`"
    >
      {{ blok.title }}
    </component>
    <div
      :class="`container-content h-full rounded ${
        blok.slider_mode === 'slider' ? 'overflow-hidden' : ''
      }`"
      :style="`background-color: ${blok.background_color_container.color};`"
    >
      <div
        v-if="
          blok.body.length > 1 && (blok.slider_mode === 'slider' || blok.slider_mode === 'carousel')
        "
        :class="`slider-wrapper relative ${
          sliderMode || containerMode ? 'flex justify-center' : ''
        } ${
          !blok.remove_space
            ? !blok.background_color_container.color && blok.title
              ? 'p-5'
              : 'px-5 pb-5'
            : ''
        }`"
      >
        <IconComponent
          v-if="
            (blok.slider_mode === 'slider' ||
              windowWidth < 640 ||
              !isDesktop ||
              sliderMode ||
              carouselMode ||
              blok.row_container) &&
            !blok.hide_controllers
          "
          previous
          :class="`previous-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm text-white bg-gray-500 ${
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
          tag="button"
          @click="previous(true)"
        />
        <div
          v-else-if="
            blok.slider_mode === 'carousel' &&
            (!sliderMode || !carouselMode) &&
            !blok.row_container &&
            !blok.hide_controllers
          "
          class="previous-control control h-full w-full absolute top-0 z-10 -left-1/2 cursor-previous"
          @click="previous"
        />
        <IconComponent
          v-if="
            (blok.slider_mode === 'slider' ||
              windowWidth < 640 ||
              !isDesktop ||
              sliderMode ||
              carouselMode ||
              blok.row_container) &&
            !blok.hide_controllers
          "
          next
          :class="`next-control control absolute z-20 transform rounded-full bg-opacity-70 shadow-sm text-white bg-gray-500 ${
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
          tag="button"
          @click="next(true)"
        />
        <div
          v-else-if="
            blok.slider_mode === 'carousel' &&
            (!sliderMode || !carouselMode) &&
            !blok.row_container &&
            !blok.hide_controllers
          "
          class="next-control control h-full w-full absolute top-0 z-10 -right-1/2 cursor-next"
          @click="next"
        />
        <div
          ref="sliderBox"
          :class="`slider-box w-full rounded ${blok.slider_mode ? 'overflow-hidden' : ''}`"
        >
          <div v-if="blok.slider_mode === 'slider'" class="slider-container">
            <ul
              :key="sliderKey"
              :style="`min-height: ${blok.height}; transform: translateX(${-(
                (containerWidth + spaceFix) *
                sliderIndex
              )}px); gap: ${spaceFix}px;`"
              class="slider relative grid grid-flow-col-dense transition-transform"
            >
              <template v-for="component in elements" :key="component._uid">
                <li
                  ref="sliderSlide"
                  :tabindex="!blok.hide_controllers ? '0' : false"
                  :style="`width: ${containerWidth}px; background-color: ${blok.background_color_component.color};`"
                  :class="`slider-slide slide flex justify-self-center rounded ${setAlignContent} ${
                    !blok.hide_controllers ? 'outline-none' : ''
                  } ${sliderMode || carouselMode || containerMode ? '' : 'parent-slide'}`"
                  @keydown.right.prevent="!blok.hide_controllers ? next() : null"
                  @keydown.left.prevent="!blok.hide_controllers ? previous() : null"
                >
                  <StoryblokComponent
                    :class="`${component.name.toLowerCase()}-component my-0 mx-auto`"
                    :blok="component"
                    slider-mode
                    :container-width="containerWidth"
                  />
                </li>
              </template>
            </ul>
          </div>
          <div v-else class="carousel-container">
            <transition-group
              tag="ul"
              class="carousel relative grid rounded"
              enter-active-class="in-out duration-500"
              leave-active-class="out-in duration-500"
              :style="`min-height: ${blok.height};`"
            >
              <template v-for="(component, index) in elements" :key="component._uid">
                <li
                  v-show="index === currentSlide"
                  ref="carouselSlide"
                  :class="`carousel-slide slide w-full flex row-start-1 row-end-1 col-start-1 col-end-1 rounded ${setAlignContent} ${
                    !blok.hide_controllers ? 'outline-none' : ''
                  } ${
                    index === currentSlide ? `show ${transitionEnter}` : `hidden ${transitionLeave}`
                  } ${sliderMode || carouselMode || containerMode ? '' : 'parent-slide'}`"
                  :style="`background-color: ${blok.background_color_component.color};`"
                  :tabindex="!blok.hide_controllers ? '0' : false"
                  @keydown.right.prevent="!blok.hide_controllers ? next() : null"
                  @keydown.left.prevent="!blok.hide_controllers ? previous() : null"
                >
                  <StoryblokComponent
                    :class="`${component.name.toLowerCase()}-component my-0 mx-auto`"
                    :blok="component"
                    carousel-mode
                    :container-width="fullWidth"
                  />
                </li>
              </template>
            </transition-group>
            <div
              v-if="!blok.hide_dots"
              class="dot-container relative w-max max-w-1/2 flex flex-wrap justify-center z-20 my-10 mx-auto"
            >
              <span
                v-for="dot in elements.length"
                :key="dot"
                :class="`dot-number_${dot} w-2.5 h-2.5 inline-block m-1.5 rounded-full shadow-inner select-none cursor-pointer transform scale-90 transition-all duration-200 ${
                  !isDesktop ? '' : 'dot-desktop'
                } ${dot === currentSlide + 1 ? 'bg-gray-400' : 'bg-gray-900'}`"
                :style="dot === currentSlide + 1 ? 'box-shadow: 0 0 0 2px #9ca3af;' : undefined"
                @click="changeDot(dot)"
              >
                <span
                  v-if="isDesktop"
                  class="dot-text absolute w-5 h-5 flex justify-center items-center left-1/2 top-0 rounded-full text-xs text-white bg-opacity-70 bg-gray-900"
                  >{{ dot }}</span
                >
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="container-box h-full overflow-hidden">
        <div
          :class="`container-components h-full flex flex-wrap rounded -m-2.5 ${
            !blok.remove_space
              ? !blok.background_color_container.color && blok.title
                ? 'p-5'
                : 'px-5 pb-5'
              : ''
          }`"
          :style="`min-height: ${blok.height};`"
        >
          <template v-for="component in elements" :key="component._uid">
            <div
              :style="`flex: ${
                component.row_container
                  ? `1 ${(100 - (maxElements > 1 ? spaceFix : 0)) / maxElements}%`
                  : '100%'
              }; background-color: ${
                component.component.toLowerCase() === 'blank'
                  ? false
                  : blok.background_color_component.color
              };`"
              :class="`${component.name.toLowerCase()}-container ${
                sliderMode || carouselMode || containerMode ? '' : 'parent-container'
              } ${
                component.component.toLowerCase() === 'blank'
                  ? ''
                  : `${setAlignContent} m-2.5 rounded`
              }`"
            >
              <component
                :is="component.component"
                :class="`${component.name.toLowerCase()}-component`"
                :blok="component"
                container-mode
                :container-width="fullWidth"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Link from '@/storyblok/global/Link';
import IconComponent from '@/storyblok/global/Icon';
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
  components: { IconComponent, Link },
  setup(props) {
    const { isDesktop } = useDevice();
    const { windowWidth } = useScreen();
    const { $rangeItems } = useNuxtApp();
    const container = ref(null);
    const sliderBox = ref(null);
    const sliderSlide = ref(null);
    const carouselSlide = ref(null);
    const state = reactive({
      spaceFix: 20,
      sliderKey: 0,
      fullWidth: 0,
      sliderIndex: 0,
      setAutoPlay: 0,
      currentSlide: 0,
      containerWidth: 0,
      focusDisable: false,
      transitionEnter: '',
      transitionLeave: '',
      max: Number(props.blok.max_slides),
      columnSet: Number(props.blok.column_container)
    });
    const {
      max,
      spaceFix,
      sliderKey,
      fullWidth,
      columnSet,
      sliderIndex,
      setAutoPlay,
      focusDisable,
      currentSlide,
      containerWidth,
      transitionEnter,
      transitionLeave
    } = toRefs(state);
    const elements = computed(() => {
      if (props.blok.slider_mode === 'slider' || props.blok.slider_mode === 'carousel') {
        return props.blok.body;
      } else {
        return props.blok.body.filter(component =>
          component.resolution_show
            ? fullWidth.value >= Number(component.resolution_show.split('; ')[0])
            : component
        );
      }
    });
    const rowComponent = computed(() => {
      return elements.value.filter(item => item.row_container);
    });
    const defaultMax = computed(() => {
      if (fullWidth.value >= 1239) {
        return $rangeItems(elements.value.length - 1, 5);
      } else if (fullWidth.value >= 983) {
        return $rangeItems(elements.value.length - 1, 4);
      } else if (fullWidth.value >= 727) {
        return $rangeItems(elements.value.length - 1, 3);
      }
      return fullWidth.value >= 535 ? $rangeItems(elements.value.length - 1, 2) : 1;
    });
    const maxElements = computed(() => {
      if (
        (props.blok.slider_mode === 'slider' || props.blok.slider_mode === 'carousel') &&
        elements.value.length > 1
      ) {
        if (max.value && max.value <= defaultMax.value) {
          if (fullWidth.value >= 1239) {
            return $rangeItems(max.value, 5);
          } else if (fullWidth.value >= 983) {
            return $rangeItems(max.value, 4);
          } else if (fullWidth.value >= 727) {
            return $rangeItems(max.value, 3);
          }
          return fullWidth.value >= 535 ? $rangeItems(max.value, 2) : 1;
        } else {
          if (fullWidth.value >= 1239) {
            return $rangeItems(defaultMax.value, 5);
          } else if (fullWidth.value >= 983) {
            return $rangeItems(defaultMax.value, 4);
          } else if (fullWidth.value >= 727) {
            return $rangeItems(defaultMax.value, 3);
          }
          return fullWidth.value >= 535 ? $rangeItems(defaultMax.value, 2) : 1;
        }
      } else if (columnSet.value && elements.value.length > 1) {
        if (fullWidth.value + spaceFix.value * $rangeItems(defaultMax.value, 3) >= 1239) {
          return $rangeItems(columnSet.value, 3);
        }
        return fullWidth.value + spaceFix.value * $rangeItems(defaultMax.value, 3) >= 535
          ? $rangeItems(columnSet.value, 2)
          : 1;
      } else {
        if (fullWidth.value >= 983) {
          return $rangeItems(rowComponent.value.length, 3);
        }
        return fullWidth.value >= 535 ? $rangeItems(rowComponent.value.length, 2) : 1;
      }
    });
    const setAlignContent = computed(() => {
      switch (props.blok.align_content) {
        case 'center':
          return 'self-center';
        case 'end':
          return 'self-end';
        default:
          return 'self-start';
      }
    });
    const previous = (autoFocus = false) => {
      if (props.blok.auto_play) {
        setPrevious();
        clearAutoPlay();
        autoPlay();
      } else {
        setPrevious();
      }
      if (
        autoFocus &&
        !props.blok.hide_controllers &&
        sliderSlide.value != null &&
        Array.isArray(sliderSlide.value)
      ) {
        sliderSlide.value[0].focus();
      }
    };
    const setPrevious = () => {
      if (props.blok.slider_mode === 'slider') {
        if (
          -((containerWidth.value + spaceFix.value) * sliderIndex.value) + containerWidth.value <=
          1
        ) {
          sliderIndex.value--;
        } else {
          sliderIndex.value = elements.value.length - maxElements.value;
          if (props.blok.auto_play) clearAutoPlay();
        }
      } else if (props.blok.slider_mode === 'carousel') {
        if (currentSlide.value) {
          currentSlide.value--;
        } else {
          currentSlide.value = elements.value.length - 1;
          if (props.blok.auto_play) clearAutoPlay();
        }
        transitionEnter.value = 'enter-right';
        transitionLeave.value = 'leave-right';
      }
    };
    const next = (autoFocus = false) => {
      if (props.blok.auto_play) {
        setNext();
        clearAutoPlay();
        autoPlay();
      } else {
        setNext();
      }
      if (
        autoFocus &&
        !props.blok.hide_controllers &&
        sliderSlide.value != null &&
        Array.isArray(sliderSlide.value)
      ) {
        sliderSlide.value[0].focus();
      }
    };
    const setNext = () => {
      if (props.blok.slider_mode === 'slider') {
        if (
          -((containerWidth.value + spaceFix.value) * sliderIndex.value) -
            sliderBox.value.clientWidth >=
          -((containerWidth.value + spaceFix.value) * (elements.value.length - 1))
        ) {
          sliderIndex.value++;
        } else {
          sliderIndex.value = 0;
          if (props.blok.auto_play) clearAutoPlay();
        }
      } else if (props.blok.slider_mode === 'carousel') {
        if (elements.value.length - 1 > currentSlide.value) currentSlide.value++;
        else {
          currentSlide.value = 0;
          if (props.blok.auto_play) clearAutoPlay();
        }
        transitionEnter.value = 'enter-left';
        transitionLeave.value = 'leave-left';
      }
    };
    const changeDot = input => {
      if (props.blok.auto_play) {
        clearAutoPlay();
        autoPlay();
      }
      currentSlide.value = input - 1;
      transitionEnter.value = '';
      transitionLeave.value = '';
    };
    const autoPlay = () => {
      setAutoPlay.value = setTimeout(next, props.blok.slider_time || '5000');
    };
    const clearAutoPlay = () => {
      clearTimeout(setAutoPlay.value);
      setAutoPlay.value = 0;
    };
    const getContainerWidth = () => {
      const containerSelect =
        props.blok.body.length > 1 &&
        (props.blok.slider_mode === 'slider' || props.blok.slider_mode === 'carousel')
          ? sliderBox.value.clientWidth
          : container.value.clientWidth;
      if (props.sliderMode || props.carouselMode || props.containerMode) {
        nextTick(() => {
          fullWidth.value = containerSelect;
          containerWidth.value =
            containerSelect / maxElements.value -
            (spaceFix.value / maxElements.value) * (maxElements.value - 1);
        });
      } else {
        fullWidth.value = containerSelect;
        containerWidth.value =
          containerSelect / maxElements.value -
          (spaceFix.value / maxElements.value) * (maxElements.value - 1);
      }
    };
    const focusContainer = element => {
      if (!focusDisable.value) {
        nextTick(() => element.focus({ preventScroll: true }));
      }
    };
    const clearAll = () => {
      focusDisable.value = true;
      transitionEnter.value = '';
      transitionLeave.value = '';
      if (
        (props.blok.slider_mode === 'slider' || props.blok.slider_mode === 'carousel') &&
        props.blok.auto_play
      ) {
        clearAutoPlay();
      }
    };
    onMounted(() => {
      getContainerWidth();
      if (
        (props.blok.slider_mode === 'slider' || props.blok.slider_mode === 'carousel') &&
        props.blok.auto_play
      ) {
        autoPlay();
      }
    });
    onBeforeUpdate(getContainerWidth);
    onBeforeUnmount(clearAll);
    watch(
      () => windowWidth.value,
      () => {
        getContainerWidth();
        if (props.blok.slider_mode === 'slider') sliderKey.value++;
      }
    );
    watch(
      () => fullWidth.value,
      () => (sliderIndex.value = 0)
    );
    return {
      next,
      elements,
      container,
      previous,
      changeDot,
      spaceFix,
      isDesktop,
      fullWidth,
      sliderKey,
      sliderBox,
      maxElements,
      windowWidth,
      sliderSlide,
      sliderIndex,
      currentSlide,
      carouselSlide,
      focusContainer,
      containerWidth,
      transitionLeave,
      transitionEnter,
      setAlignContent
    };
  }
});
</script>
<style scoped>
.parent-cover > .container-content > .container-components {
  position: relative;
  top: 10px;
  margin-top: -20px;
}
.hidden {
  display: flex !important;
  opacity: 0;
  pointer-events: none;
  cursor: none;
  visibility: hidden;
}
.show {
  opacity: 1;
}
.show > * {
  position: relative;
  z-index: 1;
}
.hidden.leave-right {
  animation: moveLeaveRight 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.hidden.leave-left {
  animation: moveLeaveLeft 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.show.enter-right {
  animation: moveEnterRight 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.show.enter-left {
  animation: moveEnterLeft 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
@keyframes moveEnterRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes moveEnterLeft {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes moveLeaveRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
@keyframes moveLeaveLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
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
