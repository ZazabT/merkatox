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
      className="w-full px-6 py-4 border-2 border-gray-600 rounded-lg focus:border-gray-900 focus:outline-none transition-colors font-light text-gray-900 placeholder:text-gray-400 placeholder:font-light"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
