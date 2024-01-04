export default defineNuxtPlugin(() => ({
  provide: {
    binaryControl: (element, prop, alternative = 'unset') => {
      if (element != null && element[prop]) {
        return element[prop];
      } else return alternative;
    }
  }
}));
