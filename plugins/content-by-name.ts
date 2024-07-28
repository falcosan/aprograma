const contentByName = (
  from: { component: string }[],
  nameComponent: string,
  exact = true
) => {
  if (!from) return []

  if (exact) {
    return from.filter((item) => item.component === nameComponent)
  }
  return from.filter((item) => item.component !== nameComponent)
}

export default defineNuxtPlugin(() => ({
  provide: {
    contentByName
  }
}))
