import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingButton = ({
  children,
  loading = false,
  disabled = false,
  loadingText = 'Loading...',
  className = '',
  spinnerSize = 'sm',
  spinnerColor = 'white',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isDisabled 
          ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
          : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105'
        }
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoadingSpinner size={spinnerSize} color={spinnerColor} text="" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton; 