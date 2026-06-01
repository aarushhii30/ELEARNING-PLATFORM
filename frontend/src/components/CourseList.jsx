import CourseCard from "./CourseCard.jsx";

export default function CourseList({ courses }) {
  if (!courses?.length)
    return <p className="py-12 text-center text-gray-500">No courses found.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => (
        <CourseCard key={c._id} course={c} />
      ))}
    </div>
  );
}
