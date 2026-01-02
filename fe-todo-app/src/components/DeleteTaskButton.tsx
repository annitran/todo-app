import { useState } from "react"
import { deleteTask } from "../services/task"
import { useTaskStore } from "../stores/useTaskStore"

interface Props {
  taskId: number
  onDeleted: () => void
}

export default function DeleteTask({ taskId, onDeleted }: Props) {
  const remove = useTaskStore((s) => s.remove)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (loading) return

    try {
      setLoading(true)

      await deleteTask(taskId)
      remove(taskId)
      onDeleted()
    } catch (err) {
      console.error("Delete task failed!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className="btn btn-error btn-outline btn-sm"
      onClick={handleDelete}
      disabled={loading}
      title="Xoá task"
    >
      🗑
    </button>
  )
}
