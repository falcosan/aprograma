<template>
  <div
    v-if="blok.body.length > 0"
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
        <Icon
          v-if="
            (blok.slider_mode === 'slider' ||
              $store.state.data.windowWidth < 640 ||
              !$device.isDesktop ||
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
        <Icon
          v-if="
            (blok.slider_mode === 'slider' ||
              $store.state.data.windowWidth < 640 ||
              !$device.isDesktop ||
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
                  @mouseenter="focusContainer($refs.sliderSlide[0])"
                >
                  <component
                    :is="component.component"
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
                  @mouseenter="focusContainer($refs.carouselSlide[0])"
                  @keydown.right.prevent="!blok.hide_controllers ? next() : null"
                  @keydown.left.prevent="!blok.hide_controllers ? previous() : null"
                >
                  <component
                    :is="component.component"
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
                  !$device.isDesktop ? '' : 'dot-desktop'
                } ${dot === currentSlide + 1 ? 'bg-gray-400' : 'bg-gray-900'}`"
                :style="dot === currentSlide + 1 ? 'box-shadow: 0 0 0 2px #9ca3af;' : undefined"
                @click="changeDot(dot)"
              >
                <span
                  v-if="$device.isDesktop"
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
export default {
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
  data() {
    return {
      max: Number(this.blok.max_slides),
      columnSet: Number(this.blok.column_container),
      sliderKey: 0,
      sliderIndex: 0,
      currentSlide: 0,
      setAutoPlay: 0,
      fullWidth: 0,
      containerWidth: 0,
      transitionEnter: '',
      transitionLeave: '',
      spaceFix: 20,
      focusDisable: false
    };
  },
  computed: {
    elements() {
      if (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') {
        return this.blok.body;
      } else {
        return this.blok.body.filter(component =>
          component.resolution_show
            ? this.fullWidth >= Number(component.resolution_show.split('; ')[0])
            : component
        );
      }
    },
    rowComponent() {
      return this.elements.filter(function (item) {
        return item.row_container;
      });
    },
    defaultMax() {
      if (this.fullWidth >= 1239) {
        return this.$rangeItems(this.elements.length - 1, 5);
      } else if (this.fullWidth >= 983) {
        return this.$rangeItems(this.elements.length - 1, 4);
      } else if (this.fullWidth >= 727) {
        return this.$rangeItems(this.elements.length - 1, 3);
      }
      return this.fullWidth >= 535 ? this.$rangeItems(this.elements.length - 1, 2) : 1;
    },
    maxElements() {
      if (
        (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') &&
        this.elements.length > 1
      ) {
        if (this.max && this.max <= this.defaultMax) {
          if (this.fullWidth >= 1239) {
            return this.$rangeItems(this.max, 5);
          } else if (this.fullWidth >= 983) {
            return this.$rangeItems(this.max, 4);
          } else if (this.fullWidth >= 727) {
            return this.$rangeItems(this.max, 3);
          }
          return this.fullWidth >= 535 ? this.$rangeItems(this.max, 2) : 1;
        } else {
          if (this.fullWidth >= 1239) {
            return this.$rangeItems(this.defaultMax, 5);
          } else if (this.fullWidth >= 983) {
            return this.$rangeItems(this.defaultMax, 4);
          } else if (this.fullWidth >= 727) {
            return this.$rangeItems(this.defaultMax, 3);
          }
          return this.fullWidth >= 535 ? this.$rangeItems(this.defaultMax, 2) : 1;
        }
      } else if (this.columnSet && this.elements.length > 1) {
        if (this.fullWidth + this.spaceFix * this.$rangeItems(this.defaultMax, 3) >= 1239) {
          return this.$rangeItems(this.columnSet, 3);
        }
        return this.fullWidth + this.spaceFix * this.$rangeItems(this.defaultMax, 3) >= 535
          ? this.$rangeItems(this.columnSet, 2)
          : 1;
      } else {
        if (this.fullWidth >= 983) {
          return this.$rangeItems(this.rowComponent.length, 3);
        }
        return this.fullWidth >= 535 ? this.$rangeItems(this.rowComponent.length, 2) : 1;
      }
    },
    setAlignContent() {
      switch (this.blok.align_content) {
        case 'start':
          return 'self-start';
        case 'center':
          return 'self-center';
        case 'end':
          return 'self-end';
      }
      return '';
    }
  },
  watch: {
    '$store.state.data.windowWidth'() {
      this.getContainerWidth();
      if (this.blok.slider_mode === 'slider') {
        this.sliderKey++;
      }
    },
    fullWidth() {
      if (this.sliderIndex > 0) {
        this.sliderIndex = 0;
      }
    }
  },
  mounted() {
    this.getContainerWidth();
    if (
      (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') &&
      this.blok.auto_play
    ) {
      this.autoPlay();
    }
  },
  beforeUpdate() {
    this.getContainerWidth();
  },
  beforeUnmount() {
    this.clearAll();
  },
  methods: {
    setPrevious() {
      if (this.blok.slider_mode === 'slider') {
        if (
          -((this.containerWidth + this.spaceFix) * this.sliderIndex) + this.containerWidth <=
          1
        ) {
          this.sliderIndex--;
        } else {
          this.sliderIndex = this.elements.length - this.maxElements;
          if (this.blok.auto_play) {
            this.clearAutoPlay();
          }
        }
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.currentSlide > 0) {
          this.currentSlide--;
        } else {
          this.currentSlide = this.elements.length - 1;
          if (this.blok.auto_play) {
            this.clearAutoPlay();
          }
        }
        this.transitionEnter = 'enter-right';
        this.transitionLeave = 'leave-right';
      }
    },
    setNext() {
      if (this.blok.slider_mode === 'slider') {
        if (
          -((this.containerWidth + this.spaceFix) * this.sliderIndex) -
            this.$refs.sliderBox.clientWidth >=
          -((this.containerWidth + this.spaceFix) * (this.elements.length - 1))
        ) {
          this.sliderIndex++;
        } else {
          this.sliderIndex = 0;
          if (this.blok.auto_play) {
            this.clearAutoPlay();
          }
        }
      } else if (this.blok.slider_mode === 'carousel') {
        if (this.elements.length - 1 > this.currentSlide) {
          this.currentSlide++;
        } else {
          this.currentSlide = 0;
          if (this.blok.auto_play) {
            this.clearAutoPlay();
          }
        }
        this.transitionEnter = 'enter-left';
        this.transitionLeave = 'leave-left';
      }
    },
    next(autoFocus = false) {
      if (this.blok.auto_play) {
        this.setNext();
        this.clearAutoPlay();
        this.autoPlay();
      } else {
        this.setNext();
      }
      if (
        autoFocus &&
        !this.blok.hide_controllers &&
        this.$refs.sliderSlide != null &&
        Array.isArray(this.$refs.sliderSlide)
      ) {
        this.$refs.sliderSlide[0].focus();
      }
    },
    previous(autoFocus = false) {
      if (this.blok.auto_play) {
        this.setPrevious();
        this.clearAutoPlay();
        this.autoPlay();
      } else {
        this.setPrevious();
      }
      if (
        autoFocus &&
        !this.blok.hide_controllers &&
        this.$refs.sliderSlide != null &&
        Array.isArray(this.$refs.sliderSlide)
      ) {
        this.$refs.sliderSlide[0].focus();
      }
    },
    changeDot(input) {
      if (this.blok.auto_play) {
        this.clearAutoPlay();
        this.autoPlay();
      }
      this.currentSlide = input - 1;
      this.transitionEnter = '';
      this.transitionLeave = '';
    },
    autoPlay() {
      this.setAutoPlay = setTimeout(
        this.next,
        this.blok.slider_time ? this.blok.slider_time : '5000'
      );
    },
    clearAutoPlay() {
      clearTimeout(this.setAutoPlay);
      this.setAutoPlay = 0;
    },
    getContainerWidth() {
      const containerSelect =
        this.blok.body.length > 1 &&
        (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel')
          ? this.$refs.sliderBox.clientWidth
          : this.$el.clientWidth;
      if (this.sliderMode || this.carouselMode || this.containerMode) {
        this.$nextTick(function () {
          this.fullWidth = containerSelect;
          this.containerWidth =
            containerSelect / this.maxElements -
            (this.spaceFix / this.maxElements) * (this.maxElements - 1);
        });
      } else {
        this.fullWidth = containerSelect;
        this.containerWidth =
          containerSelect / this.maxElements -
          (this.spaceFix / this.maxElements) * (this.maxElements - 1);
      }
    },
    focusContainer(element) {
      if (!this.focusDisable) {
        this.$nextTick(function () {
          element.focus({ preventScroll: true });
        });
      }
    },
    clearAll() {
      this.focusDisable = true;
      this.transitionEnter = '';
      this.transitionLeave = '';
      if (
        (this.blok.slider_mode === 'slider' || this.blok.slider_mode === 'carousel') &&
        this.blok.auto_play
      ) {
        this.clearAutoPlay();
      }
    }
  }
};
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
