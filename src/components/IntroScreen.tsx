import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Play } from 'lucide-react';

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Total wait time = 3.8s before triggering completion
    const timer = setTimeout(() => {
      onComplete();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-voltix-base text-voltix-text overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Play Icon / Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="mb-8"
        >
          <img 
            src="https://b.top4top.io/p_3763fywgt1.png" 
            alt="Voltix Logo"
            className="w-auto h-24 md:h-32 object-contain drop-shadow-[0_0_30px_rgba(93,214,44,0.3)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* System Initializing scanning line */}
        <motion.div 
           initial={{ width: 0, opacity: 0 }}
           animate={{ width: 240, opacity: 1 }}
           transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
           className="h-[1px] bg-voltix-accent shadow-[0_0_10px_#5DD62C] my-10 relative overflow-hidden"
        >
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{ duration: 1.5, delay: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-16 h-full bg-white blur-[2px]"
          />
        </motion.div>

        {/* "By Rodrigo" Signature Plaque */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="glass-pill px-6 py-2 bg-white/5 border border-white/10"
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-voltix-accent/80">
            System Engineered by <span className="text-white font-bold glow-text-accent">Rodrigo</span>
          </p>
        </motion.div>
      </div>

      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="noise-overlay opacity-40 hardware-accelerated" />
    </motion.div>
  );
}
