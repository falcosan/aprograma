export default defineNuxtPlugin(() => ({
  provide: {
    themeColor: bgColor => {
      const color =
        bgColor !== 'transparent'
          ? bgColor.charAt(0) === '#'
            ? bgColor.substring(1, 7)
            : bgColor
          : 'ffffff';
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);
      const colors = [r / 255, g / 255, b / 255];
      const c = colors.map(col => {
        if (col <= 0.03928) {
          return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
      });
      const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
      return !(L > 0.179);
    }
  }
}));