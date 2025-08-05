import React from 'react';

const LoadingSkeleton = ({ 
  type = 'text', 
  lines = 1, 
  className = '',
  height = 'h-4',
  width = 'w-full'
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div
                key={index}
                className={`${height} ${width} bg-gray-200 rounded animate-pulse`}
                style={{
                  width: index === lines - 1 ? '75%' : '100%'
                }}
              />
            ))}
          </div>
        );
      
      case 'card':
        return (
          <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            </div>
          </div>
        );
      
      case 'table':
        return (
          <div className={`space-y-3 ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/6" />
              </div>
            ))}
          </div>
        );
      
      case 'avatar':
        return (
          <div className={`${width} ${height} bg-gray-200 rounded-full animate-pulse ${className}`} />
        );
      
      default:
        return (
          <div className={`${height} ${width} bg-gray-200 rounded animate-pulse ${className}`} />
        );
    }
  };

  return renderSkeleton();
};

export default LoadingSkeleton; 