import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import ContextAPI from '../ContextAPI'
import Rootlayout from '../Rootlayout'

export default function Common() {

  return (
    <ContextAPI>
        <Rootlayout/>
    </ContextAPI>
  )
}
