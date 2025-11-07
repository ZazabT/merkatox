import axios from 'axios';
import type { Product, ProductsResponse, ProductFormData } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch products with pagination
export const fetchProducts = async (limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(`/products`, {
    params: { limit, skip },
  });
  return response.data;
};

// Search products
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(`/products/search`, {
    params: { q: query },
  });
  return response.data;
};

// Fetch single product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// Fetch all categories
export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>(`/products/categories`);
  return response.data;
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(`/products/category/${category}`);
  return response.data;
};

// Create new product
export const createProduct = async (data: ProductFormData): Promise<Product> => {
  const response = await api.post<Product>(`/products/add`, data);
  return response.data;
};

// Update existing product
export const updateProduct = async (id: number, data: Partial<ProductFormData>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
};

// Delete product
export const deleteProduct = async (id: number): Promise<{ id: number; isDeleted: boolean }> => {
  const response = await api.delete<{ id: number; isDeleted: boolean }>(`/products/${id}`);
  return response.data;
};
