'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">RISC-V Pipeline Simulator</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A cycle-accurate 5-stage pipeline simulator for the RISC-V instruction set architecture.
          </p>
        </header>

        {/* GitHub Link */}
        <a href="https://github.com/yousifnazhat/riscv-pipeline-simulator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 text-white font-bold rounded-full transition-all duration-300 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30 mb-12">
            <Github size={20}/>
            <span>View on GitHub</span>
        </a>

        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Project Diagram</h2>
            <div className="flex justify-center">
                <img src="/riscv-pipeline-diagram.svg" alt="RISC-V 5-Stage Pipeline" className="rounded-xl bg-white p-4" />
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 leading-loose">
          <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
          <p>
            The RISC-V Pipeline Simulator is a C-based project that provides a cycle-accurate simulation of a 5-stage instruction pipeline for the RISC-V architecture. It includes logic for cache simulation, allowing for a detailed analysis of the performance of different cache configurations.
          </p>
          
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
          <ul>
            <li><strong className="text-purple-400">Cycle-Accurate Simulation:</strong> The simulator accurately models the behavior of the pipeline on a cycle-by-cycle basis.</li>
            <li><strong className="text-purple-400">5-Stage Pipeline:</strong> The simulator implements the five classic stages of a RISC pipeline: Fetch, Decode, Execute, Memory, and Writeback.</li>
            <li><strong className="text-purple-400">Cache Simulation:</strong> The simulator includes a configurable cache simulator to study the impact of cache performance on the pipeline.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Technical Details</h3>
          <p>
            The simulator is written in C and is designed to be highly modular and extensible. The pipeline stages are implemented as separate modules, making it easy to modify and experiment with different pipeline configurations. The cache simulator is also a separate module that can be easily replaced with a different cache implementation.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Page;
