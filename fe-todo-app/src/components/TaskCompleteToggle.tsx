import { useState } from "react"
import { useTaskStore } from "../stores/useTaskStore"
import { updateTask, type ITask } from "../services/task"

interface Props {
  task: ITask
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

export default function TaskCompleteToggle({ task, onChange, disabled }: Props) {
  const updateTaskStore = useTaskStore((s) => s.edit)
  const [loading, setLoading] = useState(false)

  const handleToggle = async (checked: boolean) => {
    if (loading) return

    // nếu chỉ tb cho cha EditTask
    if (onChange) {
      onChange(checked)
      return
    }

    // dùng trực tiếp cho TaskRow
    try {
      setLoading(true)

      const payload: ITask = {
        ...task,
        is_complete: !task.is_complete,
        completed_at: !task.is_complete
          ? new Date().toISOString()
          : undefined,
      }

      const res = await updateTask(task.id, payload)
      updateTaskStore(res.data.task)
    } catch (err) {
      console.error("Toggle complete failed!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <input
      type="checkbox"
      className="checkbox checkbox-sm checkbox-primary rounded-full"
      checked={task.is_complete}
      onChange={(e) => handleToggle(e.target.checked)}
      disabled={disabled || loading}
    />
  )
}
