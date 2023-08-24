export default defineNuxtPlugin(() => ({
  provide: {
    contentByName: (from, nameComponent, exact = true) => {
      if (from) {
        if (exact) return from.filter(item => item.component === `${nameComponent}`);
        else return from.filter(item => item.component !== `${nameComponent}`);
      } else return [];
    }
  }
}));
