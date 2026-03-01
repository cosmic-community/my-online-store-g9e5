import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">My Online Store</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop shop for quality products at great prices. Browse our curated collection and find something you love.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Powered By</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Content managed with{' '}
              <a
                href="https://www.cosmicjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                Cosmic
              </a>
              . Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} My Online Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}