import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-600 text-gray-100 py-5">
      <div className="container mx-auto flex flex-col items-center sm:flex-row">
        <div className="flex items-center justify-center mb-4 sm:mb-0">
          <Link to="/"> <span className="text-xl font-bold">ShopWave</span></Link>
        </div>
        <p className="text-sm sm:ml-4 sm:border-l sm:border-gray-200 sm:pl-4">
          © 2024 ShopWave —
          <Link
            to="/"
            className="ml-1 text-gray-100"
            rel="noopener noreferrer"
            target="_blank"
          >
            @ShopWave.com
          </Link>
        </p>
        <div className="flex justify-center sm:ml-auto mt-4 sm:mt-0">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-100 cursor-pointer" aria-label="Facebook">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-100 cursor-pointer" aria-label="Twitter">
            <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-100 cursor-pointer" aria-label="Instagram">
            <svg
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="mx-2 text-gray-100 cursor-pointer" aria-label="LinkedIn">
            <svg
              fill="currentColor"
              stroke="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              />
              <circle cx={4} cy={4} r={2} stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
