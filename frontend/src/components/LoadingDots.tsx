export function LoadingDots() {
  return (
    <div className="flex items-center justify-start p-4 bg-blue-900 rounded-xl rounded-tl-none max-w-2/3 shadow-md text-white">
      <div className="flex space-x-1.5 items-end">
        <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <p className="ml-3 text-sm italic text-indigo-200">
        The AI writes the exercise...
      </p>
    </div>
  );
}