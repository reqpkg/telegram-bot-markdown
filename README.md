# 💬 Markdown helpers for Telegram Bot

- [💬 Markdown helpers for Telegram Bot](#-markdown-helpers-for-telegram-bot)
  - [Installation](#installation)
  - [Features](#features)
    - [Escape markdown](#escape-markdown)
    - [Generate markdown by template](#generate-markdown-by-template)

## Installation

```bash
npm i telegram-bot-markdown
```

## Features

### Escape markdown

When you send a message in markdown format, you must escape special characters. This package will help you do that.

- [Official information about markdown on Telegram](https://core.telegram.org/bots/api#markdownv2-style).
- Issues: [1](https://stackoverflow.com/questions/40626896/telegram-does-not-escape-some-markdown-characters), [2](https://stackoverflow.com/questions/62600596/why-is-a-reserved-character-in-markdownv2-in-telegrams-bot-api), [3](https://stackoverflow.com/questions/60130062/escaped-character-on-telegram-bot-api-4-5-markdownv2-gives-trouble-for-hyper-lin)

```javascript
import { escapeMarkdown } from 'telegram-bot-markdown'

const markdownMessage = `Hello, *world*! ${escapeMarkdown('(text with special characters!)')}`
```

### Generate markdown by template

A special template for generating messages in markdown format. Allows you to keep all messages in the same form using a strict template. Useful for DX and UI/UX.

```javascript
import { generateMarkdown } from 'telegram-bot-markdown'

const markdownMessage = generateMarkdown({
  title: 'Title',
  description: 'Description',
  items: [
    {
      type: 'STRING',
      data: 'String item',
    },
    {
      type: 'LINEBREAK',
    },
    {
      type: 'KEY_VALUE',
      data: {
        key: 'Key',
        value: 'Value',
      },
    },
    {
      type: 'KEY_VALUE',
      data: {
        key: 'Key 2',
        value: 'Value 2',
        valueType: 'code',
      },
    },
    {
      type: 'LINEBREAK',
    },
    {
      type: 'CODE_BLOCK',
      data: {
        lang: 'json',
        code: JSON.stringify({ code: 'block' }, null, 2),
      },
    },
  ],
})
```
