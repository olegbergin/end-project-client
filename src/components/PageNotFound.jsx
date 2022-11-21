import React from "react";

const PageNoteFound = () => {
  return (
    <section className="flex items-center h-full p-16 bg-gray-300 text-gray-50 mt-10 min-h-full">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-red-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            מצטערים, לא הצלחנו למצוא את הדף...
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            נסה לרענן את הדף או לחזור לדף הבית
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold rounded bg-lime-500 text-gray-900"
          >
            בחזרה לדף הבית
          </a>
        </div>
      </div>
    </section>
  );
};

export default PageNoteFound;
