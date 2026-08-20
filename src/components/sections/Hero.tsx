import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { site } from '../../data/site';
import Button from '../ui/Button';
import { GitHubIcon, LinkedInIcon } from '../ui/Icons';

const iconLink =
  'inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface/60 text-muted backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-fg';

// The hero spotlights the FSA work with details instead of code - the code
// itself is private federal client work.
const heroHighlights = [
  'Used daily by 1,500+ FSA staff and applicants',
  'Screens demoed to senior FSA staff and congressional contacts',
  'Financial calculator cut a manual workflow by 40%',
  'Legacy Java/Struts modernized to Angular and Spring Boot',
];

const heroStack = ['Angular', 'AWS', 'Node.js', 'Spring Boot', 'Jest'];

export default function Hero() {
  const reduce = useReducedMotion();
  const float = (from: number, to: number, delay = 0) =>
    reduce
      ? {}
      : {
          animate: { y: [from, to] },
          transition: {
            duration: 4.6,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            ease: 'easeInOut' as const,
            delay,
          },
        };

  return (
    <section className="hero-section relative flex items-center overflow-hidden px-6 py-16 pt-28 sm:py-24 sm:pt-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(48rem_30rem_at_78%_18%,color-mix(in_srgb,var(--color-accent)_13%,transparent),transparent_65%),radial-gradient(40rem_26rem_at_8%_82%,color-mix(in_srgb,var(--color-accent-2)_9%,transparent),transparent_62%)]"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(0deg,var(--color-bg)_0%,rgba(252,248,244,0)_100%)]" />
      <div className="hero-content mx-auto min-w-0 sm:w-full sm:max-w-6xl lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="mb-6 inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-bg/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg backdrop-blur">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
            </span>
            Available immediately · Lynnwood, WA / Remote
          </p>

          <h1 className="max-w-4xl text-balance font-display text-5xl font-bold leading-[1.04] tracking-tight text-fg sm:text-7xl lg:text-6xl xl:text-7xl">
            {site.name}
            <span className="mt-3 block max-w-[20rem] text-[1.75rem] leading-tight text-accent sm:max-w-none sm:text-4xl lg:text-4xl xl:text-5xl">
              {site.role}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl lg:text-lg">
            {site.tagline}
          </p>

          <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted">
            <MapPin size={14} className="text-accent-2" /> {site.location}
          </p>

          <div className="hero-ctas mt-8 grid grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center">
            <Button
              href={site.resumeUrl}
              className="col-span-2 sm:col-span-1"
              external
            >
              <FileText size={16} /> Resume
            </Button>
            <Button href="#projects" variant="ghost">
              See work <ArrowDown size={16} />
            </Button>
            <Button href={`mailto:${site.email}`} variant="ghost">
              <Mail size={16} /> Email
            </Button>
            <div className="flex items-center gap-3">
              <span className="hidden h-7 w-px bg-border sm:block" />
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={iconLink}
              >
                <GitHubIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={iconLink}
              >
                <LinkedInIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div aria-hidden className="relative hidden min-w-0 lg:block">
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent)]" />

          <div className="relative min-w-0 max-w-full rotate-[1.2deg] overflow-hidden rounded-xl border border-border/90 bg-bg/85 text-left shadow-[0_32px_80px_-30px_rgba(63,42,96,0.28)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-border/70 bg-surface/80 px-3.5 py-2.5">
              <span className="h-2 w-2 rounded-full bg-accent-3/70" />
              <span className="h-2 w-2 rounded-full bg-accent/70" />
              <span className="h-2 w-2 rounded-full bg-accent-2/70" />
              <span className="ml-1.5 truncate font-mono text-[10px] text-muted">
                FSA Debt Consolidation Platform
              </span>
              <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-2">
                2023 - 2026
              </span>
            </div>
            <ul className="space-y-3 px-4 py-4">
              {heroHighlights.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-1.5 px-4 pb-3">
              {heroStack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface/70 px-2.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="border-t border-border/70 bg-surface/60 px-4 py-2.5 font-mono text-[10px] text-muted">
              Federal client work - details private, including the code
            </p>
          </div>

          <motion.div
            {...float(-7, 7)}
            className="absolute -right-5 top-10 inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-bold text-bg shadow-[0_16px_36px_-12px_rgba(124,58,237,0.42)]"
          >
            <ShieldCheck size={15} /> Federally regulated
          </motion.div>

          <motion.div
            {...float(6, -6, 0.6)}
            className="absolute -left-7 bottom-9 w-44 rounded-2xl border border-border bg-surface/90 p-3.5 shadow-[0_18px_40px_-16px_rgba(63,42,96,0.20)] backdrop-blur"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              Jest coverage <span className="text-accent-2">98%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg/80">
              <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-accent-2 to-accent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
