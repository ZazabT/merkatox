'use client';

import { useAppSelector } from '@/lib/redux/hooks';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.items);

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Header Section */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
              <h1 className="text-5xl md:text-6xl font-extralight text-foreground tracking-tight leading-tight">
                Your Favorites
              </h1>
            </div>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>
          <p className="text-muted-foreground font-light text-lg tracking-wide leading-relaxed">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'product' : 'products'}`
              : 'Start adding products to your favorites'}
          </p>
        </div>

        {/* Products Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <Heart className="w-24 h-24 text-muted/30" />
            </div>
            <div className="text-center space-y-2 max-w-md">
              <h3 className="text-2xl font-light text-foreground">No favorites yet</h3>
              <p className="text-muted-foreground font-light">
                Browse our collection and click the heart icon on products you love
              </p>
            </div>
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-foreground hover:bg-foreground/90 text-background font-light tracking-widest uppercase text-xs transition-all duration-300 dark:bg-background dark:text-foreground dark:hover:bg-background/90"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
