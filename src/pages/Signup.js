export default function Signup(){
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form className="space-y-4">
        <input className="w-full px-4 py-3 border rounded" placeholder="Name" />
        <input className="w-full px-4 py-3 border rounded" placeholder="Email" />
        <input className="w-full px-4 py-3 border rounded" placeholder="Password" type="password" />
        <button className="w-full px-4 py-3 bg-blue-700 text-white rounded">Create account</button>
      </form>
    </div>
  );
}
