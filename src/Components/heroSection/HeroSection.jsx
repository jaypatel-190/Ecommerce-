import React, { useState } from "react";

const HERO_IMAGE_URL = "https://devknus.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Feeee8099-a731-4be4-b949-97588572fb6b%2Faf556a00-6601-4a15-8931-dab16ebd5981%2FUntitled.png?table=block&id=4ec2cb9b-b4a9-4de8-8195-725a3a795de5&spaceId=eeee8099-a731-4be4-b949-97588572fb6b&width=2000&userId=&cache=v2";

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      {!imageLoaded && !imageError && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 animate-pulse" aria-hidden="true" />
          <div className="sr-only" role="status" aria-live="polite">
            Loading ShopWave banner image...
          </div>
        </>
      )}
      <img
        className={`w-full h-auto object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        src={HERO_IMAGE_URL}
        alt="ShopWave banner - Premium products and exclusive deals"
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      {imageError && (
        <div className="w-full h-64 bg-gradient-to-r from-pink-200 to-purple-200 flex items-center justify-center" role="img" aria-label="ShopWave banner placeholder">
          <p className="text-gray-600 text-lg font-medium">ShopWave - Your Premium Shopping Destination</p>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
