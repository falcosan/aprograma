import { marked } from 'marked';

export const markdownToHtml = markdown => {
  const renderer = {
    paragraph(text) {
      return `<p>${text}</p>`;
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
