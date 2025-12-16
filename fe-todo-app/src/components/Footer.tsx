export default function Footer() {
    return (
      <footer className="footer footer-center p-4 bg-base-100 border-t">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-center px-4">© {new Date().getFullYear()} Todo App</div>
      </footer>
    )
  }
