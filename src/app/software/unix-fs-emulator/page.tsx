'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">Unix FS Emulator</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A memory-resident N-ary tree filesystem emulator that mimics the behavior of a Unix-like filesystem.
          </p>
        </header>

        {/* GitHub Link */}
        <a href="https://github.com/yousifnazhat/filesystem-emulator" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 text-white font-bold rounded-full transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 mb-12">
            <Github size={20}/>
            <span>View on GitHub</span>
        </a>

        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Project Diagram</h2>
            <div className="flex justify-center">
                <img src="/filesystem-emulator-diagram.svg" alt="N-ary Tree Filesystem" className="rounded-xl bg-white p-4" />
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 leading-loose">
          <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
          <p>
            The Unix FS Emulator is a C-based project that implements a memory-resident filesystem using an N-ary tree. It provides a simplified model of a Unix-like filesystem, with support for common commands like `mkdir`, `ls`, `cd`, and `touch`.
          </p>
          
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
          <ul>
            <li><strong className="text-blue-400">Memory-Resident:</strong> The filesystem is stored entirely in memory, making it extremely fast.</li>
            <li><strong className="text-blue-400">N-ary Tree Implementation:</strong> The filesystem is implemented as an N-ary tree, which is a natural way to represent a hierarchical directory structure.</li>
            <li><strong className="text-blue-400">Unix-like Commands:</strong> The emulator supports a subset of common Unix filesystem commands.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Technical Details</h3>
          <p>
            The core of the project is the `FileSystem` class, which manages the N-ary tree. Each node in the tree represents a file or directory. The class provides methods for creating, deleting, and navigating the filesystem. The command-line interface is implemented in a separate module that parses user input and calls the appropriate `FileSystem` methods.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Page;
