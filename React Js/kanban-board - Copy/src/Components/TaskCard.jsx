import React from 'react'
import { PRIORITIES, avatarColor, initials } from './constants'
import { CalendarIcon, ChatIcon, ClipIcon, EditIcon, TrashIcon } from './icons'

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function TaskCard({ task, onView, onEdit, onDelete }) {
  const priority = PRIORITIES[task.priority] ?? PRIORITIES.medium

  return (
    <div
      onClick={() => onView(task)}
      className="group relative cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm
                 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300"
    >
      <span className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${priority.edge}`} />

      <div className="flex items-start justify-between gap-2 pl-2">
        <h4 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
          {task.title}
        </h4>

        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(task) }}
            className="rounded-md p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
            aria-label="Edit task"
          >
            <EditIcon className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(task) }}
            className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            aria-label="Delete task"
          >
            <TrashIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-1.5 pl-2 text-xs text-slate-500 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 pl-2">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between pl-2">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${priority.chip}`}>
            {priority.label}
          </span>
          {task.dueDate && (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <CalendarIcon className="h-3 w-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>

        <div
          title={task.assignee}
          className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white ring-2 ring-white ${avatarColor(task.assignee)}`}
        >
          {initials(task.assignee)}
        </div>
      </div>

      {(task.comments > 0 || task.attachments > 0) && (
        <div className="mt-2.5 flex items-center gap-3 border-t border-slate-100 pl-2 pt-2 text-[11px] text-slate-400">
          {task.comments > 0 && (
            <span className="flex items-center gap-1">
              <ChatIcon className="h-3 w-3" /> {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="flex items-center gap-1">
              <ClipIcon className="h-3 w-3" /> {task.attachments}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
