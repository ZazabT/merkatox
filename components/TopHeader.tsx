'use client';

import { InfiniteSlider } from "@/components/ui/infinite-slider";

const announcements = [
  "🎉 Free delivery on all orders above $99",
  "🔥 Weekend flash sale: Save up to 30% on electronics",
  "🛍️ Buy 2 get 1 free on select beauty products",
  "🚀 Next-day shipping available in major cities",
  "💳 Secure checkout with multiple payment options",
  "🌙 Switch to dark mode anytime from the top bar",
];

export default function TopHeader() {
  return (
    <div className="bg-blue-600 text-white">
      <InfiniteSlider gap={48} duration={35} className="py-2">
        {announcements.map((message, index) => (
          <p
            key={index}
            className="text-sm font-medium tracking-wide whitespace-nowrap flex items-center gap-2"
          >
            {message}
          </p>
        ))}
      </InfiniteSlider>
    </div>
  );
}
