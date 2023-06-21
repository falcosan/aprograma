import { defineStore, storeToRefs } from 'pinia';
import store from '@/store';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    items: []
  }),
  getters: {
    projectsGet(state) {
      return state.items;
    }
  },
  actions: {
    async addProjects() {
      const { languageGet } = storeToRefs(store.language());
      const storyblokApi = useStoryblokApi();
      const {
        public: { apiVersion: version }
      } = useRuntimeConfig();
      const { data } = await storyblokApi.get('cdn/stories/', {
        version,
        starts_with: 'portfolio/',
        language: languageGet.value
      });
      this.items = data.stories;
    }
  }
});
