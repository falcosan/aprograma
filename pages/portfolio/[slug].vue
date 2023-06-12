<template>
  <component :is="story.content.component" :key="story.content._uid" :blok="story.content" />
</template>
<script>
import Project from '@/storyblok/portfolio/ProjectComponent';
import seo from '~/mixins/seo';
export default {
  components: { Project },
  mixins: [seo],
  data() {
    return {
      story: {
        content: {}
      }
    };
  },
  fetch() {
    return this.$storyapi
      .get(`cdn/stories${this.$route.path}`, {
        language: this.$store.state.language.language
      })
      .then(res => {
        this.story = res.data.story;
      })
      .catch(res => {
        if (!res) {
          this.error({
            statusCode: 404,
            message: "Sorry but this content doesn't exist"
          });
        } else {
          this.error({
            statusCode: 500,
            message: `Sorry, but the content called: "${this.$route.name}" has a problem or doesn't exist`
          });
        }
      });
  },
  head() {
    return this.seo();
  },
  watch: {
    '$store.state.language.language': '$fetch'
  }
};
</script>
