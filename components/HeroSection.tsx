'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] grid grid-cols-1 md:grid-cols-2 gap-0 h-screen overflow-visible">
      {/* Left Image Section */}
      <div 
        className="relative w-full h-full group cursor-pointer overflow-hidden"
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Image
          src="https://images.pexels.com/photos/2661256/pexels-photo-2661256.jpeg"
          alt="Hero image 1"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        
        {/* Card that appears on right when hovering left */}
        <div className={`hidden md:block absolute -right-40 top-1/2 -translate-y-1/2 z-50 transition-all duration-700 ease-out ${
          hoveredSide === 'left' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20 pointer-events-none'
        }`}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-80 backdrop-blur-lg border-2 border-purple-500/20 dark:border-purple-500/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">New Arrivals</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover the latest trends in fashion and accessories. Limited stock available!
            </p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">50% OFF</span>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div 
        className="relative w-full h-full hidden md:block group cursor-pointer overflow-hidden"
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Image
          src="https://images.pexels.com/photos/1977292/pexels-photo-1977292.jpeg"
          alt="Hero image 2"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Card that appears on left when hovering right */}
        <div className={`hidden md:block absolute -left-40 top-1/2 -translate-y-1/2 z-50 transition-all duration-700 ease-out ${
          hoveredSide === 'right' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'
        }`}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-80 backdrop-blur-lg border-2 border-blue-500/20 dark:border-blue-500/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Best Sellers</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Shop our most popular items loved by thousands of customers worldwide.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">Top Rated</span>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-5"></div>

      {/* Content Overlay - Bottom aligned */}
      <div className="absolute inset-0 flex flex-col items-center justify-end z-10 px-4 md:px-8 pb-12 md:pb-20 space-y-3 md:space-y-6 pointer-events-none">
        <div className="pointer-events-auto">
        
        {/* Discount Text */}
        <div className="text-center">
          <p className="text-white text-md md:text-lg font-light tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Up to <span className="font-light text-xl md:text-2xl">50%</span> off this Black Friday
          </p>
        </div>

        {/* Main Heading - BLACK FRIDAY */}
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-wider drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">
            BLACK FRIDAY
          </h1>
        </div>

        {/* CTA Button */}
        <div>
          <button className="group bg-white text-gray-900 px-10 py-4 md:px-12 md:py-5 text-base md:text-lg font-medium tracking-wider uppercase transition-all duration-500 hover:scale-105 hover:bg-gray-50 shadow-[0_8px_32px_rgba(255,255,255,0.4)] hover:shadow-[0_12px_48px_rgba(255,255,255,0.6)] relative overflow-hidden">
            <span className="absolute inset-0 from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative z-10">Discover Now</span>
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}
