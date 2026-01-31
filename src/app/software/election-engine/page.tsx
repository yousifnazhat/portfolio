'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Github } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-orange-500/30">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-8">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">Election Engine</h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A high-performance data structure for managing and analyzing election data with O(1) voter traversal.
          </p>
        </header>

        {/* GitHub Link */}
        <a href="https://github.com/yousifnazhat/election-data-analyzer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 text-white font-bold rounded-full transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 mb-12">
            <Github size={20}/>
            <span>View on GitHub</span>
        </a>

        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Project Diagram</h2>
            <div className="flex justify-center">
                <img src="/election-data-diagram.svg" alt="Election Engine Data Structure" className="rounded-xl bg-white p-4" />
            </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 leading-loose">
          <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
          <p>
            The Election Engine is a Java-based project that utilizes a triply-nested linked list to achieve constant time complexity for voter traversal. This innovative data-structure is designed to handle large datasets of election information, making it an ideal solution for applications that require rapid analysis and reporting of voting data.
          </p>
          
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
          <ul>
            <li><strong className="text-orange-400">Triply-Nested Linked List:</strong> A custom data structure that enables O(1) traversal of voters.</li>
            <li><strong className="text-orange-400">Efficient Data Management:</strong> Optimized for handling large volumes of election data.</li>
            <li><strong className="text-orange-400">Scalable Architecture:</strong> Designed to be adaptable to different election systems and data formats.</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Technical Details</h3>
          <p>
            The core of the project is the `ElectionData` class, which manages the triply-nested linked list. The first level of the list represents the different regions, the second level represents the polling stations within each region, and the third level represents the voters at each polling station. This structure allows for direct access to any voter in the dataset, resulting in a significant performance improvement over traditional data structures.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Page;
