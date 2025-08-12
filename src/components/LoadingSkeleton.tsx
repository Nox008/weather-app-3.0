// FILE: src/components/LoadingSkeleton.tsx
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-white/10" />
        <div className="flex-1">
          <div className="h-4 bg-white/8 rounded-md w-1/3 mb-2" />
          <div className="h-8 bg-white/8 rounded-md w-2/3" />
        </div>
        <div className="w-36 h-36 bg-white/6 rounded-xl" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-white/8 rounded-2xl" />
        ))}
      </div>

      {/* Big today card skeleton */}
      <div className="md:col-span-2 bg-white/6 rounded-2xl p-6 mb-6">
        <div className="h-4 bg-white/8 w-1/4 mb-4 rounded-md" />
        <div className="flex items-center gap-6">
          <div className="h-28 w-28 bg-white/8 rounded-lg" />
          <div className="flex-1">
            <div className="h-6 bg-white/8 w-1/3 rounded-md mb-2" />
            <div className="h-4 bg-white/8 w-1/2 rounded-md mb-6" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-10 bg-white/8 rounded-md" />
              <div className="h-10 bg-white/8 rounded-md" />
              <div className="h-10 bg-white/8 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Forecast skeleton */}
      <div className="flex gap-3 overflow-x-auto py-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="min-w-[92px] h-28 bg-white/8 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;