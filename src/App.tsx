import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import GlobalBackground from './components/GlobalBackground';

// Pages
import Home from './pages/Home';
import Collections from './pages/Collections';
import Peripherals from './pages/Peripherals';
import Technology from './pages/Technology';
import Studio from './pages/Studio';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const location = useLocation();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // ULTRA-FAST physics for the core dot (almost immediate response)
  const dotConfig = { damping: 50, stiffness: 2000, mass: 0.05 };
  const smoothX = useSpring(cursorX, dotConfig);
  const smoothY = useSpring(cursorY, dotConfig);

  // Fast but slightly trailing physics for the outer ring
  const ringConfig = { damping: 40, stiffness: 800, mass: 0.1 };
  const ringX = useSpring(cursorX, ringConfig);
  const ringY = useSpring(cursorY, ringConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsPointer(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"], .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-voltix-base min-h-screen text-voltix-text font-sans selection:bg-voltix-accent selection:text-voltix-base overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <GlobalBackground />

      {isPointer && (
        <>
          {/* Core Cursor Dot - The exact pointer location */}
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-voltix-accent rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_10px_#5DD62C] will-change-transform"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 0 : 1
            }}
          />
          
          {/* Advanced Tactical HUD Reticle */}
          <motion.div
            className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[99] will-change-transform flex items-center justify-center mix-blend-screen"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* Spinning crosshair ring */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 15, ease: "linear", repeat: Infinity }}
               className="absolute inset-0 flex items-center justify-center transition-all duration-300"
               style={{
                 scale: isHovering ? 1.3 : 1,
                 opacity: isHovering ? 1 : 0.5,
               }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="23.5" stroke="#5DD62C" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.7"/>
                <path d="M24 0 V 4" stroke="#5DD62C" strokeWidth="1.5" />
                <path d="M24 48 V 44" stroke="#5DD62C" strokeWidth="1.5" />
                <path d="M0 24 H 4" stroke="#5DD62C" strokeWidth="1.5" />
                <path d="M48 24 H 44" stroke="#5DD62C" strokeWidth="1.5" />
              </svg>
            </motion.div>
            
            {/* Inner responsive reticle that collapses on hover representing "Lock On" */}
            <motion.div 
               className="absolute w-6 h-6 border-[0.5px] border-voltix-accent rounded-full transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
               style={{
                 scale: isHovering ? 0.3 : 1,
                 opacity: isHovering ? 1 : 0.2,
                 backgroundColor: isHovering ? 'rgba(93, 214, 44, 0.4)' : 'transparent',
               }}
            />
          </motion.div>

          {/* Ambient Mouse Tracking Light (Optimized) */}
          <motion.div 
            className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] bg-voltix-accent/5 rounded-full blur-[100px] z-[1] will-change-transform"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        </>
      )}
      
      <div className="noise-overlay hardware-accelerated" />

      <Navbar />
      
      <main className="relative z-10 w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/peripherals" element={<Peripherals />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/studio" element={<Studio />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
