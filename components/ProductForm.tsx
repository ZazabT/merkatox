'use client';

import { ProductFormData } from '@/types/product';

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  mode: 'create' | 'edit';
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export default function ProductForm({ initialData, mode, onSubmit }: ProductFormProps) {
  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-bold">
        {mode === 'create' ? 'Create Product' : 'Edit Product'}
      </h2>
      {/* Form fields will be implemented */}
    </form>
  );
}
