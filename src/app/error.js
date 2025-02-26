"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container min-h-[500px] mx-auto flex flex-col justify-center items-center text-center">
      <h2 className="font-heading text-red-800 mb-10">Something went wrong!</h2>
      <button onClick={() => reset()} className="btn-primary">
        Try Again
      </button>
    </div>
  );
}
