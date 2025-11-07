'use client';

import Link from 'next/link';
import { useAppSelector } from '@/lib/redux/hooks';
import { Heart, ShoppingBag, Plus } from 'lucide-react';

export default function Header() {
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);

  return (
    <header className="fixed top-10 left-0 right-0 z-40 backdrop-blur-2xl bg-gradient-to-b from-black/40 via-black/30 to-transparent border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <nav className="container mx-auto px-8 py-5">
        <div className="flex items-center justify-between">

          {/* left side nav */}
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white font-light text-sm tracking-widest uppercase transition-all duration-300 px-6 py-2.5 rounded-lg hover:bg-white/10 relative group"
            >
              <span className="relative z-10">Products</span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300"></span>
            </Link>
          </div>

          {/* middle big logo */}
          <Link 
            href="/" 
            className="flex items-center text-white hover:text-white transition-all duration-500 hover:scale-105 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-5xl font-extralight tracking-[0.3em] relative z-10 drop-shadow-[0_4px_16px_rgba(255,255,255,0.3)]">
              MERKATOX
            </span>
          </Link>

          {/* right side nav */}
          <div className="flex items-center gap-2">
            <Link 
              href="/favorites" 
              className="flex items-center gap-2.5 text-white/90 hover:text-white font-light text-sm tracking-widest uppercase transition-all duration-300 px-6 py-2.5 rounded-lg hover:bg-white/10 relative group"
            >
              <Heart className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
              <span className="relative z-10">Favorites</span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-300"></span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg ring-2 ring-black/30 animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            <Link 
              href="/create-product" 
              className="flex items-center gap-2.5 bg-white/95 hover:bg-white text-gray-900 px-6 py-2.5 rounded-lg font-light text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-[0_4px_16px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_24px_rgba(255,255,255,0.5)] backdrop-blur-sm relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Plus className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-90" />
              <span className="relative z-10">Create</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
