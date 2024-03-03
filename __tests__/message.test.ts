import { generateMarkdown } from '../src/message'
import type { MarkdownMessageConfig } from '../src/message'

describe('generateMarkdown', () => {
  it('should create a markdown message', () => {
    const config: MarkdownMessageConfig = {
      title: 'Title',
      description: 'Description',
      items: [
        {
          type: 'STRING',
          data: 'String item',
        },
        {
          type: 'STRING',
          data: 'String item 2',
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
    }

    const output = generateMarkdown(config)

    expect(output).toEqual(
      `*Title*

Description

String item
String item 2

*Key*: Value
*Key 2*: \`Value 2\`

\`\`\`json
{
  "code": "block"
}
\`\`\``,
    )
  })
})
