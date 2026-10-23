import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

export default function CommonLayout({children}) {
  return (
    <>
    <ToastContainer/>
    <Header/>

        {children}

    <Footer/>
    </>
  )
}
