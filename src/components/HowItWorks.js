export default function HowItWorks(){
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center animate-fade-in-up">
        <h2 className="text-3xl font-semibold text-gray-900 mb-10">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-blue-50 p-6 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="text-xl font-bold text-blue-700 mb-2">For Users</h3>
            <p>Create a profile, explore consultants, and schedule sessions easily.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl transition transform hover:-translate-y-0.5 hover:shadow-md">
            <h3 className="text-xl font-bold text-blue-700 mb-2">For Consultants</h3>
            <p>Set up your profile, showcase expertise, and connect with clients.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
