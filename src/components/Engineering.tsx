import { motion } from 'framer-motion';
import { Cpu, Layers, Wifi, Crosshair } from 'lucide-react';

const technologies = [
  {
    icon: Crosshair,
    title: 'Quantum Optical Sensors',
    description: 'Pixel-perfect tracking at true 16,000 DPI with zero hardware acceleration or smoothing. It translates human intent to digital action instantly.'
  },
  {
    icon: Cpu,
    title: 'Neural Processing Array',
    description: 'On-board ARM cortex processors calculate debounce and actuation at 8000Hz, ensuring absolute zero latency down to the microsecond.'
  },
  {
    icon: Layers,
    title: 'Aero-Weave Carbon Shell',
    description: 'Aerospace-grade composite structures provide military structural integrity while dropping total peripheral mass by up to 45%.'
  },
  {
    icon: Wifi,
    title: 'Slipstream Wireless',
    description: 'Frequency-hopping algorithms scan the 2.4GHz spectrum 2000 times per second to guarantee a connection faster and more stable than wired configurations.'
  }
];

export default function Engineering() {
  return (
    <section className="py-24 bg-transparent relative z-10 w-full overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-voltix-accent/20 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display font-medium text-4xl md:text-5xl tracking-tight text-white mb-4">
              Hardware <span className="text-voltix-accent">Architecture</span>
            </h2>
            <p className="font-sans text-voltix-text/50 font-light text-lg">
              We do not assemble. We engineer. Every component is custom-machined from the substrate up to redefine the physical limits of human input.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="interactive glass-card group relative p-8 flex flex-col items-start hover:bg-[#151515] hover:border-voltix-accent/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-voltix-surface/50 border border-white/5 flex items-center justify-center mb-6 relative overflow-hidden group-hover:border-voltix-accent/50 transition-colors">
                <div className="absolute inset-0 bg-voltix-accent/0 group-hover:bg-voltix-accent/20 transition-colors" />
                <tech.icon className="w-5 h-5 text-voltix-text/80 group-hover:text-voltix-accent relative z-10 transition-colors" />
              </div>
              
              <h3 className="font-display font-semibold text-xl text-white mb-3 tracking-tight">{tech.title}</h3>
              <p className="font-sans text-sm text-voltix-text/50 leading-relaxed font-light">
                {tech.description}
              </p>

              <div className="mt-8 self-end font-mono text-[10px] tracking-widest text-voltix-accent/40 group-hover:text-voltix-accent transition-colors">
                SYS.MODULE.0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
