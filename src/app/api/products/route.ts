import { NextRequest, NextResponse } from 'next/server';
import { supabaseSelect } from '@/lib/admin-helper';

// GET /api/products - Public product listing (no auth required)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const supplierId = searchParams.get('supplier_id');
    const limit = searchParams.get('limit') || '50';
    const offset = searchParams.get('offset') || '0';

    if (id) {
      const products = await supabaseSelect('products', '*', `id=eq.${id}&is_active=eq.true`);
      if (products.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const product = products[0];
      return NextResponse.json({ success: true, product: mapDbProduct(product) });
    }

    let filter = `is_active=eq.true&order=created_at.desc&limit=${limit}&offset=${offset}`;
    if (category) filter = `category=eq.${category}&${filter}`;
    if (supplierId) filter = `supplier_id=eq.${supplierId}&${filter}`;

    const products = await supabaseSelect('products', '*', filter);
    return NextResponse.json({
      success: true,
      products: products.map(mapDbProduct),
      total: products.length,
    });
  } catch (error) {
    console.error('Public products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// Map database product to frontend Product type
function mapDbProduct(db: Record<string, unknown>) {
  const tierPrices = Array.isArray(db.tier_prices)
    ? db.tier_prices.map((tp: Record<string, unknown>) => ({
        minQuantity: Number(tp.minQuantity ?? tp.min_quantity ?? 0),
        maxQuantity: tp.maxQuantity != null ? Number(tp.maxQuantity) : (tp.max_quantity != null ? Number(tp.max_quantity) : null),
        price: Number(tp.price ?? 0),
        discount: (tp.discount as string) ?? '',
      }))
    : [];

  const specifications = Array.isArray(db.specifications)
    ? db.specifications.map((sp: Record<string, unknown>) => ({
        name: (sp.name ?? sp.label ?? '') as string,
        value: (sp.value ?? '') as string,
      }))
    : [];

  const images = Array.isArray(db.images)
    ? db.images.filter((img: unknown) => typeof img === 'string') as string[]
    : db.main_image_url
      ? [db.main_image_url as string]
      : [];

  const firstTierPrice = tierPrices.length > 0 ? tierPrices[0].price : 0;

  return {
    id: String(db.id),
    name: (db.name_en || db.name || '') as string,
    nameEn: (db.name_en || '') as string,
    sku: (db.sku || '') as string,
    slug: (db.slug || '') as string,
    description: (db.description_en || db.description || '') as string,
    images,
    mainImage: (db.main_image_url || '') as string,
    categoryId: (db.category || '') as string,
    category: (db.category || '') as string,
    supplierId: db.supplier_id ? String(db.supplier_id) : '',
    moq: Number(db.moq || 1),
    unit: (db.unit || 'pcs') as string,
    specifications,
    tierPrices,
    samplePrice: firstTierPrice > 0 ? firstTierPrice * 2 : undefined,
    sampleAvailable: true,
    customizationAvailable: true,
    leadTime: '7-15 business days',
    status: db.is_active ? 'active' as const : 'inactive' as const,
    createdAt: (db.created_at || '') as string,
    updatedAt: (db.updated_at || '') as string,
  };
}
