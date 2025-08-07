// src/components/LoadingSkeleton.tsx
import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-pulse">
      {/* Search bar skeleton */}
      <div className="h-12 bg-gray-500/30 rounded-lg w-full mb-8"></div>
      
      {/* Main weather display skeleton */}
      <div className="h-48 bg-gray-500/30 rounded-lg mb-8"></div>

      {/* Details grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="h-24 bg-gray-500/30 rounded-lg"></div>
        <div className="h-24 bg-gray-500/30 rounded-lg"></div>
        <div className="h-24 bg-gray-500/30 rounded-lg"></div>
        <div className="h-24 bg-gray-500/30 rounded-lg"></div>
        <div className="h-24 bg-gray-500/30 rounded-lg"></div>
        <div className="h-24 bg-gray-500/30 rounded-lg"></div>
      </div>

      {/* Forecast skeleton */}
      <div className="space-y-3">
        <div className="h-10 bg-gray-500/30 rounded-lg"></div>
        <div className="h-10 bg-gray-500/30 rounded-lg"></div>
        <div className="h-10 bg-gray-500/30 rounded-lg"></div>
        <div className="h-10 bg-gray-500/30 rounded-lg"></div>
        <div className="h-10 bg-gray-500/30 rounded-lg"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;