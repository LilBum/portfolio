import { memo, useMemo, useState } from 'react'
import { cn } from '../../lib/cn'
import { tokenize, type Lang } from '../../lib/highlight'

const COLLAPSE_THRESHOLD = 190 // longer files preview collapsed
const COLLAPSE_TO = 110

type Props = {
  file: string
  code: string
  lang: Lang
  className?: string
}

function CodeViewer({ file, code, lang, className }: Props) {
  // tokenize once per file; skip re-tokenizing on unrelated re-renders
  const rows = useMemo(() => code.split('\n').map((line) => tokenize(line, lang)), [code, lang])
  const [expanded, setExpanded] = useState(false)

  const collapsible = rows.length > COLLAPSE_THRESHOLD
  const shown = collapsible && !expanded ? rows.slice(0, COLLAPSE_TO) : rows

  return (
    <div
      className={cn(
        'flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/90 bg-bg/90 text-left',
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-border/70 bg-surface/85 px-3.5 py-2">
        <span className="h-2 w-2 rounded-full bg-accent-3/70" />
        <span className="h-2 w-2 rounded-full bg-accent/70" />
        <span className="h-2 w-2 rounded-full bg-accent-2/70" />
        <span className="ml-1.5 truncate font-mono text-[11px] text-fg/80">{file}</span>
        <span className="ml-auto shrink-0 rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
          {lang}
        </span>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="h-full overflow-auto">
          <div className="flex min-w-max font-mono text-[11px] leading-[1.7]">
            <div className="sticky left-0 z-10 select-none border-r border-border/60 bg-surface/70 px-2.5 py-3 text-right text-muted/50">
              {shown.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <pre className="px-3.5 py-3">
              {shown.map((tokens, i) => (
                <div key={i} className="whitespace-pre">
                  {tokens.map((token, j) => (
                    <span key={j} className={token.className}>
                      {token.text}
                    </span>
                  ))}
                  {tokens.length === 0 && ' '}
                </div>
              ))}
            </pre>
          </div>
        </div>
        {collapsible && !expanded && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent"
          />
        )}
      </div>

      {collapsible && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 border-t border-border/70 bg-surface/85 py-2 text-center font-mono text-[11px] font-semibold text-accent transition-colors hover:bg-surface-2"
        >
          {expanded ? 'Collapse' : `Show all ${rows.length} lines`}
        </button>
      )}
    </div>
  )
}

export default memo(CodeViewer)
