import api from "./api";

export interface ITask {
  id: number;
  name: string;
  is_complete: boolean;
  completed_at?: string;
  created_at?: string;
}

export const getTodoList = () => {
  return api.get<{ todoList: ITask[] }>("/tasks");
};

export const createTask = (name: string) => {
  return api.post<{ task: ITask }>("/tasks", { name });
};

export const updateTask = (id: number, task : ITask) => {
  return api.put<{ task: ITask }>(`/tasks/${id}`, task);
};

export const deleteTask = (id: number) => {
  return api.delete(`/tasks/${id}`);
};
