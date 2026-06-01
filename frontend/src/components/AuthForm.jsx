import { useState } from "react";

export default function AuthForm({ mode = "login", onSubmit }) {
  const isSignup = mode === "signup";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold">{isSignup ? "Create account" : "Welcome back"}</h1>
      {isSignup && (
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input className="input" value={form.name} onChange={change("name")} required />
        </div>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          className="input"
          value={form.email}
          onChange={change("email")}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          className="input"
          value={form.password}
          onChange={change("password")}
          minLength={6}
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? "Please wait…" : isSignup ? "Sign up" : "Login"}
      </button>
    </form>
  );
}
