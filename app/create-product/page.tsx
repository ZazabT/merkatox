'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/api/products';
import { Plus, Loader2, Check, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateProductPage() {
  const router = useRouter();
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

      const newProduct = await createProduct(productData);
      
      setSuccess(true);
      toast.success('Product created successfully!', {
        description: `${newProduct.title} has been added to the store.`,
      });
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.log(err);
      const errorMessage = 'Failed to create product. Please try again.';
      setError(errorMessage);
      toast.error('Creation Failed', {
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background pt-32">
      <div className="container mx-auto px-4 py-12 max-w-3xl">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 font-light tracking-wide uppercase text-sm group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </button>
        {/* Header Section */}
        <div className="space-y-6 text-center mb-12">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Plus className="w-8 h-8 text-foreground" />
              <h1 className="text-5xl md:text-6xl font-extralight text-foreground tracking-tight leading-tight">
                Create Product
              </h1>
            </div>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </div>
          <p className="text-muted-foreground font-light text-lg tracking-wide leading-relaxed">
            Add a new product to the collection
          </p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border p-8 shadow-sm rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-light uppercase tracking-wider text-foreground/70">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-border focus:border-foreground focus:outline-none transition-colors font-light text-foreground bg-background"
                placeholder="e.g., Premium Leather Wallet"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-light uppercase tracking-wider text-foreground/70">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-border focus:border-foreground focus:outline-none transition-colors font-light text-foreground bg-background resize-none"
                placeholder="Enter product description..."
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-light uppercase tracking-wider text-foreground/70">
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
                  className="w-full px-4 py-3 border-2 border-border focus:border-foreground focus:outline-none transition-colors font-light text-foreground bg-background"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="stock" className="block text-sm font-light uppercase tracking-wider text-foreground/70">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border-2 border-border focus:border-foreground focus:outline-none transition-colors font-light text-foreground bg-background"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Brand & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="brand" className="block text-sm font-light uppercase tracking-wider text-foreground/70">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-border focus:border-foreground focus:outline-none transition-colors font-light text-foreground bg-background"
                  placeholder="e.g., Nike, Apple, etc."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-light uppercase tracking-wider text-foreground/70">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-border focus:border-foreground focus:outline-none transition-colors font-light text-foreground bg-background"
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
              <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 font-light rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 font-light flex items-center gap-2 rounded-lg">
                <Check className="w-5 h-5" />
                Product created successfully! Redirecting...
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || success}
                className="flex-1 bg-foreground hover:bg-foreground/90 text-background font-light tracking-widest uppercase text-xs py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : success ? (
                  <>
                    <Check className="w-4 h-4" />
                    Created
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Product
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-8 py-4 border-2 border-border hover:border-foreground text-foreground font-light tracking-widest uppercase text-xs transition-all duration-300 rounded-lg"
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
