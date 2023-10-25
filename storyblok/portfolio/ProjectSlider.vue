<template>
  <div
    ref="slider"
    class="project-slider relative w-full z-10"
    tabindex="0"
    @mouseenter="focusSlide"
    @keydown.right.prevent="next"
    @keydown.left.prevent="prev"
  >
    <TransitionGroup
      tag="ul"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
      class="slider-wrapper relative w-full grid grid-cols-1 grid-rows-2 rounded overflow-hidden transition-opacity"
    >
      <li
        v-for="(project, index) in blok"
        v-show="index === frame.up || index === frame.down"
        :key="project.uuid"
        :class="`slide slide-project w-full h-60 xl:h-72 2xl:h-80 flex col-start-1 col-end-1 outline-none ${
          index % 2 === 0 ? 'row-start-1 row-end-1 self-end' : 'row-start-2 row-end-2 self-start'
        }`"
      >
        <RouteComponent
          :to="{ name: 'portfolio-slug', params: { slug: project.slug } }"
          class="project-link w-full grid grid-rows-1 grid-cols-2"
        >
          <div
            :class="`text-container ${
              index % 2 == 0 ? 'col-start-1 col-end-1 text-right' : 'col-start-2 col-end-2 text-end'
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
              sizes="lg:491px xl:620px"
            />
          </div>
        </RouteComponent>
      </li>
      <li
        v-show="frame.down === blok.length && blok.length > 2"
        :key="`${indexControls}-0`"
        :class="`restart-control control h-full projects-center col-start-1 col-end-1 cursor-pointer shadow-inner bg-opacity-20 bg-gray-400 ${
          blok.length % 2 == 0
            ? 'row-start-1 row-end-1 self-end'
            : 'row-start-2 row-end-2 self-start'
        }`"
      >
        <IconComponent
          class="w-full h-full"
          restart
          size="w-14 h-14 cursor-pointer"
          @click="next"
        />
      </li>
    </TransitionGroup>
    <TransitionGroup
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
        <IconComponent next class="next" size="p-3 w-9 h-9 cursor-pointer" @click="next" />
      </span>
      <span
        :key="`${indexControls}-2`"
        class="previous-control absolute left-3 transform -translate-y-1/2 rounded-full bg-opacity-70 bg-neutral-800"
      >
        <IconComponent previous class="previous" size="p-3 w-9 h-9 cursor-pointer" @click="prev" />
      </span>
    </TransitionGroup>
  </div>
</template>
<script>
import IconComponent from '@/storyblok/global/Icon';
import ImageComponent from '@/storyblok/global/Image';
import RouteComponent from '@/storyblok/global/Route';
export default defineNuxtComponent({
  components: { IconComponent, ImageComponent, RouteComponent },
  props: {
    blok: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const slider = ref(null);
    const state = reactive({
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
    });
    const { indexControls, focusDisable, frame, translation } = toRefs(state);
    const next = () => {
      if (props.blok.length - 1 > frame.value.up && props.blok.length > frame.value.down) {
        indexControls.value++;
        frame.value.up++;
        frame.value.down++;
      } else {
        indexControls.value = 0;
        frame.value.up = 0;
        frame.value.down = 1;
      }
    };
    const prev = () => {
      if (frame.value.up !== 0 && frame.value.down !== 1) {
        indexControls.value--;
        frame.value.up--;
        frame.value.down--;
      } else {
        indexControls.value = props.blok.length - 1;
        frame.value.up = props.blok.length - 1;
        frame.value.down = props.blok.length;
      }
    };
    const resetData = () => {
      indexControls.value = 0;
      frame.value.up = 0;
      frame.value.data = 1;
      focusDisable.value = true;
    };
    const focusSlide = () => {
      if (!focusDisable.value && slider.value) {
        nextTick(() => slider.value.focus({ preventScroll: true }));
      }
    };
    onBeforeUnmount(resetData);
    watch(indexControls, focusSlide);
    return {
      next,
      prev,
      frame,
      slider,
      focusSlide,
      translation,
      indexControls
    };
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
