import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/agate.css';

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
      document.querySelectorAll('.markdown img').forEach(image => {
        const noScroll = condition => {
          if (condition) {
            document.body.classList.add('noscroll');
            document.ontouchmove = e => e.preventDefault();
          } else {
            document.body.classList.remove('noscroll');
            document.ontouchmove = () => true;
          }
        };
        image.addEventListener('click', function () {
          noScroll(true);
          const wrapper = document.createElement('div');
          const newImage = image.cloneNode();
          wrapper.classList.add('markdown-modal');
          wrapper.appendChild(newImage);
          document.body.appendChild(wrapper).focus({ preventScroll: true });
          if (document.body.contains(wrapper)) {
            wrapper.addEventListener('click', function () {
              document.body.removeChild(wrapper);
              noScroll(false);
            });
            document.onkeydown = function (event) {
              if (event.key.toLowerCase() === 'escape') {
                noScroll(false);
                document.body.removeChild(wrapper);
              }
            };
          }
          window.addEventListener('popstate', function () {
            if (document.body.contains(wrapper)) {
              noScroll(false);
              document.body.removeChild(wrapper);
            }
          });
        });
      });
    }
  };
  if (init) {
    onMounted(rules);
    onUpdated(rules);
  }
  const markdownToHtml = markdown => {
    const renderer = {
      paragraph(text) {
        return text;
      }
    };
    marked.use({
      renderer,
      mangle: false,
      pedantic: true,
      headerIds: false
    });
    return marked.parse(markdown);
  };
  return { markdownToHtml };
};
