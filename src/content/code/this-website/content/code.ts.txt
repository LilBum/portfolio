import { langFromExt, type Lang } from '../lib/highlight'

export type CodeFile = {
  /** Path relative to the project root, e.g. "Shared/Utils/RarityRoller.luau". */
  path: string
  /** Leaf file name, e.g. "RarityRoller.luau". */
  name: string
  lang: Lang
  code: string
  lines: number
}

export type TreeNode =
  | { type: 'folder'; name: string; path: string; children: TreeNode[] }
  | { type: 'file'; name: string; path: string; file: CodeFile }

export type ProjectCode = {
  tree: TreeNode[]
  files: CodeFile[]
}

// Real source files copied into this repo as `.txt` (so tsc/eslint skip them).
// Keep this allowlist aligned with project `codeSlug` values so private or
// unrelated samples cannot be pulled into the public bundle by accident.
const raw = import.meta.glob(
  [
    './code/aegis-trader/**/*.txt',
    './code/autonomous-trading/**/*.txt',
    './code/listing-studio/**/*.txt',
    './code/behavioral-tracking/**/*.txt',
    './code/pose-estimation/**/*.txt',
    './code/this-website/**/*.txt',
  ],
  {
  query: '?raw',
  import: 'default',
  eager: true,
  },
) as Record<string, string>

function sortNodes(nodes: TreeNode[]): void {
  nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  for (const node of nodes) {
    if (node.type === 'folder') sortNodes(node.children)
  }
}

function buildTree(files: CodeFile[]): TreeNode[] {
  const root: TreeNode[] = []
  const folders = new Map<string, Extract<TreeNode, { type: 'folder' }>>()

  function ensureFolder(path: string): TreeNode[] {
    if (path === '') return root
    const existing = folders.get(path)
    if (existing) return existing.children
    const slash = path.lastIndexOf('/')
    const parent = slash === -1 ? '' : path.slice(0, slash)
    const node: Extract<TreeNode, { type: 'folder' }> = {
      type: 'folder',
      name: path.slice(slash + 1),
      path,
      children: [],
    }
    folders.set(path, node)
    ensureFolder(parent).push(node)
    return node.children
  }

  for (const file of files) {
    const slash = file.path.lastIndexOf('/')
    const dir = slash === -1 ? '' : file.path.slice(0, slash)
    ensureFolder(dir).push({ type: 'file', name: file.name, path: file.path, file })
  }

  sortNodes(root)
  return root
}

function parse(): Record<string, ProjectCode> {
  const bySlug: Record<string, CodeFile[]> = {}
  for (const key in raw) {
    const rel = key.replace(/^\.\/code\//, '').replace(/\.txt$/, '')
    const slash = rel.indexOf('/')
    if (slash === -1) continue
    const slug = rel.slice(0, slash)
    const path = rel.slice(slash + 1)
    const name = path.slice(path.lastIndexOf('/') + 1)
    const ext = name.slice(name.lastIndexOf('.') + 1)
    const code = raw[key].replace(/\r\n/g, '\n').replace(/\s+$/, '')
    ;(bySlug[slug] ??= []).push({
      path,
      name,
      lang: langFromExt(ext),
      code,
      lines: code.split('\n').length,
    })
  }

  const out: Record<string, ProjectCode> = {}
  for (const slug in bySlug) {
    out[slug] = { files: bySlug[slug], tree: buildTree(bySlug[slug]) }
  }
  return out
}

export const projectCode: Record<string, ProjectCode> = parse()

/** Depth-first first file in a tree - used as the explorer's default selection. */
export function firstFile(nodes: TreeNode[]): CodeFile | null {
  for (const node of nodes) {
    if (node.type === 'file') return node.file
    const found = firstFile(node.children)
    if (found) return found
  }
  return null
}
