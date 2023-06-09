export default defineNuxtPlugin(() => ({
  provide: {
    imageValidation: (source, image = true, notImage = false) => {
      return source
        ? /(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi.test(
            source.toLowerCase().split(".").pop()
          )
          ? image
          : notImage
        : null;
    },
  },
}));
