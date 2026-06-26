'use client';

import { useState, useEffect } from 'react';

export interface PageSection {
  id: number;
  page: string;
  section_type: string;
  title: string | null;
  subtitle: string | null;
  content: Record<string, unknown>;
  image_url: string | null;
  background_color: string | null;
  sort_order: number;
  is_visible: boolean;
  items?: SectionItem[];
}

export interface SectionItem {
  id: number;
  section_id: number;
  item_type: string;
  reference_id: number | null;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  icon_name: string | null;
  content: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
}

export function usePageSections(page: string = 'home') {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`/api/sections?page=${page}`);
        if (!res.ok) throw new Error('Failed to fetch sections');
        const data = await res.json();
        setSections(data.sections || []);
      } catch (err) {
        console.error('Failed to load page sections:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, [page]);

  return { sections, loading, error };
}
