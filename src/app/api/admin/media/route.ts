import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseSelect, supabaseInsert, supabaseDelete } from '@/lib/admin-helper';

// GET /api/admin/media
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '50';
    const category = searchParams.get('category');

    let filter = `order=created_at.desc&limit=${limit}`;
    if (category) filter = `category=eq.${category}&${filter}`;

    const media = await supabaseSelect('media_library', '*', filter);
    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error('Media GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

// POST /api/admin/media - Add media record
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const media = await supabaseInsert('media_library', {
      file_name: body.file_name || '',
      file_url: body.file_url || '',
      file_type: body.file_type || 'image',
      file_size: body.file_size || 0,
      alt_text: body.alt_text || '',
      category: body.category || 'general',
      uploaded_by: admin.email,
    });
    return NextResponse.json({ success: true, media: media[0] });
  } catch (error) {
    console.error('Media POST error:', error);
    return NextResponse.json({ error: 'Failed to create media' }, { status: 500 });
  }
}

// DELETE /api/admin/media?id=X
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await supabaseDelete('media_library', `id=eq.${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Media DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
