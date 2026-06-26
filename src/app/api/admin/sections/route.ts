import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseSelect, supabaseInsert, supabaseUpdate, supabaseDelete } from '@/lib/admin-helper';

// GET /api/admin/sections?page=home
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'home';
    const id = searchParams.get('id');

    if (id) {
      const sections = await supabaseSelect('page_sections', '*', `id=eq.${id}`);
      if (sections.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

      const items = await supabaseSelect('section_items', '*', `section_id=eq.${id}&order=sort_order.asc`);
      return NextResponse.json({ success: true, section: sections[0], items });
    }

    const sections = await supabaseSelect('page_sections', '*', `page=eq.${page}&order=sort_order.asc`);

    // Get items for all sections
    const sectionIds = sections.map((s: Record<string, unknown>) => s.id as number);
    let allItems: Record<string, unknown>[] = [];
    if (sectionIds.length > 0) {
      // Fetch all items and filter in JS since Supabase doesn't support OR on same column easily
      allItems = await supabaseSelect('section_items', '*', 'order=sort_order.asc');
      allItems = allItems.filter((item) => sectionIds.includes(item.section_id as number));
    }

    const sectionsWithItems = sections.map((section: Record<string, unknown>) => ({
      ...section,
      items: allItems.filter((item) => item.section_id === section.id),
    }));

    return NextResponse.json({ success: true, sections: sectionsWithItems });
  } catch (error) {
    console.error('Sections GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}

// POST /api/admin/sections - Create new section
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { page, section_type, title, subtitle, content, image_url, background_color, sort_order, is_visible } = body;

    const section = await supabaseInsert('page_sections', {
      page: page || 'home',
      section_type,
      title: title || '',
      subtitle: subtitle || '',
      content: content || {},
      image_url: image_url || null,
      background_color: background_color || null,
      sort_order: sort_order || 0,
      is_visible: is_visible !== undefined ? is_visible : true,
    });

    return NextResponse.json({ success: true, section: section[0] });
  } catch (error) {
    console.error('Sections POST error:', error);
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}

// PUT /api/admin/sections - Update section
export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    data.updated_at = new Date().toISOString();
    const section = await supabaseUpdate('page_sections', data, `id=eq.${id}`);

    return NextResponse.json({ success: true, section: section[0] });
  } catch (error) {
    console.error('Sections PUT error:', error);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}

// DELETE /api/admin/sections?id=X
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    // Delete items first (cascade should handle this, but be safe)
    await supabaseDelete('section_items', `section_id=eq.${id}`);
    await supabaseDelete('page_sections', `id=eq.${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sections DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
  }
}
