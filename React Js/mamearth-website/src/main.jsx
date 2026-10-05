import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import Homepage from './Components/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router'
import AboutUs from './Components/AboutUs'
import ContactUs from './Components/ContactUs'
import RootLayout from './Components/Common/RootLayout'
import ProductListing from './Components/ProductListing'
import ProductDetails from './Components/ProductDetails'
import CartListing from './Components/CartListing'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>

        <Route element={<RootLayout/>}>
          <Route path='/' element={<Homepage/>}/>
          <Route path='about-us' element={<AboutUs/>}/>
          <Route path='contact-us' element={<ContactUs/>}/>
          <Route path='products/:slug?' element={<ProductListing/>}/>
          <Route path='product-details/:slug' element={<ProductDetails/>}/>
          <Route path='cart' element={<CartListing/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  </>,
)
