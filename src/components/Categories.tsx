import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Gaming Mice',
    desc: 'Precision Tracking',
    image: 'https://i.pinimg.com/1200x/11/42/4f/11424fd7e70c8321f908ef4e1f1e8034.jpg',
    size: 'large',
    query: 'Mouse'
  },
  {
    name: 'Mechanical Keyboards',
    desc: 'Tactile Dominance',
    image: 'https://i.pinimg.com/236x/6a/26/87/6a26874301ac329d81b29e18e20cf955.jpg',
    size: 'small',
    query: 'Keyboard'
  },
  {
    name: 'Monitors',
    desc: 'Immersive Displays',
    image: 'https://i.pinimg.com/1200x/22/95/18/22951821c30ef2a0e6f7ba15ee4fc8b5.jpg',
    size: 'small',
    query: 'Monitor'
  },
  {
    name: 'Accessories',
    desc: 'Complete the Setup',
    image: 'https://i.pinimg.com/736x/41/c6/b3/41c6b3fdd03bd826e097a722fa6a52db.jpg',
    size: 'wide',
    query: 'Accessory'
  }
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-transparent relative z-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {categories.map((cat, i) => {
            let classes = '';
            if (cat.size === 'large') classes = 'md:col-span-2 md:row-span-2';
            else if (cat.size === 'wide') classes = 'md:col-span-2 md:row-span-1';
            else classes = 'md:col-span-1 md:row-span-1';

            return (
              <motion.div
                onClick={() => navigate(`/collections?search=${cat.query}`)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                key={cat.name}
                className={`group interactive relative overflow-hidden rounded-[32px] cursor-pointer ${classes}`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${cat.image})` }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Heavy Glass Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-voltix-base via-voltix-base/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-voltix-accent/0 group-hover:bg-voltix-accent/10 transition-colors duration-500 mix-blend-overlay" />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                  <div className="overflow-hidden mb-1">
                    <span className="block font-sans text-voltix-accent/90 text-sm font-medium tracking-wide translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {cat.desc}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pointer-events-none">
                    <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-white transition-all transform origin-left">
                      {cat.name}
                    </h3>
                    <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500 text-white">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
