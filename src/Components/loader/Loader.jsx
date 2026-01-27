const Loader = () => {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
};

export default Loader;
