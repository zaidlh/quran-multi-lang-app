import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mb-6 text-6xl font-bold text-primary">404</div>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-zinc-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Return to Home
      </Link>
    </div>
  );
}
