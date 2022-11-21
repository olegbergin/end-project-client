import React from "react";

const PageNoteFound = () => {
  return (
    <section className="flex items-center h-full p-16 bg-gray-200 text-gray-50 mt-10 min-h-screen">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-red-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-red-600">
            מצטערים, לא הצלחנו למצוא את הדף...
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            נסה לרענן את הדף או לחזור לדף הבית
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold rounded-md bg-gray-700 text-white hover:bg-gray-900 border-2 border-black"
          >
            בחזרה לדף הבית
          </a>
        </div>
      </div>
    </section>
  );
};

export default PageNoteFound;
