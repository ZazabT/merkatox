'use client';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  productTitle?: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  productTitle,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
        <p className="mb-6">
          Are you sure you want to delete {productTitle ? `"${productTitle}"` : 'this product'}?
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
