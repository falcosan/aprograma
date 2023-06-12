export default defineNuxtPlugin(() => ({
  provide: {
    contentByName: (from, nameComponent, exact = true) => {
      if (exact) {
        return from.filter(item => {
          return item.component === `${nameComponent}`;
        });
      } else {
        return from.filter(item => {
          return item.component !== `${nameComponent}`;
        });
      }
    }
  }
}));
