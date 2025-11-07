'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Merkatox</h3>
            <p className="text-gray-400">
              Your one-stop shop for all your shopping needs. Browse, favorite, and manage products with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-white transition">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/create-product" className="text-gray-400 hover:text-white transition">
                  Create Product
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@merkatox.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Shopping St, Commerce City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Merkatox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
