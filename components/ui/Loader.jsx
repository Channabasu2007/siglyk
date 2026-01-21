import React from 'react';

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-light-primary">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute h-24 w-24 animate-ping rounded-full bg-light-secondary/20"></div>
        
        {/* Spinning Border */}
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-light-secondary/10 border-t-light-secondary"></div>
        
        {/* Center Icon */}
        <div className="absolute text-light-secondary">
          <span className="material-symbols-outlined text-4xl animate-pulse">
            sign_language
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;