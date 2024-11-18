import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Oops! 404</h1>
        <p className="text-xl text-gray-600 mb-6">
          The page you're trying to access does not exist. It might have been
          moved or deleted.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
