import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <>
      {/* ========== FOOTER (reusable component) ========== */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
            {/* Brand + social */}
            <div className="sm:col-span-2 lg:col-span-3">
              <Link href="/" className="flex w-fit items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
                </span>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">Ink<span className="text-indigo-600">well</span></span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">Inkwell is a community blog where developers share tutorials, stories and ideas about web development, design and building a career in tech.</p>
              <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
                <li>
                  <a href="#" aria-label="Inkwell on X" className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Inkwell on GitHub" className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Inkwell on LinkedIn" className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Inkwell on YouTube" className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Inkwell on Facebook" className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Link columns */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Explore</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li><Link href="/" className="transition hover:text-indigo-600">Home</Link></li>
                <li><Link href="/blog" className="transition hover:text-indigo-600">All Blogs</Link></li>
                <li><Link href="/#featured" className="transition hover:text-indigo-600">Featured</Link></li>
                <li><Link href="/#categories" className="transition hover:text-indigo-600">Categories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Topics</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li><Link href="/blog" className="transition hover:text-indigo-600">JavaScript</Link></li>
                <li><Link href="/blog" className="transition hover:text-indigo-600">React</Link></li>
                <li><Link href="/blog" className="transition hover:text-indigo-600">CSS &amp; Design</Link></li>
                <li><Link href="/blog" className="transition hover:text-indigo-600">AI &amp; ML</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Account</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li><Link href="/login" className="transition hover:text-indigo-600">Log in</Link></li>
                <li><Link href="/register" className="transition hover:text-indigo-600">Register</Link></li>
                <li><Link href="/#newsletter" className="transition hover:text-indigo-600">Newsletter</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 sm:flex-row">
            <p>&copy; 2026 Inkwell. All rights reserved.</p>
            <ul className="flex gap-6">
              <li><a href="#" className="transition hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-indigo-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
