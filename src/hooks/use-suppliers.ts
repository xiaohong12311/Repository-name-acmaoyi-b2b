'use client';

import { useState, useEffect } from 'react';

interface UseSuppliersOptions {
  country?: string;
  limit?: number;
}

export function useSuppliers(options: UseSuppliersOptions = {}) {
  const [suppliers, setSuppliers] = useState<import('@/types').Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (options.country) params.set('country', options.country);
    if (options.limit) params.set('limit', String(options.limit));

    fetch(`/api/suppliers?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuppliers(data.suppliers);
        } else {
          setError(data.error || 'Failed to fetch suppliers');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, [options.country, options.limit]);

  return { suppliers, loading, error };
}

export function useSupplier(id: string | null) {
  const [supplier, setSupplier] = useState<import('@/types').Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`/api/suppliers?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSupplier(data.supplier);
        } else {
          setError(data.error || 'Supplier not found');
        }
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { supplier, loading, error };
}
