export default defineNuxtPlugin(() => ({
  provide: {
    rangeItems: (val, max) => {
      return val < 1 ? 1 : val > max ? max : val;
    },
  },
}));
