export default defineNuxtPlugin(() => ({
  provide: {
    noscroll: (condition) => {
      if (condition) {
        document.body.classList.add('noscroll')
        document.ontouchmove = function (e) {
          e.preventDefault()
        }
      } else {
        document.body.classList.remove('noscroll')
        document.ontouchmove = function () {
          return true
        }
      }
    }
  }
}))
