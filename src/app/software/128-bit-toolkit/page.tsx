'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-red-500/30">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">128-Bit Arithmetic Toolkit</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A low-level C library for performing bitwise arithmetic operations on 128-bit integers, optimized for cryptographic applications.
          </p>
        </header>

        {/* GitHub Link */}
        <a href="https://github.com/yousifnazhat/128-bit-arithmetic-toolkit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 text-white font-bold rounded-full transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 mb-12">
            <Github size={20}/>
            <span>View on GitHub</span>
        </a>

        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Project Diagram</h2>
            <div className="flex justify-center">
                <img src="/128-bit-arithmetic-diagram.svg" alt="128-Bit Arithmetic Operations" className="rounded-xl bg-white p-4" />
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 leading-loose">
          <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
          <p>
            The 128-Bit Arithmetic Toolkit is a C library that provides a set of functions for performing low-level bitwise math on 128-bit integers. It is designed to be highly efficient and is particularly well-suited for cryptographic applications where performance is critical.
          </p>
          
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
          <ul>
            <li><strong className="text-red-400">Optimized for Performance:</strong> The library is written in C and is highly optimized for speed.</li>
            <li><strong className="text-red-400">Wide Range of Operations:</strong> The library provides a comprehensive set of bitwise arithmetic operations, including addition, subtraction, multiplication, and division.</li>
            <li><strong className="text-red-400">Cryptographic Applications:</strong> The library is ideal for use in cryptographic applications that require high-performance 128-bit arithmetic.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Technical Details</h3>
          <p>
            The library represents 128-bit integers as an array of four 32-bit integers. The arithmetic operations are implemented using a combination of bitwise operations and carry propagation. The library is designed to be highly portable and can be easily integrated into any C project.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Page;
