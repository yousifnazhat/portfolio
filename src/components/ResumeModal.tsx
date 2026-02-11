
import React from 'react';
import {
  profileData,
  educationData,
  skillsList,
  organizationsData,
  experienceData,
  softwareProjects
} from '../data/portfolioData';

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
          <h1 className="text-5xl font-bold text-white">{profileData.name}</h1>
          <p className="text-slate-400 mt-2">{profileData.title}</p>
          <div className="flex justify-center gap-6 text-sm text-blue-400 mt-4 font-mono">
            <span>{profileData.contact.phone}</span>
            <a href={`mailto:${profileData.contact.email}`} className="hover:text-white transition-colors">{profileData.contact.email}</a>
            <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* --- LEFT COLUMN --- */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Education</h2>
              {educationData.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-bold text-slate-200">{edu.school}</h3>
                  <p className="text-sm text-slate-400">{edu.degree}</p>
                  {edu.minor && <p className="text-sm text-slate-500">Minor: {edu.minor}</p>}
                  <p className="text-xs text-slate-500 mt-1">{edu.graduation}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skillsList.map(skill => (
                  <span key={skill} className="bg-slate-800 text-slate-300 text-xs font-mono px-3 py-1 rounded-full border border-white/10 hover:bg-slate-700 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Organizations</h2>
              <ul className="space-y-4 text-sm">
                {organizationsData.map((org, index) => (
                  <li key={index}>
                    <p className="font-bold text-slate-300">{org.name}</p>
                    <p className="text-slate-500">{org.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Professional Experience</h2>
              <div className="space-y-6">
                {experienceData.map((job, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-slate-200 text-lg">{job.title}</h3>
                    <p className="text-sm text-slate-500 mb-2">{job.company} | {job.period}</p>
                    <ul className="list-disc list-outside pl-5 space-y-2 text-slate-400 text-sm leading-relaxed">
                      {job.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-4 font-mono">Projects</h2>
              <div className="space-y-4 text-sm">
                {softwareProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="bg-slate-800/50 p-4 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
                    <h3 className="font-bold text-slate-200">{project.title}</h3>
                    <p className="text-slate-400">{project.longDescription || project.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
