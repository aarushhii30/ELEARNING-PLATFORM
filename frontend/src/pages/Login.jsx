import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handle = async ({ email, password }) => {
    await login(email, password);
    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <AuthForm mode="login" onSubmit={handle} />
      <p className="mt-4 text-center text-sm text-gray-600">
        No account?{" "}
        <Link to="/signup" className="font-medium text-brand-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}
