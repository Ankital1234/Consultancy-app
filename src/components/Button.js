export default function Button({children, onClick}){
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
      {children}
    </button>
  );
}
