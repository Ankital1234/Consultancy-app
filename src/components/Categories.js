const categories = [
  "Finance Advisory",
  "HR & Staffing",
  "IT Consulting",
  "Marketing",
  "Legal Advisory",
  "Operations",
  "Startups",
  "Growth Strategy",
];

export default function Categories(){
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 animate-fade-in-up">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Explore by Category</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c,i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md text-center transition transform hover:-translate-y-0.5 hover:ring-1 hover:ring-blue-200"
            >
              <p className="font-medium text-gray-800">{c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
