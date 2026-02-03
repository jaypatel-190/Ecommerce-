import React from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-pink-500 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                        Oops! The page you're looking for seems to have vanished into the digital void.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            role="img"
                            aria-label="home icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Go Back to Home
                    </button>

                    <div className="text-sm text-gray-500">
                        Or{' '}
                        <button
                            onClick={() => window.history.back()}
                            className="text-pink-500 hover:text-pink-600 font-medium underline"
                        >
                            go back to the previous page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoPage;