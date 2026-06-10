import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Motion v12 disables animations when the OS has reduced motion on; this site opts for always-on motion. */}
    <MotionConfig reducedMotion="never">
      <App />
    </MotionConfig>
  </StrictMode>,
)
