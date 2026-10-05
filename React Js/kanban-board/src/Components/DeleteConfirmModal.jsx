import React from 'react'
import { AlertIcon } from './icons'

export default function DeleteConfirmModal({ task, onCancel, onConfirm }) {
  if (!task) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl ring-1 ring-black/5">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <AlertIcon className="h-6 w-6 text-rose-500" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-800">Delete this task?</h3>
        <p className="mt-1.5 text-sm text-slate-500">
          "<span className="font-medium text-slate-600">{task.title}</span>" will be permanently removed. This action can't be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-200
                       transition-transform hover:scale-[1.02] hover:bg-rose-600 active:scale-[0.98]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
