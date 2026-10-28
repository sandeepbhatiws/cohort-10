'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BlogCard from './Common/BlogCard'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Blog() {

    var [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/api/website/blog/view', {
            limit: 18
        })
            .then((result) => {
                if (result.data._status) {
                    setBlogs(result.data._data)
                } else {
                    setBlogs([])
                    toast.error(result.data._message)
                }
            })
            .catch((error) => {
                toast.error('Something went wrong !!')
            })
    }, []);

    return (
        <>
            <main>
                {/* ========== PAGE HEADER ========== */}
                <section className="relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-indigo-50 to-white">
                    <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-indigo-200/50 blur-3xl" aria-hidden="true"></div>
                    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb">
                            <ol className="flex items-center gap-2 text-sm text-slate-500">
                                <li><Link href="/" className="transition hover:text-indigo-600">Home</Link></li>
                                <li aria-hidden="true">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                                </li>
                                <li aria-current="page" className="font-medium text-slate-900">Blogs</li>
                            </ol>
                        </nav>

                        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Explore Our Blog</h1>
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                            Tutorials, deep dives and honest stories from developers around the world. Search by keyword, filter by topic, and find your next favourite read.
                        </p>
                    </div>
                </section>

                {/* ========== SEARCH, FILTERS & BLOG GRID ========== */}

                {
                    blogs.length > 0
                        ?
                        <section className="py-12 sm:py-16">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                                {/* Toolbar (all controls are visual only) */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                                    <div className="flex flex-col gap-3 md:flex-row">
                                        {/* Search input */}
                                        <div role="search" className="relative flex-1">
                                            <label htmlFor="search" className="sr-only">Search articles</label>
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                                            </span>
                                            <input id="search" name="search" type="search" placeholder="Search articles, topics or authors..." className="block w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100" />
                                        </div>

                                        {/* Sort dropdown */}
                                        <div className="relative md:w-56">
                                            <label htmlFor="sort" className="sr-only">Sort articles</label>
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" /></svg>
                                            </span>
                                            <select id="sort" name="sort" className="block w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-10 font-medium text-slate-700 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100" defaultValue="Latest first">
                                                <option>Latest first</option>
                                                <option>Oldest first</option>
                                                <option>Most popular</option>
                                                <option>Most commented</option>
                                            </select>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                                                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Category filter buttons */}
                                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                                        <span className="mr-1 text-sm font-medium text-slate-500">Filter:</span>
                                        <button type="button" aria-pressed="true" className="cursor-pointer rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">All</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">JavaScript</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">React</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">CSS</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">Design</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">AI &amp; ML</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">Career</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">Backend</button>
                                        <button type="button" aria-pressed="false" className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">Security</button>
                                    </div>
                                </div>

                                {/* Results summary */}
                                <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm text-slate-600">Showing <span className="font-semibold text-slate-900">1&ndash;9</span> of <span className="font-semibold text-slate-900">54</span> articles</p>
                                    <p className="text-sm text-slate-500">Sorted by <span className="font-medium text-slate-700">Latest first</span></p>
                                </div>

                                {/* Blog grid */}
                                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                                    {/* Blog Card */}
                                    {
                                        blogs.map((item, i) => {
                                            return (
                                                <BlogCard blogItem={item} key={i} />
                                            )
                                        })
                                    }

                                </div>

                                {/* Pagination (visual only) */}
                                <nav className="mt-14 flex items-center justify-between gap-4 border-t border-slate-200 pt-8" aria-label="Pagination">
                                    {/* Previous is shown as disabled because we are on page 1 */}
                                    <span aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-400">
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                                        Previous
                                    </span>

                                    <ul className="hidden items-center gap-1 sm:flex">
                                        <li><a href="#" aria-current="page" className="flex size-10 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm">1</a></li>
                                        <li><a href="#" className="flex size-10 items-center justify-center rounded-lg text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">2</a></li>
                                        <li><a href="#" className="flex size-10 items-center justify-center rounded-lg text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">3</a></li>
                                        <li><span className="flex size-10 items-center justify-center text-sm text-slate-400">&hellip;</span></li>
                                        <li><a href="#" className="flex size-10 items-center justify-center rounded-lg text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">6</a></li>
                                    </ul>
                                    <p className="text-sm text-slate-600 sm:hidden">Page <span className="font-semibold text-slate-900">1</span> of 6</p>

                                    <a href="#" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
                                        Next
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                    </a>
                                </nav>
                            </div>
                        </section>
                        :
                        <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16" aria-labelledby="empty-state-heading">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">UI state preview</span>
                                    <h2 id="empty-state-heading" className="text-lg font-semibold text-slate-900">Empty state &mdash; when a search returns no results</h2>
                                </div>

                                <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                    <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                        <svg className="size-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                    </span>
                                    <h3 className="mt-6 text-xl font-bold text-slate-900">No articles found</h3>
                                    <p className="mx-auto mt-2 max-w-md text-slate-600">
                                        We couldn't find any articles matching <span className="font-semibold text-slate-900">&ldquo;quantum css&rdquo;</span>. Try a different keyword or browse all categories.
                                    </p>
                                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                        <button type="button" className="cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">Clear search</button>
                                        <Link href="/blog" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">Browse all blogs</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                }
            </main>
        </>
    )
}
