export default defineNuxtPlugin(() => ({
  provide: {
    themeColor: (bgColor) => {
      if (!bgColor || !/^#([0-9a-f]{3}){1,2}$/i.test(bgColor)) return false
      const color = bgColor !== 'transparent' ? bgColor.slice(1) : 'ffffff'
      const [r, g, b] = color
        .match(/.{2}/g)
        .map((hex) => parseInt(hex, 16) / 255)
      const gammaCorrect = (color) =>
        color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4
      const [R, G, B] = [r, g, b].map(gammaCorrect)
      const L = 0.2126 * R + 0.7152 * G + 0.0722 * B
      return L <= 0.179
    }
  }
}))
