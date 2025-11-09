export default function WhyChoose(){
  const features = [
    { title: "Verified Consultants", desc: "All experts are pre-vetted for credibility." },
    { title: "Secure Payments", desc: "Safe and transparent payment handling." },
    { title: "Easy Collaboration", desc: "Streamlined communication and scheduling tools." },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 animate-fade-in-up">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900">Why Choose Our Platform</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f,i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
              <h3 className="text-xl font-semibold text-blue-700">{f.title}</h3>
              <p className="mt-3 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
