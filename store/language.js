import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state() {
    return {
      language: ''
    };
  },
  getters: {
    languageGet(state) {
      return state.language.toLowerCase().substring(0, 2);
    }
  },
  actions: {
    languageAction(setLanguage) {
      this.language = setLanguage;
    }
  }
});
