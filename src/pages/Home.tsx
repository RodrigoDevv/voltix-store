import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Engineering from '../components/Engineering';
import Categories from '../components/Categories';
import BuildSetup from '../components/BuildSetup';
import Esports from '../components/Esports';
import PerformanceMetrics from '../components/Performance';
import Community from '../components/Community';
import SoftwareEngine from '../components/SoftwareEngine';
import LimitedDrops from '../components/LimitedDrops';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <SoftwareEngine />
      <Engineering />
      <BuildSetup />
      <LimitedDrops />
      <Categories />
      <Esports />
      <PerformanceMetrics />
      <Community />
    </>
  );
}
