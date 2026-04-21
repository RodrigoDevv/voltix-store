import { motion } from 'framer-motion';

const metrics = [
  { value: '0.1', unit: 'ms', label: 'Input Latency' },
  { value: '360', unit: 'Hz', label: 'Refresh Rate' },
  { value: '99.9', unit: '%', label: 'Tracking Accuracy' },
  { value: 'Zero', unit: '', label: 'Compromise' },
];

export default function PerformanceMetrics() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-voltix-base via-[#0a1505] to-voltix-base opacity-80" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card flex flex-col items-center justify-center text-center py-16 px-6 group rounded-[32px] overflow-hidden relative"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-voltix-accent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-voltix-accent blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-baseline gap-2 z-10">
                <span className="font-display font-medium text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white group-hover:text-voltix-text transition-colors duration-300">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="font-sans text-xl font-medium text-voltix-accent">
                    {metric.unit}
                  </span>
                )}
              </div>
              <p className="font-sans text-sm text-voltix-text/50 mt-4 group-hover:text-voltix-text/80 transition-colors z-10">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
