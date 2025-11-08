'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProductById, updateProduct } from '@/lib/api/products';
import { Edit, Loader2, Check, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    category: '',
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const product = await fetchProductById(parseInt(unwrappedParams.id));
        setFormData({
          title: product.title,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock.toString(),
          brand: product.brand || '',
          category: product.category,
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate
      if (!formData.title || !formData.price) {
        setError('Title and Price are required');
        setIsSubmitting(false);
        return;
      }

      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: formData.stock ? parseInt(formData.stock) : 0,
        brand: formData.brand,
        category: formData.category,
      };

      const updatedProduct = await updateProduct(parseInt(unwrappedParams.id), productData);
      
      setSuccess(true);
      toast.success('Product updated successfully!', {
        description: `${updatedProduct.title} has been updated.`,
      });
      
      setTimeout(() => {
        router.push(`/product/${unwrappedParams.id}`);
      }, 1500);
    } catch (err) {
      const errorMessage = 'Failed to update product. Please try again.';
      setError(errorMessage);
      toast.error('Update Failed', {
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header Section */}
        <div className="space-y-6 text-center mb-12">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Edit className="w-8 h-8 text-gray-900" />
              <h1 className="text-5xl md:text-6xl font-extralight text-gray-900 tracking-tight leading-tight">
                Edit Product
              </h1>
            </div>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>
          <p className="text-gray-500 font-light text-lg tracking-wide leading-relaxed">
            Update product information
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-300 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-light uppercase tracking-wider text-gray-700">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors font-light text-gray-900"
                placeholder="e.g., Premium Leather Wallet"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-light uppercase tracking-wider text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors font-light text-gray-900 resize-none"
                placeholder="Enter product description..."
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-light uppercase tracking-wider text-gray-700">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors font-light text-gray-900"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="stock" className="block text-sm font-light uppercase tracking-wider text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors font-light text-gray-900"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Brand & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="brand" className="block text-sm font-light uppercase tracking-wider text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors font-light text-gray-900"
                  placeholder="e.g., Nike, Apple, etc."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-light uppercase tracking-wider text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:border-gray-900 focus:outline-none transition-colors font-light text-gray-900"
                >
                  <option value="">Select a category</option>
                  <option value="beauty">Beauty</option>
                  <option value="fragrances">Fragrances</option>
                  <option value="furniture">Furniture</option>
                  <option value="groceries">Groceries</option>
                  <option value="home-decoration">Home Decoration</option>
                  <option value="kitchen-accessories">Kitchen Accessories</option>
                  <option value="laptops">Laptops</option>
                  <option value="mens-shirts">Men&apos;s Shirts</option>
                  <option value="mens-shoes">Men&apos;s Shoes</option>
                  <option value="mens-watches">Men&apos;s Watches</option>
                  <option value="mobile-accessories">Mobile Accessories</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="sports-accessories">Sports Accessories</option>
                  <option value="sunglasses">Sunglasses</option>
                  <option value="tablets">Tablets</option>
                  <option value="tops">Tops</option>
                  <option value="womens-bags">Women&apos;s Bags</option>
                  <option value="womens-dresses">Women&apos;s Dresses</option>
                  <option value="womens-jewellery">Women&apos;s Jewellery</option>
                  <option value="womens-shoes">Women&apos;s Shoes</option>
                  <option value="womens-watches">Women&apos;s Watches</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 font-light">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-4 py-3 font-light flex items-center gap-2">
                <Check className="w-5 h-5" />
                Product updated successfully! Redirecting...
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || success}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-light tracking-widest uppercase text-xs py-4 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : success ? (
                  <>
                    <Check className="w-4 h-4" />
                    Updated
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Update Product
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 border-2 border-gray-300 hover:border-gray-900 text-gray-900 font-light tracking-widest uppercase text-xs transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
