import { ShoppingCart, Menu, Search, User, Play, History, ArrowUpRight, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Collections', path: '/collections' },
    { name: 'Peripherals', path: '/peripherals' },
    { name: 'Technology', path: '/technology' },
    { name: 'Studio', path: '/studio' }
  ];

  const recentSearches = [
    "Apex Pro Mouse",
    "Mechanical Switches",
    "360Hz Monitors",
    "Aero-Weave Carbon"
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchAction = (term: string) => {
    if (!term.trim()) return;
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    
    // Navigate to collections and pass the search term via query string
    navigate(`/collections?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="glass-pill w-full max-w-6xl px-6 h-16 flex items-center justify-between pointer-events-auto relative">
        <Link to="/" className="interactive flex items-center pr-4 md:pr-8 group" onClick={() => setIsMobileMenuOpen(false)}>
          <img 
            src="https://b.top4top.io/p_3763fywgt1.png" 
            alt="Voltix Logo" 
            className="h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`interactive font-sans text-sm font-medium transition-colors relative group ${location.pathname === item.path ? 'text-voltix-accent' : 'text-voltix-text/70 hover:text-white'}`}
            >
              {item.name}
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-voltix-accent transition-all transform ${location.pathname === item.path ? 'scale-100 opacity-100' : 'opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100'}`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5 text-voltix-text/80">
          
          {/* Search Bar & Dropdown Menu */}
          <div className="relative" ref={searchRef}>
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                if (isCartOpen) setIsCartOpen(false);
              }}
              className={`interactive transition-colors p-2 rounded-full ${isSearchOpen ? 'text-voltix-accent bg-white/5' : 'hover:text-voltix-accent hover:bg-white/5'}`}
            >
              <Search className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-[-80px] md:right-0 top-[120%] mt-2 w-[calc(100vw-2rem)] max-w-80 glass-card border border-white/10 rounded-2xl p-4 shadow-2xl origin-top-right backdrop-blur-2xl bg-voltix-base/90 z-50 select-none"
                >
                  <div className="flex items-center gap-3 bg-voltix-surface/50 border border-white/10 rounded-full px-4 py-3 mb-5 focus-within:border-voltix-accent/50 transition-colors">
                    <Search className="w-4 h-4 text-voltix-text/50" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearchAction(searchQuery);
                        }
                      }}
                      placeholder="Search the arsenal..." 
                      className="interactive bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-voltix-text/30"
                      autoFocus
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-3 px-2">
                      <History className="w-3 h-3 text-voltix-accent" />
                      <span className="text-[10px] font-mono tracking-widest text-voltix-text/40 uppercase">Recent Intelligence</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {recentSearches.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).map((term, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleSearchAction(term)}
                          className="interactive text-left px-3 py-3 rounded-xl text-sm text-voltix-text/70 hover:text-white hover:bg-white/5 hover:scale-[1.02] transition-all duration-300 flex items-center justify-between group"
                        >
                          <span>{term}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-voltix-accent -translate-x-2 group-hover:translate-x-0" />
                        </button>
                      ))}
                      {recentSearches.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <div className="px-3 py-4 text-center text-xs font-mono text-voltix-text/40">
                          NO SIGNAL FOUND
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={cartRef}>
            <button 
              onClick={() => {
                setIsCartOpen(!isCartOpen);
                if (isSearchOpen) setIsSearchOpen(false);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              className={`interactive transition-colors relative group p-2 rounded-full border ${isCartOpen ? 'text-voltix-accent bg-white/5 border-voltix-accent/30' : 'bg-voltix-surface/50 border-white/5 hover:text-voltix-accent hover:bg-white/5'}`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-voltix-accent text-voltix-base font-sans text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(93,214,44,0.5)]">
                2
              </span>
            </button>

            {/* Cart Dropdown */}
            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-[-40px] md:right-0 top-[120%] mt-2 w-[calc(100vw-2rem)] max-w-[320px] glass-card border border-white/10 rounded-2xl p-5 shadow-2xl origin-top-right backdrop-blur-2xl bg-voltix-base/95 z-50 select-none"
                >
                   <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-voltix-text/50">Your Cart</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-voltix-accent/20 text-voltix-accent border border-voltix-accent/30">2 ITEMS</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                          <img src="https://images.unsplash.com/photo-1615663245857-ac1e6e0fb73d?q=80&w=150&auto=format&fit=crop" className="w-full mix-blend-screen object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-medium text-sm text-white truncate">Voltix Apex Pro</p>
                          <p className="font-sans text-xs text-voltix-text/50">Qty: 1</p>
                        </div>
                        <p className="font-sans font-semibold text-sm text-voltix-accent">$149</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl p-1 flex items-center justify-center flex-shrink-0">
                          <img src="https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=150&auto=format&fit=crop" className="w-full mix-blend-screen object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-medium text-sm text-white truncate">Neon Trigger V2</p>
                          <p className="font-sans text-xs text-voltix-text/50">Qty: 1</p>
                        </div>
                        <p className="font-sans font-semibold text-sm text-voltix-accent">$219</p>
                      </div>

                      <div className="pt-4 mt-2 border-t border-white/5 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                           <span className="font-sans text-sm text-voltix-text/70">Subtotal</span>
                           <span className="font-display font-bold text-lg text-white">$368.00</span>
                        </div>
                        <button className="w-full interactive bg-voltix-accent text-voltix-base py-3.5 rounded-xl font-bold text-sm tracking-wide hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                          Initialize Checkout
                        </button>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isSearchOpen) setIsSearchOpen(false);
              if (isCartOpen) setIsCartOpen(false);
            }}
            className={`interactive md:hidden transition-colors p-2 rounded-full ${isMobileMenuOpen ? 'text-voltix-accent bg-white/5' : 'hover:text-voltix-accent'}`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile App Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[120%] left-0 w-full glass-card border border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-2xl backdrop-blur-2xl bg-voltix-base/95 z-50 md:hidden pointer-events-auto origin-top"
            >
              {navLinks.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`interactive font-display text-xl font-medium py-3 px-4 rounded-xl border-b border-transparent transition-all flex items-center justify-between group ${location.pathname === item.path ? 'bg-voltix-surface/80 text-voltix-accent' : 'text-voltix-text hover:bg-white/5 hover:text-white'}`}
                >
                  {item.name}
                  <ArrowUpRight className={`w-5 h-5 transition-transform ${location.pathname === item.path ? 'text-voltix-accent opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:text-voltix-accent'}`} />
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 px-2">
                <button className="interactive flex-1 bg-voltix-surface hover:bg-white/5 transition-colors text-sm font-medium py-3 rounded-xl flex items-center justify-center gap-2">
                  <User className="w-4 h-4" /> Client Portal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </div>
  );
}
