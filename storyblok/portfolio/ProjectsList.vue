<template>
  <div v-if="sortedProjects.length" class="projects w-full">
    <ProjectSlider
      v-if="
        sizes.lg &&
        blok.show_slider &&
        !blok.row_container &&
        sortedProjects.length > 2 &&
        !sliderMode
      "
      :blok="sortedProjects"
    />
    <ul v-else :class="`project-list w-full grid gap-5 auto-cols-fr auto-rows-fr ${maxProjects}`">
      <ProjectTeaser
        v-for="project in sortedProjects"
        :key="project.uuid"
        :project-link="`${project.slug}/`"
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
import { storeToRefs } from 'pinia';
import store from '@/store';
import ProjectSlider from '@/storyblok/portfolio/ProjectSlider';
import ProjectTeaser from '@/storyblok/portfolio/ProjectTeaser';
export default {
  components: { ProjectSlider, ProjectTeaser },
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
  setup(props) {
    const { addProjects } = store.projects();
    const { sizes } = useScreen();
    const { projectsGet } = storeToRefs(store.projects());
    const { languageGet } = storeToRefs(store.language());
    (async () =>
      await useAsyncData('projects', async () => await addProjects(), { watch: [languageGet] }))();
    const maxProjects = computed(() => {
      if (props.sliderMode || props.carouselMode || props.containerMode) {
        if (props.containerWidth >= 536) {
          return 'md:grid-cols-fill-medium lg:grid-cols-fill-big';
        }
        return props.containerWidth >= 354
          ? 'md:grid-cols-fill-medium'
          : props.sliderMode
          ? 'sm:grid-cols-fill-small'
          : 'sm:grid-cols-fill-small md:grid-cols-fill-medium';
      } else {
        return 'md:grid-cols-fill-medium lg:grid-cols-fill-big';
      }
    });
    const sortedProjects = computed(() => {
      const projects = props.blok.projects;
      const featuredProjects = projectsGet.value.filter(post => projects.includes(post.uuid));
      featuredProjects.sort((a, b) => projects.indexOf(a.uuid) - projects.indexOf(b.uuid));
      return featuredProjects;
    });
    return { sizes, maxProjects, sortedProjects };
  }
};
</script>
