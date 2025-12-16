import { Link } from "react-router-dom"

export default function Menu() {
  return (
    <div className="bg-base-100 border-b">
      <ul className="flex text-center">
        <li className="flex-1">
          <Link className="block py-3 hover:bg-sky-300/60" to="/">⭐</Link>
        </li>
        <li className="flex-1">
          <Link className="block py-3 hover:bg-sky-300/60" to="/todo-list">Việc cần làm của tôi</Link>
        </li>
        <li className="flex-1">
          <Link className="block py-3 hover:bg-sky-300/60" to="/todo-add">+ Danh sách mới</Link>
        </li>
      </ul>
    </div>
  )
}
