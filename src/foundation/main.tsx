import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FoundationApp } from './FoundationApp'
import './styles/foundation.css'

createRoot(document.getElementById('foundation-root')!).render(<StrictMode><FoundationApp /></StrictMode>)
