'use client'
import { reduxStore } from '@/app/Redux Toolkit/ReduxStore'
import React from 'react'
import { Provider } from 'react-redux'

export default function Authenticationlayout({children}) {
  return (
    <>
      <Provider store={ reduxStore }>
        {children}
      </Provider>
    </>
  )
}
