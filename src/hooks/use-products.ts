'use client';

import { useState, useEffect } from 'react';

interface UseProductsOptions {
  category?: string;
  supplierId?: string;
  limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<import('@/types').Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (options.category) params.set('category', options.category);
    if (options.supplierId) params.set('supplier_id', options.supplierId);
    if (options.limit) params.set('limit', String(options.limit));

    fetch(`/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.error || 'Failed to fetch products');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, [options.category, options.supplierId, options.limit]);

  return { products, loading, error };
}

export function useProduct(id: string | null) {
  const [product, setProduct] = useState<import('@/types').Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/products?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.error || 'Product not found');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
