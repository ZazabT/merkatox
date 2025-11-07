'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Merkatox
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/favorites" className="hover:text-blue-600">
            Favorites
          </Link>
          <Link href="/create-product" className="hover:text-blue-600">
            Create
          </Link>
        </div>
      </nav>
    </header>
  );
}
