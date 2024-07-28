import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'
import { markdownToHtml } from '@/utils/markdown'

export const useMarkdown = (init: boolean = true) => {
  const highlightCodeBlocks = () => {
    ;[...document.querySelectorAll('code')].forEach((code: Element) => {
      if (
        !(code instanceof HTMLElement) ||
        code.classList.contains('syntax-code-block')
      ) {
        return
      }

      const codePerentElement = code.parentElement?.tagName.toLowerCase()

      if (codePerentElement === 'p') {
        if (!code.textContent?.trim()) code.remove()
      } else if (codePerentElement === 'pre') {
        const syntax = Array.from(code.classList).find((cls) =>
          cls.startsWith('language-')
        )
        if (syntax) {
          const content = document.createElement('span')
          content.classList.add('code-language')
          code.classList.add('syntax-code-block')
          content.textContent = syntax.replace('language-', '')
          const language = hljs
            .getLanguage(syntax.replace('language-', ''))
            ?.name?.toLowerCase()

          if (language && hljs.listLanguages().includes(language)) {
            hljs.highlightElement(code)
          }
          code.insertBefore(content, code.firstChild)
        }
      }
    })
  }

  const makeImagesClickable = () => {
    const noScroll = (condition: boolean) => {
      document.body.classList.toggle('noscroll', condition)
      document.ontouchmove = condition ? (e) => e.preventDefault() : null
    }

    const removeImage = (wrapper: HTMLElement | null) => {
      if (wrapper && document.body.contains(wrapper)) {
        document.body.removeChild(wrapper)
        noScroll(false)
      }
    }

    document.querySelectorAll('.markdown img').forEach((image: Element) => {
      if (
        !(image instanceof HTMLImageElement) ||
        image.classList.contains('image-clickable')
      ) {
        return
      }

      image.classList.add('image-clickable')
      image.addEventListener('click', () => {
        noScroll(true)
        const wrapper = document.createElement('div')
        const newImage = image.cloneNode(true) as HTMLImageElement
        newImage.classList.remove('image-clickable')
        newImage.classList.add('image-modal')
        wrapper.classList.add('markdown-modal')
        wrapper.appendChild(newImage)
        document.body.appendChild(wrapper).focus({ preventScroll: true })

        wrapper.addEventListener('click', () => removeImage(wrapper))
        document.onkeydown = (event) => {
          if (event.key.toLowerCase() === 'escape') {
            removeImage(wrapper)
          }
        }
        window.addEventListener('popstate', () => removeImage(wrapper))
      })
    })
  }

  const rules = () => {
    highlightCodeBlocks()
    makeImagesClickable()
  }

  if (init) {
    onBeforeMount(rules)
    onUpdated(rules)
  }

  return { markdownToHtml }
}
