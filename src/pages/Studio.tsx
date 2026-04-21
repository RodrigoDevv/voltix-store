import Esports from '../components/Esports';
import Community from '../components/Community';

export default function Studio() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 mb-8 mt-12 text-center">
        <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tight text-white mb-6">
          The <span className="text-voltix-accent">Studio</span>
        </h1>
        <p className="font-sans text-voltix-text/50 font-light text-xl max-w-2xl mx-auto">
          Behind closed doors. See who is pushing our engineering to the absolute upper echelon of competition.
        </p>
      </div>
      <Esports />
      <Community />
    </div>
  );
}
