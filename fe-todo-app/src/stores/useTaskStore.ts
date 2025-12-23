import { create } from "zustand"
import { getTodoList, createTask, type ITask } from "../services/task"

interface TaskStore {
  tasks: ITask[]
  loading: boolean

  fetchTasks: () => Promise<void>
  addTask: (name: string) => Promise<void>
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,

  // fetch list
  fetchTasks: async () => {
    set({ loading: true })

    const res = await getTodoList()
    set({
      tasks: res.data.todoList,
      loading: false,
    })
  },

  // create new task
  addTask: async (name: string) => {
    const res = await createTask(name)

    set((state) => ({
      tasks: [res.data.task, ...state.tasks],
    }))
  },
}))
