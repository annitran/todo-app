import { create } from "zustand"
import { type ITask } from "../services/task"

interface TaskStore {
  tasks: ITask[]

  init: (tasks: ITask[]) => void
  add: (task: ITask) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  init: (tasks) =>
    set({ tasks }),

  add: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
}))
