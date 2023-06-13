<template>
  <div v-if="sortedProject.length > 0" class="projects w-full">
    <ProjectSlider
      v-if="
        $store.state.data.windowWidth >= 1024 &&
        blok.show_slider &&
        !blok.row_container &&
        sortedProject.length > 2 &&
        !sliderMode
      "
      :blok="sortedProject"
    />
    <ul v-else :class="`project-list w-full grid gap-5 auto-cols-fr auto-rows-fr ${maxProjects}`">
      <ProjectTeaser
        v-for="project in sortedProject"
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
  fetch() {
    if (this.$route.name !== 'portfolio') {
      this.$store.dispatch('list/projects/addProjects');
    }
  },
  computed: {
    maxProjects() {
      if (this.sliderMode || this.carouselMode || this.containerMode) {
        if (this.containerWidth >= 536) {
          return 'md:grid-cols-fill-medium lg:grid-cols-fill-big';
        }
        return this.containerWidth >= 354
          ? 'md:grid-cols-fill-medium'
          : this.sliderMode
          ? 'sm:grid-cols-fill-small'
          : 'sm:grid-cols-fill-small md:grid-cols-fill-medium';
      } else {
        return 'md:grid-cols-fill-medium lg:grid-cols-fill-big';
      }
    },
    sortedProject() {
      const featuredProjects = this.$store.state.list.projects.items.filter(project => {
        return this.blok.projects.includes(project.uuid);
      });
      featuredProjects.sort((a, b) => {
        return this.blok.projects.indexOf(a.uuid) - this.blok.projects.indexOf(b.uuid);
      });
      return featuredProjects;
    }
  },
  watch: {
    '$store.state.language.language': {
      handler() {
        if (this.$route.name !== 'portfolio') {
          this.$fetch();
        }
      }
    }
  }
};
</script>
