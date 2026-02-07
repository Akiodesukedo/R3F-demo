import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MenuProvider } from './context/MenuContext.tsx'
import { Loader } from '@react-three/drei'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MenuProvider>
      <App />
      <Loader />
    </MenuProvider>
  </StrictMode>,
)
