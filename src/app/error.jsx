'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="section-title">Something went wrong</h2>
      <p className="body-primary text-[#444]">{error?.message ?? 'An unexpected error occurred.'}</p>
      <button
        onClick={reset}
        className="rounded-md bg-[#9D4431] px-5 py-2 font-semibold text-[#FAF7F3] hover:bg-[#D07A64]"
      >
        Try again
      </button>
    </div>
  );
}
