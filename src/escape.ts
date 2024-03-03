export const EXCAPE_CHAR = '\\'

export const escapablesChars = [
  '_',
  '*',
  '[',
  ']',
  '(',
  ')',
  '~',
  '`',
  '>',
  '#',
  '+',
  '-',
  '=',
  '|',
  '{',
  '}',
  '.',
  '!',
]

const escapables = Object.fromEntries(escapablesChars.map((c) => [c, `${EXCAPE_CHAR}${c}`]))

const searchRegExp = new RegExp('[' + Object.values(escapables).join('') + ']', 'g')

export function escapeMarkdown(text: string) {
  return text.replace(searchRegExp, (r) => escapables[r as keyof typeof escapables] || r)
}
