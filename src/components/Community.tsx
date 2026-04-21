import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  { text: "Absolute precision. It feels like a direct mechanical extension of my hand. The best hardware I've ever used.", author: "ProPlayer X" },
  { text: "Game changer. The latency is practically non-existent. Pure telemetry straight to the screen.", author: "DevStreamer" },
  { text: "Built like a tank but handles like a scalpel. Flawless hardware for heavy workloads.", author: "CreativeLead" }
];

const images = [
  "https://i.pinimg.com/1200x/a5/ff/90/a5ff90d622864bfc7e33b756ed7792ad.jpg",
  "https://i.pinimg.com/736x/21/86/39/218639a7ad815724f86c7acfff408f07.jpg",
  "https://i.pinimg.com/736x/81/4a/c9/814ac9559524c7212d74484b3d42ec22.jpg",
  "https://i.pinimg.com/736x/c1/7c/7c/c17c7ca612c3fb7231bb74072c7bd49c.jpg",
];

export default function Community() {
  return (
    <section className="py-32 bg-transparent overflow-hidden relative z-10 pb-40">
      <div className="max-w-[1400px] mx-auto px-6 mb-24 flex flex-col items-center">
        <h2 className="font-display font-medium text-4xl md:text-5xl text-white tracking-tight mb-4 text-center">
          Field <span className="text-transparent bg-clip-text bg-gradient-to-r from-voltix-accent to-white">Telemetry</span>
        </h2>
        <p className="text-voltix-text/50 font-sans text-lg max-w-xl text-center">
          Trusted by elite professionals worldwide.
        </p>
      </div>

      {/* Floating Marquee */}
      <div className="relative flex overflow-x-hidden mb-32 group">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...images, ...images, ...images].map((src, i) => (
            <div key={i} className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] mx-4 overflow-hidden relative rounded-[32px] flex-shrink-0 group-hover:scale-[0.98] transition-transform duration-500 hover:!scale-105">
              <img src={src} className="w-full h-full object-cover transition-all duration-700 filter brightness-75 group-hover:brightness-50 hover:!brightness-110" alt="Setup" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="w-8 h-1 bg-voltix-accent rounded-full mb-2 opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            key={i} 
            className="glass-card p-10 rounded-[32px] relative"
          >
            <Quote className="w-8 h-8 text-voltix-accent/20 mb-6" />
            <p className="font-sans text-lg text-white/90 leading-relaxed mb-8">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-voltix-surface flex items-center justify-center">
                <span className="font-display font-medium text-white">{t.author[0]}</span>
              </div>
              <p className="font-sans font-medium text-sm text-voltix-text/80">{t.author}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
