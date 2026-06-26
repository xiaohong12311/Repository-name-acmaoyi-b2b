import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, supabaseSelect, supabaseInsert, supabaseUpdate, supabaseDelete } from '@/lib/admin-helper';

// GET /api/admin/products
export async function GET(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const supplierId = searchParams.get('supplier_id');
    const limit = searchParams.get('limit') || '50';
    const offset = searchParams.get('offset') || '0';

    if (id) {
      const products = await supabaseSelect('products', '*', `id=eq.${id}`);
      if (products.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ success: true, product: products[0] });
    }

    let filter = `order=created_at.desc&limit=${limit}&offset=${offset}`;
    if (supplierId) filter = `supplier_id=eq.${supplierId}&${filter}`;

    const products = await supabaseSelect('products', '*', filter);
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/admin/products - Create product
export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();

    const product = await supabaseInsert('products', {
      name: body.name || '',
      name_en: body.name_en || '',
      sku: body.sku || '',
      category: body.category || '',
      description: body.description || '',
      description_en: body.description_en || '',
      main_image_url: body.main_image_url || '',
      images: body.images || [],
      tier_prices: body.tier_prices || [],
      moq: body.moq || 1,
      unit: body.unit || 'pcs',
      specifications: body.specifications || [],
      supplier_id: body.supplier_id || null,
      is_active: body.is_active !== undefined ? body.is_active : true,
    });

    return NextResponse.json({ success: true, product: product[0] });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// PUT /api/admin/products - Update product
export async function PUT(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    data.updated_at = new Date().toISOString();
    const product = await supabaseUpdate('products', data, `id=eq.${id}`);

    return NextResponse.json({ success: true, product: product[0] });
  } catch (error) {
    console.error('Products PUT error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/admin/products?id=X
export async function DELETE(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await supabaseDelete('products', `id=eq.${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Products DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
