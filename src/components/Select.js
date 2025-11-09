import React, { useState, useRef, useEffect } from 'react';

export default function Select({ name = 'select', value, onChange, placeholder = 'Select', options = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e){
      if(ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function handleSelect(val){
    onChange && onChange({ target: { name, value: val }});
    setOpen(false);
  }

  const selectedLabel = value || '';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className={selectedLabel ? '' : 'text-gray-400'}>
          {selectedLabel || placeholder}
        </span>
        <svg className="ml-2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg"
        >
          {options.map(opt => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              onClick={() => handleSelect(opt)}
              className={`cursor-pointer select-none rounded px-3 py-2 text-sm hover:bg-blue-50 ${value === opt ? 'bg-blue-600 text-white hover:bg-blue-600' : 'text-gray-700'}`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
