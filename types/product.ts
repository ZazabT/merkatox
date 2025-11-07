// Product type based on DummyJSON API response
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// API Response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface SingleProductResponse {
  id: number;
  title: string;
  price: number;
}

// Form data types for Create/Edit
export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
}

// Categories response
export interface CategoriesResponse {
  slug: string;
  name: string;
  url: string;
}
