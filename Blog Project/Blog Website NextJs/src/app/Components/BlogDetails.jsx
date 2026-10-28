'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BlogCard from './Common/BlogCard'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BlogDetails() {

    const [blogs, setBlogs] = useState([]);
    const [blogDetails, setBlogDetails] = useState('')

    const params = useParams();

    useEffect(() => {
        if(params.slug){
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}blog/details/${params.slug}`)
            .then((result) => {
                if (result.data._status) {
                    setBlogDetails(result.data._data)
                } else {
                    setBlogDetails('')
                    toast.error(result.data._message)
                }
            })
            .catch((error) => {
                toast.error('Something went wrong !!')
            })
        }
    }, [params]);

    useEffect(() => {
        if(blogDetails){
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}blog/view`, {
                limit: 3,
                category : blogDetails.category._id,
                id : blogDetails._id
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
        } else {
            setBlogs([]);   
        }
    }, [blogDetails]);


    return (
        <>
            <main>
                <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 lg:px-8">

                    {/* ========== BREADCRUMB ========== */}
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                            <li><Link href="/" className="transition hover:text-indigo-600">Home</Link></li>
                            <li aria-hidden="true"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></li>
                            <li><Link href="/blog" className="transition hover:text-indigo-600">Blogs</Link></li>
                            <li aria-hidden="true"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></li>
                            <li><Link href="/blog" className="transition hover:text-indigo-600">React</Link></li>
                            <li aria-hidden="true"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg></li>
                            <li aria-current="page" className="max-w-[14rem] truncate font-medium text-slate-900 sm:max-w-none">Mastering React Hooks</li>
                        </ol>
                    </nav>

                    {/* Two-column layout: article (left) + sticky sidebar (right, desktop only) */}
                    <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
                        <div className="min-w-0">

                            {/* ========== ARTICLE ========== */}
                            <article>
                                {/* Article header */}
                                <header className="max-w-3xl">
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <Link href="/blog" className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700 ring-1 ring-indigo-600/10 transition hover:bg-indigo-100">React</Link>
                                        <span className="inline-flex items-center gap-1.5 text-slate-500">
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                            12 min read
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-slate-500">
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                                            <time dateTime="2026-10-18">October 18, 2026</time>
                                        </span>
                                    </div>

                                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight">
                                        Mastering React Hooks: A Practical Guide to useState and useEffect
                                    </h1>
                                    <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
                                        Learn how to manage state and side effects in functional components with clear examples, common pitfalls, and best practices you can use today.
                                    </p>

                                    {/* Author row */}
                                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-5">
                                        <div className="flex items-center gap-4">
                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aarav Sharma" className="size-12 rounded-full object-cover ring-2 ring-indigo-100" />
                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    Aarav Sharma
                                                    <span className="mx-1 text-slate-300" aria-hidden="true">&middot;</span>
                                                    <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Follow</a>
                                                </p>
                                                <p className="text-sm text-slate-500">Senior Frontend Engineer &middot; 42 articles</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button type="button" aria-label="Save article" className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
                                            </button>
                                            <button type="button" aria-label="Share article" className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </header>

                                {/* Featured image */}
                                <figure className="mt-10">
                                    <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80" alt="React code displayed on a laptop screen" className="aspect-[16/9] w-full rounded-3xl bg-slate-100 object-cover shadow-lg" />
                                    <figcaption className="mt-3 text-center text-sm text-slate-500">Hooks let functional components hold state and react to changes &mdash; no classes required.</figcaption>
                                </figure>

                                {/* Article body */}
                                <div className="mt-12 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">

                                    <h2 id="introduction" className="scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Introduction</h2>
                                    <p className="mt-4">
                                        When React introduced Hooks, it changed the way we write components forever. Before Hooks, if you needed state or lifecycle methods, you had to convert your function into a class. Today, almost every modern React codebase is built entirely with functional components and Hooks.
                                    </p>
                                    <p className="mt-6">
                                        In this guide we will focus on the two Hooks you will use most often: <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useState</code> and <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useEffect</code>. By the end, you will know how they work, when to use them, and which mistakes to avoid.
                                    </p>

                                    <h2 id="what-are-hooks" className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">What Are React Hooks?</h2>
                                    <p className="mt-4">
                                        Hooks are special functions that let you &ldquo;hook into&rdquo; React features such as state and lifecycle from a function component. Every Hook starts with the word <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">use</code>, and they all follow two simple rules:
                                    </p>
                                    <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-indigo-500">
                                        <li><strong className="font-semibold text-slate-900">Only call Hooks at the top level.</strong> Never call them inside loops, conditions or nested functions.</li>
                                        <li><strong className="font-semibold text-slate-900">Only call Hooks from React functions.</strong> Use them inside components or your own custom Hooks, not in regular JavaScript functions.</li>
                                    </ul>

                                    <blockquote className="mt-8 rounded-r-2xl border-l-4 border-indigo-500 bg-indigo-50/70 py-5 pl-6 pr-5">
                                        <p className="text-lg font-medium italic leading-relaxed text-slate-800">&ldquo;Hooks let you use state and other React features without writing a class.&rdquo;</p>
                                        <footer className="mt-2 text-sm font-semibold not-italic text-indigo-700">&mdash; React documentation</footer>
                                    </blockquote>

                                    <h2 id="usestate" className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Managing State with useState</h2>
                                    <p className="mt-4">
                                        <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useState</code> lets a component remember a value between renders. It returns an array with two items: the current value and a function to update it. Here is the classic counter example:
                                    </p>

                                    {/* Code block */}
                                    <div className="mt-6 overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-900/10">
                                        <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/60 px-4 py-2.5">
                                            <div className="flex items-center gap-1.5" aria-hidden="true">
                                                <span className="size-3 rounded-full bg-red-400"></span>
                                                <span className="size-3 rounded-full bg-amber-400"></span>
                                                <span className="size-3 rounded-full bg-emerald-400"></span>
                                            </div>
                                            <span className="font-mono text-xs text-slate-400">Counter.jsx</span>
                                        </div>
                                        <pre className="overflow-x-auto p-5 text-sm leading-6 text-slate-100"><code className="font-mono">{`import {useState} from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`}</code></pre>
                                    </div>

                                    <h3 className="mt-8 text-xl font-semibold text-slate-900">Use the functional update form</h3>
                                    <p className="mt-4">
                                        When the new state depends on the previous state, pass a function to the setter instead of a value. React will always give you the latest state, even when several updates happen in quick succession.
                                    </p>

                                    {/* Code block */}
                                    <div className="mt-6 overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-900/10">
                                        <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/60 px-4 py-2.5">
                                            <div className="flex items-center gap-1.5" aria-hidden="true">
                                                <span className="size-3 rounded-full bg-red-400"></span>
                                                <span className="size-3 rounded-full bg-amber-400"></span>
                                                <span className="size-3 rounded-full bg-emerald-400"></span>
                                            </div>
                                            <span className="font-mono text-xs text-slate-400">example.js</span>
                                        </div>
                                        <pre className="overflow-x-auto p-5 text-sm leading-6 text-slate-100"><code className="font-mono">{`// May use a stale value
setCount(count + 1);

// Always uses the latest value
setCount((prevCount) => prevCount + 1);`}</code></pre>
                                    </div>

                                    <h2 id="useeffect" className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Handling Side Effects with useEffect</h2>
                                    <p className="mt-4">
                                        A <em>side effect</em> is anything that reaches outside your component: fetching data, setting up a timer, or updating the document title. <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useEffect</code> runs this kind of code <strong className="font-semibold text-slate-900">after</strong> React has updated the screen.
                                    </p>

                                    {/* Code block */}
                                    <div className="mt-6 overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-900/10">
                                        <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/60 px-4 py-2.5">
                                            <div className="flex items-center gap-1.5" aria-hidden="true">
                                                <span className="size-3 rounded-full bg-red-400"></span>
                                                <span className="size-3 rounded-full bg-amber-400"></span>
                                                <span className="size-3 rounded-full bg-emerald-400"></span>
                                            </div>
                                            <span className="font-mono text-xs text-slate-400">UserList.jsx</span>
                                        </div>
                                        <pre className="overflow-x-auto p-5 text-sm leading-6 text-slate-100"><code className="font-mono">{`import {useState, useEffect} from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // Empty array: run once after the first render

  if (loading) return <p>Loading users...</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}</code></pre>
                                    </div>

                                    <h3 className="mt-8 text-xl font-semibold text-slate-900">Understanding the dependency array</h3>
                                    <p className="mt-4">The second argument to <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useEffect</code> controls when the effect runs:</p>
                                    <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-indigo-500">
                                        <li><strong className="font-semibold text-slate-900">No array</strong> &mdash; the effect runs after <em>every</em> render.</li>
                                        <li><strong className="font-semibold text-slate-900">Empty array <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">[]</code></strong> &mdash; the effect runs only once, after the first render.</li>
                                        <li><strong className="font-semibold text-slate-900">Array with values <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">[userId]</code></strong> &mdash; the effect runs again whenever one of those values changes.</li>
                                    </ul>

                                    <h3 className="mt-8 text-xl font-semibold text-slate-900">Cleaning up after yourself</h3>
                                    <p className="mt-4">If your effect starts something that keeps running, like a timer or a subscription, return a cleanup function. React calls it before the component is removed from the screen.</p>

                                    {/* Code block */}
                                    <div className="mt-6 overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-slate-900/10">
                                        <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/60 px-4 py-2.5">
                                            <div className="flex items-center gap-1.5" aria-hidden="true">
                                                <span className="size-3 rounded-full bg-red-400"></span>
                                                <span className="size-3 rounded-full bg-amber-400"></span>
                                                <span className="size-3 rounded-full bg-emerald-400"></span>
                                            </div>
                                            <span className="font-mono text-xs text-slate-400">Clock.jsx</span>
                                        </div>
                                        <pre className="overflow-x-auto p-5 text-sm leading-6 text-slate-100"><code className="font-mono">{`useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // Cleanup runs when the component unmounts
  return () => clearInterval(timer);
}, []);`}</code></pre>
                                    </div>

                                    {/* Tip callout */}
                                    <div className="mt-8 flex gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                                            <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                                        </span>
                                        <div>
                                            <p className="font-semibold text-slate-900">Pro tip</p>
                                            <p className="mt-1 text-base leading-7 text-slate-700">Install <code className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">eslint-plugin-react-hooks</code>. It warns you about missing dependencies and broken Hook rules before they turn into bugs.</p>
                                        </div>
                                    </div>

                                    <h2 id="common-mistakes" className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Common Mistakes to Avoid</h2>
                                    <p className="mt-4">Even experienced developers trip over these. Keep this list handy during code reviews:</p>
                                    <ol className="mt-6 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-indigo-600">
                                        <li><strong className="font-semibold text-slate-900">Calling Hooks conditionally.</strong> React relies on the order of Hook calls, so an <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">if</code> statement around a Hook will break things.</li>
                                        <li><strong className="font-semibold text-slate-900">Forgetting dependencies.</strong> If your effect uses a prop or state value, it belongs in the dependency array.</li>
                                        <li><strong className="font-semibold text-slate-900">Mutating state directly.</strong> Always create a new array or object, for example <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">[...items, newItem]</code>.</li>
                                        <li><strong className="font-semibold text-slate-900">Skipping cleanup.</strong> Timers and subscriptions that are never cleared cause memory leaks and strange bugs.</li>
                                    </ol>

                                    <h2 id="conclusion" className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Conclusion</h2>
                                    <p className="mt-4">
                                        <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useState</code> and <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useEffect</code> cover the vast majority of what you need to build interactive React apps. Master these two, follow the rules of Hooks, and you will be ready for more advanced patterns like <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useReducer</code>, <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-700">useContext</code> and custom Hooks.
                                    </p>
                                    <p className="mt-6">Happy coding, and let me know in the comments which Hook you would like me to cover next!</p>
                                </div>

                                {/* Tags */}
                                <div className="mt-10 flex max-w-3xl flex-wrap items-center gap-2">
                                    <span className="mr-1 text-sm font-medium text-slate-500">Tags:</span>
                                    <Link href="/blog" className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">#react</Link>
                                    <Link href="/blog" className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">#hooks</Link>
                                    <Link href="/blog" className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">#javascript</Link>
                                    <Link href="/blog" className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">#frontend</Link>
                                    <Link href="/blog" className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">#webdev</Link>
                                </div>

                                {/* Reactions bar (visual only) */}
                                <div className="mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                                    <div className="flex flex-wrap items-center gap-3">
                                        {/* Like button */}
                                        <button type="button" aria-pressed="false" className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">
                                            <svg className="size-5 transition group-hover:scale-110" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                            Like
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 transition group-hover:bg-rose-100 group-hover:text-rose-600">248</span>
                                        </button>
                                        {/* Jump to comments */}
                                        <a href="#comments" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                                            <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>
                                            32 Comments
                                        </a>
                                    </div>

                                    {/* Share links */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-slate-500">Share:</span>
                                        <a href="#" aria-label="Share on X" className="flex size-9 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-600">
                                            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                                        </a>
                                        <a href="#" aria-label="Share on LinkedIn" className="flex size-9 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-600">
                                            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        </a>
                                        <a href="#" aria-label="Share on Facebook" className="flex size-9 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-600">
                                            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Author bio */}
                                <div className="mt-10 flex max-w-3xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aarav Sharma" className="size-20 shrink-0 rounded-2xl object-cover" />
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Written by</p>
                                        <h2 className="mt-1 text-xl font-bold text-slate-900">Aarav Sharma</h2>
                                        <p className="mt-2 text-base leading-7 text-slate-600">Senior Frontend Engineer at a fintech startup in Bengaluru. Aarav has been building with React since 2017 and loves turning tricky concepts into simple, practical tutorials.</p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <a href="#" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">Follow</a>
                                            <Link href="/blog" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">View all articles</Link>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Back to Blogs */}
                            <Link href="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all hover:gap-3 hover:text-indigo-700">
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                                Back to Blogs
                            </Link>

                            {/* ========== COMMENTS ========== */}
                            <section id="comments" className="mt-12 max-w-3xl scroll-mt-24 border-t border-slate-200 pt-12" aria-labelledby="comments-heading">
                                <h2 id="comments-heading" className="text-2xl font-bold text-slate-900">Comments <span className="font-medium text-slate-400">(32)</span></h2>

                                {/* Comment form (visual only - does not submit anywhere) */}
                                <form action="#" className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                    <h3 className="text-lg font-semibold text-slate-900">Leave a comment</h3>
                                    <p className="mt-1 text-sm text-slate-500">Your email address will not be published.</p>

                                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="comment-name" className="block text-sm font-medium text-slate-700">Name</label>
                                            <input id="comment-name" name="name" type="text" autoComplete="name" placeholder="Jane Doe" className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100" />
                                        </div>
                                        <div>
                                            <label htmlFor="comment-email" className="block text-sm font-medium text-slate-700">Email</label>
                                            <input id="comment-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="comment-message" className="block text-sm font-medium text-slate-700">Comment</label>
                                            <textarea id="comment-message" name="message" rows="5" placeholder="Share your thoughts..." className="mt-2 block w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"></textarea>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-xs text-slate-500">Please keep comments respectful and on topic.</p>
                                        <button type="button" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                                            Post Comment
                                        </button>
                                    </div>
                                </form>

                                {/* Comment list */}
                                <ul className="mt-10 space-y-8">

                                    {/* Comment */}
                                    <li>
                                        <article className="flex gap-4">
                                            <img src="https://randomuser.me/api/portraits/women/26.jpg" alt="Ishita Verma" className="size-11 shrink-0 rounded-full object-cover" />
                                            <div className="min-w-0 flex-1">
                                                <div className="rounded-2xl rounded-tl-sm bg-slate-50 p-5 ring-1 ring-slate-100">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <h3 className="font-semibold text-slate-900">Ishita Verma</h3>
                                                        <time dateTime="2026-10-19" className="text-xs text-slate-500">Oct 19, 2026</time>
                                                    </div>
                                                    <p className="mt-2 text-[15px] leading-7 text-slate-700">This is the clearest explanation of the dependency array I've read. The three-case breakdown finally made it click for me. Bookmarking this for my whole team!</p>
                                                </div>
                                                <div className="mt-2 flex items-center gap-5 pl-2 text-sm">
                                                    {/* Liked state example: filled heart + "Unlike" */}
                                                    <button type="button" aria-pressed="true" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-rose-600 transition hover:text-rose-700">
                                                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                                        Unlike <span className="text-rose-400">&middot; 25</span>
                                                    </button>
                                                    <button type="button" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-indigo-600">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>
                                                        Reply
                                                    </button>
                                                </div>

                                                {/* Nested reply */}
                                                <ul className="mt-6 space-y-6 border-l-2 border-indigo-100 pl-4 sm:pl-6">
                                                    <li>
                                                        <article className="flex gap-4">
                                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aarav Sharma" className="size-10 shrink-0 rounded-full object-cover" />
                                                            <div className="min-w-0 flex-1">
                                                                <div className="rounded-2xl rounded-tl-sm bg-indigo-50/70 p-5 ring-1 ring-indigo-100">
                                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                                        <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                                                                            Aarav Sharma
                                                                            <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Author</span>
                                                                        </h3>
                                                                        <time dateTime="2026-10-19" className="text-xs text-slate-500">Oct 19, 2026</time>
                                                                    </div>
                                                                    <p className="mt-2 text-[15px] leading-7 text-slate-700">Thank you, Ishita! Glad the breakdown helped. I'm planning a follow-up on <code className="rounded bg-white px-1 font-mono text-[0.9em] text-indigo-700">useReducer</code> and custom Hooks next month.</p>
                                                                </div>
                                                                <div className="mt-2 flex items-center gap-5 pl-2 text-sm">
                                                                    <button type="button" aria-pressed="false" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-rose-600">
                                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                                                        Like <span className="text-slate-400">&middot; 8</span>
                                                                    </button>
                                                                    <button type="button" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-indigo-600">
                                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>
                                                                        Reply
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    </li>
                                                </ul>
                                            </div>
                                        </article>
                                    </li>

                                    {/* Comment */}
                                    <li>
                                        <article className="flex gap-4">
                                            <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="Daniel Brooks" className="size-11 shrink-0 rounded-full object-cover" />
                                            <div className="min-w-0 flex-1">
                                                <div className="rounded-2xl rounded-tl-sm bg-slate-50 p-5 ring-1 ring-slate-100">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <h3 className="font-semibold text-slate-900">Daniel Brooks</h3>
                                                        <time dateTime="2026-10-20" className="text-xs text-slate-500">Oct 20, 2026</time>
                                                    </div>
                                                    <p className="mt-2 text-[15px] leading-7 text-slate-700">Great article. One question: should I always use the functional update form of the setter, or only when the new state depends on the previous one?</p>
                                                </div>
                                                <div className="mt-2 flex items-center gap-5 pl-2 text-sm">
                                                    <button type="button" aria-pressed="false" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-rose-600">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                                        Like <span className="text-slate-400">&middot; 12</span>
                                                    </button>
                                                    <button type="button" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-indigo-600">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    </li>

                                    {/* Comment */}
                                    <li>
                                        <article className="flex gap-4">
                                            <img src="https://randomuser.me/api/portraits/women/50.jpg" alt="Fatima Khan" className="size-11 shrink-0 rounded-full object-cover" />
                                            <div className="min-w-0 flex-1">
                                                <div className="rounded-2xl rounded-tl-sm bg-slate-50 p-5 ring-1 ring-slate-100">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <h3 className="font-semibold text-slate-900">Fatima Khan</h3>
                                                        <time dateTime="2026-10-20" className="text-xs text-slate-500">Oct 20, 2026</time>
                                                    </div>
                                                    <p className="mt-2 text-[15px] leading-7 text-slate-700">The cleanup example with setInterval saved me. I had a memory leak in a dashboard component for weeks and never figured out why. Thanks for sharing!</p>
                                                </div>
                                                <div className="mt-2 flex items-center gap-5 pl-2 text-sm">
                                                    <button type="button" aria-pressed="false" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-rose-600">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                                        Like <span className="text-slate-400">&middot; 17</span>
                                                    </button>
                                                    <button type="button" className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-indigo-600">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                </ul>

                                <div className="mt-10 text-center">
                                    <button type="button" className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">Load more comments</button>
                                </div>
                            </section>
                        </div>

                        {/* ========== SIDEBAR (desktop only) ========== */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24 space-y-6">
                                {/* Table of contents (plain anchor links) */}
                                <nav aria-label="Table of contents" className="rounded-2xl border border-slate-200 bg-white p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">On this page</p>
                                    <ul className="mt-4 space-y-1 border-l border-slate-200 text-sm">
                                        <li><a href="#introduction" className="-ml-px block border-l-2 border-indigo-600 py-1.5 pl-4 font-medium text-indigo-600">Introduction</a></li>
                                        <li><a href="#what-are-hooks" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-slate-600 transition hover:border-slate-400 hover:text-slate-900">What Are React Hooks?</a></li>
                                        <li><a href="#usestate" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-slate-600 transition hover:border-slate-400 hover:text-slate-900">Managing State with useState</a></li>
                                        <li><a href="#useeffect" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-slate-600 transition hover:border-slate-400 hover:text-slate-900">Side Effects with useEffect</a></li>
                                        <li><a href="#common-mistakes" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-slate-600 transition hover:border-slate-400 hover:text-slate-900">Common Mistakes</a></li>
                                        <li><a href="#conclusion" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-slate-600 transition hover:border-slate-400 hover:text-slate-900">Conclusion</a></li>
                                        <li><a href="#comments" className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-slate-600 transition hover:border-slate-400 hover:text-slate-900">Comments</a></li>
                                    </ul>
                                </nav>

                                {/* Mini newsletter */}
                                <div className="rounded-2xl bg-linear-to-br from-indigo-600 to-blue-600 p-6 text-white shadow-lg shadow-indigo-600/20">
                                    <p className="text-lg font-semibold">Enjoying this article?</p>
                                    <p className="mt-1 text-sm leading-relaxed text-indigo-100">Get new React tutorials delivered to your inbox every Friday.</p>
                                    <form action="#" className="mt-4">
                                        <label htmlFor="sidebar-email" className="sr-only">Email address</label>
                                        <input id="sidebar-email" type="email" placeholder="you@example.com" className="block w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-indigo-200 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50" />
                                        <button type="button" className="mt-3 w-full cursor-pointer rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50">Subscribe</button>
                                    </form>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* ========== RELATED BLOGS ========== */}
                <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20" aria-labelledby="related-heading">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Keep reading</p>
                                <h2 id="related-heading" className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Related Blogs</h2>
                            </div>
                            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all hover:gap-3 hover:text-indigo-700">
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                                Back to Blogs
                            </Link>
                        </div>

                        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                            {
                                blogs.map((item, i) => {
                                    return (
                                        <BlogCard blogItem={item} key={i} />
                                    )
                                })
                            }

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
