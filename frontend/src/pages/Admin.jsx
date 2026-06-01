import { useEffect, useState } from "react";
import api from "../api/axios.js";

const empty = {
  title: "",
  description: "",
  price: 0,
  category: "general",
  difficulty: "beginner",
  instructor: "",
  thumbnailUrl: "",
  lessonsText: "",
};

export default function Admin() {
  const [tab, setTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState(null);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadCourses = () =>
    api.get("/courses", { params: { limit: 50 } }).then(({ data }) => setCourses(data.items));
  const loadUsers = () => api.get("/users").then(({ data }) => setUsers(data)).catch(() => {});
  const loadReports = () =>
    api.get("/reports").then(({ data }) => setReports(data)).catch(() => {});

  useEffect(() => {
    loadCourses();
    loadUsers();
    loadReports();
  }, []);

  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const buildPayload = () => {
    const lessons = form.lessonsText
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((title, i) => ({ title, order: i + 1, contentHtml: `<p>${title}</p>` }));
    const { lessonsText, ...rest } = form;
    return { ...rest, price: Number(form.price) || 0, lessons };
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await api.put(`/courses/${editingId}`, buildPayload());
      } else {
        await api.post("/courses", buildPayload());
      }
      setForm(empty);
      setEditingId(null);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save course");
    }
  };

  const edit = (c) => {
    setEditingId(c._id);
    setForm({
      title: c.title,
      description: c.description || "",
      price: c.price || 0,
      category: c.category || "general",
      difficulty: c.difficulty || "beginner",
      instructor: c.instructor || "",
      thumbnailUrl: c.thumbnailUrl || "",
      lessonsText: (c.lessons || []).map((l) => l.title).join("\n"),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this course?")) return;
    await api.delete(`/courses/${id}`);
    loadCourses();
  };

  const TabBtn = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`rounded-lg px-4 py-2 text-sm font-medium ${
        tab === id ? "bg-brand-600 text-white" : "bg-white text-gray-600 border border-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Admin panel</h1>
      <div className="mb-6 flex gap-2">
        <TabBtn id="courses" label="Courses" />
        <TabBtn id="users" label="Users" />
        <TabBtn id="reports" label="Reports" />
      </div>

      {tab === "courses" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={submit} className="card space-y-3 p-5">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit course" : "Create course"}
            </h2>
            <input className="input" placeholder="Title" value={form.title} onChange={change("title")} required />
            <textarea className="input" placeholder="Description" value={form.description} onChange={change("description")} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="number" placeholder="Price" value={form.price} onChange={change("price")} />
              <input className="input" placeholder="Instructor" value={form.instructor} onChange={change("instructor")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select className="input" value={form.category} onChange={change("category")}>
                <option value="general">General</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="architecture">Architecture</option>
              </select>
              <select className="input" value={form.difficulty} onChange={change("difficulty")}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <input className="input" placeholder="Thumbnail URL" value={form.thumbnailUrl} onChange={change("thumbnailUrl")} />
            <textarea
              className="input"
              rows={4}
              placeholder="Lessons (one title per line)"
              value={form.lessonsText}
              onChange={change("lessonsText")}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button className="btn-primary">{editingId ? "Update" : "Create"}</button>
              {editingId && (
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    setEditingId(null);
                    setForm(empty);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c._id} className="card flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-xs text-gray-500">
                    {c.category} · {c.difficulty} · ${c.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline text-sm" onClick={() => edit(c)}>
                    Edit
                  </button>
                  <button
                    className="btn-outline text-sm text-red-600"
                    onClick={() => remove(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "users" && (
        <div className="card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-gray-100">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "reports" && reports && (
        <div className="grid gap-6 sm:grid-cols-3">
          <Stat label="Users" value={reports.totals.users} />
          <Stat label="Courses" value={reports.totals.courses} />
          <Stat label="Enrollments" value={reports.totals.enrollments} />
          <div className="card p-5 sm:col-span-3">
            <h3 className="mb-3 font-semibold">Top courses</h3>
            {reports.topCourses.length === 0 ? (
              <p className="text-sm text-gray-500">No enrollments yet.</p>
            ) : (
              <ul className="space-y-2">
                {reports.topCourses.map((c) => (
                  <li key={c.title} className="flex justify-between text-sm">
                    <span>{c.title}</span>
                    <span className="font-medium">{c.enrollments}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-brand-600">{value}</p>
    </div>
  );
}
