import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './Components/HomePage'
import './assets/css/style.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AboutUs from './Components/AboutUs'
import Services from './Components/Services'
import ContactUs from './Components/ContactUs'
import RootLayout from './Components/Common/RootLayout'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>

        <Route element={<RootLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='about-us' element={<AboutUs/>}/>
        </Route>
        
        <Route path='services' element={<Services/>}/>
        <Route path='contact-us' element={<ContactUs/>}/>

      </Routes>
    </BrowserRouter>
  </>,
)
