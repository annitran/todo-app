import { useEffect } from "react"
import { useTaskStore } from "../stores/useTaskStore"
import { getTodoList } from "../services/task"
import AddTaskButton from "../components/AddTaskButton"
import TaskRow from "../components/Task-Row"

export default function Task() {
  const tasks = useTaskStore((s) => s.tasks)
  const init = useTaskStore((s) => s.init)

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getTodoList()
      init(res.data.todoList)
    }

    fetchTasks()
  }, [init])

  return (
    <div className="overflow-x-auto max-w-3xl mx-auto px-2">
      <AddTaskButton />

      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="w-10"></th>
            <th className="w-auto">Task</th>
            <th className="w-40 text-center"></th>
            <th className="w-10 text-center">⭐</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task}></TaskRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}
