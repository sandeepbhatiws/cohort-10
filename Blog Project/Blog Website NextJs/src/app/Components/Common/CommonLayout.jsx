'use client'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { reduxStore } from '@/app/Redux Toolkit/ReduxStore'

export default function CommonLayout({children}) {
  return (
    <>
    <Provider store={ reduxStore }>
      <ToastContainer/>
      <Header/>

          {children}

      <Footer/>
    </Provider>
    
    </>
  )
}
