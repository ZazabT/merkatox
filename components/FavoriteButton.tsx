'use client';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-100"
      aria-label="Toggle favorite"
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}
