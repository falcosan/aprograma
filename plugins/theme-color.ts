function isHexColor(color: string): boolean {
  return /^#([0-9a-f]{3}){1,2}$/i.test(color)
}

function hexToRgb(hex: string): [number, number, number] {
  const hexWithoutHash = hex.startsWith('#') ? hex.slice(1) : hex
  const bigint = parseInt(hexWithoutHash, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

function gammaCorrect(color: number): number {
  return color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4
}

function calculateLuminance(r: number, g: number, b: number): number {
  const [R, G, B] = [r, g, b].map(gammaCorrect)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export default defineNuxtPlugin(() => ({
  provide: {
    themeColor: (bgColor: string): boolean => {
      if (!bgColor || !isHexColor(bgColor)) return false

      const [r, g, b] = hexToRgb(bgColor)
      const luminance = calculateLuminance(r / 255, g / 255, b / 255)

      return luminance <= 0.179
    }
  }
}))
