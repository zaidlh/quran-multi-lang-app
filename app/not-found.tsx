import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mb-6 text-6xl font-bold text-primary">404</div>
      <h2 className="text-2xl font-bold mb-2">الصفحة غير موجودة</h2>
      <p className="text-zinc-500 mb-6">
        الصفحة التي تبحث عنها غير موجودة أو تم نقلها. <span dir="ltr">(Page not found)</span>
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
