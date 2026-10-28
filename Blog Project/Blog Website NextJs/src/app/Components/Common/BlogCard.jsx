import Link from 'next/link'
import React from 'react'

export default function BlogCard({ blogItem }) {

    const newDate = new Date(blogItem.date).toLocaleDateString('en-us', {
        month : 'long',
        day : '2-digit',
        year : 'numeric'
    })

    console.log(newDate);

    return (
        <>
            <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
                <Link href="/blog/10-tailwind-css-tricks-that-will-speed-up-your-workflow" className="relative block aspect-16/10 overflow-hidden bg-slate-100">
                    <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" alt="Colourful code in a text editor" className="size-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">{blogItem.category.name}</span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-indigo-600">
                        <Link href={`/blog/${blogItem.slug}`}>{blogItem.title}</Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{blogItem.short_description}</p>
                    <div className="mt-auto pt-5">
                        <div className="flex items-center gap-3">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya Patel" className="size-10 rounded-full object-cover" />
                            <div className="text-sm">
                                <p className="font-semibold text-slate-900">{blogItem.username}</p>
                                <p className="text-slate-500"><time dateTime="2026-10-20">{newDate}</time> &middot; 7 min read</p>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>{blogItem.total_likes}<span className="sr-only"> likes</span></span>
                                <span className="inline-flex items-center gap-1.5"><svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>{blogItem.total_comments}<span className="sr-only"> comments</span></span>
                            </div>
                            <Link href="/blog/10-tailwind-css-tricks-that-will-speed-up-your-workflow" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-all hover:gap-2 hover:text-indigo-700">
                                Read More
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}
