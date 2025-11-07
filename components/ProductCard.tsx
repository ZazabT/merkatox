'use client';

import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onFavoriteToggle?: (id: number) => void;
}

export default function ProductCard({ product, onFavoriteToggle }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-600">${product.price}</p>
    </div>
  );
}
