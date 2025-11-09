export default function Login(){
  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form className="space-y-4">
        <input className="w-full px-4 py-3 border rounded" placeholder="Email" />
        <input className="w-full px-4 py-3 border rounded" placeholder="Password" type="password" />
        <button className="w-full px-4 py-3 bg-blue-700 text-white rounded">Login</button>
      </form>
    </div>
  );
}
