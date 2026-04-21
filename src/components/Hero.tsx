import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

function MagneticButton({ children, className, onClick }: { children: ReactNode, className: string, onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3); 
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

const TacticalHUDBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center mix-blend-screen [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_40%,transparent_90%)]">
      
      {/* Tactical Crosshair Grid */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.2]">
        <defs>
          <pattern id="crosshair-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 35 V 45 M 35 40 H 45" stroke="#5DD62C" strokeWidth="1" opacity="0.8" />
            <circle cx="40" cy="40" r="1.5" fill="#337418" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crosshair-grid)" />
      </svg>

      {/* Rotating Optical Sensor Rings - CW */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute flex items-center justify-center opacity-40 hardware-accelerated will-change-transform"
      >
        <svg width="1400" height="1400" viewBox="0 0 1400 1400" fill="none">
          <circle cx="700" cy="700" r="300" stroke="#5DD62C" strokeWidth="1" strokeDasharray="4 12" opacity="0.6" />
          <circle cx="700" cy="700" r="450" stroke="#5DD62C" strokeWidth="2" strokeDasharray="100 40 10 40" />
          <circle cx="700" cy="700" r="600" stroke="#F8F8F8" strokeWidth="0.5" strokeDasharray="20 40" opacity="0.3" />
          <circle cx="700" cy="700" r="650" stroke="#337418" strokeWidth="4" strokeDasharray="2 18" opacity="0.8" />
        </svg>
      </motion.div>

      {/* Rotating Optical Sensor Rings - CCW */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute flex items-center justify-center opacity-30 hardware-accelerated will-change-transform"
      >
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" fill="none">
          <circle cx="800" cy="800" r="500" stroke="#337418" strokeWidth="1" strokeDasharray="10 30" />
          <circle cx="800" cy="800" r="750" stroke="#F8F8F8" strokeWidth="1" strokeDasharray="1 10" opacity="0.5" />
        </svg>
      </motion.div>

       {/* Vertical Scanning Beams */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-[#5DD62C] opacity-50 shadow-[0_0_15px_#5DD62C] hardware-accelerated will-change-transform"
        style={{ zIndex: 1 }}
      />
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 0.1 }}
        className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#5DD62C] to-transparent opacity-10 hardware-accelerated will-change-transform"
        style={{ zIndex: 0, marginTop: '-4rem' }}
      />
    </div>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const parallaxX1 = useSpring(useTransform(mouseX, [-1000, 1000], [40, -40]), { stiffness: 50, damping: 20 });
  const parallaxY1 = useSpring(useTransform(mouseY, [-1000, 1000], [40, -40]), { stiffness: 50, damping: 20 });
  
  const parallaxX2 = useSpring(useTransform(mouseX, [-1000, 1000], [-80, 80]), { stiffness: 50, damping: 20 });
  const parallaxY2 = useSpring(useTransform(mouseY, [-1000, 1000], [-80, 80]), { stiffness: 50, damping: 20 });

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center bg-transparent pt-20 overflow-hidden">
      
      {/* Animated Parallax Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Parallax Layer 1 - Close */}
        <motion.div style={{ x: parallaxX1, y: parallaxY1 }} className="absolute inset-0 hardware-accelerated will-change-transform">
          <motion.div 
            animate={{ scale: [1, 1.2, 0.8, 1], opacity: [0.15, 0.3, 0.15] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-voltix-accent/30 rounded-full blur-[100px] mix-blend-screen" 
          />
        </motion.div>

        {/* Parallax Layer 2 - Far */}
        <motion.div style={{ x: parallaxX2, y: parallaxY2 }} className="absolute inset-0 hardware-accelerated will-change-transform">
          <motion.div 
            animate={{ scale: [0.8, 1.2, 1, 0.8], opacity: [0.1, 0.25, 0.1] }} 
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-voltix-accent-dark/40 rounded-full blur-[120px] mix-blend-screen" 
          />
        </motion.div>

        {/* Tactical HUD Optical Interface Background */}
        <TacticalHUDBackground />
        
      </div>

      <div className="relative z-10 w-full px-6 flex flex-col items-center text-center max-w-[1200px] mx-auto mt-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="interactive glass-pill px-5 py-2 mb-8 flex items-center gap-3 backdrop-blur-md border border-voltix-accent/20 bg-voltix-accent/5 pointer-events-auto transition-colors focus:outline-none"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-voltix-accent"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-voltix-accent"></span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-voltix-accent font-medium mt-0.5">
            Discover Next Generation Gear
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-display font-medium text-5xl md:text-7xl lg:text-[100px] leading-[1.05] tracking-tight text-white max-w-4xl cursor-default"
        >
          Master Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-voltix-accent to-voltix-accent-dark glow-text-accent font-bold">Digital Reality</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-lg text-voltix-text/60 max-w-2xl font-sans font-light leading-relaxed cursor-default"
        >
          Experience untethered precision. Our hardware bridges the gap between thought and action with absolute zero-latency engineering and organic aesthetics.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 mt-12 items-center pointer-events-auto"
        >
          <MagneticButton 
            onClick={() => navigate('/collections')}
            className="interactive bg-voltix-accent text-voltix-base font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(93,214,44,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] relative"
          >
            Explore The Arsenal <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          
          <MagneticButton 
            onClick={() => navigate('/studio')}
            className="interactive glass-pill text-voltix-text font-medium text-sm px-8 py-4 hover:bg-white/10 transition-colors duration-300 flex items-center justify-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-voltix-accent transition-colors duration-300">
              <Play className="w-3 h-3 text-white ml-0.5" fill="currentColor"/>
            </div>
            Watch Showreel
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
