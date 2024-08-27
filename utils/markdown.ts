import { marked, type Tokens } from 'marked'

export const markdownToHtml = (markdown: string) => {
  marked.use({
    renderer: {
      paragraph(token: Tokens.Paragraph) {
        const text = this.parser.parseInline(token.tokens)

        return `<p>${text}</p>`
      }
    },
    pedantic: true
  })

  return marked.parse(markdown)
}
