
import { Cpu, ShieldCheck, Clipboard } from 'lucide-react';

export const profileData = {
  name: "Yousif Nazhat",
  title: "IT & Security Specialist",
  tagline: "Bridging the gap between embedded hardware and secure data systems.",
  availableForHire: true,
  contact: {
    phone: "(973)-382-5159",
    email: "yousif.snazhat@gmail.com",
    linkedin: "http://www.linkedin.com/in/yousif-nazhat-526027296",
    github: "https://github.com/yousifnazhat"
  }
};

export const aboutData = {
  title: "About Me",
  description: "As Deputy Lead for the NASA and Lockheed Martin-sponsored Project Daedalus, I direct cross-functional teams in developing high-reliability avionics, achieving zero critical failures under peak loads. I am passionate about applying this rigorous, hardware-level discipline to the field of cybersecurity, seeking challenges where physical constraints meet digital security.",
  skills: [
    { icon: Cpu, label: "Embedded Systems" },
    { icon: ShieldCheck, label: "Cybersecurity" },
    { icon: Clipboard, label: "Data Analysis" }
  ],
  collaboration: {
    text: "Project Daedalus was developed with key sponsorship and support from Lockheed Martin and NASA.",
    partners: [
      { name: "Lockheed Martin", logo: "/lockheed-martin-logo.jpg" },
      { name: "NASA", logo: "/nasa.png" }
    ]
  }
};

export const educationData = [
  {
    school: "Rutgers University",
    degree: "B.S. Information Technology",
    minor: "Critical Intelligence",
    graduation: "Expected Jan 2027"
  }
];

export const skillsList = [
  'Java', 'C', 'Python', 'RISC-V', 'HTML/CSS', 'Wireshark', 'Nmap', 'GDB', 'Git', 'Linux'
];

export const organizationsData = [
  { name: "Phi Mu Delta Fraternity", role: "Alumni Chair" },
  { name: "RU Airborne", role: "Avionics Deputy Lead" },
  { name: "RU Cybersecurity Club", role: "Team Member" }
];

export const experienceData = [
  {
    title: "Design Team Deputy Lead",
    company: "RU Airborne, Avionics & Integration",
    period: "Jan 2025 - Present",
    details: [
      "Authored a detailed design report on propulsion performance and safety improvements.",
      "Led cross-functional system integration for the 'Daedalus' aircraft within a strict 5-week prototyping window.",
      "Optimized aircraft propulsion to achieve a 1.46 T/W ratio and projected 80 m/s cruise speed.",
      "Enhanced high-load system reliability, resulting in zero critical failures during 130A peak-current flight operations."
    ]
  }
];

export const softwareProjects = [
  {
    id: "risc-v-simulator",
    title: "RISC-V Simulator",
    description: "Cycle-accurate 5-stage pipeline with cache logic.",
    category: "Architecture",
    color: "purple",
    icon: "C",
    link: "/software/risc-v-simulator",
    longDescription: "Developed a cycle-accurate 5-stage pipeline and set-associative cache simulator, achieving 100% execution fidelity for the RISC-V ISA subset."
  },
  {
    id: "election-engine",
    title: "Election Engine",
    description: "Triply-Nested Linked List for O(1) voter traversal.",
    category: "Algorithms",
    color: "orange",
    icon: "J",
    link: "/software/election-engine",
    longDescription: "Architected a custom triply-nested linked list to efficiently query thousands of historical voter records without external databases."
  },
  {
    id: "unix-fs-emulator",
    title: "Unix FS Emulator",
    description: "Memory-resident N-ary tree filesystem.",
    category: "Systems",
    color: "blue",
    icon: "C",
    link: "/software/unix-fs-emulator",
    longDescription: "Memory-resident N-ary tree filesystem emulation."
  },
  {
    id: "128-bit-toolkit",
    title: "128-Bit Toolkit",
    description: "Low-level bitwise math for cryptography.",
    category: "Optimization",
    color: "red",
    icon: "C",
    link: "/software/128-bit-toolkit",
    longDescription: "Engineered low-level bitwise algorithms to enable high-precision cryptography-grade computation beyond standard 64-bit hardware limits."
  },
  {
    id: "symbiote-host-compatibility-tree",
    title: "Symbiote Tree",
    description: "N-ary tree for symbiote-host compatibility.",
    category: "Data Structures",
    color: "green",
    icon: "J",
    link: "/software/symbiote-host-compatibility-tree",
    longDescription: "N-ary tree implementation for tracking biological compatibility data."
  },
  {
    id: "honeypot-lab",
    title: "Honeypot Lab",
    description: "SSH honeypot with ELK SIEM monitoring.",
    category: "Cybersecurity",
    color: "cyan",
    icon: "🛡",
    link: "/software/honeypot-lab",
    longDescription: "Deployed a multi-VM security lab with Cowrie SSH honeypot and ELK Stack SIEM, capturing 500+ credential attempts per simulation run."
  }
];

export const coreStack = ["C/C++", "ARDUINO", "RISC-V", "JAVA", "NEXT.JS", "COWRIE", "ELK STACK", "SYSTEMS INTEGRATION"];
