<template>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    enter-active-class="transition duration-150"
    leave-active-class="transition duration-150"
  >
    <div v-if="sortedProjects.length" class="projects w-full">
      <ProjectSliderComponent
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
  </Transition>
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
    const { locale } = useI18n();
    const { sizes } = useScreen();
    const { addProjects } = store.projects();
    const { data: projects } = await useAsyncData('projects', async () => {
      const { stories } = await $fetch('/api/storyblok', {
        params: { starts_with: 'portfolio', lang: locale.value }
      });
      return stories;
    });
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
      const data = props.blok.projects;
      const featuredProjects = projects.value.filter(project => data.includes(project.uuid));
      featuredProjects.sort((a, b) => data.indexOf(a.uuid) - data.indexOf(b.uuid));
      return featuredProjects;
    });
    watch(projects, val => addProjects(val), { immediate: true });
    return { sizes, maxProjects, sortedProjects };
  }
});
</script>
