# Loading Components Documentation

This directory contains reusable loading components and utilities for the SmartCV application.

## Components

### 1. LoadingSpinner
A customizable loading spinner component with different sizes and colors.

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `color`: 'blue' | 'green' | 'red' | 'gray' | 'white' (default: 'blue')
- `text`: string (optional loading text)
- `className`: string (additional CSS classes)

**Usage:**
```jsx
import LoadingSpinner from './components/LoadingSpinner';

<LoadingSpinner size="lg" text="Loading data..." />
```

### 2. LoadingButton
A button component that shows a loading spinner when in loading state.

**Props:**
- `loading`: boolean (loading state)
- `disabled`: boolean (disabled state)
- `loadingText`: string (text shown during loading)
- `spinnerSize`: string (size of the spinner)
- `spinnerColor`: string (color of the spinner)
- `className`: string (additional CSS classes)
- All standard button props

**Usage:**
```jsx
import LoadingButton from './components/LoadingButton';

<LoadingButton
  loading={isLoading}
  loadingText="Saving..."
  onClick={handleSave}
>
  Save Resume
</LoadingButton>
```

### 3. LoadingOverlay
A full-screen overlay with loading spinner for global loading states.

**Props:**
- `isVisible`: boolean (show/hide overlay)
- `message`: string (loading message)
- `backdrop`: boolean (show backdrop, default: true)
- `size`: string (spinner size)
- `color`: string (spinner color)

**Usage:**
```jsx
import LoadingOverlay from './components/LoadingOverlay';

<LoadingOverlay
  isVisible={isLoading}
  message="Processing your request..."
/>
```

### 4. LoadingSkeleton
Skeleton loading placeholders for content.

**Props:**
- `type`: 'text' | 'card' | 'table' | 'avatar' (default: 'text')
- `lines`: number (number of skeleton lines, default: 1)
- `height`: string (height class, default: 'h-4')
- `width`: string (width class, default: 'w-full')
- `className`: string (additional CSS classes)

**Usage:**
```jsx
import LoadingSkeleton from './components/LoadingSkeleton';

<LoadingSkeleton type="card" />
<LoadingSkeleton type="text" lines={3} />
<LoadingSkeleton type="avatar" width="w-12" height="h-12" />
```

### 5. ProgressBar
A progress bar component for showing loading progress.

**Props:**
- `progress`: number (current progress value)
- `total`: number (total value, default: 100)
- `showPercentage`: boolean (show percentage, default: true)
- `height`: string (height class, default: 'h-2')
- `color`: 'blue' | 'green' | 'red' | 'yellow' | 'gray' (default: 'blue')
- `className`: string (additional CSS classes)

**Usage:**
```jsx
import ProgressBar from './components/ProgressBar';

<ProgressBar progress={50} total={100} />
```

## Hooks

### useApi
A custom hook for managing API calls with loading, error, and success states.

**Returns:**
- `loading`: boolean (loading state)
- `error`: string | null (error message)
- `success`: boolean (success state)
- `callApi`: function (function to call API)
- `resetState`: function (reset all states)

**Usage:**
```jsx
import { useApi } from './hooks/useApi';

const MyComponent = () => {
  const { loading, error, success, callApi } = useApi();

  const handleSubmit = async () => {
    try {
      await callApi(apiFunction, ...args);
      // Handle success
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">Success!</div>}
    </div>
  );
};
```

## Context

### LoadingContext
Global loading context for managing application-wide loading states.

**Usage:**
```jsx
import { LoadingProvider, useLoading } from './context/LoadingContext';

// Wrap your app
<LoadingProvider>
  <App />
</LoadingProvider>

// Use in components
const MyComponent = () => {
  const { startLoading, stopLoading, withLoading } = useLoading();

  const handleAction = async () => {
    await withLoading(async () => {
      // Your async operation
    }, "Processing...");
  };
};
```

## Best Practices

1. **Use LoadingButton for form submissions** - Provides clear feedback to users
2. **Use LoadingSkeleton for content loading** - Improves perceived performance
3. **Use useApi hook for API calls** - Consistent error handling and loading states
4. **Use LoadingOverlay for global operations** - Prevents user interaction during critical operations
5. **Use ProgressBar for long-running operations** - Gives users progress feedback

## Demo

Visit `/loading-demo` to see all components in action with interactive examples.

## File Structure

```
components/
├── LoadingSpinner.jsx
├── LoadingButton.jsx
├── LoadingOverlay.jsx
├── LoadingSkeleton.jsx
├── ProgressBar.jsx
├── index.js
└── README.md

hooks/
└── useApi.js

context/
└── LoadingContext.jsx
```

## Integration

All components are exported from `components/index.js` for easy imports:

```jsx
import { 
  LoadingSpinner, 
  LoadingButton, 
  LoadingOverlay, 
  LoadingSkeleton, 
  ProgressBar,
  useApi 
} from './components';
``` 