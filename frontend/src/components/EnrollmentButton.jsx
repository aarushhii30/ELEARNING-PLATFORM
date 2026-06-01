import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

export default function EnrollmentButton({ courseId, enrolled, onEnrolled }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEnroll = async () => {
    if (!user) return navigate("/login");
    setLoading(true);
    setError("");
    try {
      await api.post("/enroll", { courseId });
      onEnrolled?.();
    } catch (err) {
      setError(err.response?.data?.message || "Could not enroll");
    } finally {
      setLoading(false);
    }
  };

  if (enrolled)
    return (
      <button className="btn-outline w-full" onClick={() => navigate("/dashboard")}>
        Go to my courses
      </button>
    );

  return (
    <div>
      <button className="btn-primary w-full" onClick={handleEnroll} disabled={loading}>
        {loading ? "Enrolling…" : "Enroll now"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
