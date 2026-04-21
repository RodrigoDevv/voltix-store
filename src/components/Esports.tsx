import { motion } from 'framer-motion';
import { Trophy, ShieldCheck, Sword } from 'lucide-react';

const teams = [
  { name: 'Cloud9', game: 'VALORANT' },
  { name: 'Team Liquid', game: 'CS2' },
  { name: 'Fnatic', game: 'League of Legends' },
  { name: 'Sentinels', game: 'Apex Legends' },
];

export default function Esports() {
  return (
    <section className="py-24 bg-transparent relative z-10 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none mix-blend-screen scale-150 md:scale-100 translate-x-1/4">
        <Trophy className="w-[800px] h-[800px] text-white" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="glass-pill px-4 py-2 border border-voltix-accent/20 bg-voltix-accent/5 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-voltix-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-voltix-accent font-medium">Verified by Professionals</span>
          </div>
          <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-white mb-6 max-w-3xl">
            The Choice of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-voltix-text to-voltix-text/50">World Champions.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => window.open(`https://www.google.com/search?q=${team.name}+esports`, '_blank')}
              className="interactive bg-white/5 hover:bg-voltix-accent/10 border border-white/5 hover:border-voltix-accent/30 rounded-[24px] p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer hover:shadow-[0_0_30px_rgba(93,214,44,0.15)]"
            >
              <h3 className="font-display font-bold text-xl md:text-2xl text-white group-hover:text-voltix-accent transition-colors mb-2">
                {team.name}
              </h3>
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-voltix-text/40 group-hover:text-white transition-colors uppercase flex items-center gap-2">
                <Sword className="w-3 h-3" /> {team.game}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
