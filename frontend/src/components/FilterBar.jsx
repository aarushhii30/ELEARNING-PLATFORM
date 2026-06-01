export default function FilterBar({ filters, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value, page: 1 });

  return (
    <div className="card mb-6 flex flex-wrap items-end gap-4 p-4">
      <div className="min-w-[180px] flex-1">
        <label className="mb-1 block text-xs font-medium text-gray-500">Search</label>
        <input
          className="input"
          placeholder="Search courses…"
          value={filters.search}
          onChange={set("search")}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
        <select className="input" value={filters.category} onChange={set("category")}>
          <option value="">All</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="architecture">Architecture</option>
          <option value="general">General</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Difficulty</label>
        <select className="input" value={filters.difficulty} onChange={set("difficulty")}>
          <option value="">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Max price</label>
        <input
          type="number"
          min="0"
          className="input w-28"
          placeholder="Any"
          value={filters.maxPrice}
          onChange={set("maxPrice")}
        />
      </div>
    </div>
  );
}
