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
      const config = useRuntimeConfig();
      const { data } = await storyblokApi.get('cdn/stories/', {
        starts_with: 'blog/',
        cv: 'CURRENT_TIMESTAMP',
        language: languageGet.value,
        version: config.public.envApiVersion
      });
      this.items = data.stories;
    }
  }
});
