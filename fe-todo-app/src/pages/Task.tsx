import { useEffect, useState } from "react"
import { getTodoList, type ITask } from "../services/task"

function timeFromNow(date?: string) {
  if (!date) return "-"
  const diff = Date.now() - new Date(date).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "vừa xong"
  if (m < 60) return `${m} phút trước`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} giờ trước`
  return `${Math.floor(h / 24)} ngày trước`
}

export default function Task() {
  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTodoList();
      setTasks(res.data.todoList);
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto max-w-3xl mx-auto px-2">
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
            <tr key={task.id} className="hover">
              {/* checkbox */}
              <td className="w-12">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary rounded-full"
                  checked={task.is_complete}
                  readOnly
                />
              </td>

              {/* task name */}
              <td
                className={`${
                  task.is_complete ? "line-through text-gray-400" : ""
                }`}
              >
                {task.name}
              </td>

              {/* time */}
              <td className="w-40 text-right text-sm text-gray-500">
                {timeFromNow(task.created_at)}
              </td>

              {/* star */}
              <td className="w-12 text-center">
                <button className="btn btn-ghost btn-xs">⭐</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
