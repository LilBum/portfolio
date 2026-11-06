import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollIndicator from './components/layout/ScrollIndicator'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

const AuditCaseStudy = lazy(() => import('./components/pages/AuditCaseStudy'))
const caseStudyHash = '#/case-study/roblox-audit'

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const readHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  useEffect(() => {
    if (hash === caseStudyHash) window.scrollTo({ top: 0, behavior: 'instant' })
    else if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  if (hash === caseStudyHash) {
    return <Suspense fallback={<div className="min-h-screen" />}><AuditCaseStudy /></Suspense>
  }

  return (
    <div id="top">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" className="route-main">
        <ScrollIndicator />
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
