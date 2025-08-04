import React, { useState } from 'react';
import { 
  LoadingSpinner, 
  LoadingButton, 
  LoadingOverlay, 
  LoadingSkeleton, 
  ProgressBar,
  useApi 
} from '../components';

const LoadingDemo = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const { loading, error, success, callApi } = useApi();

  const handleDemoApiCall = async () => {
    await callApi(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      return { success: true };
    });
  };

  const handleProgressDemo = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Loading Components Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Loading Spinner Demo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Loading Spinner</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Small</h3>
                <LoadingSpinner size="sm" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Medium</h3>
                <LoadingSpinner size="md" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Large</h3>
                <LoadingSpinner size="lg" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">With Text</h3>
                <LoadingSpinner size="md" text="Loading data..." />
              </div>
            </div>
          </div>

          {/* Loading Button Demo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Loading Button</h2>
            <div className="space-y-4">
              <LoadingButton
                onClick={handleDemoApiCall}
                loading={loading}
                loadingText="Processing..."
                className="w-full"
              >
                Demo API Call
              </LoadingButton>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-green-600 text-sm">API call successful!</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar Demo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Progress Bar</h2>
            <div className="space-y-4">
              <ProgressBar progress={progress} total={100} />
              <button
                onClick={handleProgressDemo}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Progress
              </button>
            </div>
          </div>

          {/* Loading Skeleton Demo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Loading Skeleton</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Text Skeleton</h3>
                <LoadingSkeleton type="text" lines={3} />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Card Skeleton</h3>
                <LoadingSkeleton type="card" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Avatar Skeleton</h3>
                <LoadingSkeleton type="avatar" width="w-12" height="h-12" />
              </div>
            </div>
          </div>

          {/* Loading Overlay Demo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Loading Overlay</h2>
            <button
              onClick={() => setShowOverlay(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Show Overlay
            </button>
            <LoadingOverlay
              isVisible={showOverlay}
              message="Processing your request..."
            />
          </div>

          {/* API Hook Demo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">useApi Hook</h2>
            <div className="space-y-4">
              <button
                onClick={handleDemoApiCall}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Test API Hook
              </button>
              <div className="text-sm">
                <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
                <p><strong>Error:</strong> {error || 'None'}</p>
                <p><strong>Success:</strong> {success ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="prose max-w-none">
            <h3>1. Loading Spinner</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`<LoadingSpinner size="md" text="Loading..." />`}
            </pre>

            <h3>2. Loading Button</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`<LoadingButton
  loading={loading}
  loadingText="Processing..."
  onClick={handleClick}
>
  Submit
</LoadingButton>`}
            </pre>

            <h3>3. useApi Hook</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`const { loading, error, success, callApi } = useApi();

const handleSubmit = async () => {
  await callApi(apiFunction, ...args);
};`}
            </pre>

            <h3>4. Loading Skeleton</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`<LoadingSkeleton type="card" />
<LoadingSkeleton type="text" lines={3} />
<LoadingSkeleton type="avatar" />`}
            </pre>

            <h3>5. Progress Bar</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`<ProgressBar progress={50} total={100} />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDemo; 