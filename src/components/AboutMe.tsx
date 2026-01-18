import React from 'react';
import { Cpu, ShieldCheck, Clipboard } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="md:col-span-4 bg-slate-900 rounded-3xl p-8 border border-white/10 transform transition-transform duration-300 hover:-translate-y-2 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10">
      <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
      <p className="text-slate-400 leading-relaxed mb-4">
        As a student and a leader, I am passionate about the intersection of hardware and security. I have taken on leadership roles in several projects, guiding teams to create secure and efficient systems. My focus is on embedded systems and cybersecurity, and I am always looking for new challenges. I also have a shi tzu puppy which I love.
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
    </div>
  );
};

export default AboutMe;
