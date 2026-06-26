import { NextResponse } from 'next/server';
import { supabaseSelect } from '@/lib/admin-helper';

// GET /api/sections?page=home - Public API for frontend rendering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'home';

    const sections = await supabaseSelect('page_sections', '*', `page=eq.${page}&is_visible=eq.true&order=sort_order.asc`);

    // Get items for all visible sections
    const sectionIds = sections.map((s: Record<string, unknown>) => s.id as number);
    let allItems: Record<string, unknown>[] = [];
    if (sectionIds.length > 0) {
      allItems = await supabaseSelect('section_items', '*', 'order=sort_order.asc');
      allItems = allItems.filter((item) =>
        sectionIds.includes(item.section_id as number) && item.is_visible === true
      );
    }

    const sectionsWithItems = sections.map((section: Record<string, unknown>) => ({
      ...section,
      items: allItems.filter((item) => item.section_id === section.id),
    }));

    return NextResponse.json({ success: true, sections: sectionsWithItems });
  } catch (error) {
    console.error('Public sections GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}
