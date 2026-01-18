import React from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle } from 'lucide-react';

export default function ProjectArduinoLogicPage() {
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
            <h1 className="text-lg font-bold text-white">Project: Arduino Logic</h1>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* --- PROJECT HERO --- */}
        <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden border border-white/10 mb-12">
          <img 
            src="/arduino-logic.jpg" 
            alt="Arduino Logic Board" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Data Acquisition & Control</h2>
            <p className="text-lg text-slate-300 mt-2 max-w-2xl">A custom-built Arduino-based system for precise data logging and real-time validation of aeronautical performance metrics.</p>
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
                  To validate the performance of our aerial vehicle, we needed a reliable way to capture and log data from our custom-built thrust stand. Commercial data acquisition systems were prohibitively expensive and lacked the flexibility we required. The solution was to design and build a custom data logger using an Arduino microcontroller and a Load Cell Amplifier (HX711). This system allowed us to capture high-frequency data, perform real-time calibrations, and export the data for analysis. The success of this project was a key factor in our ability to prove the superior performance of our aircraft.
                </p>
              </div>
            </section>

            {/* --- Key Features --- */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest font-mono">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">High-Frequency Data Logging</h4>
                    <p className="text-sm text-slate-400">Captured data at over 80Hz, providing a high-resolution view of motor performance.</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Real-time Calibration</h4>
                    <p className="text-sm text-slate-400">Allowed for on-the-fly calibration of the load cell, ensuring data accuracy.</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-2xl flex items-start gap-4">
                  <CheckCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Data Export</h4>
                    <p className="text-sm text-slate-400">Exported data in a clean, CSV format for easy analysis in other tools.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* --- Code Snippet --- */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest font-mono">Code Snippet</h3>
              <div className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 border-b border-white/10">
                  <p className="text-sm text-slate-400 font-mono">Arduino C++</p>
                </div>
                <pre className="p-4 text-xs md:text-sm text-slate-300 overflow-x-auto"><code>
{`#include "HX711.h"

#define DOUT  3
#define CLK  2

HX711 scale;

float calibration_factor = 419550;

void setup() {
  Serial.begin(9600);
  scale.begin(DOUT, CLK);
  scale.set_scale(calibration_factor);
  scale.tare();
}

void loop() {
  Serial.print("Reading: ");
  Serial.print(scale.get_units(), 3);
  Serial.println(" kg");
}`}
                </code></pre>
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
                <li className="flex justify-between"><span className="text-slate-400">Timeline:</span> <span className="font-medium text-slate-200">2 Weeks</span></li>
                <li className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="font-medium text-green-400">Complete</span></li>
              </ul>
            </div>
             <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {['Arduino', 'C++', 'Load Cell HX711', 'Serial Communication'].map(skill => (
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
