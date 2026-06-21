import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, FileCode2, Folder, FolderOpen } from 'lucide-react'
import { cn } from '../../lib/cn'
import { firstFile, type CodeFile, type TreeNode } from '../../content/code'
import CodeViewer from './CodeViewer'

function collectFolders(nodes: TreeNode[], acc: Set<string>): Set<string> {
  for (const node of nodes) {
    if (node.type === 'folder') {
      acc.add(node.path)
      collectFolders(node.children, acc)
    }
  }
  return acc
}

function countFiles(nodes: TreeNode[]): number {
  let n = 0
  for (const node of nodes) n += node.type === 'file' ? 1 : countFiles(node.children)
  return n
}

function findPreferredFile(nodes: TreeNode[], preferred?: string): CodeFile | null {
  if (!preferred) return null
  for (const node of nodes) {
    if (node.type === 'file') {
      if (node.file.path === preferred || node.file.name === preferred || node.file.path.endsWith(`/${preferred}`)) {
        return node.file
      }
    } else {
      const found = findPreferredFile(node.children, preferred)
      if (found) return found
    }
  }
  return null
}

type RowsProps = {
  nodes: TreeNode[]
  depth: number
  expanded: Set<string>
  toggle: (path: string) => void
  selectedPath: string | null
  onSelect: (file: CodeFile) => void
}

function TreeRows({ nodes, depth, expanded, toggle, selectedPath, onSelect }: RowsProps) {
  return (
    <ul className="min-w-max">
      {nodes.map((node) => {
        const pad = { paddingLeft: `${depth * 14 + 10}px` }
        if (node.type === 'folder') {
          const open = expanded.has(node.path)
          return (
            <li key={node.path}>
              <button
                type="button"
                onClick={() => toggle(node.path)}
                style={pad}
                className="flex w-full items-center gap-1.5 py-1 pr-2 text-left font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                {open ? (
                  <ChevronDown size={13} className="shrink-0 text-muted/70" />
                ) : (
                  <ChevronRight size={13} className="shrink-0 text-muted/70" />
                )}
                {open ? (
                  <FolderOpen size={14} className="shrink-0 text-accent" />
                ) : (
                  <Folder size={14} className="shrink-0 text-accent/80" />
                )}
                <span className="truncate">{node.name}</span>
              </button>
              {open && (
                <TreeRows
                  nodes={node.children}
                  depth={depth + 1}
                  expanded={expanded}
                  toggle={toggle}
                  selectedPath={selectedPath}
                  onSelect={onSelect}
                />
              )}
            </li>
          )
        }
        const active = node.path === selectedPath
        return (
          <li key={node.path}>
            <button
              type="button"
              onClick={() => onSelect(node.file)}
              style={pad}
              className={cn(
                'flex w-full items-center gap-1.5 py-1 pr-2 text-left font-mono text-xs transition-colors',
                active
                  ? 'bg-accent/12 font-semibold text-accent'
                  : 'text-muted hover:bg-surface-2/70 hover:text-fg',
              )}
            >
              <FileCode2 size={14} className={cn('shrink-0', active ? 'text-accent' : 'text-muted/70')} />
              <span className="truncate">{node.name}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default function FileExplorer({
  tree,
  initialFile,
  className,
}: {
  tree: TreeNode[]
  initialFile?: string
  className?: string
}) {
  const initial = useMemo(() => findPreferredFile(tree, initialFile) ?? firstFile(tree), [tree, initialFile])
  const total = useMemo(() => countFiles(tree), [tree])
  const [selected, setSelected] = useState<CodeFile | null>(initial)
  const [expanded, setExpanded] = useState<Set<string>>(() => collectFolders(tree, new Set()))

  const toggle = (path: string) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })

  const file = selected ?? initial

  return (
    <div className={cn('flex min-h-0 flex-col overflow-hidden sm:flex-row', className)}>
      <aside className="flex max-h-44 shrink-0 flex-col overflow-auto border-b border-border bg-surface/60 sm:max-h-none sm:w-60 sm:border-b-0 sm:border-r">
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-muted">
            Source
          </span>
          <span className="font-mono text-[10px] text-muted/70">{total} files</span>
        </div>
        <div className="py-1.5">
          <TreeRows
            nodes={tree}
            depth={0}
            expanded={expanded}
            toggle={toggle}
            selectedPath={file?.path ?? null}
            onSelect={setSelected}
          />
        </div>
      </aside>

      <div className="min-h-0 min-w-0 flex-1 p-3 sm:p-4">
        {file ? (
          <CodeViewer key={file.path} file={file.path} code={file.code} lang={file.lang} className="h-full" />
        ) : (
          <p className="p-6 text-sm text-muted">No source files.</p>
        )}
      </div>
    </div>
  )
}
