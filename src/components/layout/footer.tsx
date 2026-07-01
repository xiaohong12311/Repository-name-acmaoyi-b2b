import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { getCompanyInfo, getContactInfo, getSocialLinks } from '@/config/brand-config';

export function Footer() {
  const companyInfo = getCompanyInfo();
  const contactInfo = getContactInfo();
  const socialLinks = getSocialLinks();

  return (
    <footer className="bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="ACMAOYI"
                width={80}
                height={80}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="font-semibold text-lg text-white">{companyInfo.name}</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              {companyInfo.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {socialLinks.twitter && (
                <Link href={socialLinks.twitter} className="text-gray-400 hover:text-white transition-colors" target="_blank" aria-label="X (Twitter)">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
              )}
              {socialLinks.instagram && (
                <Link href={socialLinks.instagram} className="text-gray-400 hover:text-white transition-colors" target="_blank" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </Link>
              )}
              {socialLinks.facebook && (
                <Link href={socialLinks.facebook} className="text-gray-400 hover:text-white transition-colors" target="_blank" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
              )}
              {socialLinks.tiktok && (
                <Link href={socialLinks.tiktok} className="text-gray-400 hover:text-white transition-colors" target="_blank" aria-label="TikTok">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.72 2.93 2.93 0 01.88.14V5.28a7.82 7.82 0 00-7 7.47v2.83a7.82 7.82 0 007.73 7.73h.28a7.82 7.82 0 007.73-7.73v-2.83a7.82 7.82 0 00-.46-2.53z"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=kitchen" className="text-sm text-gray-300 hover:text-white">
                  Kitchen Supplies
                </Link>
              </li>
              <li>
                <Link href="/products?category=lighting" className="text-sm text-gray-300 hover:text-white">
                  Lighting Equipment
                </Link>
              </li>
              <li>
                <Link href="/products?category=packaging" className="text-sm text-gray-300 hover:text-white">
                  Packaging & Printing
                </Link>
              </li>
              <li>
                <Link href="/products?category=tools" className="text-sm text-gray-300 hover:text-white">
                  Industrial Tools
                </Link>
              </li>
              <li>
                <Link href="/products?category=garment" className="text-sm text-gray-300 hover:text-white">
                  Custom Apparel
                </Link>
              </li>
              <li>
                <Link href="/products?category=storage" className="text-sm text-gray-300 hover:text-white">
                  Storage Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inquiry" className="text-sm text-gray-300 hover:text-white">
                  Send Inquiry
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm text-gray-300 hover:text-white">
                  Download Catalog
                </Link>
              </li>
              <li>
                <Link href="/supplier-join" className="text-sm text-gray-300 hover:text-white">
                  Become an Agent
                </Link>
              </li>
              <li>
                <Link href="/factory" className="text-sm text-gray-300 hover:text-white">
                  Factory Showcase
                </Link>
              </li>
              <li>
                <Link href="/customization" className="text-sm text-gray-300 hover:text-white">
                  Custom Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
              {contactInfo.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{contactInfo.phone}</span>
                </li>
              )}
              {contactInfo.whatsapp && (
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>WhatsApp: {contactInfo.whatsapp.replace(/^\+86\s*/, '')}</span>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span className="text-xs whitespace-pre-line">{contactInfo.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Wholesale Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Agent Agreement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
