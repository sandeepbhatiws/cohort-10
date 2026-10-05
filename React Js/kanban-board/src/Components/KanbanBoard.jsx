import React, { useState } from 'react'
import BoardColumn from './BoardColumn'
import TaskModal from './TaskModal'
import { COLUMNS, SEED_TASKS } from './constants'
import { PlusIcon, SearchIcon } from './icons'
import DeleteConfirmModal from './DeleteConfirmModal'

export default function KanbanBoard() {

  var locaStorageData = localStorage.getItem('taskData');
  var locaStorageData = JSON.parse(locaStorageData)

  const [taskData, setTaskData] = useState(locaStorageData ?? SEED_TASKS);

  const tasksByStatus = (statusId) => taskData.filter((t) => t.status === statusId)

  const total = taskData.length
  const done = taskData.filter((t) => t.status === 'done').length
  const progressPct = total ? Math.round((done / total) * 100) : 0

  const [modal, setModal] = useState(false);

  const addTask = () => {
    setModal(true)
  }

  const [deleteModal, setDeleteModal] = useState({
    index : '',
    task : '',
    modal : false
  })

  const onCancel = () => {
    setDeleteModal({
      index : '',
      task : '',
      modal : false
    })
  }

  const onConfirm =() => {
    var finalData = taskData.filter((v, i) => {
      if(deleteModal.index != v.id){
        return v
      }
    })

    setTaskData([...finalData]);

    setDeleteModal({
      index : '',
      task : '',
      modal : false
    })
  }

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
              placeholder="Search tasks..."
              className="w-56 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700
                         outline-none transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button onClick={ addTask }
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
          <BoardColumn key={column.id} column={column} tasks={tasksByStatus(column.id)} taskData={taskData} setTaskData={setTaskData} deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
        ))}
      </div>

        {
          modal ?
            <TaskModal modal={modal} setModal={setModal} taskData={taskData} setTaskData={setTaskData}/>
            : ''
        }

        {
          deleteModal.modal ? <DeleteConfirmModal task={deleteModal.task} onCancel={onCancel} onConfirm={onConfirm}/> : ''
        }
      
    </div>
  )
}
