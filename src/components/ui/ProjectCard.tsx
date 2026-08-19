import { useState } from 'react'
import { ArrowUpRight, BadgeCheck, CheckCircle2, Code, FolderTree, Star } from 'lucide-react'
import type { Project } from '../../data/projects'
import { cn } from '../../lib/cn'
import { projectCode } from '../../content/code'
import ArchitectureVisual from './ArchitectureVisual'
import CodeWindow from './CodeWindow'
import SourceModal from './SourceModal'

const accentBorder: Record<Project['accent'], string> = {
  violet: 'hover:border-accent/70',
  teal: 'hover:border-accent-2/70',
  pink: 'hover:border-accent-3/70',
}

const accentText: Record<Project['accent'], string> = {
  violet: 'text-accent',
  teal: 'text-accent-2',
  pink: 'text-accent-3',
}

const accentWash: Record<Project['accent'], string> = {
  violet: 'from-accent/24 to-surface-2',
  teal: 'from-accent-2/24 to-surface-2',
  pink: 'from-accent-3/24 to-surface-2',
}

const accentHairline: Record<Project['accent'], string> = {
  violet: 'via-accent/80',
  teal: 'via-accent-2/80',
  pink: 'via-accent-3/80',
}

const accentChip: Record<Project['accent'], string> = {
  violet: 'bg-accent text-bg shadow-[0_10px_24px_-8px_rgba(124,58,237,0.4)]',
  teal: 'bg-accent-2 text-bg shadow-[0_10px_24px_-8px_rgba(15,118,110,0.4)]',
  pink: 'bg-accent-3 text-bg shadow-[0_10px_24px_-8px_rgba(219,39,119,0.4)]',
}

const accentSource: Record<Project['accent'], string> = {
  violet: 'border-accent/40 text-accent hover:border-accent/70 hover:bg-accent/10',
  teal: 'border-accent-2/40 text-accent-2 hover:border-accent-2/70 hover:bg-accent-2/10',
  pink: 'border-accent-3/40 text-accent-3 hover:border-accent-3/70 hover:bg-accent-3/10',
}

const accentBadge: Record<Project['accent'], string> = {
  violet: 'border-accent/35 bg-accent/5 text-accent',
  teal: 'border-accent-2/35 bg-accent-2/5 text-accent-2',
  pink: 'border-accent-3/35 bg-accent-3/5 text-accent-3',
}

export default function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const [sourceOpen, setSourceOpen] = useState(false)
  const code = project.codeSlug ? projectCode[project.codeSlug] : undefined
  const hasSource = !!code && code.files.length > 0
  const featured = !!project.featured
  const wideLayout = featured || wide

  const media = project.architecture ? (
    <div
      className={cn(
        'flex min-h-[19rem] items-stretch overflow-hidden border-b border-border bg-linear-to-br p-4 sm:aspect-[16/10] sm:min-h-0 sm:p-6',
        wideLayout && 'lg:aspect-auto lg:border-b-0 lg:border-r lg:p-8',
        accentWash[project.accent],
      )}
    >
      <ArchitectureVisual visual={project.architecture} accent={project.accent} />
    </div>
  ) : project.snippet ? (
    <div
      className={cn(
        'relative flex items-center justify-center border-b border-border bg-linear-to-br p-3 py-5 sm:aspect-[16/10] sm:p-6',
        wideLayout && 'lg:aspect-auto lg:border-b-0 lg:border-r lg:p-8',
        accentWash[project.accent],
      )}
    >
      <CodeWindow
        file={project.snippet.file}
        code={project.snippet.code}
        lang={project.snippet.lang}
        className={cn(
          'w-full min-w-0 max-w-[27rem] transition-transform duration-500 group-hover:scale-[1.015]',
          wideLayout && 'lg:max-w-[30rem]',
        )}
      />
      {project.uiChip && (
        <span
          className={cn(
            'absolute bottom-4 right-4 inline-flex items-center rounded-xl px-3.5 py-2 text-xs font-bold transition-transform duration-300 group-hover:-translate-y-0.5',
            accentChip[project.accent],
          )}
        >
          {project.uiChip}
        </span>
      )}
    </div>
  ) : project.image ? (
    <div
      className={cn(
        'aspect-[16/10] overflow-hidden border-b border-border bg-surface-2',
        wideLayout && 'lg:aspect-auto lg:border-b-0 lg:border-r',
      )}
    >
      <img
        src={project.image}
        alt={project.imageAlt ?? ''}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  ) : (
    <div
      className={cn(
        'flex aspect-[16/10] flex-col justify-between border-b border-border bg-linear-to-br p-5',
        wideLayout && 'lg:aspect-auto lg:border-b-0 lg:border-r lg:p-8',
        accentWash[project.accent],
      )}
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-muted">
        {project.category}
      </p>
      <div className="grid gap-2">
        <span className="h-2 w-2/3 rounded-full bg-fg/18" />
        <span className="h-2 w-5/6 rounded-full bg-fg/12" />
        <span className="h-2 w-1/2 rounded-full bg-fg/10" />
      </div>
      <div>
        <p
          className={cn(
            'font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl',
            accentText[project.accent],
          )}
        >
          {project.visualLabel ?? project.title}
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{project.role}</p>
      </div>
    </div>
  )

  const body = (
    <div className={cn('flex flex-1 flex-col p-6', wideLayout && 'lg:justify-center lg:p-8')}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {featured && (
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-bg/60 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-muted">
            <Star size={11} className={accentText[project.accent]} /> Featured work
          </p>
        )}
        <p
          className={cn(
            'inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-eyebrow',
            accentBadge[project.accent],
          )}
        >
          <BadgeCheck size={11} /> {project.status}
        </p>
      </div>
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              'font-mono text-[11px] font-semibold uppercase tracking-eyebrow',
              accentText[project.accent],
            )}
          >
            {project.category}
          </p>
          <h3
            className={cn(
              'mt-1.5 font-display text-xl font-bold tracking-tight',
              wideLayout && 'sm:text-2xl',
            )}
          >
            {project.title}
          </h3>
        </div>
        {project.year && (
          <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
        )}
      </div>

      <p className="text-sm font-medium text-fg">{project.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>

      <ul className={cn('mt-5 grid gap-2.5', wideLayout && 'sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2')}>
        {project.impact.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
            <CheckCircle2 className={cn('mt-0.5 h-4 w-4 shrink-0', accentText[project.accent])} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-bg/55 px-3 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-border/80"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        {hasSource && (
          <button
            type="button"
            onClick={() => setSourceOpen(true)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl border bg-bg/50 px-3 py-1.5 font-semibold transition-all duration-200 hover:-translate-y-0.5',
              accentSource[project.accent],
            )}
          >
            <FolderTree size={15} />
            Browse source
            <span className="font-mono text-xs opacity-60">{code!.files.length}</span>
          </button>
        )}
        {project.caseStudy && (
          <a
            href={project.caseStudy}
            className={cn(
              'group/link inline-flex items-center gap-1 font-semibold',
              accentText[project.accent],
            )}
          >
            Read case study
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        )}
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'group/link inline-flex items-center gap-1 font-semibold',
              accentText[project.accent],
            )}
          >
            {project.hrefLabel ?? 'View project'}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-muted transition-colors hover:text-fg"
          >
            <Code size={16} /> {project.repoLabel ?? 'Code'}
          </a>
        )}
      </div>

      {/* Access caveats are real but should never outrank the evidence above. */}
      {project.note && (
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted/70">
          {project.note}
        </p>
      )}
    </div>
  )

  return (
    <article
      className={cn(
        'group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface/65 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-26px_rgba(63,42,96,0.22)]',
        wideLayout && 'lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch',
        accentBorder[project.accent],
      )}
    >
      <span
        className={cn(
          'absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          accentHairline[project.accent],
        )}
      />

      {media}
      {body}

      {hasSource && (
        <SourceModal
          open={sourceOpen}
          onClose={() => setSourceOpen(false)}
          title={project.title}
          subtitle={project.role}
          accent={project.accent}
          tree={code!.tree}
          initialFile={project.snippet?.file}
        />
      )}
    </article>
  )
}
