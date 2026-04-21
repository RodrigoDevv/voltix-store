import BuildSetup from '../components/BuildSetup';

export default function Peripherals() {
  return (
    <div className="pt-32 min-h-screen">
       <div className="max-w-[1400px] mx-auto px-6 mb-8 mt-12 text-center">
        <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tight text-white mb-6">
          Tactical <span className="text-voltix-accent">Peripherals</span>
        </h1>
        <p className="font-sans text-voltix-text/50 font-light text-xl max-w-2xl mx-auto">
          Every micro-switch and optical sensor serves a single purpose: converting intent to execution.
        </p>
      </div>
      <BuildSetup />
    </div>
  );
}
