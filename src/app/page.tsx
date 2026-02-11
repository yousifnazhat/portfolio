'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumeModal from '../components/ResumeModal';
import AboutMe from '../components/AboutMe';
import { ArrowRight } from 'lucide-react';
import { softwareProjects, coreStack, profileData } from '../data/portfolioData';

const colorMap = {
  purple: {
    shadow: "hover:shadow-purple-500/10",
    bg: "bg-purple-500/20",
    text: "text-purple-400",
  },
  orange: {
    shadow: "hover:shadow-orange-500/10",
    bg: "bg-orange-500/20",
    text: "text-orange-400",
  },
  blue: {
    shadow: "hover:shadow-blue-500/10",
    bg: "bg-blue-500/20",
    text: "text-blue-400",
  },
  red: {
    shadow: "hover:shadow-red-500/10",
    bg: "bg-red-500/20",
    text: "text-red-400",
  },
  green: {
    shadow: "hover:shadow-green-500/10",
    bg: "bg-green-500/20",
    text: "text-green-400",
  },
  cyan: {
    shadow: "hover:shadow-cyan-500/10",
    bg: "bg-cyan-500/20",
    text: "text-cyan-400",
  },
};

export default function Portfolio() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const handleScroll = () => {
    const sections = document.querySelectorAll('[data-section]');
    const newVisibleSections = new Set<string>();

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        newVisibleSections.add(section.id);
      }
    });

    setVisibleSections(newVisibleSections);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">

      {/* --- MASTER GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-4">

        {/* --- CARD 1: HERO INTRO (Spans 2 cols, 2 rows) --- */}
        <div id="hero" data-section className={`md:col-span-2 md:row-span-2 bg-slate-900 rounded-3xl p-8 border border-white/10 flex flex-col justify-between transform transition-all duration-700 ease-in-out ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 group`}>
          <div>
            {profileData.availableForHire && (
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono mb-4 border border-blue-500/20">
                AVAILABLE FOR HIRE
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              {profileData.name.split(' ')[0]} <br /> <span className="text-slate-500">{profileData.name.split(' ')[1]}.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-md">
              {profileData.tagline}
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            {/* BUTTON 1: DOWNLOAD RESUME */}
            <a
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-bold rounded-full transition-all duration-300 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-500/30 text-center"
            >
              Download Resume
            </a>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-6 py-2 bg-blue-500/10 text-blue-400 font-bold rounded-full transition-all duration-300 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 text-center border border-blue-500/20"
            >
              Interactive Resume
            </button>
          </div>
        </div>

        {/* --- CARD 2: PROFILE PHOTO (Spans 2 cols, 2 rows) --- */}
        <Link href="/project-daedalus" id="project-daedalus-hero" data-section className={`md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden border border-white/10 group h-auto md:h-auto transition-all duration-700 ease-in-out ${isVisible('project-daedalus-hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <img
            src="/hero-plane.jpg"
            alt="Yousif with Plane"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
            <p className="text-white font-bold text-xl">Project Daedalus</p>
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <span>Lead Avionics Integration</span>
              <ArrowRight size={16} className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        <div id="about" data-section className={`transition-all duration-700 ease-in-out ${isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} md:col-span-4`}>
          <AboutMe />
        </div>

        {/* --- CARD 3: TECH STACK TICKER (Spans full width 4 cols) --- */}
        <div id="stack" data-section className={`md:col-span-4 bg-slate-900 rounded-3xl p-6 border border-white/10 flex items-center justify-between gap-4 overflow-hidden transform transition-all duration-700 ease-in-out ${isVisible('stack') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:-translate-y-2 hover:shadow-lg hover:shadow-slate-500/10`}>
          <p className="text-slate-500 text-sm font-mono whitespace-nowrap">CORE STACK</p>
          <div className="h-px bg-white/10 flex-1"></div>
          <div className="flex gap-6 text-slate-300 font-mono text-sm font-bold opacity-70 overflow-x-auto no-scrollbar mask-gradient">
            {coreStack.map((tech) => (
              <span key={tech} className="whitespace-nowrap">{tech}</span>
            ))}
          </div>
        </div>

        {/* --- INTERACTIVE IMAGES BUBBLE --- */}
        <div id="interactive-bubble" data-section className={`md:col-span-4 mt-8 transition-all duration-700 ease-in-out ${isVisible('interactive-bubble') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-full p-4 flex items-center justify-center gap-4 text-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse shrink-0"></div>
            <p className="text-blue-300 text-sm font-mono">
              Heads up! The images above AND below are interactive. Click them to dive deeper.
            </p>
          </div>
        </div>

        {/* --- CARD 4: DAEDALUS DEEP DIVE (Spans 4 cols) --- */}
        <div id="data-loop" data-section className={`md:col-span-4 bg-slate-900 rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row gap-8 transform transition-all duration-700 ease-in-out ${isVisible('data-loop') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:-translate-y-2 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10`}>
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <h2 className="text-2xl font-bold text-white">Engineering The Data Loop</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Simulation is needed but additionally, I built a custom <strong>Arduino + Load Cell</strong> rig to capture real-world thrust metrics, proving our eCalc models were underestimating performance by 40%.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                <p className="text-slate-500 text-xs font-mono uppercase mb-1">Theoretical T/W</p>
                <p className="text-2xl font-bold text-slate-300">0.89</p>
              </div>
              <div className="bg-green-500/10 p-4 rounded-2xl border border-green-500/20">
                <p className="text-green-400 text-xs font-mono uppercase mb-1">Validated T/W</p>
                <p className="text-2xl font-bold text-green-400">1.46</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-4">
            {/* SMALL IMAGES ON THE RIGHT */}
            <Link href="/arduino-logic" className="group relative">
              <img src="/arduino-logic.jpg" className="rounded-2xl border border-white/10 object-cover h-64 w-full group-hover:border-green-500/50 transition-colors" alt="Arduino Logic" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <p className="text-white font-bold text-lg">Arduino Logic</p>
                <p className="text-slate-300 text-sm">Real-time data acquisition from the load cell.</p>
              </div>
            </Link>
            <Link href="/thrust-stand" className="group relative">
              <img src="/thrust-stand.jpg" className="rounded-2xl border border-white/10 object-cover h-64 w-full group-hover:border-green-500/50 transition-colors" alt="Thrust Stand" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <p className="text-white font-bold text-lg">Thrust Stand</p>
                <p className="text-slate-300 text-sm">The physical test rig for validating motor performance.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* --- CARD 5: ECALC DATA (Spans 4 cols) --- */}
        <div id="ecalc" data-section className={`md:col-span-4 bg-slate-900 rounded-3xl p-4 border border-white/10 flex flex-col gap-4 transform transition-all duration-700 ease-in-out ${isVisible('ecalc') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-yellow-500">SIMULATION DATA</span>
            <span className="text-xs text-slate-500">eCalc v1</span>
          </div>
          <Link href="/ecalc-data" className="group relative">
            <div className="relative rounded-xl overflow-hidden h-96">
              <img src="/ecalc-data.jpg" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="eCalc Data" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <p className="text-white font-bold text-2xl">eCalc Simulation</p>
                <p className="text-slate-300">Initial modelling of motor and propeller configurations.</p>
              </div>
            </div>
          </Link>
          <p className="text-xs text-slate-500 leading-tight">
            Initial modelling of Config 1 vs Config 2 before physical validation.
          </p>
        </div>

        {/* --- SOFTWARE PROJECTS HEADER --- */}
        <div id="software" data-section className={`md:col-span-4 mt-8 mb-4 flex items-center gap-4 transition-all duration-700 ease-in-out ${isVisible('software') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-2xl font-bold text-white">Software Engineering</h3>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {/* --- SOFTWARE PROJECT CARDS --- */}
        {softwareProjects.map(project => {
          const color = colorMap[project.color as keyof typeof colorMap];
          return (
            <Link href={project.link} key={project.id} id={project.id} data-section className={`md:col-span-1 bg-neutral-900 rounded-3xl p-6 border border-white/10 transform transition-all duration-700 ease-in-out ${isVisible(project.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} hover:-translate-y-2 hover:bg-neutral-800 hover:shadow-lg ${color.shadow} group block`}>
              <div className={`w-10 h-10 rounded-full ${color.bg} ${color.text} flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform`}>{project.icon}</div>
              <h4 className="font-bold text-white mb-2">{project.title}</h4>
              <p className="text-sm text-slate-400 mb-4">{project.description}</p>
              <span className={`text-xs font-mono ${color.text}`}>{project.category}</span>
            </Link>
          )
        })}

        {/* --- FOOTER --- */}
        <div id="footer" data-section className={`md:col-span-4 mt-10 text-center text-slate-600 text-sm font-mono transition-all duration-700 ease-in-out ${isVisible('footer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          &copy; 2025 Yousif Nazhat.
        </div>

      </div>

      {isResumeModalOpen && <ResumeModal onClose={() => setIsResumeModalOpen(false)} />}
    </div>
  );
}
