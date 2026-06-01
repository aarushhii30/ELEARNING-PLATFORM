import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import LessonPlayer from "../components/LessonPlayer.jsx";
import EnrollmentButton from "../components/EnrollmentButton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [active, setActive] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/courses/${slug}`)
      .then(({ data }) => {
        setCourse(data);
        setActive(data.lessons?.[0] || null);
      })
      .catch(() => setError("Course not found"));
  }, [slug]);

  useEffect(() => {
    if (!user || !course) return;
    api
      .get("/enrollments/me")
      .then(({ data }) => setEnrolled(data.some((e) => e.course?._id === course._id)))
      .catch(() => {});
  }, [user, course]);

  if (error) return <p className="p-10 text-center text-gray-500">{error}</p>;
  if (!course) return <p className="p-10 text-center text-gray-500">Loading…</p>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-2 text-gray-600">{course.description}</p>
          <p className="mt-1 text-sm text-gray-500">
            Instructor: <span className="font-medium">{course.instructor}</span> · {course.difficulty}
          </p>

          <div className="card mt-6 p-5">
            <LessonPlayer lesson={active} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <img
              src={course.thumbnailUrl || "https://picsum.photos/seed/course/600/400"}
              alt={course.title}
              className="mb-4 h-40 w-full rounded-lg object-cover"
            />
            <div className="mb-4 text-2xl font-bold text-brand-600">
              {course.price > 0 ? `$${course.price}` : "Free"}
            </div>
            <EnrollmentButton
              courseId={course._id}
              enrolled={enrolled}
              onEnrolled={() => setEnrolled(true)}
            />
          </div>

          <div className="card p-5">
            <h3 className="mb-3 font-semibold">Syllabus</h3>
            <ul className="space-y-1">
              {course.lessons?.map((l) => (
                <li key={l._id}>
                  <button
                    onClick={() => setActive(l)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                      active?._id === l._id ? "bg-brand-50 text-brand-700" : "hover:bg-gray-50"
                    }`}
                  >
                    {l.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
