import Button from './Button';
import { Link } from 'react-router-dom';

export default function Hero(){
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600">
          Connect Consultants & Companies
        </h1>
        <p className="mt-4 text-gray-600">Your trusted platform for expert consulting services and business growth</p>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link to="/consultant-register" className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-lg shadow transition">
              Become a Consultant
            </Link>
          </Button>
          <Button asChild>
            <Link to="/consultants" className="bg-[#f4ede4] border border-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg shadow transition hover:bg-[#ede7dd]">
              Find Consultants
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
