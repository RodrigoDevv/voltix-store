import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Plus, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Voltix Apex Pro',
    category: 'Gaming Mouse',
    price: '$149',
    stat: '16000 DPI Optical',
    image: 'https://wise-tech.com.pk/wp-content/uploads/2023/10/Razer-Viper-V2-Pro-HyperSpeed-Wireless-Gaming-Mouse-1.png',
    tags: ['PRO', 'WIRELESS']
  },
  {
    id: 2,
    name: 'Neon Trigger V2',
    category: 'Mechanical Keyboard',
    price: '$219',
    stat: 'Hall Effect Switches',
    image: 'https://ssjstoredz.com/cdn/shop/files/7188d4088716323d83e1147c9b55a690_2eab5bcd-0413-4c74-95d6-15da0128cc86__1___1_-removebg-preview.png?v=1776682477',
    tags: ['RGB', 'LOW LATENCY']
  },
  {
    id: 3,
    name: 'Horizon Curve X',
    category: 'Curved Monitor',
    price: '$899',
    stat: '360Hz Nano-IPS',
    image: 'https://i02.appmifile.com/841_item_sg/25/10/2024/252a6354a2a5c375b1d40c6ed6ca1d23.png',
    tags: ['PRO', 'G-SYNC']
  },
  {
    id: 4,
    name: 'Acoustic Pulse HS',
    category: 'Headset',
    price: '$179',
    stat: 'Spatial Audio 7.1',
    image: 'https://www.musicfactorydirect.com.au/assets/full/AHS-2.png?20250304141326',
    tags: ['WIRELESS', 'NOISE CANCELING']
  }
];

function TiltCard({ children, className, onClick }: { children: React.ReactNode, className: string, onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const background = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(93, 214, 44, 0.15) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <motion.div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative ${className}`}
      >
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none rounded-[24px]"
          style={{ background }}
        />
        {children}
      </motion.div>
    </div>
  );
}

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setAddedItems(prev => [...prev, productId]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== productId));
    }, 2000);
  };

  return (
    <section className="py-32 bg-transparent relative z-10 w-full">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-white mb-2">
              Featured <span className="text-voltix-accent">Arsenal</span>
            </h2>
            <p className="font-sans text-voltix-text/50 font-light text-lg">
              Precision tools designed for champions.
            </p>
          </div>
          <button 
            onClick={() => navigate('/collections')}
            className="interactive glass-pill px-6 py-3 text-sm font-medium text-voltix-text hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> View Full Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={product.id}
            >
              <TiltCard 
                onClick={() => navigate(`/collections?search=${product.name}`)}
                className="interactive glass-card group flex flex-col hover:border-voltix-accent/50 transition-colors duration-500 overflow-hidden cursor-pointer h-[480px]"
              >
                
                <div 
                  className="relative h-1/2 w-full flex items-center justify-center p-8 bg-gradient-to-b from-transparent to-black/20"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="absolute inset-0 bg-voltix-accent/0 group-hover:bg-voltix-accent/5 transition-colors duration-500 rounded-t-[24px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-voltix-accent opacity-0 group-hover:opacity-15 blur-[60px] transition-opacity duration-700 rounded-full" />
                  
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain product-image drop-shadow-2xl z-10 transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div 
                  className="flex-1 flex flex-col p-6 z-20"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display font-semibold text-xl leading-tight text-white group-hover:text-voltix-accent transition-colors">
                      {product.name}
                    </h3>
                    <span className="font-sans text-white/80 font-medium">{product.price}</span>
                  </div>
                  
                  <p className="text-voltix-text/50 font-sans text-sm mb-6 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-voltix-accent/80" />
                    {product.stat}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono font-medium bg-white/5 border border-white/10 rounded-full px-3 py-1 text-voltix-text/70 uppercase tracking-widest group-hover:border-voltix-accent/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30" style={{ transform: "translateZ(40px)" }}>
                  <button 
                    onClick={(e) => handleAddToCart(e, product.id.toString())}
                    className={`interactive w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(93,214,44,0.4)] transition-all ${addedItems.includes(product.id.toString()) ? 'bg-white text-voltix-base scale-110' : 'bg-voltix-accent text-voltix-base hover:bg-white hover:scale-110'}`}
                  >
                    {addedItems.includes(product.id.toString()) ? "✓" : <ShoppingCart className="w-5 h-5" />}
                  </button>
                </div>

              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
