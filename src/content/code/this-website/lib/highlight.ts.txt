export type Lang = 'luau' | 'ts' | 'cs' | 'py' | 'json' | 'css' | 'plain'

export type Token = { text: string; className: string }

const KEYWORDS: Partial<Record<Lang, RegExp>> = {
  luau: /^(local|function|end|if|then|else|elseif|return|for|in|while|do|repeat|until|break|continue|not|and|or|true|false|nil|self|type|export)$/,
  ts: /^(const|let|var|readonly|return|if|else|switch|case|this|new|function|import|export|from|as|type|interface|class|extends|implements|private|public|protected|static|async|await|yield|for|while|do|of|in|try|catch|finally|throw|typeof|keyof|true|false|null|undefined|void|default|satisfies)$/,
  cs: /^(var|new|return|if|else|using|namespace|public|private|protected|internal|static|void|class|struct|record|float|double|int|bool|string|while|for|foreach|in|try|catch|finally|throw|true|false|null|this|override|virtual|async|await)$/,
  py: /^(def|return|if|elif|else|for|in|while|import|from|as|with|class|and|or|not|is|lambda|try|except|finally|raise|yield|async|await|pass|break|continue|global|nonlocal|True|False|None|self)$/,
  json: /^(true|false|null)$/,
}

const COMMENT: Partial<Record<Lang, RegExp>> = {
  luau: /--.*$/,
  ts: /\/\/.*$/,
  cs: /\/\/.*$/,
  py: /#.*$/,
}

/** Minimal single-line tokenizer: comment, strings, keywords, numbers. Display-only. */
export function tokenize(line: string, lang: Lang): Token[] {
  const tokens: Token[] = []
  const commentRe = COMMENT[lang]
  let code = line
  let comment = ''
  if (commentRe) {
    const match = line.match(commentRe)
    if (match && match.index !== undefined) {
      code = line.slice(0, match.index)
      comment = line.slice(match.index)
    }
  }

  const keywords = KEYWORDS[lang]
  const parts = code.split(/("[^"]*"|'[^']*'|`[^`]*`|\w+)/g)
  for (const part of parts) {
    if (!part) continue
    if (/^["'`]/.test(part)) {
      tokens.push({ text: part, className: 'text-accent-2' })
    } else if (keywords && keywords.test(part)) {
      tokens.push({ text: part, className: 'text-accent' })
    } else if (/^\d+(\.\d+)?$/.test(part)) {
      tokens.push({ text: part, className: 'text-accent-3' })
    } else {
      tokens.push({ text: part, className: 'text-fg/75' })
    }
  }
  if (comment) tokens.push({ text: comment, className: 'text-muted/60 italic' })
  return tokens
}

/** Map a file extension to a highlight language. */
export function langFromExt(ext: string): Lang {
  switch (ext.toLowerCase()) {
    case 'luau':
    case 'lua':
      return 'luau'
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx':
      return 'ts'
    case 'py':
      return 'py'
    case 'cs':
      return 'cs'
    case 'json':
      return 'json'
    case 'css':
      return 'css'
    default:
      return 'plain'
  }
}
