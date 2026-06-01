import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/enrollments/me")
      .then(({ data }) => setEnrollments(data))
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleLesson = async (enrollment, lesson) => {
    const completed = !enrollment.progress?.[lesson._id];
    await api.put(`/enrollments/${enrollment._id}/progress`, {
      lessonId: lesson._id,
      completed,
    });
    load();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">My learning</h1>
      <p className="mt-1 text-gray-600">Welcome back, {user?.name}.</p>

      {loading ? (
        <p className="py-12 text-center text-gray-500">Loading…</p>
      ) : enrollments.length === 0 ? (
        <div className="card mt-8 p-10 text-center">
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="btn-primary mt-4 inline-flex">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {enrollments.map((e) => (
            <div key={e._id} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{e.course?.title}</h3>
                  <p className="text-sm text-gray-500">
                    {e.completedLessons}/{e.totalLessons} lessons completed
                  </p>
                </div>
                <Link
                  to={`/courses/${e.course?.slug}`}
                  className="btn-outline text-sm"
                >
                  Open
                </Link>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-brand-600 transition-all"
                  style={{ width: `${e.percent}%` }}
                />
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {e.course?.lessons?.map((l) => (
                  <li key={l._id}>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!e.progress?.[l._id]}
                        onChange={() => toggleLesson(e, l)}
                      />
                      <span className={e.progress?.[l._id] ? "text-gray-400 line-through" : ""}>
                        {l.title}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
