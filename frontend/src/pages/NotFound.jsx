import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-brand-600">404</h1>
      <p className="mt-4 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        Go home
      </Link>
    </div>
  );
}
