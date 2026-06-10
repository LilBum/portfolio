import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-eyebrow text-accent">
        <span className="h-px w-7 bg-gradient-to-r from-transparent to-accent/70" />
        {eyebrow}
        <span className="h-px w-7 bg-gradient-to-l from-transparent to-accent/70" />
      </p>
      <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  )
}
