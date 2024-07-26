import { defineStore } from 'pinia';

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
    addPosts(posts: never[]) {
      this.items = posts;
    }
  }
});
