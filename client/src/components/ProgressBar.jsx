import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  total = 100, 
  showPercentage = true,
  height = 'h-2',
  color = 'blue',
  className = ''
}) => {
  const percentage = Math.min((progress / total) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    gray: 'bg-gray-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div
          className={`${colorClasses[color]} ${height} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 mt-1 text-center">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 