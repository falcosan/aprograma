<template>
  <li
    v-if="projectContent"
    class="project-teaser w-full h-full aspect-square overflow-hidden rounded"
  >
    <RouteComponent
      :key="projectContent._uid"
      class="teaser-link h-full"
      :to="{ name: 'portfolio-slug', params: { slug: projectLink } }"
    >
      <div
        class="teaser-content h-full flex flex-col justify-end pt-0.5"
        :style="`background-color: ${$binaryControl(
          projectContent.background_color,
          'color',
          '#e0e0e0'
        )}; color: ${$binaryControl(projectContent.text_color, 'color')};`"
      >
        <ImageComponent
          class="project-image h-full w-full object-cover object-center select-none rounded-t"
          :src="projectContent.image.filename"
          :file="projectContent.image"
          :alt="projectContent.image.alt"
          width="340"
          height="306"
          sizes="xs:299px sm:380px md:514px lg:711px xl:804px"
        />
        <div
          :style="`background-color: ${$binaryControl(
            projectContent.background_color,
            'color',
            '#e0e0e0'
          )};`"
          class="title-container w-full flex flex-row items-center p-2.5 xs:p-5"
        >
          <span class="teaser-title block overflow-hidden whitespace-nowrap text-ellipsis">
            {{ projectContent.title }}</span
          >
        </div>
      </div>
    </RouteComponent>
  </li>
</template>

<script>
import ImageComponent from '@/storyblok/global/Image';
import RouteComponent from '@/storyblok/global/Route';
export default defineNuxtComponent({
  components: { ImageComponent, RouteComponent },
  props: {
    projectContent: {
      type: Object,
      required: true
    },
    projectLink: {
      type: String,
      required: true
    },
    rowContainer: {
      type: Boolean,
      required: true
    },
    carouselContainer: {
      type: Boolean,
      required: true
    },
    sliderContainer: {
      type: Boolean,
      required: true
    },
    containerContainer: {
      type: Boolean,
      required: true
    },
    containerWidth: {
      type: Number,
      default: 0
    }
  }
});
</script>
<style scoped>
.project-image {
  transform: scaleX(1.001);
}
</style>
