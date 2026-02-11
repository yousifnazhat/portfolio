'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Github, Shield, Server, Terminal, BarChart3 } from 'lucide-react';

const Page = () => {
    return (
        <div className="min-h-screen bg-black text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8">
                    <ArrowLeft size={16} />
                    <span>Back to Portfolio</span>
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-2xl">
                            🛡
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Cybersecurity</span>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Virtual Honeypot Security Monitoring Lab</h1>
                        </div>
                    </div>
                    <p className="text-lg text-slate-400 leading-relaxed mt-4">
                        A virtualized cybersecurity lab that captures, logs, and analyzes real-world attack behavior using honeypot systems and SIEM monitoring tools.
                    </p>
                </header>

                {/* GitHub Link */}
                <a href="https://github.com/yousifnazhat/honeypot-security-lab" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 text-white font-bold rounded-full transition-all duration-300 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 mb-12">
                    <Github size={20} />
                    <span>View on GitHub</span>
                </a>

                {/* Architecture Diagram */}
                <div className="bg-slate-900 rounded-3xl p-8 border border-white/10 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Server size={24} className="text-cyan-400" />
                        System Architecture
                    </h2>
                    <div className="flex justify-center">
                        <img src="/honeypot-lab-diagram.svg" alt="Honeypot Lab Architecture" className="rounded-xl bg-white p-4" />
                    </div>
                </div>

                {/* System Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900 rounded-2xl p-6 border border-red-500/20">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                            <Terminal size={20} className="text-red-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Kali Linux (Attacker)</h3>
                        <p className="text-slate-400 text-sm">Simulates real-world attack patterns using Nmap port scanning and Hydra brute-force tools against the honeypot.</p>
                        <p className="mt-3 text-xs font-mono text-red-400/80">IP: 10.0.0.20</p>
                    </div>
                    <div className="bg-slate-900 rounded-2xl p-6 border border-green-500/20">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                            <Shield size={20} className="text-green-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Cowrie Honeypot</h3>
                        <p className="text-slate-400 text-sm">Medium-interaction SSH/Telnet honeypot that captures credentials, logs shell commands, and emulates a fake filesystem.</p>
                        <p className="mt-3 text-xs font-mono text-green-400/80">IP: 10.0.0.10 • Ports: 2222, 2223</p>
                    </div>
                    <div className="bg-slate-900 rounded-2xl p-6 border border-blue-500/20">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                            <BarChart3 size={20} className="text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">ELK Stack (SIEM)</h3>
                        <p className="text-slate-400 text-sm">Elasticsearch, Logstash, and Kibana centralize log ingestion, indexing, and dashboard visualization of attack data.</p>
                        <p className="mt-3 text-xs font-mono text-blue-400/80">IP: 10.0.0.30 • Kibana: :5601</p>
                    </div>
                </div>

                {/* Implementation Details */}
                <div className="prose prose-invert max-w-none text-slate-300 leading-loose">
                    <h2 className="text-3xl font-bold text-white mb-6">About The Project</h2>
                    <p>
                        This project deploys a multi-VM security environment simulating an enterprise network using VirtualBox. SSH honeypot services collect intrusion attempts, and attack traffic is analyzed through centralized logging dashboards to identify attacker behavior patterns.
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-8 mb-4">Implementation Steps</h3>
                    <ol className="space-y-3">
                        <li><strong className="text-cyan-400">VM Provisioning:</strong> Created three VirtualBox VMs (Kali, Ubuntu Server, ELK) connected via an isolated internal-only network (10.0.0.0/24).</li>
                        <li><strong className="text-cyan-400">Honeypot Deployment:</strong> Installed Cowrie SSH honeypot on the Ubuntu VM with iptables port forwarding (22 → 2222) and JSON-formatted logging.</li>
                        <li><strong className="text-cyan-400">SIEM Setup:</strong> Deployed the ELK Stack (Elasticsearch + Logstash + Kibana) with a custom Logstash pipeline for Cowrie log ingestion and GeoIP enrichment.</li>
                        <li><strong className="text-cyan-400">Attack Simulation:</strong> Executed controlled reconnaissance (Nmap), brute-force (Hydra), and post-auth simulation scripts from the Kali VM.</li>
                        <li><strong className="text-cyan-400">Analysis & Visualization:</strong> Built Kibana dashboards showing login timelines, top attacker IPs, most-attempted credentials, and event distributions.</li>
                    </ol>

                    <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/10">
                            <p className="text-3xl font-bold text-cyan-400">500+</p>
                            <p className="text-sm text-slate-400">Credential attempts captured per run</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/10">
                            <p className="text-3xl font-bold text-cyan-400">150+</p>
                            <p className="text-sm text-slate-400">Unique passwords attempted</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/10">
                            <p className="text-3xl font-bold text-cyan-400">100%</p>
                            <p className="text-sm text-slate-400">Nmap scan detection rate</p>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-cyan-500/10">
                            <p className="text-3xl font-bold text-cyan-400">&lt; 30s</p>
                            <p className="text-sm text-slate-400">Avg. time to first attack</p>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Observations</h3>
                    <ul>
                        <li><strong className="text-cyan-400">Password Patterns:</strong> Attackers primarily use dictionary-based attacks, with <code>123456</code>, <code>password</code>, <code>admin</code>, and <code>root</code> being the most attempted credentials.</li>
                        <li><strong className="text-cyan-400">Brute-Force Behavior:</strong> Automated tools follow predictable timing patterns with rapid sequential attempts.</li>
                        <li><strong className="text-cyan-400">Scanning Fingerprints:</strong> Nmap SYN scans and service version detection are clearly identifiable in Cowrie logs.</li>
                        <li><strong className="text-cyan-400">Session Behavior:</strong> Post-authentication, attackers attempt common commands (<code>uname -a</code>, <code>cat /etc/passwd</code>, <code>wget</code>).</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tools & Technologies</h3>
                    <div className="not-prose flex flex-wrap gap-2 mb-8">
                        {['VirtualBox', 'Ubuntu 22.04', 'Kali Linux', 'Cowrie', 'Elasticsearch', 'Logstash', 'Kibana', 'Nmap', 'Hydra', 'Bash', 'JSON'].map((tool) => (
                            <span key={tool} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20">
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;
