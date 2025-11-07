import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] grid grid-cols-1 md:grid-cols-2 gap-0 h-[500px] md:h-[600px] overflow-hidden">
      {/* First Image - Always visible */}
      <div className="relative w-full h-full">
        <Image
          src="https://images.pexels.com/photos/2661256/pexels-photo-2661256.jpeg"
          alt="Hero image 1"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Second Image - Hidden on mobile, visible on md and up */}
      <div className="relative w-full h-full hidden md:block">
        <Image
          src="https://images.pexels.com/photos/1977292/pexels-photo-1977292.jpeg"
          alt="Hero image 2"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
