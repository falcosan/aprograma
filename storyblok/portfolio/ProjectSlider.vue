<template>
  <div class="project-slider relative w-full z-10" @mouseenter="focusSlide">
    <transition-group
      tag="ul"
      :enter-active-class="`${transitionActive} in-out`"
      :leave-active-class="`${transitionActive} out-in`"
      :enter-class="`opacity-0 transform ${translation.enter}`"
      :leave-to-class="`opacity-0 transform ${translation.leave}`"
      class="slider-wrapper relative w-full grid grid-cols-1 grid-rows-2 rounded overflow-hidden"
    >
      <template v-for="(project, index) in blok">
        <li
          v-if="index === frame.up || index === frame.down"
          ref="slide"
          :key="project.uuid"
          :class="`slide slide-project w-full h-60 xl:h-72 2xl:h-80 flex col-start-1 col-end-1 outline-none ${
            index % 2 === 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'
          }`"
          tabindex="0"
          @keydown.right.prevent="next"
          @keydown.left.prevent="prev"
        >
          <NuxtLink
            :to="`/portfolio/${project.slug}/`"
            class="project-link w-full grid grid-rows-1 grid-cols-2"
          >
            <div
              :class="`text-container ${
                index % 2 == 0
                  ? 'col-start-1 col-end-1 text-right'
                  : 'col-start-2 col-end-2 text-end'
              } flex flex-col justify-center row-start-1 row-end-1`"
              :style="`background-color: ${$binaryControl(
                project.content.background_color,
                'color',
                '#e0e0e0'
              )};`"
            >
              <h2
                class="project-text text-xl sm:text-2xl px-10 overflow-hidden"
                :style="`color: ${$binaryControl(project.content.text_color, 'color')};`"
              >
                {{ project.content.title }}
              </h2>
            </div>
            <div
              :class="`image-container flex row-start-1 row-end-1 ${
                index % 2 == 0 ? 'col-start-2 col-end-2' : 'col-start-1 col-end-1'
              }`"
            >
              <ImageComponent
                :file="project.content.image"
                class="project-image w-full h-full object-cover object-center pointer-events-none select-none"
                :src="project.content.image.filename"
                :alt="project.content.image.alt"
                width="620"
                height="320"
                sizes="lg:364px xl:491px 2xl:620px"
              />
            </div>
          </NuxtLink>
        </li>
      </template>
      <li
        v-if="frame.down === blok.length && blok.length > 2"
        :key="`${indexControls}-0`"
        :class="`restart-control control h-full projects-center col-start-1 col-end-1 cursor-pointer shadow-inner bg-opacity-20 bg-gray-400 ${
          blok.length % 2 == 0
            ? 'row-start-1 row-end-1 self-end'
            : 'row-start-2 row-end-2 self-start'
        }`"
      >
        <IconComponent class="w-full h-full" restart size="w-14 h-14" tag="button" @click="next" />
      </li>
    </transition-group>
    <transition-group
      v-if="blok.length > 2"
      tag="div"
      enter-active-class="duration-300 in-out"
      leave-active-class="duration-300 out-in"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
      class="controls w-full absolute top-1/2 text-white"
    >
      <span
        :key="`${indexControls}-1`"
        class="next-control absolute right-3 transform -translate-y-1/2 rounded-full bg-opacity-70 bg-neutral-800"
      >
        <IconComponent next class="next" size="p-3 w-9 h-9" tag="button" @click="next" />
      </span>
      <span
        :key="`${indexControls}-2`"
        class="previous-control absolute left-3 transform -translate-y-1/2 rounded-full bg-opacity-70 bg-neutral-800"
      >
        <IconComponent previous class="previous" size="p-3 w-9 h-9" tag="button" @click="prev" />
      </span>
    </transition-group>
  </div>
</template>
<script>
import IconComponent from '@/storyblok/global/Icon';
import ImageComponent from '@/storyblok/global/Image';
export default defineNuxtComponent({
  components: { IconComponent, ImageComponent },
  props: {
    blok: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      transitionActive: 'translation-all duration-500',
      indexControls: 0,
      focusDisable: false,
      frame: {
        up: 0,
        down: 1
      },
      translation: {
        enter: '',
        leave: ''
      }
    };
  },
  updated() {
    this.focusSlide();
  },
  beforeUnmount() {
    this.resetData();
  },
  methods: {
    next() {
      if (this.blok.length - 1 > this.frame.up && this.blok.length > this.frame.down) {
        this.indexControls++;
        this.frame.up++;
        this.frame.down++;
        this.translation.enter = 'translate-x-full';
        this.translation.leave = '-translate-x-full';
      } else {
        this.indexControls = 0;
        this.frame.up = 0;
        this.frame.down = 1;
        this.translation.enter = '';
        this.translation.leave = '';
      }
    },
    prev() {
      if (this.frame.up !== 0 && this.frame.down !== 1) {
        this.indexControls--;
        this.frame.up--;
        this.frame.down--;
        this.translation.enter = '-translate-x-full';
        this.translation.leave = 'translate-x-full';
      } else {
        this.indexControls = this.blok.length - 1;
        this.frame.up = this.blok.length - 1;
        this.frame.down = this.blok.length;
        this.translation.enter = '';
        this.translation.leave = '';
      }
    },
    resetData() {
      this.indexControls = 0;
      this.frame.up = 0;
      this.frame.data = 1;
      this.transitionActive = '';
      this.translation.enter = '';
      this.translation.leave = '';
      this.focusDisable = true;
    },
    focusSlide() {
      if (!this.focusDisable) {
        this.$nextTick(function () {
          this.$refs.slide[0].focus({ preventScroll: true });
        });
      }
    }
  }
});
</script>
<style scoped>
.project-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
