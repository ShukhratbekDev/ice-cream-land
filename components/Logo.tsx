import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center">
      {/* /Users/whomaun/Downloads/ice-cream-land/public/logo.svg*/}
      <Image
        src="/but.svg" // Correct relative path for the file in the public/ directory
        alt="Logo"
        width={100} // Adjust the width as needed
        height={100} // Adjust the height as needed
        priority // Load the image with high priority
        className="object-contain" // Ensure proper scaling
      />
    </div>
  );
};

export default Logo;
