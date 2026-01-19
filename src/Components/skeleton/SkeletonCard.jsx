import React from 'react';

const SkeletonCard = ({ count = 1 }) => {
    const skeletons = Array(count).fill(0);

    return (
        <div className="mt-10">
            {/* Heading Skeleton */}
            <div className="text-center mb-5">
                <div className="inline-block h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Main Content */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {skeletons.map((_, index) => (
                            <div key={index} className="p-4 w-full md:w-1/2 lg:w-1/4">
                                <div className="h-full border border-gray-200 rounded-xl overflow-hidden">
                                    {/* Image Skeleton */}
                                    <div className="relative lg:h-80 h-96 w-full bg-gray-100">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                                    </div>

                                    {/* Content Skeleton */}
                                    <div className="p-6 space-y-3">
                                        {/* Brand Skeleton */}
                                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>

                                        {/* Title Skeleton */}
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>

                                        {/* Price Skeleton */}
                                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>

                                        {/* Button Skeleton */}
                                        <div className="pt-2">
                                            <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SkeletonCard;
