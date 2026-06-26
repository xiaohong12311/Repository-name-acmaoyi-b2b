import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseSelect, supabaseInsert, supabaseUpdate, supabaseDelete } from '@/lib/admin-helper';

// GET /api/admin/section-items?section_id=1
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('section_id');
    const id = searchParams.get('id');

    if (id) {
      const items = await supabaseSelect('section_items', '*', `id=eq.${id}`);
      return NextResponse.json({ success: true, item: items[0] || null });
    }

    if (!sectionId) return NextResponse.json({ error: 'Missing section_id' }, { status: 400 });

    const items = await supabaseSelect('section_items', '*', `section_id=eq.${sectionId}&order=sort_order.asc`);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Section items GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// POST /api/admin/section-items - Create item
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { section_id, item_type, reference_id, title, subtitle, description, image_url, link_url, icon_name, content, sort_order, is_visible } = body;

    if (!section_id) return NextResponse.json({ error: 'Missing section_id' }, { status: 400 });

    const item = await supabaseInsert('section_items', {
      section_id,
      item_type: item_type || 'product',
      reference_id: reference_id || null,
      title: title || '',
      subtitle: subtitle || '',
      description: description || '',
      image_url: image_url || null,
      link_url: link_url || null,
      icon_name: icon_name || null,
      content: content || {},
      sort_order: sort_order || 0,
      is_visible: is_visible !== undefined ? is_visible : true,
    });

    return NextResponse.json({ success: true, item: item[0] });
  } catch (error) {
    console.error('Section items POST error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

// PUT /api/admin/section-items - Update item
export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    data.updated_at = new Date().toISOString();
    const item = await supabaseUpdate('section_items', data, `id=eq.${id}`);

    return NextResponse.json({ success: true, item: item[0] });
  } catch (error) {
    console.error('Section items PUT error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE /api/admin/section-items?id=X
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await supabaseDelete('section_items', `id=eq.${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Section items DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
