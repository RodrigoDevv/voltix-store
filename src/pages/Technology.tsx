import Engineering from '../components/Engineering';
import PerformanceMetrics from '../components/Performance';
import SoftwareEngine from '../components/SoftwareEngine';

export default function Technology() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 mb-8 mt-12 text-center">
        <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tight text-white mb-6">
          Voltix <span className="text-voltix-accent">Core</span>
        </h1>
        <p className="font-sans text-voltix-text/50 font-light text-xl max-w-2xl mx-auto">
          Delve into the substrate layer. Uncover the microarchitecture powering our near-instantaneous telemetry.
        </p>
      </div>
      <SoftwareEngine />
      <PerformanceMetrics />
      <Engineering />
    </div>
  );
}
