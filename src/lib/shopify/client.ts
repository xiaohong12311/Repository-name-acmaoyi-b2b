import { SHOPIFY_API_URL, getShopifyHeaders, isShopifyConfigured } from './config';

// Generic GraphQL request function
async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<{ data: T; errors?: Array<{ message: string }> }> {
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: getShopifyHeaders(),
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify API Error:', json.errors);
    throw new Error(json.errors[0].message);
  }

  return json;
}

// Product Types
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  metafields: Array<{
    namespace: string;
    key: string;
    value: string;
    type: string;
  } | null> | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  metafields: Array<{
    namespace: string;
    key: string;
    value: string;
  } | null> | null;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {
    id: string;
    url: string;
    altText: string | null;
  } | null;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          sku: string | null;
          product: {
            id: string;
            title: string;
            handle: string;
            featuredImage: {
              url: string;
              altText: string | null;
            } | null;
            vendor: string;
          };
          price: {
            amount: string;
            currencyCode: string;
          };
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      };
    }>;
  };
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

// API Functions

// Get all products
export async function getProducts(first: number = 50, after?: string) {
  if (!isShopifyConfigured()) {
    return { products: { edges: [] }, pageInfo: { hasNextPage: false } };
  }

  const { data } = await shopifyFetch<{
    products: {
      edges: Array<{ node: ShopifyProduct }>;
      pageInfo: { hasNextPage: boolean; endCursor: string };
    };
  }>(
    `
    query GetProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          node {
            id
            title
            description
            handle
            productType
            vendor
            tags
            featuredImage {
              id
              url
              altText
            }
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  sku
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
    { first, after }
  );

  return data.products;
}

// Get product by handle
export async function getProductByHandle(handle: string) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const { data } = await shopifyFetch<{ product: ShopifyProduct | null }>(
    `
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        handle
        productType
        vendor
        tags
        featuredImage {
          id
          url
          altText
        }
        images(first: 20) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              sku
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        }
        options {
          id
          name
          values
        }
      }
    }
  `,
    { handle }
  );

  return data.product;
}

// Get collections
export async function getCollections(first: number = 20) {
  if (!isShopifyConfigured()) {
    return { edges: [] };
  }

  const { data } = await shopifyFetch<{
    collections: {
      edges: Array<{ node: ShopifyCollection }>;
    };
  }>(
    `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              id
              url
              altText
            }
          }
        }
      }
    }
  `,
    { first }
  );

  return data.collections;
}

// Get products by collection
export async function getCollectionProducts(handle: string, first: number = 50) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const { data } = await shopifyFetch<{
    collection: {
      id: string;
      title: string;
      description: string;
      products: {
        edges: Array<{ node: ShopifyProduct }>;
        pageInfo: { hasNextPage: boolean };
      };
    } | null;
  }>(
    `
    query GetCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        description
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              featuredImage {
                id
                url
                altText
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                    quantityAvailable
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    }
  `,
    { handle, first }
  );

  return data.collection;
}

// Search products
export async function searchProducts(query: string, first: number = 20) {
  if (!isShopifyConfigured()) {
    return { edges: [] };
  }

  const { data } = await shopifyFetch<{
    search: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  }>(
    `
    query SearchProducts($query: String!, $first: Int!) {
      search(query: $query, types: PRODUCT, first: $first) {
        edges {
          node {
            ... on Product {
              id
              title
              description
              handle
              featuredImage {
                id
                url
                altText
              }
              variants(first: 5) {
                edges {
                  node {
                    id
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    { query, first }
  );

  return data.search;
}

// Cart operations

// Create cart
export async function createCart() {
  if (!isShopifyConfigured()) {
    return null;
  }

  const { data } = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(
    `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `
  );

  return data.cartCreate.cart;
}

// Add to cart
export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const { data } = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(
    `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    }
  );

  return data.cartLinesAdd.cart;
}

// Get cart
export async function getCart(cartId: string) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const { data } = await shopifyFetch<{ cart: ShopifyCart | null }>(
    `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  sku
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                    vendor
                  }
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `,
    { cartId }
  );

  return data.cart;
}

// Update cart line quantity
export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const { data } = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(
    `
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  return data.cartLinesUpdate.cart;
}

// Remove from cart
export async function removeFromCart(cartId: string, lineIds: string[]) {
  if (!isShopifyConfigured()) {
    return null;
  }

  const { data } = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(
    `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    { cartId, lineIds }
  );

  return data.cartLinesRemove.cart;
}