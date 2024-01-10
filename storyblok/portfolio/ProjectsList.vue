<template>
  <div v-if="sortedProjects.length" class="projects w-full">
    <ProjectSliderComponent
      v-if="!sliderMode && blok.show_slider && !blok.row_container && sortedProjects.length > 2"
      v-show="windowWidth >= 1024"
      :blok="sortedProjects"
    />
    <ul
      v-show="
        sliderMode ||
        !blok.show_slider ||
        windowWidth < 1024 ||
        blok.row_container ||
        sortedProjects.length <= 2
      "
      :class="`project-list w-full grid gap-5 auto-cols-fr auto-rows-fr ${maxProjects}`"
    >
      <ProjectTeaserComponent
        v-for="project in sortedProjects"
        :key="project.uuid"
        :project-link="project.slug"
        :project-content="project.content"
        :row-container="blok.row_container"
        :slider-container="sliderMode"
        :carousel-container="carouselMode"
        :container-container="containerMode"
        :container-width="containerWidth"
      />
    </ul>
  </div>
</template>
<script>
import store from '@/store';
import ProjectSliderComponent from '@/storyblok/portfolio/ProjectSlider';
import ProjectTeaserComponent from '@/storyblok/portfolio/ProjectTeaser';
export default defineNuxtComponent({
  components: { ProjectSliderComponent, ProjectTeaserComponent },
  props: {
    blok: {
      type: Object,
      required: true
    },
    containerWidth: {
      type: Number,
      default: 0
    },
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    }
  },
  async setup(props) {
    const { windowWidth } = useScreen();
    const { addProjects } = store.projects();
    const { data: projects } = await useFetcher({ slug: 'projects', startsWith: 'portfolio' });
    const maxProjects = computed(() => {
      if (props.sliderMode || props.carouselMode || props.containerMode) {
        if (props.containerWidth >= 536) {
          return 'md:grid-cols-fill-medium 2xl:grid-cols-fill-big';
        }
        return props.containerWidth >= 354
          ? 'md:grid-cols-fill-medium'
          : props.sliderMode
            ? 'sm:grid-cols-fill-small'
            : 'sm:grid-cols-fill-small md:grid-cols-fill-medium';
      } else {
        return 'md:grid-cols-fill-medium 2xl:grid-cols-fill-big';
      }
    });
    const sortedProjects = computed(() => {
      const data = props.blok.projects;
      const featuredProjects = projects.value.filter(project => data.includes(project.uuid));
      featuredProjects.sort((a, b) => data.indexOf(a.uuid) - data.indexOf(b.uuid));
      return featuredProjects;
    });
    watch(projects, val => addProjects(val), { immediate: true });
    return { windowWidth, maxProjects, sortedProjects };
  }
});
</script>
