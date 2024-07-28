import { marked, type Tokens } from 'marked'

export const markdownToHtml = (markdown: string) => {
  const renderer = {
    paragraph(text: Tokens.Paragraph) {
      return `<p>${text}</p>`
    }
  }
  marked.use({
    renderer,
    pedantic: true
  })
  return marked.parse(markdown)
}
