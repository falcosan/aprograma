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
      const { data } = await useFetch('/api/storyblok', {
        params: { starts_with: 'blog', lang: languageGet.value }
      });
      this.items = data.value.stories;
    }
  }
});
