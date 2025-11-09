import React, { useState } from 'react';

export default function CompanyRegistration(){
  const [form, setForm] = useState({
    companyName: '',
    designation: '',
    workEmail: '',
    phone: '',
  });

  function handleChange(e){
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }

  function handleSubmit(e){
    e.preventDefault();
    const name = (form.companyName || '').trim();
    if(!name){
      alert('Please enter company name');
      return;
    }
    // Load existing list
    const defaults = ["CGI","Infosys","Wipro","Bosch"];
    const existing = JSON.parse(localStorage.getItem('companies') || '[]');
    const base = existing.length ? existing : defaults;
    const set = new Set(base);
    set.add(name);
    const next = Array.from(set);
    localStorage.setItem('companies', JSON.stringify(next));
    // signal last added for convenient selection
    localStorage.setItem('lastAddedCompany', name);
    // Optional: small toast substitute
    console.log('Company saved locally:', name);
    window.close();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="flex items-center justify-center py-6">
            <div className="bg-blue-100 text-blue-700 rounded-full p-3 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-6 4h20" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center">Register Company</h1>
          <div className="border-t my-6" />

          <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Company Name</label>
              <input name="companyName" value={form.companyName} onChange={handleChange} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" placeholder="Enter company name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Designation</label>
                <input name="designation" value={form.designation} onChange={handleChange} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" placeholder="e.g., HR Manager" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Work Email</label>
                <input name="workEmail" value={form.workEmail} onChange={handleChange} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" placeholder="name@company.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" placeholder="+91 98765 43210" />
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">Save Company</button>
          </form>
        </div>
      </div>
    </div>
  );
}
