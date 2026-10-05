import React, { useMemo, useState } from 'react'
import BoardColumn from './BoardColumn'
import TaskModal from './TaskModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import { COLUMNS, SEED_TASKS } from './constants'
import { PlusIcon, SearchIcon } from './icons'

let idCounter = SEED_TASKS.length + 1

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(SEED_TASKS)
  const [modal, setModal] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [query, setQuery] = useState('')

  const filteredTasks = useMemo(() => {
    if (!query.trim()) return tasks
    const q = query.toLowerCase()
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.assignee?.toLowerCase().includes(q)
    )
  }, [tasks, query])

  const tasksByStatus = (statusId) => filteredTasks.filter((t) => t.status === statusId)

  const openAdd = (status) => setModal({ mode: 'add', task: null, defaultStatus: status })
  const openEdit = (task) => setModal({ mode: 'edit', task, defaultStatus: task.status })
  const openView = (task) => setModal({ mode: 'view', task, defaultStatus: task.status })
  const closeModal = () => setModal(null)

  const handleSave = (formData) => {
    if (modal.mode === 'edit' && modal.task) {
      setTasks((prev) =>
        prev.map((t) => (t.id === modal.task.id ? { ...t, ...formData } : t))
      )
    } else {
      const newTask = { ...formData, id: `t${idCounter++}`, comments: 0, attachments: 0 }
      setTasks((prev) => [newTask, ...prev])
    }
    closeModal()
  }

  const requestDelete = (task) => {
    setTaskToDelete(task)
  }

  const confirmDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id))
    setTaskToDelete(null)
    closeModal()
  }

  const total = tasks.length
  const done = tasks.filter((t) => t.status === 'done').length
  const progressPct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Product Launch Board</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {done} of {total} tasks completed
            <span className="mx-2 text-slate-300">•</span>
            <span className="font-medium text-indigo-600">{progressPct}% done</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-56 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700
                         outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            onClick={() => openAdd('todo')}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-600
                       to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200
                       transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusIcon className="h-4 w-4" /> New Task
          </button>
        </div>
      </div>

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4">
        {COLUMNS.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus(column.id)}
            onAdd={openAdd}
            onView={openView}
            onEdit={openEdit}
            onDelete={requestDelete}
          />
        ))}
      </div>

      {modal && (
        <TaskModal
          mode={modal.mode}
          task={modal.task}
          defaultStatus={modal.defaultStatus}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={requestDelete}
          onSwitchToEdit={openEdit}
        />
      )}

      <DeleteConfirmModal
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
