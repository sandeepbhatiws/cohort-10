import React, { useState } from 'react'

// Simple static UI for Task Modal (no functionality, just design)
export default function TaskModal({modal, setModal, taskData, setTaskData}) {

  var [priority, setPriority] = useState('high')

  const formHandler  = (event) => {
    event.preventDefault();
    setModal(false)

    var task = {
      id: 't'+(taskData.length+1),
      title: event.target.title.value,
      description: event.target.description.value,
      status: 'todo',
      priority: 'high',
      dueDate: '2026-08-28',
      assignee: 'Ananya Rao',
      tags: ['Design', 'UI'],
      comments: 3,
      attachments: 2,
    }

    setTaskData([task, ...taskData])
    localStorage.setItem('taskData', JSON.stringify([task, ...taskData]))
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Modal box */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">Create Task</h2>
          <button onClick={ () => {
            setModal(false)
          }} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={ formHandler }>
          <div className="space-y-4 px-6 py-5">
            {/* Title */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Title</label>
              <input
                type="text"
                name='title'
                placeholder="e.g. Design onboarding screen"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                          focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Description</label>
              <textarea
                rows={3}
                name='description'
                placeholder="Add more details about this task..."
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800
                          outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Status + Due date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
                <select name='task_status'
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Due date</label>
                <input
                name='due_date'
                  type="date"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Priority</label>
              <div className="flex gap-2">
                <button onClick={() => { setPriority('low') }} className={ priority == 'low' ? 'flex-1 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-2 ring-inset ring-amber-300' : 'flex-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-inset ring-slate-200' } type='button'>
                  Low
                </button>
                <button onClick={() => { setPriority('medium') }} className={ priority == 'medium' ? 'flex-1 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-2 ring-inset ring-amber-300' : 'flex-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-inset ring-slate-200' } type='button'>
                  Medium
                </button>
                <button onClick={() => { setPriority('high') }} className={ priority == 'high' ? 'flex-1 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-2 ring-inset ring-amber-300' : 'flex-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-inset ring-slate-200' } type='button'>
                  High
                </button>
              </div>
            </div>

            {/* Assignee + Tags */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Assignee</label>
                <input
                  name='assignee'
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Tags</label>
                <input
                name='tags'
                  type="text"
                  placeholder="Design, UI"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none
                            focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={ () => {
              setModal(false)
            }} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">
                Cancel
              </button>
              <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200">
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
