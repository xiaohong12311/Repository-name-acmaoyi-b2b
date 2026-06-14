// Shopify Storefront API Configuration
// Replace these values with your Shopify store credentials

export const SHOPIFY_CONFIG = {
  // Your Shopify store domain (e.g., 'your-store.myshopify.com')
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com',
  
  // Storefront API access token (from Shopify Admin > Settings > Headless)
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN || 'your-storefront-access-token',
  
  // API version (use the latest stable version)
  apiVersion: '2024-01',
};

// Shopify Storefront API endpoint
export const SHOPIFY_API_URL = `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;

// Headers for API requests
export const getShopifyHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontAccessToken,
});

// Check if Shopify is configured
export const isShopifyConfigured = (): boolean => {
  return (
    SHOPIFY_CONFIG.storeDomain !== 'your-store.myshopify.com' &&
    SHOPIFY_CONFIG.storefrontAccessToken !== 'your-storefront-access-token'
  );
};