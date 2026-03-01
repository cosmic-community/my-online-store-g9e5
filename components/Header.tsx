import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">My Online Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              Reviews
            </Link>
          </nav>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <div className="relative group">
      <button className="p-2 text-gray-600 hover:text-brand-600 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all">
        <div className="py-2">
          <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Home</Link>
          <Link href="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Products</Link>
          <Link href="/categories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Categories</Link>
          <Link href="/reviews" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Reviews</Link>
        </div>
      </div>
    </div>
  );
}