import { useState } from "react"
import { useTaskStore } from "../stores/useTaskStore"
import { updateTask, type ITask } from "../services/task"
import DeleteTask from "./DeleteTaskButton"
import TaskCompleteToggle from "./TaskCompleteToggle"

interface Props {
  task: ITask
  onClose: () => void
}

export default function EditTask({ task, onClose }: Props) {
  const updateTaskStore = useTaskStore((s) => s.edit)
  const [name, setName] = useState(task.name)
  const [isComplete, setIsComplete] = useState(task.is_complete)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!name.trim() || loading) return

    try {
      setLoading(true)

      const payload: ITask = {
        ...task,
        name,
        is_complete: isComplete,
        completed_at: isComplete
          ? new Date().toISOString()
          : undefined,
      }

      const res = await updateTask(task.id, payload)

      updateTaskStore(res.data.task)
      onClose()
    } catch (err) {
      console.error("Update task failed!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Sửa task</h2>

            <DeleteTask taskId={task.id} onDeleted={onClose}/>
          </div>

          {/* Name */}
          <input
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          {/* Complete */}
          <label className="flex items-center gap-2 cursor-pointer">
            <TaskCompleteToggle
              task={{ ...task, is_complete: isComplete }}
              disabled={loading}
              onChange={setIsComplete}
            />
            <span>Đã hoàn thành</span>
          </label>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-ghost" onClick={onClose}>
              Huỷ
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
