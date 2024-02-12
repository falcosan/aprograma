export default defineNuxtPlugin(() => ({
  provide: {
    binaryControl: (element, prop, alternative = 'unset') => {
      const isValidProp = prop != null;
      if (element && (isValidProp ? element[prop] : true)) {
        return isValidProp ? element[prop] : element;
      } else {
        return alternative;
      }
    }
  }
}));
