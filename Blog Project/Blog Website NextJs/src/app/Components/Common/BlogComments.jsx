'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function BlogComments({ blogId, totalComments, setTotalComments, errorHandler }) {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [commentError, setCommentError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState('');

    const isLogin = useSelector((state) => {
        return state.login.isLogin
    })

    const authHeader = { headers : { Authorization : `Bearer ${isLogin}` } };

    const loadComments = (pageNumber) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}blog-comment/view/${blogId}`, {
            page : pageNumber,
            limit : 10
        })
        .then((result) => {
            // No comments also comes with _status false, only a missing _paginate is a real failure
            if (!result.data._paginate) {
                toast.error(result.data._message)
                return;
            }

            const newComments = result.data._data;

            setComments((previous) => {
                if (pageNumber == 1) {
                    return newComments;
                }

                // Someone else may have commented in between, which shifts the pages by one
                return [...previous, ...newComments.filter((item) => !previous.some((old) => old._id == item._id))];
            })
            setPage(pageNumber)
            setTotalPages(result.data._paginate.total_pages)
            setTotalComments(result.data._paginate.total_records)
        })
        .catch(errorHandler)
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        loadComments(1);
    }, [blogId]);

    // Needed to show the delete button only on the logged in user's own comments
    useEffect(() => {
        if (isLogin != 0) {
            axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/view-profile`, {}, authHeader)
            .then((result) => {
                setLoggedInUserId(result.data._status ? result.data._data._id : '')
            })
            .catch(errorHandler)
        } else {
            setLoggedInUserId('')
        }
    }, [isLogin]);

    const commentHandler = (event) => {
        event.preventDefault();

        setSubmitting(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}blog-comment/create/${blogId}`, {
            comment : commentText
        }, authHeader)
        .then((result) => {
            if (result.data._status) {
                toast.success(result.data._message)
                setCommentText('')
                setCommentError('')
                loadComments(1)
            } else {
                setCommentError(result.data._error?.comment ?? result.data._message)
            }
        })
        .catch(errorHandler)
        .finally(() => setSubmitting(false))
    }

    const deleteHandler = (commentId) => {
        if (!window.confirm('Delete this comment?')) {
            return;
        }

        axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}blog-comment/delete/${commentId}`, authHeader)
        .then((result) => {
            if (result.data._status) {
                toast.success(result.data._message)
                loadComments(1)
            } else {
                toast.error(result.data._message)
            }
        })
        .catch(errorHandler)
    }

    return (
        <>
            {/* ========== COMMENTS ========== */}
            <section id="comments" className="mt-12 max-w-3xl scroll-mt-24 border-t border-slate-200 pt-12" aria-labelledby="comments-heading">
                <h2 id="comments-heading" className="text-2xl font-bold text-slate-900">Comments <span className="font-medium text-slate-400">({totalComments})</span></h2>

                {
                    isLogin != 0
                    ?
                        <form onSubmit={commentHandler} className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                            <h3 className="text-lg font-semibold text-slate-900">Leave a comment</h3>

                            <div className="mt-6">
                                <label htmlFor="comment-message" className="block text-sm font-medium text-slate-700">Comment</label>
                                <textarea id="comment-message" name="comment" rows="5" maxLength="1000" placeholder="Share your thoughts..." value={commentText} onChange={(event) => setCommentText(event.target.value)} className="mt-2 block w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"></textarea>
                                {commentError && <p className="mt-2 text-sm text-rose-600">{commentError}</p>}
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-slate-500">Please keep comments respectful and on topic.</p>
                                <button type="submit" disabled={submitting} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-70">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                                    {submitting ? 'Posting...' : 'Post Comment'}
                                </button>
                            </div>
                        </form>
                    :
                        <p className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 sm:p-6">
                            <Link href="/login" className="font-semibold text-indigo-600 transition hover:text-indigo-700">Log in</Link> to leave a comment.
                        </p>
                }

                {/* Comment list */}
                {
                    !loading && comments.length == 0 && <p className="mt-10 text-center text-sm text-slate-500">No comments yet. Be the first to share your thoughts.</p>
                }

                <ul className="mt-10 space-y-8">
                    {
                        comments.map((item) => {
                            const userName = item.user?.name ?? 'Unknown user';

                            const commentDate = new Date(item.created_at).toLocaleDateString('en-us', {
                                month : 'short',
                                day : '2-digit',
                                year : 'numeric'
                            })

                            return (
                                <li key={item._id}>
                                    <article className="flex gap-4">
                                        <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">{userName.charAt(0).toUpperCase()}</span>
                                        <div className="min-w-0 flex-1">
                                            <div className="rounded-2xl rounded-tl-sm bg-slate-50 p-5 ring-1 ring-slate-100">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <h3 className="font-semibold text-slate-900">{userName}</h3>
                                                    <time dateTime={item.created_at} className="text-xs text-slate-500">{commentDate}</time>
                                                </div>
                                                <p className="mt-2 whitespace-pre-line break-words text-[15px] leading-7 text-slate-700">{item.comment}</p>
                                            </div>
                                            {
                                                item.user?._id == loggedInUserId &&
                                                <div className="mt-2 flex items-center gap-5 pl-2 text-sm">
                                                    <button type="button" onClick={() => deleteHandler(item._id)} className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition hover:text-rose-600">
                                                        <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </article>
                                </li>
                            )
                        })
                    }
                </ul>

                {
                    page < totalPages &&
                    <div className="mt-10 text-center">
                        <button type="button" onClick={() => loadComments(page + 1)} className="cursor-pointer rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">Load more comments</button>
                    </div>
                }
            </section>
        </>
    )
}
