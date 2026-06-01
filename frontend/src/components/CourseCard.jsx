import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.slug}`} className="card overflow-hidden transition hover:shadow-md">
      <img
        src={course.thumbnailUrl || "https://picsum.photos/seed/course/600/400"}
        alt={course.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
            {course.category}
          </span>
          <span className="text-xs capitalize text-gray-500">{course.difficulty}</span>
        </div>
        <h3 className="line-clamp-1 font-semibold">{course.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{course.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-brand-600">
            {course.price > 0 ? `$${course.price}` : "Free"}
          </span>
          <span className="text-xs text-gray-400">{course.lessons?.length || 0} lessons</span>
        </div>
      </div>
    </Link>
  );
}
