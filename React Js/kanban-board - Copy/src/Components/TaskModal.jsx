import React, { useEffect, useState } from 'react'
import { COLUMNS, PRIORITIES, avatarColor, initials } from './constants'
import { CalendarIcon, EditIcon, TrashIcon, XIcon } from './icons'

const emptyForm = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
  assignee: '',
  tags: '',
}

export default function TaskModal({ mode, task, defaultStatus, onClose, onSave, onDelete, onSwitchToEdit }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title ?? '',
        description: task.description ?? '',
        status: task.status ?? 'todo',
        priority: task.priority ?? 'medium',
        dueDate: task.dueDate ?? '',
        assignee: task.assignee ?? '',
        tags: (task.tags ?? []).join(', '),
      })
    } else {
      setForm({ ...emptyForm, status: defaultStatus ?? 'todo' })
    }
    setErrors({})
  }, [task, defaultStatus, mode])

  const isView = mode === 'view'
  const heading = mode === 'add' ? 'Create Task' : mode === 'edit' ? 'Edit Task' : 'Task Details'

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Title is required'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    onSave({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">{heading}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {isView ? (
          <ViewBody task={task} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Title</label>
              <input
                autoFocus
                value={form.title}
                onChange={update('title')}
                placeholder="e.g. Design onboarding screen"
                className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition-colors
                  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
                  ${errors.title ? 'border-rose-300' : 'border-slate-200'}`}
              />
              {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Description</label>
              <textarea
                value={form.description}
                onChange={update('description')}
                rows={3}
                placeholder="Add more details about this task..."
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800
                           outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
                <select
                  value={form.status}
                  onChange={update('status')}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                             transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  {COLUMNS.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Due date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={update('dueDate')}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                             transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Priority</label>
              <div className="flex gap-2">
                {Object.entries(PRIORITIES).map(([key, p]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setForm((f) => ({ ...f, priority: key }))}
                    className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold ring-1 ring-inset transition-colors
                      ${form.priority === key ? p.chipActive + ' ring-2' : 'bg-white text-slate-400 ring-slate-200 hover:bg-slate-50'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Assignee</label>
                <input
                  value={form.assignee}
                  onChange={update('assignee')}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                             transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Tags</label>
                <input
                  value={form.tags}
                  onChange={update('tags')}
                  placeholder="Design, UI"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                             transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold
                           text-white shadow-sm shadow-indigo-200 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {mode === 'add' ? 'Create Task' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}

        {isView && task && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
            <button
              onClick={() => onDelete(task)}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-50"
            >
              <TrashIcon className="h-3.5 w-3.5" /> Delete
            </button>
            <button
              onClick={() => onSwitchToEdit(task)}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2
                         text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <EditIcon className="h-3.5 w-3.5" /> Edit Task
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ViewBody({ task }) {
  if (!task) return null
  const priority = PRIORITIES[task.priority] ?? PRIORITIES.medium
  const column = COLUMNS.find((c) => c.id === task.status)

  return (
    <div className="space-y-5 px-6 py-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
        {task.description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{task.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
        <Field label="Status">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <span className={`h-2 w-2 rounded-full ${column?.dot}`} />
            {column?.title}
          </span>
        </Field>
        <Field label="Priority">
          <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${priority.chip}`}>
            {priority.label}
          </span>
        </Field>
        <Field label="Due date">
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-700">
            <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
            {task.dueDate || '—'}
          </span>
        </Field>
        <Field label="Assignee">
          {task.assignee ? (
            <span className="inline-flex items-center gap-2 text-sm text-slate-700">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold text-white ${avatarColor(task.assignee)}`}>
                {initials(task.assignee)}
              </span>
              {task.assignee}
            </span>
          ) : '—'}
        </Field>
      </div>

      {task.tags?.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-medium text-slate-500">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      {children}
    </div>
  )
}
