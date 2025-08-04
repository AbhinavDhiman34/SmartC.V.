import React, { createContext, useContext, useState, useCallback } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const startLoading = useCallback((message = 'Loading...') => {
    setGlobalLoading(true);
    setLoadingMessage(message);
  }, []);

  const stopLoading = useCallback(() => {
    setGlobalLoading(false);
    setLoadingMessage('');
  }, []);

  const withLoading = useCallback(async (asyncFunction, message = 'Loading...') => {
    startLoading(message);
    try {
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={{ 
      globalLoading, 
      loadingMessage, 
      startLoading, 
      stopLoading, 
      withLoading 
    }}>
      {children}
      {globalLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <LoadingSpinner size="lg" text={loadingMessage} />
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}; 