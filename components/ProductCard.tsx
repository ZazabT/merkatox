'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ChevronLeft, ChevronRight, ShoppingCart, Check, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleFavorite } from '@/lib/redux/slices/favoritesSlice';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.id === product.id);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const originalPrice = product.discountPercentage > 0 
    ? (product.price / (1 - product.discountPercentage / 100))
    : null;

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasAdded = !isFavorite;
    dispatch(toggleFavorite(product));
    
    if (wasAdded) {
      toast.success('Added to favorites!', {
        description: `${product.title} has been added to your favorites.`,
      });
    } else {
      toast.info('Removed from favorites', {
        description: `${product.title} has been removed from your favorites.`,
      });
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddedToCart) return;
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }, 800);
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className="w-full overflow-hidden group bg-white text-foreground hover:shadow-2xl transition-all duration-500 h-full flex flex-col rounded-lg border-2 border-gray-200 hover:border-black max-h-[560px]">
        
        {/* Image Carousel */}
        <div className="relative aspect-3/4 overflow-hidden bg-gray-50">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentImageIndex]}
              alt={`${product.title} - View ${currentImageIndex + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.discountPercentage > 0 && (
              <Badge className="bg-red-600 text-white hover:bg-red-700 font-medium tracking-widest uppercase shadow-lg">
                -{Math.round(product.discountPercentage)}% OFF
              </Badge>
            )}
            {product.stock <= 10 && product.stock > 0 && (
              <Badge className="bg-orange-600 text-white hover:bg-orange-700 font-medium tracking-wide shadow-lg">
                Only {product.stock} left
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="secondary"
            size="icon"
            className={`absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-sm shadow-xl hover:scale-110 transition-all duration-300 ${
              isFavorite 
                ? 'bg-rose-500 text-white hover:bg-rose-600' 
                : 'bg-white/90 hover:bg-white text-gray-700'
            }`}
            onClick={handleFavoriteToggle}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
          </Button>
        </div>

        {/* Content */}
        <CardContent className="p-5 bg-white">
          <div className="space-y-3">
            {/* Category & Brand */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600 font-medium uppercase tracking-[0.2em]">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-[10px] text-gray-500 font-light uppercase tracking-wider">
                  {product.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-gray-700 transition-colors">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span className="ml-1 text-sm font-medium text-gray-900">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-gray-500 font-light">
                ({product.reviews?.length || 0})
              </span>
              {product.stock > 20 && (
                <span className="text-xs text-emerald-600 ml-auto font-medium tracking-wide">
                  In Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl font-bold text-gray-900 tracking-wide">
                ${product.price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through font-light">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-5 pt-0 bg-white">
          <Button
            className="w-full bg-gray-900 hover:bg-black text-white font-medium tracking-widest uppercase text-xs transition-all"
            onClick={handleAddToCart}
            disabled={isAddingToCart || isAddedToCart}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : isAddedToCart ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
