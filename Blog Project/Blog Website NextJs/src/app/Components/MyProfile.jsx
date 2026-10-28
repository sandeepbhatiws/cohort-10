'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function MyProfile({articles}) {

    const isLogin = useSelector((state) => {
        return state.login.isLogin
    })

    const route = useRouter();

    // useEffect(() => {
    //     if(isLogin == 0){
    //         route.push('/login')
    //     }
    // }, [isLogin])


  return (
    <>
      <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-600">
        <div
          className="pointer-events-none absolute -right-24 -top-40 size-112 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-48 left-1/3 size-112 rounded-full bg-violet-300/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-12 sm:px-6 sm:pb-32 sm:pt-16 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-indigo-100">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-white">
                My Profile
              </li>
            </ol>
          </nav>
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Writer profile
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            My profile
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-indigo-100 sm:text-lg">
            A little about the person behind the posts, the ideas I explore, and
            what I have been writing lately.
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-16 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <section
          aria-labelledby="profile-name"
          className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-950/10 sm:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-8">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Aarav Sharma"
              className="size-28 shrink-0 rounded-2xl object-cover ring-4 ring-indigo-50 sm:size-32"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  id="profile-name"
                  className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Aarav Sharma
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/10">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Open to connect
                </span>
              </div>
              <p className="mt-2 text-base font-medium text-indigo-700">
                Senior Frontend Engineer &amp; writer
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                I build thoughtful web experiences and write about React,
                frontend engineering, and the lessons learned along the way.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="size-4 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
                    />
                    <circle cx="12" cy="10" r="2.25" />
                  </svg>
                  Bengaluru, India
                </span>
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="size-4 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                  Member since March 2023
                </span>
              </div>
            </div>
            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Explore my writing
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-7 sm:grid-cols-4 sm:gap-6">
            <div>
              <dd className="text-2xl font-bold text-slate-900">42</dd>
              <dt className="mt-1 text-sm text-slate-500">Articles published</dt>
            </div>
            <div>
              <dd className="text-2xl font-bold text-slate-900">18.6K</dd>
              <dt className="mt-1 text-sm text-slate-500">Total reads</dt>
            </div>
            <div>
              <dd className="text-2xl font-bold text-slate-900">2.4K</dd>
              <dt className="mt-1 text-sm text-slate-500">Followers</dt>
            </div>
            <div>
              <dd className="text-2xl font-bold text-slate-900">4.9</dd>
              <dt className="mt-1 text-sm text-slate-500">Reader rating</dt>
            </div>
          </dl>
        </section>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <section aria-labelledby="articles-heading">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                  From the notebook
                </p>
                <h2
                  id="articles-heading"
                  className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
                >
                  Recent articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                Browse all articles
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {articles.map((article) => (
                <article
                  key={article.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-semibold text-indigo-700">
                      {article.category}
                    </span>
                    <time>{article.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900">
                    <Link
                      href="/blog"
                      className="transition hover:text-indigo-600"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {article.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-bold text-slate-900">About me</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                I enjoy turning complex ideas into useful, approachable
                articles. When I am away from the keyboard, I am usually
                exploring a new cafe or reading about design.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-bold text-slate-900">
                Topics I write about
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["React", "JavaScript", "Frontend", "Web design", "Career"].map(
                  (topic) => (
                    <li
                      key={topic}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                    >
                      {topic}
                    </li>
                  ),
                )}
              </ul>
            </section>

            <section className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6">
              <p className="text-sm font-semibold text-indigo-700">
                Enjoying my articles?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Keep exploring the latest stories from the Inkwell community.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-900"
              >
                Discover more stories
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
    </>
  )
}
