import { create } from "zustand"
import { type ITask } from "../services/task"

interface TaskStore {
  tasks: ITask[]

  init: (tasks: ITask[]) => void
  add: (task: ITask) => void
  edit: (task: ITask) => void
  remove: (id: number) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  init: (tasks) =>
    set({ tasks }),

  add: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  edit: (task) =>
    set((state) => ( {
      tasks: state.tasks.map((t) => t.id === task.id ? task : t),
    })),

    remove: (id) =>
      set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}))
