export default defineNuxtPlugin(() => ({
  provide: {
    binaryControl: (element, prop, alternative = false) => {
      if (element[prop]) {
        return element[prop];
      } else if (alternative) {
        return alternative;
      }
    },
  },
}));
