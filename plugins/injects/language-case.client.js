export default defineNuxtPlugin(({ $pinia }) => ({
  provide: {
    languageCase: (english, spanish, italian) => {
      const language = $pinia.state.value.language.language;
      switch (language) {
        case 'es':
          return spanish;
        case 'it':
          return italian;
        default:
          return english;
      }
    }
  }
}));
