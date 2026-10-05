import React from 'react'
import Navbar from './Navbar'
import KanbanBoard from './KanbanBoard'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <Navbar />
      <KanbanBoard />
    </div>
  )
}
