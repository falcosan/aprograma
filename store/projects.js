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
      const config = useRuntimeConfig();
      const { data } = await storyblokApi.get('cdn/stories/', {
        cv: 'CURRENT_TIMESTAMP',
        starts_with: 'portfolio/',
        language: languageGet.value,
        version: config.public.apiVersion
      });
      this.items = data.stories;
    }
  }
});
