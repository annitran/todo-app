import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Menu from "../components/Menu"

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Menu />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
