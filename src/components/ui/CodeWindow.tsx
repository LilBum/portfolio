import type { CodeLang } from '../../data/projects'
import { cn } from '../../lib/cn'

type Token = { text: string; className: string }

const KEYWORDS: Record<CodeLang, RegExp> = {
  luau: /^(local|function|end|if|then|else|elseif|return|for|in|while|do|not|and|or|true|false|nil)$/,
  ts: /^(const|let|readonly|return|if|else|this|new|function|import|export|class|private|public|async|await|true|false|null|undefined)$/,
  cs: /^(var|new|return|if|else|using|public|private|void|class|float|int|bool|string|while|foreach|in|true|false|null)$/,
  py: /^(def|return|if|elif|else|for|in|while|import|from|as|with|class|and|or|not|lambda|True|False|None)$/,
}

const COMMENT: Record<CodeLang, RegExp> = {
  luau: /--.*$/,
  ts: /\/\/.*$/,
  cs: /\/\/.*$/,
  py: /#.*$/,
}

/** Minimal single-line tokenizer: comment, strings, keywords, numbers. Display-only. */
function tokenize(line: string, lang: CodeLang): Token[] {
  const tokens: Token[] = []
  const commentMatch = line.match(COMMENT[lang])
  let code = line
  let comment = ''
  if (commentMatch && commentMatch.index !== undefined) {
    code = line.slice(0, commentMatch.index)
    comment = line.slice(commentMatch.index)
  }

  const parts = code.split(/("[^"]*"|'[^']*'|`[^`]*`|\w+)/g)
  for (const part of parts) {
    if (!part) continue
    if (/^["'`]/.test(part)) {
      tokens.push({ text: part, className: 'text-accent-2' })
    } else if (KEYWORDS[lang].test(part)) {
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

type Props = {
  file: string
  code: string
  lang: CodeLang
  className?: string
}

export default function CodeWindow({ file, code, lang, className }: Props) {
  const lines = code.split('\n')
  return (
    <div
      className={cn(
        'min-w-0 max-w-full overflow-hidden rounded-xl border border-border/90 bg-bg/85 text-left shadow-[0_18px_44px_-18px_rgba(0,0,0,0.85)] backdrop-blur',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/70 bg-surface/80 px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-accent-3/70" />
        <span className="h-2 w-2 rounded-full bg-accent/70" />
        <span className="h-2 w-2 rounded-full bg-accent-2/70" />
        <span className="ml-1.5 truncate font-mono text-[10px] text-muted">{file}</span>
      </div>
      {/* overflow-x-auto (not truncate): phones can swipe long lines, and a scroll
          container stops child min-content width from inflating the card. */}
      <pre className="overflow-x-auto px-3 py-3 font-mono text-[10px] leading-[1.7] sm:px-3.5 sm:text-[11px]">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {tokenize(line, lang).map((token, j) => (
              <span key={j} className={token.className}>
                {token.text}
              </span>
            ))}
            {line === '' && ' '}
          </div>
        ))}
      </pre>
    </div>
  )
}
