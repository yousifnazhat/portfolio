import React from 'react';
import { aboutData } from '../data/portfolioData';

const AboutMe = () => {
  return (
    <div className="md:col-span-4 bg-slate-900 rounded-3xl p-8 border border-white/10 transform transition-transform duration-300 hover:-translate-y-2 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10">
      <h2 className="text-2xl font-bold text-white mb-4">{aboutData.title}</h2>
      <p className="text-slate-400 leading-relaxed mb-4">
        {aboutData.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {aboutData.skills.map((skill, index) => (
          <span key={index} className="flex items-center gap-2 bg-teal-500/10 text-teal-400 text-xs font-mono px-2 py-1 rounded-full border border-teal-500/20 transition-colors hover:bg-teal-500/20">
            <skill.icon size={14} />
            {skill.label}
          </span>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-3">In Collaboration With</h3>
        <p className="text-slate-400 text-sm mb-4">
          {aboutData.collaboration.text}
          {/* Highlight logic could be added here if needed, keeping it simple for now */}
        </p>
        <div className="flex items-center gap-4">
          {aboutData.collaboration.partners.map((partner, index) => (
            <img key={index} src={partner.logo} alt={partner.name} className="h-8 opacity-80 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
