import React from 'react'
import TaskCard from './TaskCard'
import { PlusIcon } from './icons'

export default function BoardColumn({ column, tasks, taskData, setTaskData, deleteModal, setDeleteModal }) {
  return (
    <div className="flex w-80 shrink-0 flex-col rounded-2xl bg-slate-50/70 border border-slate-200/80">
      <div className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${column.bar}`} />

      <div className="flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${column.dot}`} />
          <h3 className="text-sm font-semibold text-slate-700">{column.title}</h3>
          <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {tasks.length}
          </span>
        </div>
        <button
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-indigo-600"
          aria-label={`Add task to ${column.title}`}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-3" style={{ maxHeight: 'calc(100vh - 260px)' }}>
        {tasks.length === 0 ? (
          <div
            className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed
                       border-slate-200 py-8 text-xs text-slate-400"
          >
            <PlusIcon className="h-4 w-4" />
            Add a task
          </div>
        ) : (
          tasks.map((task, i) => <TaskCard key={task.id} task={task} taskData={taskData} setTaskData={setTaskData} deleteModal={deleteModal} setDeleteModal={setDeleteModal} index={task.id} />)
        )}
      </div>
    </div>
  )
}
