export default function Spinner() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-70">
      <div className="w-12 h-12 rounded-full border-[5px] border-dotted border-t-transparent border-blue-600 animate-spin"></div>
    </div>
  );
}
