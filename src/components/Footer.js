export default function Footer(){
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600">
        © {new Date().getFullYear()} consultancy.co — All rights reserved.
      </div>
    </footer>
  );
}
