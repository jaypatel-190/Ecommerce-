import React from "react";

const Track = () => {
    return (
        <section className="py-10 md:py-14">
            <div className="container mx-auto px-5">
                <div className="flex flex-wrap -m-4 text-center">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className=" border-4 hover:shadow-xl hover:shadow-pink-200 border-gray-200 bg-gray-100 px-4 py-6 rounded-lg shadow-md">
                                <svg
                                    className="w-12 h-12 mb-3 text-pink-600 mx-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>
                                <h2 className="text-lg font-medium text-gray-900">Premium Tshirts</h2>
                                <p className="leading-relaxed">Our T-Shirts are 100% made of cotton.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Track;
