import React from 'react';

export default function Modal({ open, onClose, title, children, footer }){
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-[90%] max-w-lg rounded-xl bg-white shadow-xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button aria-label="Close" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </button>
        </div>
        <div className="border-t" />
        <div className="px-6 py-5 text-gray-700">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
