import hljs from 'highlight.js';
import 'highlight.js/styles/agate.css';
import { markdownToHtml } from '@/utils/markdown';

export const useMarkdown = (init = true) => {
  const rules = () => {
    if (document.querySelector('pre code')) {
      [...document.querySelectorAll('pre code')].forEach(code => {
        if (!code.classList.contains('syntax-code-block')) {
          const syntax = code.className.split(' ').find(t => t.includes('language-'));
          if (syntax) {
            const content = document.createElement('span');
            content.classList.add('code-language');
            code.classList.add('syntax-code-block');
            content.appendChild(document.createTextNode(syntax.replace('language-', '')));
            const language = hljs
              .getLanguage(syntax.replace('language-', ''))
              ?.name.toLocaleLowerCase();
            if (language && hljs.listLanguages().includes(language)) hljs.highlightElement(code);
            return code.insertBefore(content, code.childNodes[0]);
          }
        } else {
          return false;
        }
      });
    }
    if (document.querySelector('.markdown img')) {
      const images = document.querySelectorAll('.markdown img');
      const noScroll = condition => {
        if (condition) {
          document.body.classList.add('noscroll');
          document.ontouchmove = e => e.preventDefault();
        } else {
          document.body.classList.remove('noscroll');
          document.ontouchmove = null;
        }
      };
      const removeImage = wrapper => {
        if (document.body.contains(wrapper)) {
          document.body.removeChild(wrapper);
          noScroll(false);
        }
      };
      images.forEach(image => {
        if (!image.classList.contains('image-clickable')) {
          image.classList.add('image-clickable');
          image.addEventListener('click', function () {
            noScroll(true);
            const wrapper = document.createElement('div');
            const newImage = image.cloneNode(true);
            newImage.classList.remove('image-clickable');
            newImage.classList.add('image-modal');
            wrapper.classList.add('markdown-modal');
            wrapper.appendChild(newImage);
            document.body.appendChild(wrapper).focus({ preventScroll: true });
            wrapper.addEventListener('click', () => removeImage(wrapper));
            document.onkeydown = function (event) {
              if (event.key.toLowerCase() === 'escape') {
                removeImage(wrapper);
              }
            };
            window.addEventListener('popstate', () => removeImage(wrapper));
          });
        }
      });
    }
  };
  if (init) {
    onMounted(rules);
    onUpdated(rules);
  }
  return { markdownToHtml };
};
