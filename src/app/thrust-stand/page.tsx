import React from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle, Goal, ListChecks, Info, Layers } from 'lucide-react';

export default function ProjectThrustStandPage() {
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
            <div className="bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2">
                <h1 className="text-md font-bold text-white">Project: Thrust Stand</h1>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* --- PROJECT HERO --- */}
        <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl shadow-blue-500/10">
          <img 
            src="/thrust-stand.jpg" 
            alt="Thrust Stand" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">Engineering the Data Loop</h2>
            <p className="text-lg text-slate-300 mt-2 max-w-2xl drop-shadow-lg">A custom-built thrust stand to validate theoretical models and prove the performance of our aerial vehicle.</p>
          </div>
        </div>

        {/* --- TWO-COLUMN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* --- LEFT (MAIN) COLUMN --- */}
          <div className="lg:col-span-2 space-y-8">
            
            <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center gap-x-4 mb-6">
                <Goal className="w-8 h-8 text-blue-400"/>
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest font-mono">Mission Brief</h3>
              </div>
              <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed">
                <p>
                  The goal was to design and build a thrust stand to accurately measure the performance of our aerial vehicle's propulsion system. This was a critical step in validating our theoretical models and proving the superiority of our design. The thrust stand was built using a combination of off-the-shelf components and custom-designed parts. The data acquisition system was built around an Arduino microcontroller and a Load Cell Amplifier (HX711). This allowed us to capture high-frequency data, perform real-time calibrations, and export the data for analysis.
                </p>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center gap-x-4 mb-6">
                <ListChecks className="w-8 h-8 text-blue-400"/>
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest font-mono">Key Features</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Accurate Measurements</h4>
                    <p className="text-sm text-slate-400">Provided accurate and repeatable measurements of our propulsion system's performance.</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Real-time Data</h4>
                    <p className="text-sm text-slate-400">Allowed for real-time monitoring of the motor's performance, which was critical for tuning and optimization.</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl flex items-start gap-4 sm:col-span-2">
                  <CheckCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Data Export</h4>
                    <p className="text-sm text-slate-400">Exported data in a clean, CSV format for easy analysis in other tools.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* --- RIGHT (SIDEBAR) COLUMN --- */}
          <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 h-min">
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center gap-x-3 mb-4">
                <Info className="w-6 h-6 text-blue-400"/>
                <h4 className="text-lg font-bold text-white">Project Details</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center"><span className="text-slate-500">My Role:</span> <span className="font-medium text-slate-200 text-right">Team Lead, Avionics & Integration</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Division:</span> <span className="font-medium text-slate-200 text-right">RU Airborne</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Timeline:</span> <span className="font-medium text-slate-200 text-right">2 Weeks</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Status:</span> <span className="font-medium text-blue-400 text-right">Complete</span></li>
              </ul>
            </div>
             <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
                <div className="flex items-center gap-x-3 mb-4">
                    <Layers className="w-6 h-6 text-blue-400"/>
                    <h4 className="text-lg font-bold text-white">Technology Stack</h4>
                </div>
              <div className="flex flex-wrap gap-2">
                {['Arduino', 'C++', 'Load Cell HX711', 'Serial Communication'].map(skill => (
                  <span key={skill} className="bg-slate-800 text-blue-300 text-xs font-mono px-3 py-1 rounded-full border border-blue-500/20">
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
