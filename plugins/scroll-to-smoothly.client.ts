const scrollToSmoothly = (pos: number, time = 200) => {
  const currentPos = window.scrollY
  let start: number | null = null
  pos = Number(pos)
  time = Number(time)

  const step = (currentTime: number) => {
    start = start ?? currentTime
    const progress = currentTime - start

    if (currentPos < pos) {
      window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos)
    } else {
      window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time)
    }

    if (progress < time) {
      window.requestAnimationFrame(step)
    } else {
      window.scrollTo(0, pos)
    }
  }

  window.requestAnimationFrame(step)
}

export default defineNuxtPlugin(() => ({
  provide: {
    scrollToSmoothly
  }
}))
