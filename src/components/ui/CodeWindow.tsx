import { cn } from '../../lib/cn'
import { tokenize, type Lang } from '../../lib/highlight'

type Props = {
  file: string
  code: string
  lang: Lang
  className?: string
}

export default function CodeWindow({ file, code, lang, className }: Props) {
  const lines = code.split('\n')
  return (
    <div
      className={cn(
        'min-w-0 max-w-full overflow-hidden rounded-xl border border-border/90 bg-bg/85 text-left shadow-[0_18px_44px_-18px_rgba(63,42,96,0.16)] backdrop-blur',
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
            {line === '' && ' '}
          </div>
        ))}
      </pre>
    </div>
  )
}
