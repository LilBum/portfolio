import { ArrowUp } from 'lucide-react'
import { site } from '../../data/site'

export default function Footer() {
  return (
    <footer className="folio-footer">
      <div className="folio-width footer-inner">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <a href="#top">Back to top <ArrowUp size={13} /></a>
      </div>
    </footer>
  )
}
