import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
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
            {/* Contact Information */}
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{contactInfo.email}</span>
              </div>
              {contactInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{contactInfo.phone}</span>
                </div>
              )}
              {contactInfo.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span className="text-xs">{contactInfo.address}</span>
                </div>
              )}
            </div>
            {/* Social Links */}
            {(socialLinks.facebook || socialLinks.tiktok) && (
              <div className="flex gap-3 mt-4">
                {socialLinks.facebook && (
                  <Link href={socialLinks.facebook} className="text-gray-400 hover:text-white" target="_blank">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </Link>
                )}
                {socialLinks.tiktok && (
                  <Link href={socialLinks.tiktok} className="text-gray-400 hover:text-white" target="_blank">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.72 2.93 2.93 0 01.88.14V5.28a7.82 7.82 0 00-7 7.47v2.83a7.82 7.82 0 007.73 7.73h.28a7.82 7.82 0 007.73-7.73v-2.83a7.82 7.82 0 00-.46-2.53z"/>
                    </svg>
                  </Link>
                )}
              </div>
            )}
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
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Hotline: +1 (888) 888-8888</li>
              <li>Hours: Mon-Fri 9:00 AM - 6:00 PM</li>
              <li>Email: support@b2b-platform.com</li>
              <li>Address: 599 Wangshang Road, Binjiang District, Hangzhou</li>
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
