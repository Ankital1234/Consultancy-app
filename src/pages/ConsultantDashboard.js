import React from 'react';
import { Link } from 'react-router-dom';

export default function ConsultantDashboard(){
  const stats = [
    {label: 'Profile Views', value: '1,247', delta: '+12%'},
    {label: 'Total Earnings', value: '$15,420', delta: '+8%'},
    {label: 'Active Projects', value: '8', delta: '+3'},
    {label: 'Avg Rating', value: '4.9', delta: '+0.2'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Top hero */}
      <section className="bg-gradient-to-b from-sky-500 to-sky-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <p className="inline-block text-xs uppercase tracking-wider bg-white/20 rounded-full px-3 py-1 mb-4">Welcome to Consultant Dashboard</p>
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-sm">Welcome, Demo Consultant!</h1>
          <p className="mt-3 text-sky-100">Grow your consulting business with powerful tools and insights</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/consultant-register" className="inline-flex items-center gap-2 rounded-lg bg-white text-sky-700 px-4 py-2 shadow hover:bg-sky-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V6h2v3h3v2h-3v3H9v-3H6V9h3z"/></svg>
              Complete Profile
            </Link>
            <Link to="/consultants" className="inline-flex items-center gap-2 rounded-lg bg-sky-700/40 text-white px-4 py-2 border border-white/30 hover:bg-sky-700/50">
              Browse Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold mt-1">{s.value}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{s.delta}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 mt-10 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Powerful Features for Consultants</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">Everything you need to manage and grow your consulting business</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[ 
            {title:'Verified Profile', desc:'Build trust with verified credentials and certifications', icon:(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.75l8.485 3.536v7.071c0 5.303-3.51 10.16-8.485 11.893C7.51 22.517 4 17.66 4 12.357V5.286L12 1.75z"/></svg>
            )},
            {title:'Targeted Leads', desc:'Get matched with clients looking for your expertise', icon:(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v5H6v2h5v5h2v-5h5v-2h-5V7z"/></svg>
            )},
            {title:'Flexible Pricing', desc:'Set your own rates and payment terms', icon:(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm1 17h-2v-1.5a3.5 3.5 0 01-3.5-3.5h2a1.5 1.5 0 001.5 1.5H13a1.5 1.5 0 000-3h-2a3.5 3.5 0 010-7V4h2v1.5a3.5 3.5 0 013.5 3.5h-2A1.5 1.5 0 0013 7.5h-2a1.5 1.5 0 000 3h2a3.5 3.5 0 010 7V18z"/></svg>
            )},
          ].map(card => (
            <div key={card.title} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 grid place-items-center">
                {card.icon}
              </div>
              <h3 className="mt-4 font-semibold text-lg">{card.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
