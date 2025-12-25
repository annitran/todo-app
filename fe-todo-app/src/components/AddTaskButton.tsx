import { useState } from "react"
import { useTaskStore } from "../stores/useTaskStore"
import { createTask } from "../services/task"

export default function AddTaskButton() {
  const addTask = useTaskStore((s) => s.add)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")

  const handleAdd = async () => {
    if (!name.trim()) return
    const res = await createTask(name)
    addTask(res.data.task)
    setName("")
    setOpen(false)
  }

  return (
    <>
      {/* FAB button */}
      <button
        className="btn btn-circle btn-primary fixed bottom-6 right-6 shadow-lg z-50"
        onClick={() => setOpen(true)}
      >
        <span className="text-lg" >+</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="card w-full max-w-sm bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Thêm task mới</h2>

              <input
                className="input input-bordered w-full"
                placeholder="Nhập..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd()
                }}
              />

              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={() => setOpen(false)}
                >
                  Huỷ
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
