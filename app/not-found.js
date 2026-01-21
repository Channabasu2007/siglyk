import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <main className="flex min-h-[85vh] w-full items-center justify-center bg-light-primary px-8">
      {/* Matching your 80vw alignment */}
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center lg:w-[80vw]">
        
        {/* Large Visual 404 */}
        <div className="relative mb-8">
            <h1 className="text-[12rem] font-black leading-none text-light-secondary/5 opacity-50">
                404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-8xl text-light-secondary">
                    backspace
                </span>
            </div>
        </div>

        {/* Text Content */}
        <h2 className="text-4xl font-extrabold text-text-dark md:text-5xl">
            Lost in translation?
        </h2>
        <p className="mt-4 max-w-md text-lg text-light-secondary/70">
            We couldn't find the page you're looking for. It might have been moved, 
            or the sign was misinterpreted.
        </p>

        {/* Back Home Button */}
        <div className="mt-10">
          <Link href="/">
            <button className="flex h-14 min-w-50 cursor-pointer items-center justify-center rounded-xl bg-light-secondary px-10 text-lg font-bold text-white shadow-xl shadow-light-secondary/20 transition-all hover:scale-105 active:scale-95">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;