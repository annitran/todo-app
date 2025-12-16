import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header className="sticky top-0 z-40">
        <nav className="bg-sky-100/60 backdrop-blur-sm text-sky-900 border-b border-sky-200/50 shadow-md">
          <div className="relative flex items-center px-4 py-3">
            {/* center */}
            <h1 className="flex-1 flex justify-center">
              Tasks
            </h1>

            {/* logo */}
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <Link to="/profile">
                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                    </Link>
                </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
