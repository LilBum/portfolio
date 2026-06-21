import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Accent } from '../../data/projects'
import type { TreeNode } from '../../content/code'
import { cn } from '../../lib/cn'
import FileExplorer from './FileExplorer'

const accentDot: Record<Accent, string> = {
  violet: 'bg-accent',
  teal: 'bg-accent-2',
  pink: 'bg-accent-3',
}

type Props = {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  accent: Accent
  tree: TreeNode[]
  initialFile?: string
}

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function SourceModal({
  open,
  onClose,
  title,
  subtitle,
  accent,
  tree,
  initialFile,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="absolute inset-0 bg-fg/45" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} source code`}
            ref={dialogRef}
            tabIndex={-1}
            className="relative flex h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_40px_90px_-30px_rgba(63,42,96,0.45)]"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
              <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', accentDot[accent])} />
              <div className="min-w-0">
                <h2 className="truncate font-display text-base font-bold tracking-tight sm:text-lg">
                  {title}
                </h2>
                {subtitle && <p className="truncate text-xs text-muted">{subtitle}</p>}
              </div>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close source viewer"
                className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-bg/60 text-muted transition-colors hover:border-border/80 hover:text-fg"
              >
                <X size={17} />
              </button>
            </header>

            <FileExplorer tree={tree} initialFile={initialFile} className="flex-1" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
