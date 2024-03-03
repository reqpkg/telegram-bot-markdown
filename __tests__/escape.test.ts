import { escapablesChars, escapeMarkdown, EXCAPE_CHAR } from '../src/escape'

describe('escapeMarkdown', () => {
  const input = escapablesChars.join('')
  const expectedOutput = input
    .split('')
    .map((c) => `${EXCAPE_CHAR}${c}`)
    .join('')
  const output = escapeMarkdown(input)

  it('should escape special characters in markdown', () => {
    expect(output).toEqual(expectedOutput)
  })
})
