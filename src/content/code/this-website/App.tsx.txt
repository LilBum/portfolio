import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollTrail from './components/ui/ScrollTrail'
import Hero from './components/sections/Hero'
import ImpactStrip from './components/sections/ImpactStrip'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

// Long-form route, split out of the main bundle - only fetched when visited.
const AuditCaseStudy = lazy(() => import('./components/pages/AuditCaseStudy'))

const CASE_STUDY_ROUTES = ['#/case-study/roblox-audit']

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      setRoute(hash)
      if (CASE_STUDY_ROUTES.includes(hash)) {
        window.scrollTo(0, 0)
      } else if (hash) {
        // Returning from a page route to an in-page anchor: the section isn't
        // mounted yet when the browser tries to jump, so retry after render.
        requestAnimationFrame(() => {
          document.querySelector(hash)?.scrollIntoView()
        })
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (CASE_STUDY_ROUTES.includes(route)) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <div aria-hidden className="page-backdrop pointer-events-none fixed inset-0 -z-30" />
        <div aria-hidden className="page-grid pointer-events-none fixed inset-0 -z-30" />
        <Suspense fallback={<div className="min-h-screen" />}>
          <AuditCaseStudy />
        </Suspense>
      </div>
    )
  }

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div aria-hidden className="page-backdrop pointer-events-none fixed inset-0 -z-30" />
      <div aria-hidden className="page-grid pointer-events-none fixed inset-0 -z-30" />
      <Navbar />
      <div className="relative">
        <ScrollTrail />
        <div className="relative z-10">
          <main id="main">
            <Hero />
            <ImpactStrip />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
