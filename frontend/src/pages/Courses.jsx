import { useEffect, useState } from "react";
import api from "../api/axios.js";
import CourseList from "../components/CourseList.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Courses() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    difficulty: "",
    maxPrice: "",
    page: 1,
  });
  const [data, setData] = useState({ items: [], pages: 1, page: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      api
        .get("/courses", { params: { ...filters, limit: 9 } })
        .then(({ data }) => setData(data))
        .catch(() => setData({ items: [], pages: 1, page: 1 }))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">All courses</h1>
      <FilterBar filters={filters} onChange={setFilters} />
      {loading ? (
        <p className="py-12 text-center text-gray-500">Loading courses…</p>
      ) : (
        <>
          <CourseList courses={data.items} />
          <Pagination
            page={data.page}
            pages={data.pages}
            onChange={(page) => setFilters({ ...filters, page })}
          />
        </>
      )}
    </div>
  );
}
