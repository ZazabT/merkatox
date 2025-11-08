'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, searchProducts, fetchCategories, fetchProductsByCategory } from '@/lib/api/products';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import SearchBar from '@/components/SearchBar';
import { Loader2, ChevronRight, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import HeroSection from '@/components/HeroSection';
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const LIMIT = 12;

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch products
  const loadProducts = useCallback(async (isNewSearch = false) => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const currentSkip = isNewSearch ? 0 : skip;
      
      let response;
      if (searchQuery) {
        response = await searchProducts(searchQuery);
      } else if (selectedCategory !== 'all') {
        response = await fetchProductsByCategory(selectedCategory);
      } else {
        response = await fetchProducts(LIMIT, currentSkip);
      }

      // Apply sorting
      const sortedProducts = [...response.products];
      if (sortBy === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'name') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      }

      if (isNewSearch) {
        setProducts(sortedProducts);
        setSkip(LIMIT);
      } else {
        // Deduplicate products by ID
        setProducts((prev) => {
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = sortedProducts.filter(p => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
        setSkip((prev) => prev + LIMIT);
      }

      setHasMore(response.products.length === LIMIT && currentSkip + LIMIT < response.total);
      setTotalProducts(response.total);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [skip, searchQuery, loading, selectedCategory, sortBy]);

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

  // Reload when category or sort changes
  useEffect(() => {
    setSkip(0);
    loadProducts(true);
  }, [selectedCategory, sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load more handler
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadProducts();
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSortBy('default');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || sortBy !== 'default' || searchQuery !== '';

  return (
    <div className='max-w-full overflow-hidden'>
      {/* Hero Section - Full width, no spacing */}
      <HeroSection />
      
      {/* Content Section - with container and padding */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-extralight text-foreground tracking-tight leading-tight">
              Discover Products
            </h1>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>
          <p className="text-muted-foreground font-light text-lg tracking-wide leading-relaxed">
            Browse our curated collection of premium products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mt-8 space-y-4">
          {/* Search Bar */}
          <SearchBar  onSearch={handleSearch} placeholder="Search for products..." value={searchQuery} />
          
          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter by:</span>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] bg-background border-border">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => {
                    const formatted = category.replace(/-/g, ' ').split(' ').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ');
                    return (
                      <SelectItem key={category} value={category}>
                        {formatted}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-background border-border">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count and Clear Filters */}
            <div className="flex items-center gap-3">
              {!initialLoading && products.length > 0 && (
                <div className="text-sm text-muted-foreground font-medium">
                  Showing {Math.min(1, products.length)}-{products.length} of {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
                </div>
              )}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-xs font-medium border-border hover:bg-muted transition-colors"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
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
          <p className="text-muted-foreground text-lg">
            {searchQuery ? 'No products found matching your search.' : 'No products available.'}
          </p>
        </div>
      )}

      {/* Load More Button */}
      {products.length > 0 && (
        <div className="flex justify-center py-8">
          {loading ? (
            <Button disabled className="px-8 py-6 text-base">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading...
            </Button>
          ) : hasMore ? (
            <Button 
              onClick={handleLoadMore}
              className="px-8 py-6 text-base bg-foreground hover:bg-foreground/90 text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105"
            >
              Load More Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground text-lg font-light">You&apos;ve reached the end of the list</p>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
