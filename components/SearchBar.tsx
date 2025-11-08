'use client';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
}

export default function SearchBar({ onSearch, placeholder = 'Search products...', value }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className="w-full px-6 py-4 border-2 border-border rounded-lg focus:border-foreground focus:outline-none transition-colors font-light text-foreground placeholder:text-muted-foreground placeholder:font-light bg-background dark:bg-card"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
