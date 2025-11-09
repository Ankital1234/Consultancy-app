export default function Hero(){
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600">
          Connect Consultants & Companies
        </h1>
        <p className="mt-4 text-gray-600">Your trusted platform for expert consulting services and business growth</p>

        <div className="mt-8 flex justify-center">
          <input
            aria-label="search"
            className="w-72 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            placeholder="Search for consulting domain..."
          />
          <button className="px-5 py-3 bg-blue-700 text-white rounded-r-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-soft transition">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
