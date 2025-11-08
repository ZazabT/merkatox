'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useAppSelector } from '@/lib/redux/hooks';
import { Heart, Plus } from 'lucide-react';

export default function Header() {
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const topHeaderVisible = useAppSelector((state) => state.ui.topHeaderVisible);

  return (
    <header
      className={clsx(
        'fixed left-0 right-0 z-40 border-b border-white/15 bg-black/70 backdrop-blur-xl shadow-lg transition-all duration-300',
        topHeaderVisible ? 'top-12 md:top-14' : 'top-0'
      )}
    >
      <nav className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">

          {/* left side nav */}
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="text-white/80 hover:text-white font-medium text-sm tracking-[0.35em] uppercase transition-colors duration-300 px-5 py-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 relative"
            >
              <span className="relative z-10">Products</span>
              <span className="absolute inset-0 rounded-full"></span>
            </Link>
          </div>

          {/* middle big logo */}
          <Link 
            href="/" 
            className="flex items-center text-white transition-transform duration-500 hover:scale-105 relative"
          >
            <div className="absolute inset-0 rounded-xl bg-white/5 blur-xl opacity-0 transition-opacity duration-500"></div>
            <span className="text-4xl md:text-5xl font-light tracking-[0.35em] relative z-10 drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]">
              MERKATOX
            </span>
          </Link>

          {/* right side nav */}
          <div className="flex items-center gap-2">
            <Link 
              href="/favorites" 
              className="flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm tracking-[0.3em] uppercase transition-colors duration-300 px-5 py-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 relative"
            >
              <Heart className="w-4 h-4" />
              <span className="relative z-10">Favorites</span>
              <span className="absolute inset-0 rounded-full"></span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-md ring-2 ring-white/20">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            <Link 
              href="/create-product" 
              className="flex items-center gap-2.5 bg-white text-gray-900 px-6 py-2.5 rounded-full font-medium text-sm tracking-[0.3em] uppercase transition-all duration-300 hover:bg-slate-100 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span className="relative z-10">Create</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
