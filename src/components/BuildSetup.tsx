import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight, Cpu, Monitor, Mouse, ShoppingCart } from 'lucide-react';

const options = {
  mice: [
    { id: 'm1', name: 'Apex Pro', spec: '16000 DPI / 42g', price: 149, img: 'https://wise-tech.com.pk/wp-content/uploads/2023/10/Razer-Viper-V2-Pro-HyperSpeed-Wireless-Gaming-Mouse-1.png' },
    { id: 'm2', name: 'Ghost V3', spec: '12000 DPI / 50g', price: 129, img: 'https://www.games2egypt.com/Images/Products/139714?fileFormat=2&v=639068682413730549&height=700' }
  ],
  keyboards: [
    { id: 'k1', name: 'Neon Trigger V2', spec: 'Optical / 0.1ms', price: 219, img: 'https://pwnage.com/cdn/shop/files/zb65_black_purple_02_002_rgb.png?v=1743087319&width=1600' },
    { id: 'k2', name: 'Stealth TKL', spec: 'Mechanical / Row G', price: 189, img: 'https://kfa2.com/wp-content/uploads/2024/12/dsc_0874_3.png' }
  ],
  monitors: [
    { id: 'mon1', name: 'Horizon Curve X', spec: '240Hz / 1ms / HDR', price: 899, img: 'https://images.philips.com/is/image/philipsconsumer/73a261e1952b4c169fa9b18501009dad?wid=700&hei=700&$pnglarge$' },
    { id: 'mon2', name: 'Flatline Pro 360Hz', spec: '360Hz / 0.5ms', price: 699, img: 'https://gameon.store/cdn/shop/files/GOA24FHD360IPS.png?v=1775234974&width=1200' }
  ]
};

export default function BuildSetup() {
  const [activeTab, setActiveTab] = useState<'monitors' | 'keyboards' | 'mice'>('monitors');
  const [selected, setSelected] = useState({
    mice: options.mice[0],
    keyboards: options.keyboards[0],
    monitors: options.monitors[0]
  });
  const [isAdding, setIsAdding] = useState(false);

  const totalPrice = selected.mice.price + selected.keyboards.price + selected.monitors.price;

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAddConfiguration = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  // Parallax offsets (Monitor moves least, Keyboard medium, Mouse moves most)
  const monitorX = useSpring(useTransform(mouseX, [-500, 500], [-8, 8]), { stiffness: 50, damping: 20 });
  const monitorY = useSpring(useTransform(mouseY, [-500, 500], [-8, 8]), { stiffness: 50, damping: 20 });
  
  const keyboardX = useSpring(useTransform(mouseX, [-500, 500], [-20, 20]), { stiffness: 50, damping: 20 });
  const keyboardY = useSpring(useTransform(mouseY, [-500, 500], [-20, 20]), { stiffness: 50, damping: 20 });

  const mouseItemX = useSpring(useTransform(mouseX, [-500, 500], [-35, 35]), { stiffness: 50, damping: 20 });
  const mouseItemY = useSpring(useTransform(mouseY, [-500, 500], [-35, 35]), { stiffness: 50, damping: 20 });

  return (
    <section className="py-32 bg-transparent relative overflow-hidden z-10 w-full">
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-left mb-16 flex flex-col md:flex-row md:items-end justify-between items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-white mb-2">
              Compile Your <span className="text-voltix-accent">Rig</span>
            </h2>
            <p className="font-sans text-voltix-text/50 font-light text-lg">
              Visualize your perfect aesthetic in 3D space.
            </p>
          </div>
          <div className="text-right bg-white/5 rounded-2xl p-6 backdrop-blur-md border border-white/5">
            <p className="font-sans text-sm font-medium text-voltix-text/40 mb-1">Estimated Output</p>
            <p className="font-sans text-3xl text-voltix-accent font-bold">${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Visualizer */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="interactive lg:col-span-8 glass-card border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center relative min-h-[600px] overflow-hidden"
          >
            {/* Ambient Background Glow behind items */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] bg-voltix-accent/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className="relative w-full max-w-3xl aspect-video flex-col flex items-center justify-center gap-8 mt-10 pointer-events-none">
              {/* Monitor */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selected.monitors.id}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4 }}
                  style={{ x: monitorX, y: monitorY }}
                  className="w-4/5 max-w-md absolute top-0 z-0"
                >
                  <img src={selected.monitors.img} alt={selected.monitors.name} className="w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]" referrerPolicy="no-referrer" />
                </motion.div>
              </AnimatePresence>

              {/* Desk Surface implied by layout */}
              <div className="flex gap-16 items-end mt-48 z-10 w-full justify-center">
                {/* Keyboard */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selected.keyboards.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{ x: keyboardX, y: keyboardY }}
                    className="w-72 relative"
                  >
                    <img src={selected.keyboards.img} alt={selected.keyboards.name} className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" referrerPolicy="no-referrer" />
                  </motion.div>
                </AnimatePresence>

                {/* Mouse */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selected.mice.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{ x: mouseItemX, y: mouseItemY }}
                    className="w-24 relative"
                  >
                    <img src={selected.mice.img} alt={selected.mice.name} className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]" referrerPolicy="no-referrer" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Soft Pill Tabs */}
            <div className="flex p-1.5 glass-pill w-full">
              {[
                { id: 'monitors', icon: Monitor, label: 'Display' },
                { id: 'keyboards', icon: Cpu, label: 'Board' },
                { id: 'mice', icon: Mouse, label: 'Mouse' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`interactive flex-1 py-3 px-4 flex flex-col items-center justify-center gap-2 text-xs font-medium rounded-full transition-all relative z-10 ${activeTab === tab.id ? 'text-voltix-base' : 'text-voltix-text/60 hover:text-white'}`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="activetabconfig" className="absolute inset-0 bg-voltix-accent rounded-full -z-10 shadow-[0_0_20px_rgba(93,214,44,0.3)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Options List */}
            <div className="flex-1 flex flex-col gap-3 mt-4">
              {options[activeTab].map((item) => {
                const isSelected = selected[activeTab].id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelected(prev => ({ ...prev, [activeTab]: item }))}
                    className={`interactive flex items-stretch text-left border rounded-2xl overflow-hidden transition-all duration-300 ${isSelected ? 'border-voltix-accent bg-voltix-accent/5 scale-[1.02]' : 'border-white/5 bg-[#141414]/90 hover:bg-[#1C1C1C]'}`}
                  >
                    <div className="w-24 bg-white/5 flex items-center justify-center p-3 border-r border-inherit">
                      <img src={item.img} alt={item.name} className="w-full object-contain mix-blend-luminosity opacity-80" referrerPolicy="no-referrer"/>
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center bg-transparent">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-display font-medium text-sm md:text-base text-white">{item.name}</h4>
                        <span className={`font-sans font-semibold text-sm ${isSelected ? 'text-voltix-accent' : 'text-voltix-text/50'}`}>${item.price}</span>
                      </div>
                      <p className="font-sans text-xs text-voltix-text/40">{item.spec}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <button 
              onClick={handleAddConfiguration}
              className={`interactive w-full py-4 rounded-2xl font-sans font-bold text-sm tracking-wide transition-colors flex justify-center items-center gap-3 mt-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${isAdding ? 'bg-voltix-accent text-voltix-base' : 'bg-white text-black hover:bg-voltix-accent hover:shadow-[0_10px_40px_rgba(93,214,44,0.3)]'}`}
            >
              {isAdding ? "Configuration Added ✓" : <><ShoppingCart className="w-4 h-4" /> Add Configuration</>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
