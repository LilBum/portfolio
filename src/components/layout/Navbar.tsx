import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, site } from '../../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const sections = navLinks.map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null)
    let currentHref = ''
    const updateSection = () => {
      const line = window.innerHeight * .36
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const atBottom = window.scrollY >= maxScroll - 2
      const current = atBottom ? sections.at(-1) : sections.findLast(section => section.getBoundingClientRect().top <= line)
      const href = current ? '#' + current.id : ''
      if (href !== currentHref) {
        currentHref = href
        setActiveSection(href)
      }
    }
    updateSection()
    const layoutObserver = new ResizeObserver(updateSection)
    layoutObserver.observe(document.body)
    window.addEventListener('scroll', updateSection, { passive: true })
    window.addEventListener('resize', updateSection)
    return () => {
      layoutObserver.disconnect()
      window.removeEventListener('scroll', updateSection)
      window.removeEventListener('resize', updateSection)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    function close() { setOpen(false) }
    const desktop = window.matchMedia('(min-width: 48rem)')
    window.addEventListener('keydown', dismiss)
    window.addEventListener('hashchange', close)
    desktop.addEventListener('change', close)
    return () => {
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('hashchange', close)
      desktop.removeEventListener('change', close)
    }
  }, [open])

  return (
    <header className="masthead">
      <nav aria-label="Main navigation" className="folio-width masthead-inner">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          <img width="36" height="36" src="/favicon.svg" alt="" />
          Alex Urs-Badet
        </a>
        <button ref={menuButton} type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-controls="primary-links" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <ul id="primary-links" className={open ? 'masthead-links is-open' : 'masthead-links'}>
          {navLinks.map((link) => (
            <li key={link.href}><a href={link.href} aria-current={activeSection === link.href ? 'location' : undefined}
              onClick={() => setOpen(false)}>{link.label}</a></li>
          ))}
          <li className="nav-resume"><a href={site.resumeUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Résumé <ArrowUpRight size={15} aria-hidden="true" /></a></li>
        </ul>
      </nav>
    </header>
  )
}
