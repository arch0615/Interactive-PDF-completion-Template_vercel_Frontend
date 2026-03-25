import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TemplateList from './components/TemplateList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemplateList />} />
        <Route path="/template/:templateId" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
