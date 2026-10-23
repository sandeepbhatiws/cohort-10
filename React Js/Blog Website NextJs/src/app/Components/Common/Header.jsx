import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <>
      {/* ========== NAVBAR (reusable component) ========== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Ink<span className="text-indigo-600">well</span></span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
            <li><Link href="/" aria-current="page" className="text-indigo-600">Home</Link></li>
            <li><Link href="/blog" className="text-slate-600 transition hover:text-indigo-600">Blogs</Link></li>
            <li><Link href="/#featured" className="text-slate-600 transition hover:text-indigo-600">Featured</Link></li>
            <li><Link href="/#categories" className="text-slate-600 transition hover:text-indigo-600">Categories</Link></li>
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">Log in</Link>
            <Link href="/register" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get Started</Link>
          </div>

          {/* Mobile menu: <details> opens and closes without any JavaScript */}
            <details className="group relative md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg className="size-6 group-open:hidden" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
                <svg className="hidden size-6 group-open:block" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
              </summary>
              <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                <ul className="space-y-1 text-sm font-medium">
                  <li><Link href="/" aria-current="page" className="block rounded-lg bg-indigo-50 px-3 py-2 text-indigo-600">Home</Link></li>
                  <li><Link href="/blog" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Blogs</Link></li>
                  <li><Link href="/#featured" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Featured</Link></li>
                  <li><Link href="/#categories" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Categories</Link></li>
                </ul>
                <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3">
                  <Link href="/login" className="rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50">Log in</Link>
                  <Link href="/register" className="rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700">Get Started</Link>
                </div>
              </div>
            </details>
        </nav>
      </header>
    </>
  )
}
