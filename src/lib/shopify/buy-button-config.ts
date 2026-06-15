/**
 * Shopify Buy Button Configuration
 * 
 * Configure your Shopify store settings for Buy Button integration.
 * 
 * How to get these values:
 * 1. Go to Shopify Admin → Settings → Sales channels → Buy Button
 * 2. Create a Buy Button for your product
 * 3. Generate the embed code
 * 4. Copy the relevant values from the generated code
 */

export const shopifyConfig = {
  // Your Shopify store domain (without https://)
  shopDomain: process.env.NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN || 'acmaoyi.com',
  
  // Storefront Access Token (from Buy Button generated code)
  // This is different from the API access token we were trying to get
  // It's provided directly in the Buy Button embed code
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '',
  
  // Your store's primary currency
  currency: 'USD',
  
  // Language/locale
  language: 'en',
};

/**
 * Product mapping: Your local product IDs to Shopify product handles
 * 
 * Update this mapping to connect your B2B platform products to Shopify products.
 * The 'handle' is the URL slug of the product in Shopify (e.g., /products/wireless-earbuds)
 */
export const productMapping: Record<string, { handle: string; shopifyId?: string }> = {
  // Example mappings - update with your actual products
  '1': { handle: 'wireless-earbuds-bluetooth' },
  '2': { handle: 'smart-watch-series-5' },
  '3': { handle: 'bluetooth-speaker-portable' },
  '4': { handle: 'led-desk-lamp-modern' },
  '5': { handle: 'usb-c-hub-7-port' },
  '6': { handle: 'mechanical-keyboard-gaming' },
  // Add more mappings as needed
};

/**
 * Get Shopify product handle from local product ID
 */
export function getShopifyProductHandle(localProductId: string): string | undefined {
  return productMapping[localProductId]?.handle;
}

/**
 * Get Shopify product URL
 */
export function getShopifyProductUrl(productHandle: string): string {
  return `https://${shopifyConfig.shopDomain}/products/${productHandle}`;
}