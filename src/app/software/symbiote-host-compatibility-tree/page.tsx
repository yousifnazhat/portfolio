'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-green-500/30">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">Symbiote Host Compatibility Tree</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A specialized data structure for efficiently tracking and querying compatibility between symbiotic organisms and potential hosts.
          </p>
        </header>

        {/* GitHub Link */}
        <a href="https://github.com/yousifnazhat/symbiote-host-compatibility-tree" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 text-white font-bold rounded-full transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30 mb-12">
            <Github size={20}/>
            <span>View on GitHub</span>
        </a>

        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Project Diagram</h2>
            <div className="flex justify-center">
                <img src="/symbiote-bst-diagram.svg" alt="Symbiote Host Compatibility Tree" className="rounded-xl bg-white p-4" />
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 leading-loose">
          <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
          <p>
            The Symbiote Host Compatibility Tree is a Java-based project that implements a novel N-ary tree data structure. This structure is designed to model the complex relationships between symbiotes and their potential hosts. By representing compatibility as a hierarchical tree, the project provides an efficient way to perform queries and analysis on this data.
          </p>
          
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
          <ul>
            <li><strong className="text-green-400">N-ary Tree Implementation:</strong> A custom Java implementation of an N-ary tree to represent the symbiote-host relationships.</li>
            <li><strong className="text-green-400">Efficient Search:</strong> Optimized algorithms for searching and traversing the tree to find compatible hosts.</li>
            <li><strong className="text-green-400">Data-driven Approach:</strong> The project is designed to be easily adaptable to different datasets of symbiotes and hosts.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Technical Details</h3>
          <p>
            The core of the project is the `SymbioteTree` class, which manages the nodes of the tree. Each node represents either a symbiote or a host, and the parent-child relationships indicate compatibility. The tree is built from a data file that specifies the connections between the different entities.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Page;
