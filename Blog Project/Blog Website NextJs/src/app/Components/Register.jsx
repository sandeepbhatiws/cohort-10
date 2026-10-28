'use client'
import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginRegister } from '../Redux Toolkit/loginSlice';
import { useRouter } from 'next/navigation';

export default function Register() {

    const dispatch = useDispatch();
    const route = useRouter();

    const loginHandler = (event) => {
        event.preventDefault();

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/register`, {
            name : event.target.name.value,
            email : event.target.email.value,
            password : event.target.password.value,
        })
        .then((result) => {
            if(result.data._status){
                toast.success(result.data._message);
                dispatch(loginRegister(result.data._token))
                route.push('/profile')
            } else {
                toast.error(result.data._message);
            }
        })
        .catch(() => {
            toast.error('Something went wrong!');
        })
    }


    return (
        <>
            <main className="grid min-h-screen lg:grid-cols-2">

                {/* ========== LEFT: REGISTER FORM ========== */}
                <section className="flex flex-col px-4 py-8 sm:px-6 lg:px-16 xl:px-24">
                    {/* Back link */}
                    <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
                        Back to home
                    </Link>

                    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
                        {/* Logo */}
                        <Link href="/" className="flex w-fit items-center gap-2.5">
                            <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>
                            </span>
                            <span className="text-2xl font-extrabold tracking-tight text-slate-900">Ink<span className="text-indigo-600">well</span></span>
                        </Link>

                        {/* Heading */}
                        <h1 className="mt-10 text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
                        <p className="mt-2 text-slate-600">Join 85,000+ developers. Read, write and grow with the community &mdash; it's free.</p>

                        {/* Register form (visual only - no validation or data storage) */}
                        <form onSubmit={loginHandler} className="mt-10 space-y-5">
                            {/* Full name */}
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-slate-700">Full name</label>
                                <div className="relative mt-2">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>
                                    </span>
                                    <input id="full-name" name="name" type="text" autoComplete="name" placeholder="Jane Doe" className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"/>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                                <div className="relative mt-2">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
                                    </span>
                                    <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"/>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                                <div className="relative mt-2">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
                                    </span>
                                    <input id="password" name="password" type="password" autoComplete="new-password" placeholder="Create a password" aria-describedby="password-hint" className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"/>
                                </div>
                                <p id="password-hint" className="mt-2 text-xs text-slate-500">Use at least 8 characters with a mix of letters, numbers and symbols.</p>
                            </div>

                            {/* Confirm password */}
                            {/* <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">Confirm password</label>
                                <div className="relative mt-2">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                        <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
                                    </span>
                                    <input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Re-enter your password" className="block w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"/>
                                </div>
                            </div> */}

                            {/* Terms and conditions */}
                            <div className="flex items-start gap-3 pt-1">
                                <input id="terms" name="terms" type="checkbox" className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-slate-300 accent-indigo-600"/>
                                    <label htmlFor="terms" className="cursor-pointer text-sm leading-6 text-slate-600">
                                        I agree to the <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700">Terms and Conditions</a> and <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-700">Privacy Policy</a>.
                                    </label>
                            </div>

                            {/* Register button */}
                            <button type="submit" className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Register
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center gap-4">
                            <span className="h-px flex-1 bg-slate-200"></span>
                            <span className="text-sm text-slate-500">or sign up with</span>
                            <span className="h-px flex-1 bg-slate-200"></span>
                        </div>

                        {/* Social sign-up buttons (visual only) */}
                        <div className="grid gap-3 sm:grid-cols-2">
                            <button type="button" className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50">
                                <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </button>
                            <button type="button" className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50">
                                <svg className="size-5 text-slate-900" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                GitHub
                            </button>
                        </div>

                        {/* Login link */}
                        <p className="mt-10 text-center text-sm text-slate-600">
                            Already have an account?
                            <Link href="/login" className="font-semibold text-indigo-600 transition hover:text-indigo-700">Log in</Link>
                        </p>
                    </div>
                </section>

                {/* ========== RIGHT: BENEFITS PANEL (desktop only) ========== */}
                <section className="relative hidden overflow-hidden lg:block" aria-labelledby="benefits-heading">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80" alt="Group of students learning together with laptops" className="absolute inset-0 size-full object-cover"/>
                        <div className="absolute inset-0 bg-linear-to-t from-indigo-950/95 via-indigo-900/60 to-indigo-900/20" aria-hidden="true"></div>

                        <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
                            <h2 id="benefits-heading" className="text-3xl font-bold leading-tight text-white xl:text-4xl">Your developer journey starts here.</h2>
                            <p className="mt-3 max-w-md text-indigo-100">Everything you need to learn faster and share what you know.</p>

                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center gap-3 text-white">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                                    </span>
                                    Write and publish your own articles
                                </li>
                                <li className="flex items-center gap-3 text-white">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                                    </span>
                                    Save posts to your personal reading list
                                </li>
                                <li className="flex items-center gap-3 text-white">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                                    </span>
                                    Join discussions with 85,000+ developers
                                </li>
                                <li className="flex items-center gap-3 text-white">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                                    </span>
                                    Get a weekly digest of the best tutorials
                                </li>
                            </ul>
                        </div>
                </section>
            </main>
        </>
    )
}
