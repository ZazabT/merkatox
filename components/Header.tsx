'use client';

import Link from 'next/link';
import { useAppSelector } from '@/lib/redux/hooks';
import { Heart, ShoppingBag, Plus } from 'lucide-react';

export default function Header() {
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);

  return (
    <header className="fixed top-10 left-0 right-0 z-40 bg-transparent">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-gray-200 transition">
            <ShoppingBag className="w-7 h-7" />
            <span>Merkatox</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-white hover:text-gray-200 font-medium transition"
            >
              Products
            </Link>
            
            <Link 
              href="/favorites" 
              className="flex items-center gap-2 text-white hover:text-gray-200 font-medium transition relative"
            >
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            
            <Link 
              href="/create-product" 
              className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition"
            >
              <Plus className="w-5 h-5" />
              <span>Create</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
