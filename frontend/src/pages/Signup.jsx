import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handle = async ({ name, email, password }) => {
    await signup(name, email, password);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <AuthForm mode="signup" onSubmit={handle} />
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brand-600">
          Login
        </Link>
      </p>
    </div>
  );
}
