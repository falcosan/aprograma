export default defineNuxtPlugin(() => ({
  provide: {
    binaryControl: (element, prop, alternative = false) => {
      if (element != null && element[prop]) {
        return element[prop];
      } else if (alternative) {
        return alternative;
      } else return 'unset';
    }
  }
}));
