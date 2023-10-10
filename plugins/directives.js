export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('click-outside', {
    mounted(el, binding) {
      el.clickOutsideEvent = function (event) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(binding.arg ?? event, el);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
      document.body.removeEventListener('click', el.clickOutsideEvent);
    }
  });
});
