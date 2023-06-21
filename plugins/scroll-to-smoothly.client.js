export default defineNuxtPlugin(() => ({
  provide: {
    scrollToSmoothly: (pos, time = 300) => {
      const currentPos = window.scrollY;
      let start = null;
      pos = Number(pos);
      time = Number(time);
      window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        const progress = currentTime - start;
        if (currentPos < pos) {
          window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
        } else {
          window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
        }
        if (progress < time) {
          window.requestAnimationFrame(step);
        } else {
          window.scrollTo(0, pos);
        }
      });
    }
  }
}));
