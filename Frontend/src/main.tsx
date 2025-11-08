
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './Providers/AuthProvide.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  
    <AuthProvider>
    <App />
    <Toaster position="top-right" />
    </AuthProvider>
)
