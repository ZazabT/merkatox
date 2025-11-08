'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setTopHeaderVisible } from '@/lib/redux/slices/uiSlice';

const announcements = [
  ' Free delivery on all orders above $99',
  'Free returns within 30 days',
  ' Weekend flash sale: Save up to 30% on electronics',
  ' Buy 2 get 1 free on select beauty products',
  'Next-day shipping available in major cities',
];

export default function TopHeader() {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector((state) => state.ui.topHeaderVisible);
  const [isClosing, setIsClosing] = useState(false);

  if (!isVisible && !isClosing) {
    return null;
  }

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      dispatch(setTopHeaderVisible(false));
      setIsClosing(false);
    }, 300);
  };

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 overflow-hidden bg-black text-white transition-all duration-300',
        isClosing ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'
      )}
    >
      <div className="relative flex items-center pr-16">
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

        <Button
          type="button"
          size="icon"
          onClick={handleClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white"
          aria-label="Close announcements"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
