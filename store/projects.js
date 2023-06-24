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
      const { data } = await useFetch(
        `/api/storyblok?slug=&lang=${languageGet.value}&starts_with=portfolio/`
      );
      this.items = data.value.stories;
    }
  }
});
