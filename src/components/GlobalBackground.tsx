import { motion } from 'framer-motion';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* Dynamic Ambient Nebulas */}
      <motion.div 
        animate={{ 
          x: ["0vw", "10vw", "-5vw", "0vw"], 
          y: ["0vh", "-10vh", "10vh", "0vh"],
          scale: [1, 1.2, 0.9, 1] 
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-voltix-accent/5 rounded-full blur-[120px] mix-blend-screen hardware-accelerated"
      />
      
      <motion.div 
        animate={{ 
          x: ["0vw", "-15vw", "10vw", "0vw"], 
          y: ["0vh", "15vh", "-10vh", "0vh"],
          scale: [1, 1.5, 0.8, 1] 
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-voltix-accent-dark/10 rounded-full blur-[150px] mix-blend-screen hardware-accelerated"
      />

      <motion.div 
        animate={{ 
          x: ["-10vw", "10vw", "-5vw", "-10vw"], 
          y: ["10vh", "-15vh", "5vh", "10vh"],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px] mix-blend-screen hardware-accelerated"
      />

      {/* Hexagonal Tech Grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg width="100%" height="100%" className="opacity-70">
          <defs>
            <pattern id="hex-bg-pattern" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
              <path d="M30 0L60 17.32V51.96L30 69.28L0 51.96V17.32L30 0Z" fill="none" stroke="#5DD62C" strokeWidth="0.5"/>
              <path d="M30 103.92L60 86.602V51.96" fill="none" stroke="#5DD62C" strokeWidth="0.5"/>
              <path d="M30 103.92L0 86.602V51.96" fill="none" stroke="#5DD62C" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-bg-pattern)" />
        </svg>
      </div>

      {/* Radial fade to make center content pop more and edges darker */}
      <div className="absolute inset-0 bg-voltix-base [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_0%,black_100%)] opacity-90" />
      
      {/* Subtle Scanlines overlay (hardware accelerated pattern) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] pointer-events-none" />

    </div>
  );
}
