import { useLocation } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';
import LimitedDrops from '../components/LimitedDrops';

export default function Collections() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 mt-12 text-center">
        {searchQuery ? (
          <>
            <h1 className="font-display font-medium text-4xl md:text-6xl tracking-tight text-white mb-6">
              Search results for <span className="text-voltix-accent">"{searchQuery}"</span>
            </h1>
            <p className="font-sans text-voltix-text/50 font-light text-xl max-w-2xl mx-auto">
              Displaying all hardware intelligence matching your query.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tight text-white mb-6">
              Full <span className="text-voltix-accent">Arsenal</span>
            </h1>
            <p className="font-sans text-voltix-text/50 font-light text-xl max-w-2xl mx-auto">
              Explore our complete collection of zero-latency hardware designed to elevate your mechanical limits.
            </p>
          </>
        )}
      </div>
      <LimitedDrops />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}
