'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, searchProducts } from '@/lib/api/products';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import SearchBar from '@/components/SearchBar';
import { Loader2 } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LIMIT = 10;

  // Fetch products
  const loadProducts = useCallback(async (isNewSearch = false) => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const currentSkip = isNewSearch ? 0 : skip;
      
      const response = searchQuery
        ? await searchProducts(searchQuery)
        : await fetchProducts(LIMIT, currentSkip);

      if (isNewSearch) {
        setProducts(response.products);
        setSkip(LIMIT);
      } else {
        // Deduplicate products by ID
        setProducts((prev) => {
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = response.products.filter(p => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
        setSkip((prev) => prev + LIMIT);
      }

      setHasMore(response.products.length === LIMIT && currentSkip + LIMIT < response.total);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [skip, searchQuery, loading]);

  // Initial load
  useEffect(() => {
    loadProducts(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkip(0);
      loadProducts(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loading) {
          loadProducts();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, loadProducts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className='max-w-full overflow-hidden'>
      {/* Hero Section - Full width, no spacing */}
      <HeroSection />
      
      {/* Content Section - with container and padding */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-extralight text-gray-900 tracking-tight leading-tight">
              Discover Products
            </h1>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>
          <p className="text-gray-500 font-light text-lg tracking-wide leading-relaxed">
            Browse our curated collection of premium products
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8">
          <SearchBar  onSearch={handleSearch} placeholder="Search for products..." />
        </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Products Grid */}
      {initialLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No products found matching your search.' : 'No products available.'}
          </p>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* End of List Message */}
      {!hasMore && products.length > 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">You&apos;ve reached the end of the list</p>
        </div>
      )}
      </div>
    </div>
  );
}
