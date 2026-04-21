import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const drops = [
  {
    id: 'd1',
    name: 'Apex Pro - Ghost Edition',
    status: 'SOLD OUT',
    available: '0/500 units',
    image: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F09%2Fsteelseries-limited-edition-ghost-collection-gaming-mouse-keyboard-tw.jpg?w=960&cbr=1&q=90&fit=max',
    theme: 'silver'
  },
  {
    id: 'd2',
    name: 'Neon Trigger V2 - Cyber',
    status: 'DROPPING IN: 48:00:00',
    available: 'Limited Run: 1000',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQajW8uMd71zE0osd21IYBxvVEskzPuekH3rw&s',
    theme: 'neon' // for styling
  }
]

export default function LimitedDrops() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-transparent relative z-10 w-full">
      <div className="max-w-[1400px] mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
           <div>
             <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-white mb-2">
               The <span className="text-voltix-accent">Foundry</span>
             </h2>
             <p className="font-sans text-voltix-text/50 font-light text-lg">
               Extremely limited production runs. Once they are gone, they are archived forever.
             </p>
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {drops.map((drop, i) => (
               <motion.div 
                 key={drop.id}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 className={`group interactive glass-card rounded-[32px] overflow-hidden flex flex-col min-h-[500px] relative border ${drop.theme === 'neon' ? 'hover:border-voltix-accent/50' : 'hover:border-white/30'} transition-all`}
               >
                 <div className="absolute inset-0 mix-blend-overlay opacity-50 transition-transform duration-1000 group-hover:scale-105" 
                      style={{ backgroundImage: `url(${drop.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-voltix-base via-voltix-base/60 to-transparent" />
                 
                 <div className="relative z-10 p-10 mt-auto flex flex-col h-full justify-between">
                   <div className="flex justify-between items-start">
                     <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] tracking-widest font-bold uppercase ${drop.theme === 'neon' ? 'bg-voltix-accent/20 text-voltix-accent border border-voltix-accent/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        <Clock className="w-3 h-3" /> {drop.status}
                     </span>
                   </div>

                   <div className="mt-auto">
                     <p className="font-mono text-xs text-white/50 mb-2 uppercase tracking-[0.2em]">{drop.available}</p>
                     <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 group-hover:text-voltix-accent transition-colors">
                       {drop.name}
                     </h3>
                     
                     <button 
                       onClick={() => navigate('/collections')}
                       className={`border rounded-full px-6 py-3 font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${drop.status.includes('SOLD OUT') ? 'border-white/10 text-white/40 cursor-not-allowed' : 'interactive border-voltix-accent text-voltix-accent hover:bg-voltix-accent hover:text-black'}`}
                       disabled={drop.status.includes('SOLD OUT')}
                     >
                       {drop.status.includes('SOLD OUT') ? 'Archived' : 'Pre-register'} <ArrowRight className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  )
}
