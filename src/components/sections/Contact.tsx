import { ArrowUpRight } from 'lucide-react'
import { site } from '../../data/site'

export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="folio-width contact-layout">
        <div>
          <h2 id="contact-heading">Get in touch</h2>
          <p>I’m based in Lynnwood and open to remote or Seattle-area software engineering roles.</p>
        </div>
        <div className="contact-links">
          <a className="contact-email" href={`mailto:${site.email}`}>{site.email} <ArrowUpRight size={20} /></a>
          <div>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
            <a href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
