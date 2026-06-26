import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseSelect, supabaseInsert, supabaseUpdate, supabaseDelete } from '@/lib/admin-helper';

// GET /api/admin/manage-suppliers
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const suppliers = await supabaseSelect('suppliers', '*', `id=eq.${id}`);
      if (suppliers.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ success: true, supplier: suppliers[0] });
    }

    const suppliers = await supabaseSelect('suppliers', '*', 'order=created_at.desc');
    return NextResponse.json({ success: true, suppliers });
  } catch (error) {
    console.error('Suppliers GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
  }
}

// POST /api/admin/manage-suppliers - Create supplier
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();

    const supplier = await supabaseInsert('suppliers', {
      company_name: body.company_name || '',
      company_name_en: body.company_name_en || '',
      contact_name: body.contact_name || '',
      email: body.email || '',
      phone: body.phone || '',
      country: body.country || '',
      address: body.address || '',
      business_type: body.business_type || '',
      product_categories: body.product_categories || [],
      year_established: body.year_established || 0,
      employee_count: body.employee_count || 0,
      certifications: body.certifications || [],
      website: body.website || '',
      description: body.description || '',
      logo_url: body.logo_url || '',
      factory_images: body.factory_images || [],
      is_verified: body.is_verified || false,
      is_active: body.is_active !== undefined ? body.is_active : true,
    });

    return NextResponse.json({ success: true, supplier: supplier[0] });
  } catch (error) {
    console.error('Suppliers POST error:', error);
    return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
  }
}

// PUT /api/admin/manage-suppliers - Update supplier
export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    data.updated_at = new Date().toISOString();
    const supplier = await supabaseUpdate('suppliers', data, `id=eq.${id}`);

    return NextResponse.json({ success: true, supplier: supplier[0] });
  } catch (error) {
    console.error('Suppliers PUT error:', error);
    return NextResponse.json({ error: 'Failed to update supplier' }, { status: 500 });
  }
}

// DELETE /api/admin/manage-suppliers?id=X
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await supabaseDelete('suppliers', `id=eq.${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Suppliers DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete supplier' }, { status: 500 });
  }
}
