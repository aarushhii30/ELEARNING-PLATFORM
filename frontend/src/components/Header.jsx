import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium ${isActive ? "text-brand-600" : "text-gray-600 hover:text-gray-900"}`;

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-brand-600">
          LearnHub
        </Link>
        <nav className="flex items-center gap-5">
          <NavLink to="/courses" className={linkClass}>
            Courses
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-gray-500 sm:inline">Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn-outline text-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-outline text-sm">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
