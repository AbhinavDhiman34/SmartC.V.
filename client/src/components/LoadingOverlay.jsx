import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingOverlay = ({ 
  isVisible, 
  message = 'Loading...', 
  backdrop = true,
  size = 'lg',
  color = 'blue'
}) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${backdrop ? 'bg-black bg-opacity-50' : ''}`}>
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm mx-4">
        <LoadingSpinner size={size} color={color} text={message} />
      </div>
    </div>
  );
};

export default LoadingOverlay; 