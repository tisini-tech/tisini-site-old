export default function GridLoader() {
  // skeleton loader for grid items
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-100 h-96 w-full rounded-md shadow-sm"
        >
          <div className="h-40 w-full bg-gray-200 rounded-t-md"></div>
          <div className="h-40 w-full bg-gray-200 rounded-b-md"></div>
        </div>
      ))}
    </div>
  );
}
