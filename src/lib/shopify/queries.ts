// Shopify Storefront API GraphQL Queries

// Get all products with pagination
export const GET_PRODUCTS = `
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
          metafields(identifiers: [{namespace: "custom", key: "moq"}, {namespace: "custom", key: "tier_prices"}, {namespace: "custom", key: "lead_time"}, {namespace: "custom", key: "sample_available"}]) {
            namespace
            key
            value
            type
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get single product by handle
export const GET_PRODUCT_BY_HANDLE = `
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
            metafields(identifiers: [{namespace: "custom", key: "min_qty"}]) {
              namespace
              key
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
      metafields(identifiers: [{namespace: "custom", key: "moq"}, {namespace: "custom", key: "tier_prices"}, {namespace: "custom", key: "lead_time"}, {namespace: "custom", key: "sample_available"}, {namespace: "custom", key: "sample_price"}, {namespace: "custom", key: "customization_available"}]) {
        namespace
        key
        value
        type
      }
      vendor
    }
  }
`;

// Get products by collection
export const GET_COLLECTION_PRODUCTS = `
  query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first, after: $after) {
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
            metafields(identifiers: [{namespace: "custom", key: "moq"}, {namespace: "custom", key: "tier_prices"}]) {
              namespace
              key
              value
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// Get all collections
export const GET_COLLECTIONS = `
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
`;

// Search products
export const SEARCH_PRODUCTS = `
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
`;

// Create cart
export const CREATE_CART = `
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
`;

// Add to cart
export const ADD_TO_CART = `
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
`;

// Update cart line
export const UPDATE_CART_LINE = `
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
`;

// Remove from cart
export const REMOVE_FROM_CART = `
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
`;

// Get cart
export const GET_CART = `
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
                compareAtPrice {
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
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        email
        countryCode
      }
    }
  }
`;