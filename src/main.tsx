// este es el archivo principal de todo el proyecto
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// el simbolo '!', se le conoce como ASSERTION NOT NULL o NO NULL ASSERTION OPERATOR
// con eso indicamos a TypeScript que el elemento div#root existe
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
