export default function HomePageLoadingComponent() {
  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index} className="p-4 space-y-4 animate-pulse h-64">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded w-5/6"></div>
            <div className="h-10 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
