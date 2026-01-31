import Link from 'next/link';
import { ChevronLeft, Goal, GitCompare, Info, Layers } from 'lucide-react';

export default function EcalcDataPage() {
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
                <h1 className="text-md font-bold text-white">Project: eCalc Analysis</h1>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* --- PROJECT HERO --- */}
        <div className="relative w-full h-96 md:h-[500px] rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-2xl shadow-blue-500/10">
          <img
            src="/ecalc-data.jpg"
            alt="eCalc Data Analysis"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">Theory vs. Reality</h2>
            <p className="text-lg text-slate-300 mt-2 max-w-3xl drop-shadow-lg">Bridging the gap between theoretical models and empirical data to achieve peak performance.</p>
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
                    eCalc is an invaluable tool for theoretical modeling of electric propulsion systems, but its predictions are only as good as the data fed into it. Our real-world tests consistently showed a significant deviation from eCalc's models. This project was dedicated to analyzing the data from our custom thrust stand, comparing it against eCalc's predictions, and using the insights to refine our models. This iterative process of testing, analysis, and refinement was instrumental in optimizing our aircraft's performance and ultimately proving its superiority.
                    </p>
                </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl shadow-blue-500/10">
                <div className="flex items-center gap-x-4 mb-6">
                    <GitCompare className="w-8 h-8 text-blue-400"/>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-widest font-mono">Data Comparison</h3>
                </div>
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
                    <h4 className="font-bold text-white mb-4 text-center">Thrust-to-Weight Ratio</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-center">
                        <div>
                            <p className="text-sm text-slate-400 font-mono">ECALC PREDICTION</p>
                            <p className="text-6xl font-extrabold text-slate-400">1.04</p>
                            <p className="text-xs text-slate-500">Theoretical Maximum</p>
                        </div>
                        <div className="border-t-2 md:border-t-0 md:border-l-2 border-blue-400 pt-6 md:pt-0 md:pl-6">
                            <p className="text-sm text-blue-400 font-mono">VALIDATED PERFORMANCE</p>
                            <p className="text-6xl font-extrabold text-white">1.46</p>
                            <p className="text-xs text-slate-500">+40% Over Model</p>
                        </div>
                    </div>
                     <p className="text-xs text-slate-500 mt-6 pt-4 border-t border-white/10 text-center leading-tight ">
                        The validated thrust-to-weight ratio significantly outperformed the theoretical model, highlighting the real-world efficiency gains of our integrated system—a factor not fully captured by standard calculators.
                    </p>
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
                <li className="flex justify-between items-center"><span className="text-slate-500">Timeline:</span> <span className="font-medium text-slate-200 text-right">1 Week</span></li>
                <li className="flex justify-between items-center"><span className="text-slate-500">Status:</span> <span className="font-medium text-blue-400 text-right">Complete</span></li>
              </ul>
            </div>
             <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
                <div className="flex items-center gap-x-3 mb-4">
                    <Layers className="w-6 h-6 text-blue-400"/>
                    <h4 className="text-lg font-bold text-white">Technology Stack</h4>
                </div>
              <div className="flex flex-wrap gap-2">
                {['eCalc', 'Data Analysis', 'CSV', 'Microsoft Excel'].map(skill => (
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
