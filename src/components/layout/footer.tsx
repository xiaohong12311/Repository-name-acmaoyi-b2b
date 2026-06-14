import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-white font-bold text-lg">
                B2B
              </div>
              <span className="font-semibold text-lg">Wholesale Platform</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Professional B2B wholesale platform connecting quality suppliers with buyers, providing one-stop wholesale solutions.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-gray-400 hover:text-blue-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.3 8.3 0 013.395 6.61c0 .963-.155 1.904-.44 2.79-.802-.193-1.648-.29-2.495-.29-2.65 0-5.26.93-7.28 2.63-.905-.578-1.91-.99-2.97-1.22.3-.94.49-1.94.49-2.99 0-2.72-1.23-5.17-3.15-6.79A8.3 8.3 0 0112 3.72c2.31 0 4.41.88 6.605 2.89zM5.395 17.39a8.3 8.3 0 01-3.395-6.61c0-.963.155-1.904.44-2.79.802.193 1.648.29 2.495.29 2.65 0 5.26-.93 7.28-2.63.905.578 1.91.99 2.97 1.22-.3.94-.49 1.94-.49 2.99 0 2.72 1.23 5.17 3.15 6.79A8.3 8.3 0 0112 20.28c-2.31 0-4.41-.88-6.605-2.89z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-semibold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=kitchen" className="text-sm text-gray-600 hover:text-blue-700">
                  Kitchen Supplies
                </Link>
              </li>
              <li>
                <Link href="/products?category=lighting" className="text-sm text-gray-600 hover:text-blue-700">
                  Lighting Equipment
                </Link>
              </li>
              <li>
                <Link href="/products?category=packaging" className="text-sm text-gray-600 hover:text-blue-700">
                  Packaging & Printing
                </Link>
              </li>
              <li>
                <Link href="/products?category=tools" className="text-sm text-gray-600 hover:text-blue-700">
                  Industrial Tools
                </Link>
              </li>
              <li>
                <Link href="/products?category=garment" className="text-sm text-gray-600 hover:text-blue-700">
                  Custom Apparel
                </Link>
              </li>
              <li>
                <Link href="/products?category=storage" className="text-sm text-gray-600 hover:text-blue-700">
                  Storage Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inquiry" className="text-sm text-gray-600 hover:text-blue-700">
                  Send Inquiry
                </Link>
              </li>
              <li>
                <Link href="/sample-cart" className="text-sm text-gray-600 hover:text-blue-700">
                  Request Samples
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm text-gray-600 hover:text-blue-700">
                  Download Catalog
                </Link>
              </li>
              <li>
                <Link href="/supplier-join" className="text-sm text-gray-600 hover:text-blue-700">
                  Become a Supplier
                </Link>
              </li>
              <li>
                <Link href="/factory" className="text-sm text-gray-600 hover:text-blue-700">
                  Factory Showcase
                </Link>
              </li>
              <li>
                <Link href="/customization" className="text-sm text-gray-600 hover:text-blue-700">
                  Custom Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Hotline: +1 (888) 888-8888</li>
              <li>Hours: Mon-Fri 9:00 AM - 6:00 PM</li>
              <li>Email: support@b2b-platform.com</li>
              <li>Address: 599 Wangshang Road, Binjiang District, Hangzhou</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Wholesale Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-700">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-700">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-700">Supplier Agreement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}