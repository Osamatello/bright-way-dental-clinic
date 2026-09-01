import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center bg-cream px-6 py-20 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
          404
        </p>
        <h1 className="display-heading mt-5 text-5xl sm:text-7xl">
          This page is not available.
        </h1>
        <Link
          className="mt-8 inline-flex min-h-12 items-center border border-navy bg-navy px-6 text-xs font-semibold uppercase tracking-[0.13em] text-white"
          href="/en"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}
