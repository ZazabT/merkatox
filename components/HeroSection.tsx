import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] grid grid-cols-1 md:grid-cols-2 gap-0 h-screen overflow-hidden">
      {/* Left Image Section */}
      <div className="relative w-full h-full">
        <Image
          src="https://images.pexels.com/photos/2661256/pexels-photo-2661256.jpeg"
          alt="Hero image 1"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Image Section */}
      <div className="relative w-full h-full hidden md:block">
        <Image
          src="https://images.pexels.com/photos/1977292/pexels-photo-1977292.jpeg"
          alt="Hero image 2"
          fill
          className="object-cover"
        />
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
