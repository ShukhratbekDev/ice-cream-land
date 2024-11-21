import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/background_home.jpg" // Correct path for the image in public/
        alt="Background Home"
        layout="fill" // Ensures the image spans the entire container
        objectFit="cover" // Maintains aspect ratio while covering the container
        quality={100} // Ensures high-quality rendering
        className="z-0"
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-4xl font-bold">Welcome to Ice Cream Land!</h1>
      </div>
    </div>
  );
};

export default HomePage;
