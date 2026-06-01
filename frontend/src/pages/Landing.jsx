import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import CourseList from "../components/CourseList.jsx";

export default function Landing() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api
      .get("/courses", { params: { limit: 3 } })
      .then(({ data }) => setCourses(data.items))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Learn skills that move your career forward
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Browse expert-led courses, enroll in minutes, and track your progress — all in one
            modern learning platform.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/courses" className="btn-primary">
              Browse courses
            </Link>
            <Link to="/signup" className="btn-outline">
              Get started free
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured courses</h2>
          <Link to="/courses" className="text-sm font-medium text-brand-600">
            View all →
          </Link>
        </div>
        <CourseList courses={courses} />
      </section>
    </div>
  );
}
