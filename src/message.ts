import { escapeMarkdown } from './escape'

export interface MarkdownMessageConfig {
  title?: string
  description?: string
  items?: (
    | MarkdownMessageItemString
    | MarkdownMessageItemLinebreak
    | MarkdownMessageItemKeyValue
    | MarkdownMessageItemCodeBlock
  )[]
}

interface MarkdownMessageItem<N extends string, D = unknown> {
  type: N
  data?: D
}

type MarkdownMessageItemString = MarkdownMessageItem<'STRING', string>

type MarkdownMessageItemLinebreak = MarkdownMessageItem<'LINEBREAK'>

type MarkdownMessageItemKeyValue = MarkdownMessageItem<
  'KEY_VALUE',
  {
    key: string
    value: string | number
    valueType?: 'code'
  }
>

type MarkdownMessageItemCodeBlock = MarkdownMessageItem<
  'CODE_BLOCK',
  {
    lang?: string
    code: string
  }
>

export function generateMarkdown(config: MarkdownMessageConfig): string {
  const hasItems = !!(config.items?.length > 0)

  let message = ''

  function addLinebreak() {
    message += '\n'
  }

  function addDoubleLinebreak() {
    addLinebreak()
    addLinebreak()
  }

  if (config.title) {
    message += `*${escapeMarkdown(config.title)}*`

    if (config.description || hasItems) {
      addDoubleLinebreak()
    }
  }

  if (config.description) {
    message += `${escapeMarkdown(config.description)}`

    if (hasItems) {
      addDoubleLinebreak()
    }
  }

  if (hasItems) {
    config.items.forEach((item) => {
      switch (item.type) {
        case 'STRING': {
          message += escapeMarkdown(item.data)
          addLinebreak()
          break
        }

        case 'LINEBREAK': {
          addLinebreak()
          break
        }

        case 'KEY_VALUE': {
          let value =
            typeof item.data.value === 'number' ? item.data.value : escapeMarkdown(item.data.value)

          if (item.data.valueType === 'code') {
            value = `\`${value}\``
          }

          message += `*${escapeMarkdown(item.data.key)}*: ${value}`
          addLinebreak()
          break
        }

        case 'CODE_BLOCK': {
          message += `\`\`\`${item.data.lang || ''}\n${item.data.code}\n\`\`\``
          addLinebreak()
          break
        }
      }
    })
  }

  message = message.replace(/\n$/, '')

  return message
}
