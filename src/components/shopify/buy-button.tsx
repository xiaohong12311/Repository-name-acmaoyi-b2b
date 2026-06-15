'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ShopifyBuyButtonProps {
  productId: string;
  shopDomain?: string;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

/**
 * Shopify Buy Button Component
 * 
 * This component embeds a Shopify Buy Button for direct purchasing.
 * The buy button code should be generated from Shopify admin:
 * Settings → Sales channels → Buy Button → Create buy button
 * 
 * Usage:
 * 1. Generate buy button code from Shopify
 * 2. Pass the product ID or embed the generated script
 * 
 * For B2B wholesale, this can be used for sample purchases or small orders.
 */
export function ShopifyBuyButton({
  productId,
  shopDomain = 'acmaoyi.com',
  buttonText = 'Buy Now',
  variant = 'default',
  size = 'lg',
  className = ''
}: ShopifyBuyButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Shopify Buy Button SDK if not already loaded
    if (typeof window !== 'undefined' && !window.ShopifyBuy) {
      const script = document.createElement('script');
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        initBuyButton();
      };
    } else if (window.ShopifyBuy) {
      initBuyButton();
    }

    function initBuyButton() {
      if (!containerRef.current || !window.ShopifyBuy) return;

      // Clear previous button if exists
      containerRef.current.innerHTML = '';

      try {
        const shopifyBuy = window.ShopifyBuy;
        if (!shopifyBuy) return;
        
        shopifyBuy.buildClient({
          domain: shopDomain,
          storefrontAccessToken: 'YOUR_STOREFRONT_ACCESS_TOKEN', // Replace with actual token
        }).then(function(client) {
          client.product.fetch(productId).then(function(product: { id: string }) {
            if (!containerRef.current || !window.ShopifyBuy) return;
            
            window.ShopifyBuy.UI.onReady(client).then(function(ui: { 
              createComponent: (type: string, config: { 
                id: string; 
                node: HTMLElement | null; 
                options: Record<string, unknown> 
              }) => void 
            }) {
              ui.createComponent('product', {
                id: product.id,
                node: containerRef.current,
                options: {
                  product: {
                    buttonDestination: 'cart',
                    contents: {
                      title: false,
                      variantTitle: false,
                      price: false,
                      description: false,
                      img: false,
                      imgWithCarousel: false,
                      quantity: false,
                      button: true,
                      buttonWithQuantity: false,
                    },
                    text: {
                      button: buttonText,
                    },
                    styles: {
                      button: {
                        'background-color': '#1E40AF',
                        'border-radius': '8px',
                        'font-size': '16px',
                        'padding': '12px 24px',
                      }
                    }
                  },
                  cart: {
                    styles: {
                      button: {
                        'background-color': '#1E40AF',
                      }
                    },
                    popup: false,
                  }
                }
              });
            });
          });
        });
      } catch (error) {
        console.error('Shopify Buy Button initialization failed:', error);
      }
    }

    return () => {
      // Cleanup if needed
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [productId, shopDomain, buttonText]);

  // Fallback button if Shopify SDK fails to load
  return (
    <div className={`shopify-buy-button-container ${className}`}>
      <div ref={containerRef} className="shopify-button-wrapper" />
      
      {/* Fallback manual button - shows if SDK not loaded */}
      <Button
        variant={variant}
        size={size}
        className="gap-2 bg-green-600 hover:bg-green-700"
        onClick={() => {
          // Open Shopify product page directly as fallback
          window.open(`https://${shopDomain}/products/${productId}`, '_blank');
        }}
      >
        <ShoppingCart className="h-5 w-5" />
        {buttonText} (via Shopify)
      </Button>
    </div>
  );
}

/**
 * Simple Shopify Link Button
 * 
 * A simpler alternative that just links to the Shopify product page.
 * No SDK required, works immediately.
 */
export function ShopifyLinkButton({
  shopDomain = 'acmaoyi.com',
  productHandle,
  buttonText = 'Buy on Shopify',
  variant = 'default',
  size = 'lg',
  className = ''
}: {
  shopDomain?: string;
  productHandle: string;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}) {
  return (
    <Button
      variant={variant}
      size={size}
      className={`gap-2 bg-green-600 hover:bg-green-700 ${className}`}
      onClick={() => {
        window.open(`https://${shopDomain}/products/${productHandle}`, '_blank');
      }}
    >
      <ShoppingCart className="h-5 w-5" />
      {buttonText}
    </Button>
  );
}

/**
 * Shopify Cart Embed Component
 * 
 * Embed a full Shopify cart/buy button using generated code from Shopify admin.
 * Paste the generated script code directly.
 */
export function ShopifyCartEmbed({
  embedCode,
  className = ''
}: {
  embedCode: string; // The generated JavaScript code from Shopify
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !embedCode) return;

    // Create a script element from the embed code
    const script = document.createElement('script');
    script.innerHTML = embedCode;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [embedCode]);

  return <div ref={containerRef} className={`shopify-cart-embed ${className}`} />;
}

// Type declaration for Shopify SDK
declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: { domain: string; storefrontAccessToken: string }) => Promise<any>;
      UI: {
        onReady: (client: any) => Promise<any>;
      };
    };
  }
}