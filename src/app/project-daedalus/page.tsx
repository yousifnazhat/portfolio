import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Goal, BarChart, ImageIcon, Info, Layers } from 'lucide-react';

export default function ProjectDaedalusPage() {
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
                <h1 className="text-md font-bold text-white">Project: Daedalus</h1>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* --- PROJECT HERO --- */}
        <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl shadow-blue-500/10">
          <img 
            src="/hero-plane.jpg" 
            alt="Daedalus Aircraft in flight" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">Team Lead, Avionics & Integration</h2>
            <p className="text-lg text-slate-300 mt-2 max-w-3xl drop-shadow-lg">Orchestrating the seamless fusion of hardware and software for a high-performance autonomous aerial system.</p>
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
                    The Daedalus project was a high-stakes, rapid prototyping challenge to design, build, and fly a competitive aerial vehicle under extreme constraints. As the Team Lead for the Avionics and Integration team, my primary role was to architect the aircraft's central nervous system. This involved not only selecting and integrating all electronic components—flight controller, ESCs, motors, and telemetry—but also validating system performance against aggressive targets. A core challenge was the discrepancy between theoretical performance models and real-world metrics. My data-driven approach, using a custom-built thrust stand, was instrumental in proving our aircraft's superior capabilities and securing a winning edge.
                    </p>
                </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10">
                <div className="flex items-center gap-x-4 mb-6">
                    <BarChart className="w-8 h-8 text-blue-400"/>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-widest font-mono">Core Metrics</h3>
                </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                
                <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
                  <p className="text-blue-400 text-sm font-mono uppercase mb-2">Validated T/W Ratio</p>
                  <p className="text-4xl font-bold text-white">1.46</p>
                  <p className="text-xs text-slate-500 mt-1">Exceeded eCalc models by 40%</p>
                </div>
                
                <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
                  <p className="text-slate-400 text-sm font-mono uppercase mb-2">Cruise Speed</p>
                  <p className="text-4xl font-bold text-white">80 <span className="text-2xl text-slate-400">m/s</span></p>
                   <p className="text-xs text-slate-500 mt-1">Projected, based on thrust data</p>
                </div>

                <div className="bg-slate-800/50 border border-white/10 p-6 rounded-2xl">
                  <p className="text-slate-400 text-sm font-mono uppercase mb-2">Peak Current</p>
                  <p className="text-4xl font-bold text-white">130A</p>
                   <p className="text-xs text-slate-500 mt-1">Zero critical failures during high-load</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10">
                <div className="flex items-center gap-x-4 mb-6">
                    <ImageIcon className="w-8 h-8 text-blue-400"/>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-widest font-mono">Gallery</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                         <img src="/thrust-stand.jpg" alt="Thrust stand setup" className="w-full h-full object-cover"/>
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                             <p className="text-white font-bold">Custom Thrust Stand</p>
                         </div>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                         <img src="/arduino-logic.jpg" alt="Arduino logic board" className="w-full h-full object-cover"/>
                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                             <p className="text-white font-bold">Data Acquisition Unit</p>
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
                <li className="flex justify-between items-center"><span className="text-slate-500">Timeline:</span> <span className="font-medium text-slate-200 text-right">5 Weeks</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Status:</span> <span className="font-medium text-blue-400 text-right">Complete</span></li>
              </ul>
            </div>
             <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
                <div className="flex items-center gap-x-3 mb-4">
                    <Layers className="w-6 h-6 text-blue-400"/>
                    <h4 className="text-lg font-bold text-white">Technology Stack</h4>
                </div>
              <div className="flex flex-wrap gap-2">
                {['Arduino', 'C++', 'Load Cell HX711', 'BLDC Motors', 'LiPo Batteries', 'eCalc', 'KiCad'].map(skill => (
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
