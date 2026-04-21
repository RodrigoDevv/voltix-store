import { motion } from 'framer-motion';
import { Activity, Cpu, Monitor, Download } from 'lucide-react';

export default function SoftwareEngine() {
  return (
    <section className="py-24 bg-transparent relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="glass-pill px-4 py-2 border border-voltix-accent/20 bg-voltix-accent/5 mb-6 inline-flex items-center gap-2">
            <Activity className="w-4 h-4 text-voltix-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-voltix-accent font-medium">Voltix Command Center</span>
          </div>
          <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-7xl tracking-tight text-white mb-6">
            Neural <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-voltix-accent to-white">Integration.</span>
          </h2>
          <p className="font-sans text-lg text-voltix-text/50 font-light mb-10 max-w-lg">
            Hardware is only half the equation. The Voltix Command Center gives you granular telemetry, custom macro scripting, and global lighting sync with zero background latency overhead.
          </p>

          <div className="space-y-6 mb-10">
            {[
              { icon: Cpu, text: 'Custom macro mapping' },
              { icon: Activity, text: 'Real-time telemetry overlay' },
              { icon: Monitor, text: 'Per-pixel ARGB sync engine' }
            ].map((feature, i) => (
               <div key={i} className="flex items-center gap-4 text-white hover:text-voltix-accent transition-colors group cursor-default">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center group-hover:border-voltix-accent/40 transition-colors">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="font-sans font-medium">{feature.text}</span>
               </div>
            ))}
          </div>

          <button className="interactive bg-white text-black font-bold text-sm px-8 py-4 flex items-center gap-2 rounded-full hover:bg-voltix-accent hover:text-white transition-colors duration-300">
             <Download className="w-4 h-4" /> Download Version 4.2
          </button>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative h-full min-h-[500px]"
        >
          {/* Software mockup graphics */}
          <div className="absolute inset-0 z-0 bg-voltix-accent/10 blur-[100px] rounded-full point-events-none" />
          <div className="relative z-10 glass-card rounded-[32px] border border-white/10 w-full h-full p-4 overflow-hidden shadow-2xl flex flex-col">
            <div className="flex gap-2 items-center px-4 py-2 mb-4 border-b border-white/5 pb-4">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
               <div className="ml-4 font-mono text-[10px] tracking-widest text-voltix-text/30">VOLTIX_CMD_V4.2</div>
            </div>
            
            <div className="flex gap-4 flex-1 p-2">
               <div className="w-1/3 bg-white/5 rounded-2xl flex flex-col gap-2 p-2">
                  <div className="h-8 bg-voltix-accent/20 rounded-lg w-full border border-voltix-accent/50" />
                  <div className="h-8 bg-white/5 rounded-lg w-full" />
                  <div className="h-8 bg-white/5 rounded-lg w-full" />
               </div>
               <div className="flex-1 rounded-2xl relative overflow-hidden bg-black/40 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-voltix-accent/20 via-transparent to-transparent opacity-50" />
                  <img src="https://uk.defender-global.com/public/r/600x600/products/12822/a8ca6d8d.webp" className="mix-blend-screen w-full mt-auto" alt="Mouse UI Mockup" />
               </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
