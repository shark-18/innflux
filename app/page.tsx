'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Innflux</h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-12">Credit Without Borders</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/landing"><button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">View Landing Page</button></Link>
          <Link href="/app"><button className="px-8 py-4 border border-blue-400 text-blue-400 hover:bg-blue-950 font-semibold rounded-lg">Launch App</button></Link>
        </div>
      </div>
    </div>
  );
}
