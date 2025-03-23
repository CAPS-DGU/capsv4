import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* 바깥쪽 심플한 회색 스피너 */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-300 rounded-full border-t-gray-600 animate-spin"></div>
      </div>
      <div className="text-lg font-semibold text-gray-500">로딩 중...</div>
    </div>
  );
};

export default LoadingSpinner;
