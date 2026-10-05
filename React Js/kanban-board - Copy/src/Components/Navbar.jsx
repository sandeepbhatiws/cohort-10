import React from 'react'
import { avatarColor, initials } from './constants'
import { BellIcon, LayoutIcon } from './icons'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-200">
            <LayoutIcon className="h-5 w-5" />
          </div>
          <span className="text-base font-bold text-slate-800">
            Flow<span className="text-indigo-600">Board</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <BellIcon className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-2.5 border-l border-slate-200 pl-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${avatarColor('Himanshu Bhati')}`}>
              {initials('Himanshu Bhati')}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight text-slate-700">Himanshu Bhati</p>
              <p className="text-xs leading-tight text-slate-400">Project Lead</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
