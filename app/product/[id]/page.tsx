'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProductById, deleteProduct } from '@/lib/api/products';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  ShoppingCart, 
  Loader2, 
  Check, 
  Edit, 
  Trash2,
  Package,
  TruckIcon,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleFavorite } from '@/lib/redux/slices/favoritesSlice';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const unwrappedParams = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isFavorite = product ? favorites.some((fav) => fav.id === product.id) : false;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProductById(parseInt(unwrappedParams.id));
        setProduct(data);
      } catch (err) {
        const errorMessage = 'Failed to load product. Please try again.';
        setError(errorMessage);
        toast.error('Error Loading Product', {
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [unwrappedParams.id]);

  const handleFavoriteToggle = () => {
    if (product) {
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
    }
  };

  const handleAddToCart = () => {
    if (isAddedToCart) return;
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }, 800);
  };

  const handleDelete = async () => {
    if (!product) return;
    
    try {
      setIsDeleting(true);
      await deleteProduct(product.id);
      toast.success('Product deleted successfully!', {
        description: `${product.title} has been removed from the store.`,
      });
      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (err) {
      const errorMessage = 'Failed to delete product. Please try again.';
      setError(errorMessage);
      toast.error('Deletion Failed', {
        description: errorMessage,
      });
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-foreground" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background pt-32">
        <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
          <h1 className="text-4xl font-light text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || 'The product you are looking for does not exist.'}</p>
          <Button onClick={() => router.push('/')} className="bg-foreground hover:bg-foreground/90 text-background dark:bg-background dark:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];
  const originalPrice = product.discountPercentage > 0 
    ? (product.price / (1 - product.discountPercentage / 100))
    : null;

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8 text-foreground hover:text-foreground/80"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted/30 border border-border">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discountPercentage > 0 && (
                  <Badge className="bg-foreground text-background hover:bg-foreground/90 font-light tracking-widest">
                    -{Math.round(product.discountPercentage)}% OFF
                  </Badge>
                )}
                {product.stock <= 10 && product.stock > 0 && (
                  <Badge className="bg-orange-500 hover:bg-orange-500/90 font-light">
                    Only {product.stock} left
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-foreground' 
                        : 'border-border hover:border-foreground/50'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-light uppercase tracking-[0.2em]">
                      {product.category}
                    </span>
                    {product.brand && (
                      <>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="text-xs text-muted-foreground font-light uppercase tracking-wider">
                          {product.brand}
                        </span>
                      </>
                    )}
                  </div>
                  <h1 className="text-4xl font-light text-foreground leading-tight">
                    {product.title}
                  </h1>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className={`rounded-full border-2 ${
                    isFavorite 
                      ? 'border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30' 
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </Button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-foreground text-foreground'
                          : 'text-muted/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-light text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviews?.length || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2 border-t border-border">
              <span className="text-4xl font-light text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xl text-muted-foreground line-through font-light">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 pt-4">
              <h3 className="text-sm font-light uppercase tracking-[0.2em] text-muted-foreground">
                Description
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart || isAddedToCart || product.stock === 0}
                className="flex-1 bg-foreground hover:bg-foreground/90 text-background font-light tracking-widest uppercase text-xs h-14 dark:bg-background dark:text-foreground dark:hover:bg-background/90"
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
                ) : product.stock === 0 ? (
                  'Out of Stock'
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Admin Actions */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => router.push(`/edit-product/${unwrappedParams.id}`)}
                className="flex-1 border-2 border-border hover:border-foreground font-light tracking-widest uppercase text-xs h-12"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(true)}
                className="flex-1 border-2 border-red-300 text-red-600 hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-light tracking-widest uppercase text-xs h-12"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 gap-4 pt-6">
              <Card className="border-border rounded-none bg-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Stock</p>
                      <p className="font-light text-foreground">{product.stock} units available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TruckIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Shipping</p>
                      <p className="font-light text-foreground">{product.shippingInformation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Warranty</p>
                      <p className="font-light text-foreground">{product.warrantyInformation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-sm font-light uppercase tracking-[0.2em] text-muted-foreground">
                  Customer Reviews
                </h3>
                <div className="space-y-4">
                  {product.reviews.slice(0, 3).map((review, idx) => (
                    <Card key={idx} className="border-border rounded-none bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-light text-foreground">{review.reviewerName}</p>
                            <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? 'fill-foreground text-foreground'
                                    : 'text-muted/30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-light text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card max-w-md w-full p-8 border-2 border-border shadow-2xl">
            <h2 className="text-2xl font-light text-foreground mb-4">Delete Product</h2>
            <p className="text-muted-foreground font-light mb-6">
              Are you sure you want to delete &quot;{product.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-light tracking-widest uppercase text-xs h-12"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                variant="outline"
                className="flex-1 border-2 border-border hover:border-foreground font-light tracking-widest uppercase text-xs h-12"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
