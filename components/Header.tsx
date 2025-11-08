'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useAppSelector } from '@/lib/redux/hooks';
import { Heart, Plus, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const topHeaderVisible = useAppSelector((state) => state.ui.topHeaderVisible);

  return (
    <header
      className={clsx(
        'fixed left-0 right-0 z-40 border-b border-border/60 backdrop-blur-xl shadow-lg transition-all duration-300',
        'bg-white/80 text-gray-900 dark:bg-gray-950/80 dark:text-gray-100',
        topHeaderVisible ? 'top-12 md:top-14' : 'top-0'
      )}
    >
      <nav className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* left side nav - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/" 
              className="text-foreground/80 hover:text-foreground font-medium text-sm tracking-[0.35em] uppercase transition-colors duration-300 px-5 py-2 rounded-full border border-border/60 hover:border-border bg-background/70 hover:bg-background/90 dark:bg-gray-900/70 dark:border-gray-700"
            >
              <span className="relative z-10">Products</span>
              <span className="absolute inset-0 rounded-full"></span>
            </Link>
          </div>

          {/* middle big logo */}
          <Link 
            href="/" 
            className="flex items-center transition-transform duration-500 hover:scale-105 relative"
          >
            <div className="absolute inset-0 rounded-xl bg-foreground/5 blur-xl opacity-0 transition-opacity duration-500"></div>
            <span className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.35em] relative z-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]">
              MERKATOX
            </span>
          </Link>

          {/* right side nav - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/favorites" 
              className="flex items-center gap-2 text-foreground/80 hover:text-foreground font-medium text-sm tracking-[0.3em] uppercase transition-colors duration-300 px-5 py-2 rounded-full border border-border/60 hover:border-border bg-background/70 hover:bg-background/90 dark:bg-gray-900/70 dark:border-gray-700 relative"
            >
              <Heart className="w-4 h-4" />
              <span className="relative z-10">Favorites</span>
              <span className="absolute inset-0 rounded-full"></span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md ring-2 ring-white/40 dark:ring-emerald-700/40">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            <Link 
              href="/create-product" 
              className="flex items-center gap-2.5 bg-foreground text-background px-6 py-2.5 rounded-full font-medium text-sm tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-90 shadow-lg dark:bg-background dark:text-foreground"
            >
              <Plus className="w-4 h-4" />
              <span className="relative z-10">Create</span>
            </Link>
          </div>

          {/* Mobile Create Button */}
          <Link 
            href="/create-product" 
            className="md:hidden flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-border/60 pt-4">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-foreground/80 hover:text-foreground font-medium text-sm tracking-wider uppercase transition-colors duration-300 px-4 py-3 rounded-lg hover:bg-muted"
            >
              Products
            </Link>
            <Link 
              href="/favorites" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-foreground/80 hover:text-foreground font-medium text-sm tracking-wider uppercase transition-colors duration-300 px-4 py-3 rounded-lg hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Favorites
              </span>
              {favoritesCount > 0 && (
                <span className="bg-emerald-500 text-white text-xs font-semibold rounded-full min-w-[20px] h-[20px] flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link 
              href="/create-product" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 bg-foreground text-background px-4 py-3 rounded-lg font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-90 justify-center"
            >
              <Plus className="w-4 h-4" />
              Create Product
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
