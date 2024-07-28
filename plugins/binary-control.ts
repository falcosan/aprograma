const binaryControl = (
  element?: Record<string, string>,
  prop?: string,
  alternative = 'unset'
) => {
  const isValidProp = prop != null

  if (element && (isValidProp ? element[prop] : true)) {
    return isValidProp ? element[prop] : element
  }
  return alternative
}

export default defineNuxtPlugin(() => ({
  provide: {
    binaryControl
  }
}))
