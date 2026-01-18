import React from 'react';
import Link from 'next/link';
import { ChevronLeft, GitCompareArrows } from 'lucide-react';

export default function ProjectECalcPage() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-blue-500/30">

      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ChevronLeft size={20} />
              <span className="font-semibold">Back to Portfolio</span>
            </Link>
            <h1 className="text-lg font-bold text-white">Project: eCalc Analysis</h1>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* --- PROJECT HERO --- */}
        <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden border border-white/10 mb-12">
          <img 
            src="/ecalc-data.jpg" 
            alt="eCalc Data Analysis" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Theory vs. Reality</h2>
            <p className="text-lg text-slate-300 mt-2 max-w-2xl">Bridging the gap between theoretical models and empirical data to achieve peak performance.</p>
          </div>
        </div>

        {/* --- TWO-COLUMN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* --- LEFT (MAIN) COLUMN --- */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* --- Project Overview --- */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-mono">Mission Brief</h3>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400 leading-relaxed">
                <p>
                  eCalc is an invaluable tool for theoretical modeling of electric propulsion systems, but its predictions are only as good as the data fed into it. Our real-world tests consistently showed a significant deviation from eCalc's models. This project was dedicated to analyzing the data from our custom thrust stand, comparing it against eCalc's predictions, and using the insights to refine our models. This iterative process of testing, analysis, and refinement was instrumental in optimizing our aircraft's performance and ultimately proving its superiority.
                </p>
              </div>
            </section>

            {/* --- Data Comparison --- */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest font-mono">Data Comparison</h3>
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                    <GitCompareArrows className="w-8 h-8 text-blue-400" />
                    <h4 className="text-xl font-bold text-white">Thrust-to-Weight Ratio</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-l-4 border-red-500 pl-4">
                        <p className="text-sm font-mono uppercase text-red-400">eCalc Prediction</p>
                        <p className="text-4xl font-bold text-white">1.04</p>
                        <p className="text-xs text-slate-500">Theoretical Maximum</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                        <p className="text-sm font-mono uppercase text-green-400">Validated Performance</p>
                        <p className="text-4xl font-bold text-white">1.46</p>
                        <p className="text-xs text-slate-500">+40% Over Model</p>
                    </div>
                </div>
                 <p className="text-sm text-slate-400 mt-6">The validated thrust-to-weight ratio significantly outperformed the theoretical model, highlighting the real-world efficiency gains of our integrated system—a factor not fully captured by standard calculators.</p>
              </div>
            </section>

          </div>

          {/* --- RIGHT (SIDEBAR) COLUMN --- */}
          <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Project Details</h4>
              <ul className="space-y-3 text-sm">
                 <li className="flex justify-between"><span className="text-slate-400">My Role:</span> <span className="font-medium text-slate-200">Team Lead, Avionics & Integration</span></li>
                <li className="flex justify-between"><span className="text-slate-400">Division:</span> <span className="font-medium text-slate-200">RU Airborne</span></li>
                <li className="flex justify-between"><span className="text-slate-400">Timeline:</span> <span className="font-medium text-slate-200">1 Week</span></li>
                <li className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="font-medium text-green-400">Complete</span></li>
              </ul>
            </div>
             <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {['eCalc', 'Data Analysis', 'CSV', 'Microsoft Excel'].map(skill => (
                  <span key={skill} className="bg-slate-800 text-slate-300 text-xs font-mono px-3 py-1 rounded-full border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </aside>

        </div>

      </main>
    </div>
  );
}
