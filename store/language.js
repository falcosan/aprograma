import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state() {
    return {
      language: 'en'
    };
  },
  getters: {
    languageGet(state) {
      return state.language.toLowerCase().substring(0, 2);
    }
  },
  actions: {
    languageAction(setLanguage) {
      const locale = useCookie('locale');
      this.language = setLanguage;
      locale.value = this.languageGet;
    }
  }
});
