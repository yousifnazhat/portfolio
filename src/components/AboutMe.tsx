import React from 'react';
import { Cpu, ShieldCheck, Clipboard } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="md:col-span-4 bg-slate-900 rounded-3xl p-8 border border-white/10 transform transition-transform duration-300 hover:-translate-y-2 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10">
      <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
      <p className="text-slate-400 leading-relaxed mb-4">
        As Deputy Lead for the NASA and Lockheed Martin-sponsored Project Daedalus, I direct cross-functional teams in developing high-reliability avionics, achieving zero critical failures under peak loads. I am passionate about applying this rigorous, hardware-level discipline to the field of cybersecurity, seeking challenges where physical constraints meet digital security
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-2 bg-teal-500/10 text-teal-400 text-xs font-mono px-2 py-1 rounded-full border border-teal-500/20">
          <Cpu size={14} />
          Embedded Systems
        </span>
        <span className="flex items-center gap-2 bg-teal-500/10 text-teal-400 text-xs font-mono px-2 py-1 rounded-full border border-teal-500/20">
          <ShieldCheck size={14} />
          Cybersecurity
        </span>
        <span className="flex items-center gap-2 bg-teal-500/10 text-teal-400 text-xs font-mono px-2 py-1 rounded-full border border-teal-500/20">
          <Clipboard size={14} />
          Data Analysis
        </span>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">In Collaboration With</h3>
        <p className="text-slate-400 text-sm mb-4">
          Project Daedalus was developed with key sponsorship and support from <strong className="font-semibold text-teal-400">Lockheed Martin</strong> and <strong className="font-semibold text-teal-400">NASA</strong>.
        </p>
        <div className="flex items-center gap-4">
          <img src="/lockheed-martin-logo.jpg" alt="Lockheed Martin" className="h-8" />
          <img src="/nasa.png" alt="NASA" className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
