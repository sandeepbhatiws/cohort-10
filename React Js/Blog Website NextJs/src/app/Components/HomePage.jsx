import Link from 'next/link'
import React from 'react'
import BlogCard from './Common/BlogCard'

export default function HomePage() {
  return (
    <>
      <main>
        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden bg-linear-to-b from-indigo-50 via-white to-white">
          {/* Decorative background blobs */}
          <div className="pointer-events-none absolute -right-32 -top-32 size-112 rounded-full bg-indigo-200/50 blur-3xl" aria-hidden="true"></div>
          <div className="pointer-events-none absolute -left-40 top-40 size-96 rounded-full bg-blue-100/60 blur-3xl" aria-hidden="true"></div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:px-8">
            {/* Hero text */}
            <div>
              <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white py-1 pl-1 pr-3 text-sm font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-50">
                <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white">New</span>
                React 19 deep-dive series is live
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
              </Link>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Stories &amp; tutorials for <span className="text-indigo-600">curious developers</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                In-depth articles on web development, design, AI and career growth &mdash; written by developers who have been there, for developers who are getting there.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/blog" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Explore Blogs
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                </Link>
                <Link href="/register" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50">
                  Start Writing
                </Link>
              </div>

              {/* Stats */}
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-8">
                <div>
                  <dt className="text-sm text-slate-500">Articles</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-900">1,200+</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Readers</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-900">85K</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-500">Authors</dt>
                  <dd className="mt-1 text-2xl font-bold text-slate-900">150+</dd>
                </div>
              </dl>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-indigo-900/20 ring-1 ring-slate-900/5">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80" alt="Developer typing a blog post on a laptop" className="aspect-4/3 w-full object-cover"/>
              </div>

              {/* Floating card: trending post */}
              <div className="absolute -left-6 bottom-8 hidden max-w-68 items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-900/5 sm:flex">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/></svg>
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-500">Trending this week</p>
                  <p className="text-sm font-semibold text-slate-900">Mastering React Hooks</p>
                </div>
              </div>

              {/* Floating card: readers */}
              <div className="absolute -right-4 -top-6 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-900/5 sm:flex">
                <div className="flex -space-x-2">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" className="size-8 rounded-full object-cover ring-2 ring-white"/>
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="size-8 rounded-full object-cover ring-2 ring-white"/>
                      <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" className="size-8 rounded-full object-cover ring-2 ring-white"/>
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" className="size-8 rounded-full object-cover ring-2 ring-white"/>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">85K+ <span className="font-normal text-slate-500">readers</span></p>
                      </div>
                    </div>
                </div>
              </section>

              {/* ========== FEATURED BLOGS ========== */}
              <section id="featured" className="scroll-mt-20 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  {/* Section heading */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Editor&apos;s picks</p>
                      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured Blogs</h2>
                      <p className="mt-3 max-w-2xl text-slate-600">Hand-picked articles our editors think you shouldn&apos;t miss this month.</p>
                    </div>
                    <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-all hover:gap-2 hover:text-indigo-700">
                      View all articles
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                    </Link>
                  </div>

                  <div className="mt-12 grid gap-8 lg:grid-cols-2">
                    {/* Featured Card (large) */}
                    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-slate-200/70">
                      <Link href="/blog/mastering-react-hooks-a-practical-guide-to-usestate-and-useeffect" className="relative block aspect-video overflow-hidden bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80" alt="React code on a laptop screen" className="size-full object-cover transition duration-500 group-hover:scale-105"/>
                          <div className="absolute left-5 top-5 flex gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                              <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd"/></svg>
                              Featured
                            </span>
                            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">React</span>
                          </div>
                      </Link>
                      <div className="flex flex-1 flex-col p-6 sm:p-8">
                        <h3 className="text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-indigo-600 sm:text-3xl">
                          <Link href="/blog/mastering-react-hooks-a-practical-guide-to-usestate-and-useeffect">Mastering React Hooks: A Practical Guide to useState and useEffect</Link>
                        </h3>
                        <p className="mt-3 leading-relaxed text-slate-600">Learn how to manage state and side effects in functional components with clear examples, common pitfalls, and best practices you can use today.</p>
                        <div className="mt-auto pt-6">
                          <div className="flex items-center gap-3">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aarav Sharma" className="size-11 rounded-full object-cover"/>
                              <div className="text-sm">
                                <p className="font-semibold text-slate-900">Aarav Sharma</p>
                                <p className="text-slate-500"><time dateTime="2026-10-18">Oct 18, 2026</time> &middot; 12 min read</p>
                              </div>
                          </div>
                          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>248<span className="sr-only"> likes</span></span>
                              <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"/></svg>32<span className="sr-only"> comments</span></span>
                            </div>
                            <Link href="/blog/mastering-react-hooks-a-practical-guide-to-usestate-and-useeffect" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-all hover:gap-2 hover:text-indigo-700">
                              Read More
                              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* Two horizontal featured cards */}
                    <div className="grid gap-8">
                      {/* Horizontal Card */}
                      <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-slate-200/70 sm:flex-row">
                        <Link href="/blog/getting-started-with-prompt-engineering-for-developers" className="relative block aspect-16/10 overflow-hidden bg-slate-100 sm:aspect-auto sm:w-56 sm:shrink-0">
                          <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" alt="Abstract illustration of artificial intelligence" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"/>
                            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">AI &amp; ML</span>
                        </Link>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-indigo-600">
                            <Link href="/blog/getting-started-with-prompt-engineering-for-developers">Getting Started with Prompt Engineering for Developers</Link>
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">Write better prompts, get more reliable output, and learn how to integrate large language models into your everyday dev workflow.</p>
                          <div className="mt-auto pt-5">
                            <div className="flex items-center gap-3">
                              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Ananya Reddy" className="size-9 rounded-full object-cover"/>
                                <div className="text-sm">
                                  <p className="font-semibold text-slate-900">Ananya Reddy</p>
                                  <p className="text-slate-500"><time dateTime="2026-10-15">Oct 15, 2026</time> &middot; 10 min read</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>402<span className="sr-only"> likes</span></span>
                                <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"/></svg>56<span className="sr-only"> comments</span></span>
                              </div>
                              <Link href="/blog/getting-started-with-prompt-engineering-for-developers" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-all hover:gap-2 hover:text-indigo-700">
                                Read More
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>

                      {/* Horizontal Card */}
                      <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:shadow-slate-200/70 sm:flex-row">
                        <Link href="/blog/how-i-landed-my-first-developer-job-without-a-cs-degree" className="relative block aspect-16/10 overflow-hidden bg-slate-100 sm:aspect-auto sm:w-56 sm:shrink-0">
                          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team of developers collaborating around a table" className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"/>
                            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">Career</span>
                        </Link>
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-indigo-600">
                            <Link href="/blog/how-i-landed-my-first-developer-job-without-a-cs-degree">How I Landed My First Developer Job Without a CS Degree</Link>
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">From tutorial hell to a frontend role in 14 months: the projects, resources and interview strategies that actually worked for me.</p>
                          <div className="mt-auto pt-5">
                            <div className="flex items-center gap-3">
                              <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="Kabir Singh" className="size-9 rounded-full object-cover"/>
                                <div className="text-sm">
                                  <p className="font-semibold text-slate-900">Kabir Singh</p>
                                  <p className="text-slate-500"><time dateTime="2026-10-11">Oct 11, 2026</time> &middot; 6 min read</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>521<span className="sr-only"> likes</span></span>
                                <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"/></svg>89<span className="sr-only"> comments</span></span>
                              </div>
                              <Link href="/blog/how-i-landed-my-first-developer-job-without-a-cs-degree" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-all hover:gap-2 hover:text-indigo-700">
                                Read More
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========== LATEST BLOGS ========== */}
              <section id="latest" className="scroll-mt-20 bg-slate-50 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  {/* Section heading */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Fresh off the press</p>
                      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Latest Blogs</h2>
                      <p className="mt-3 max-w-2xl text-slate-600">The newest tutorials, opinions and stories from our community of writers.</p>
                    </div>
                    <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-all hover:gap-2 hover:text-indigo-700">
                      See all blogs
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                    </Link>
                  </div>

                  {/* Blog grid */}
                  <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Blog Card */}
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>

                    

                  </div>
                </div>
              </section>

              {/* ========== CATEGORIES ========== */}
              <section id="categories" className="scroll-mt-20 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Browse by topic</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Blog Categories</h2>
                    <p className="mt-3 text-slate-600">Find exactly what you want to learn next, from JavaScript fundamentals to landing your dream job.</p>
                  </div>

                  <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">JavaScript</span>
                        <span className="block text-sm text-slate-500">48 articles</span>
                      </span>
                    </Link>

                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">React</span>
                        <span className="block text-sm text-slate-500">36 articles</span>
                      </span>
                    </Link>

                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">CSS &amp; Design</span>
                        <span className="block text-sm text-slate-500">29 articles</span>
                      </span>
                    </Link>

                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">AI &amp; ML</span>
                        <span className="block text-sm text-slate-500">24 articles</span>
                      </span>
                    </Link>

                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">Career</span>
                        <span className="block text-sm text-slate-500">31 articles</span>
                      </span>
                    </Link>

                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">DevOps</span>
                        <span className="block text-sm text-slate-500">18 articles</span>
                      </span>
                    </Link>

                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">Security</span>
                        <span className="block text-sm text-slate-500">15 articles</span>
                      </span>
                    </Link>

                    {/* Category Card */}
                    <Link href="/blog" className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/></svg>
                      </span>
                      <span>
                        <span className="block font-semibold text-slate-900">Productivity</span>
                        <span className="block text-sm text-slate-500">22 articles</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </section>

              {/* ========== NEWSLETTER ========== */}
              <section id="newsletter" className="scroll-mt-20 pb-16 sm:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-14 shadow-xl shadow-indigo-600/20 sm:px-12 lg:px-16">
                    {/* Decorative circles */}
                    <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10" aria-hidden="true"></div>
                    <div className="pointer-events-none absolute -bottom-24 left-1/3 size-72 rounded-full bg-indigo-500/60" aria-hidden="true"></div>

                    <div className="relative grid items-center gap-10 lg:grid-cols-2">
                      <div>
                        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white/15 text-white">
                          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                        </span>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">Get the best articles in your inbox</h2>
                        <p className="mt-3 max-w-lg text-indigo-100">Join 85,000+ developers who get one hand-picked email every Friday. No spam, unsubscribe anytime.</p>
                      </div>

                      {/* Newsletter form (visual only - it does not submit anywhere) */}
                      <form action="#" className="w-full">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                          <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" className="w-full flex-1 rounded-xl border border-white/20 bg-white px-5 py-3.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-white/40"/>
                            <button type="button" className="cursor-pointer rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Subscribe</button>
                        </div>
                        <p className="mt-3 flex items-center gap-2 text-sm text-indigo-100">
                          <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
                          We respect your privacy. Read our <a href="#" className="font-semibold text-white underline underline-offset-2 hover:no-underline">privacy policy</a>.
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </>
          )
}
