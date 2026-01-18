
import React from 'react';

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center font-sans p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-blue-500/30 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 text-slate-300 shadow-2xl shadow-blue-500/10 relative transform transition-all duration-300 scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* --- CLOSE BUTTON --- */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center transition-colors"
        >
          &times;
        </button>

        {/* --- HEADER --- */}
        <div className="text-center mb-10 border-b border-white/10 pb-8">
          <h1 className="text-5xl font-bold text-white">Yousif Nazhat</h1>
          <p className="text-slate-400 mt-2">IT & Security Specialist</p>
          <div className="flex justify-center gap-6 text-sm text-blue-400 mt-4 font-mono">
            <span>(973)-382-5159</span>
            <span>yousif.snazhat@gmail.com</span>
            <a href="http://www.linkedin.com/in/yousif-nazhat-526027296" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* --- LEFT COLUMN --- */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Education</h2>
              <h3 className="font-bold text-slate-200">Rutgers University</h3>
              <p className="text-sm text-slate-400">B.S. Information Technology</p>
              <p className="text-sm text-slate-500">Minor: Critical Intelligence</p>
              <p className="text-xs text-slate-500 mt-1">Expected Jan 2027</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['Java', 'C', 'Python', 'RISC-V', 'HTML/CSS', 'Wireshark', 'Nmap', 'GDB', 'Git', 'Linux'].map(skill => (
                  <span key={skill} className="bg-slate-800 text-slate-300 text-xs font-mono px-3 py-1 rounded-full border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Organizations</h2>
              <ul className="space-y-4 text-sm">
                <li>
                  <p className="font-bold text-slate-300">Phi Mu Delta Fraternity</p>
                  <p className="text-slate-500">Alumni Chair</p>
                </li>
                <li>
                  <p className="font-bold text-slate-300">RU Airborne</p>
                  <p className="text-slate-500">Avionics Deputy Lead</p>
                </li>
                 <li>
                  <p className="font-bold text-slate-300">RU Cybersecurity Club</p>
                  <p className="text-slate-500">Team Member</p>
                </li>
              </ul>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Professional Experience</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-200 text-lg">Design Team Deputy Lead</h3>
                  <p className="text-sm text-slate-500 mb-2">RU Airborne, Avionics & Integration | Jan 2025 - Present</p>
                  <ul className="list-disc list-outside pl-5 space-y-2 text-slate-400 text-sm leading-relaxed">
                    <li>Authored a detailed design report on propulsion performance and safety improvements.</li>
                    <li>Led cross-functional system integration for the "Daedalus" aircraft within a strict 5-week prototyping window.</li>
                    <li>Optimized aircraft propulsion to achieve a 1.46 T/W ratio and projected 80 m/s cruise speed.</li>
                    <li>Enhanced high-load system reliability, resulting in zero critical failures during 130A peak-current flight operations.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Projects</h2>
              <div className="space-y-4 text-sm">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
                  <h3 className="font-bold text-slate-200">RISC-V ISA Simulator</h3>
                  <p className="text-slate-400">Developed a cycle-accurate 5-stage pipeline and set-associative cache simulator, achieving 100% execution fidelity for the RISC-V ISA subset.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
                  <h3 className="font-bold text-slate-200">Election Data Analysis Tool (Java)</h3>
                  <p className="text-slate-400">Architected a custom triply-nested linked list to efficiently query thousands of historical voter records without external databases.</p>
                </div>
                 <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
                  <h3 className="font-bold text-slate-200">128-bit Arithmetic Toolkit (C)</h3>
                  <p className="text-slate-400">Engineered low-level bitwise algorithms to enable high-precision cryptography-grade computation beyond standard 64-bit hardware limits.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
