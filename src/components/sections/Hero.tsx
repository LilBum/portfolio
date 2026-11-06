import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { site } from '../../data/site'
import TrackingConsole from '../ui/TrackingConsole'

export default function Hero() {
  return (
    <section className="folio-hero" aria-labelledby="folio-name">
      <div className="folio-width hero-layout">
        <div className="hero-intro">
          <p className="occupation"><span aria-hidden="true" />Full-stack software engineer</p>
          <h1 id="folio-name">Alexander <span className="name-print">Urs-Badet
            <svg viewBox="0 0 490 18" preserveAspectRatio="none" className="name-underline" aria-hidden="true">
              <path d="M3 12C119 1 256 4 353 8S446 11 484 7" fill="none" pathLength="1"
                stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </span></h1>
          <p className="hero-bio">
            I write software for robots used in neuroscience research at the University of Washington.
            At TSPi, I built loan tools for farmers and the USDA staff who work with them.
          </p>
          <div className="hero-actions">
            <a className="action-primary" href="#projects">Explore projects <ArrowDownRight size={19} aria-hidden="true" /></a>
            <a className="action-text" href="#contact">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <p className="hero-location"><MapPin size={15} aria-hidden="true" /> {site.location}</p>
        </div>
        <TrackingConsole />
      </div>
    </section>
  )
}
