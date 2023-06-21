import { defineStore, storeToRefs } from 'pinia';
import store from '@/store';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    items: []
  }),
  getters: {
    postsGet(state) {
      return state.items;
    }
  },
  actions: {
    async addPosts() {
      const { languageGet } = storeToRefs(store.language());
      const storyblokApi = useStoryblokApi();
      const {
        public: { apiVersion: version }
      } = useRuntimeConfig();
      const { data } = await storyblokApi.get('cdn/stories/', {
        version,
        starts_with: 'blog/',
        language: languageGet.value
      });
      this.items = data.stories;
    }
  }
});
