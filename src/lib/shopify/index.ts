// Shopify Integration Index
// Export all Shopify-related utilities

export * from './config';
export * from './queries';
export * from './client';

// Adapter function: Convert Shopify product to our internal Product type
import type { Product, TierPrice, ProductSpecification } from '@/types';
import type { ShopifyProduct, ShopifyVariant } from './client';

export function shopifyProductToProduct(
  shopifyProduct: ShopifyProduct,
  index: number
): Product {
  // Parse tier prices from metafields if available
  let tierPrices: TierPrice[] = [];
  
  // Get variants for tier pricing (variants with different quantities can represent tiers)
  const variants = shopifyProduct.variants.edges.map(e => e.node);
  
  if (variants.length > 1) {
    // Use variants as tier prices
    tierPrices = variants.map((v, i) => ({
      minQuantity: i === 0 ? 1 : i * 100,
      maxQuantity: i === variants.length - 1 ? null : (i + 1) * 100 - 1,
      price: parseFloat(v.price.amount),
    }));
  } else if (variants.length === 1) {
    // Single variant, create basic tier
    tierPrices = [
      { minQuantity: 1, maxQuantity: null, price: parseFloat(variants[0].price.amount) }
    ];
  }

  // Parse specifications from selected options
  const specifications: ProductSpecification[] = [];
  if (variants.length > 0 && variants[0].selectedOptions) {
    variants[0].selectedOptions.forEach(opt => {
      specifications.push({ name: opt.name, value: opt.value });
    });
  }

  // Parse MOQ from tags or default
  const moqTag = shopifyProduct.tags.find(t => t.startsWith('MOQ:'));
  const moq = moqTag ? parseInt(moqTag.split(':')[1]) : 10;

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    description: shopifyProduct.description,
    categoryId: shopifyProduct.productType || 'general',
    supplierId: shopifyProduct.vendor || 'unknown',
    images: shopifyProduct.images.edges.map(e => e.node.url),
    tierPrices,
    moq,
    unit: 'pcs',
    specifications,
    sampleAvailable: shopifyProduct.tags.includes('sample-available'),
    samplePrice: parseFloat(variants[0]?.price?.amount || '0') * 2,
    customizationAvailable: shopifyProduct.tags.includes('customizable'),
    leadTime: '7-15 days',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: shopifyProduct.handle,
  };
}

// Generate slug from handle
export function generateSlug(handle: string): string {
  return handle;
}

// Get image URL with fallback
export function getProductImageUrl(product: ShopifyProduct): string {
  if (product.featuredImage?.url) {
    return product.featuredImage.url;
  }
  if (product.images.edges.length > 0) {
    return product.images.edges[0].node.url;
  }
  return '/placeholder-product.png';
}