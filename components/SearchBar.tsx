'use client';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search products...' }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
