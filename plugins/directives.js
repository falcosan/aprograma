export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('click-outside', {
    bind(el, binding) {
      const handler = e => {
        if (binding.modifiers.bubble || (!el.contains(e.target) && el !== e.target)) {
          binding.value(e);
        }
      };
      el.outsideClick = handler;
      document.addEventListener('click', handler);
    },
    unbind(el) {
      document.removeEventListener('click', el.outsideClick);
      el.outsideClick = null;
    }
  });
});
