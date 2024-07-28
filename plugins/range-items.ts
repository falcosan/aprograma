export default defineNuxtPlugin(() => ({
  provide: {
    rangeItems: (val: number, max: number) => {
      return val < 1 ? 1 : val > max ? max : val
    }
  }
}))
