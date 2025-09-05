import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './MinimalApp.tsx'

console.log('main.tsx 模块加载');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
