const imageValidation = (source: string, image = true, notImage = false) => {
  if (!source) return null

  const extension = source.toLowerCase().split('.').pop()
  if (!extension) return notImage

  return /(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi.test(extension)
    ? image
    : notImage
}

export default defineNuxtPlugin(() => ({
  provide: {
    imageValidation
  }
}))
