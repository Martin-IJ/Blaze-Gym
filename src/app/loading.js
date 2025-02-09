const LoadingSpinner = () => (
  <div className="relative h-screen w-screen flex items-center justify-center bg-white">
    <div className="absolute z-50 animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" />
  </div>
);

export default LoadingSpinner;
