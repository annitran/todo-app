import { Routes, Route } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import Task from "../pages/Task"

export default function AppRouter() {
  return (
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Task />} />

          <Route path="task-list" element={<Task />} />
        </Route>
      </Routes>
  )
}
