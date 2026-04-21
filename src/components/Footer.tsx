import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  }

  return (
    <footer className="bg-transparent pt-32 pb-12 relative overflow-hidden rounded-t-[48px] -mt-16 z-20 border-t border-white/5">
      
      {/* Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-voltix-accent/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[100px] bg-voltix-accent/10 blur-[80px]" />

      <div className="max-w-4xl mx-auto px-6 text-center text-voltix-text relative z-10 mb-32">
        <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tight mb-6">
          Upgrade <span className="text-voltix-accent">Protocol</span>
        </h2>
        <p className="font-sans text-lg text-voltix-text/50 mb-12 max-w-xl mx-auto font-light">
          Establish secure connection for exclusive intelligence drops and early access.
        </p>

        <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
          <div className="flex-1 relative">
            <input 
              type="email" 
              required
              placeholder="Email Address"
              className="interactive w-full glass-pill border-white/10 px-6 py-4 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-voltix-accent/50 transition-colors bg-white/5"
            />
          </div>
          <button 
            type="submit"
            className={`interactive font-bold px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2 ${subscribed ? 'bg-voltix-accent text-voltix-base' : 'bg-voltix-accent text-voltix-base hover:bg-white'}`}
          >
            {subscribed ? "Subscribed ✓" : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12 border-t border-white/5 pt-16 relative z-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img 
              src="https://b.top4top.io/p_3763fywgt1.png" 
              alt="Voltix Logo" 
              className="h-10 md:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-sm text-voltix-text/40 font-sans font-light leading-relaxed max-w-xs">
            Tactical hardware engineered for peak digital performance. Bridging the gap between human and machine.
          </p>
        </div>
        
        <div>
          <h4 className="font-sans font-medium text-lg mb-6 text-white">Hardware</h4>
          <ul className="space-y-4 text-sm text-voltix-text/50 font-sans">
            <li><Link to="/peripherals" className="interactive hover:text-voltix-accent transition-colors">Interface</Link></li>
            <li><Link to="/technology" className="interactive hover:text-voltix-accent transition-colors">Switches</Link></li>
            <li><Link to="/collections?search=Monitor" className="interactive hover:text-voltix-accent transition-colors">Displays</Link></li>
            <li><Link to="/collections?search=Audio" className="interactive hover:text-voltix-accent transition-colors">Acoustics</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-medium text-lg mb-6 text-white">Network</h4>
          <ul className="space-y-4 text-sm text-voltix-text/50 font-sans">
            <li><Link to="/technology" className="interactive hover:text-voltix-accent transition-colors">Firmware</Link></li>
            <li><Link to="/" className="interactive hover:text-voltix-accent transition-colors">Telemetry</Link></li>
            <li><Link to="/" className="interactive hover:text-voltix-accent transition-colors">Support</Link></li>
            <li><Link to="/" className="interactive hover:text-voltix-accent transition-colors">Status</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-medium text-lg mb-6 text-white">Legal</h4>
          <ul className="space-y-4 text-sm text-voltix-text/50 font-sans">
            <li><Link to="/" className="interactive hover:text-voltix-accent transition-colors">Terms</Link></li>
            <li><Link to="/" className="interactive hover:text-voltix-accent transition-colors">Privacy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
