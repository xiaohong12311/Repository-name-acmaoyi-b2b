import { NextRequest, NextResponse } from 'next/server';
import { supabaseSelect } from '@/lib/admin-helper';

// GET /api/suppliers - Public supplier listing (no auth required)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const country = searchParams.get('country');
    const limit = searchParams.get('limit') || '50';
    const offset = searchParams.get('offset') || '0';

    if (id) {
      const suppliers = await supabaseSelect('suppliers', '*', `id=eq.${id}&is_active=eq.true`);
      if (suppliers.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const supplier = suppliers[0];
      // Also fetch supplier's products
      const products = await supabaseSelect('products', 'id,name,name_en,main_image_url,category,moq,tier_prices', `supplier_id=eq.${supplier.id}&is_active=eq.true&limit=10`);
      return NextResponse.json({ success: true, supplier: mapDbSupplier(supplier, products) });
    }

    let filter = `is_active=eq.true&order=created_at.desc&limit=${limit}&offset=${offset}`;
    if (country) filter = `country=eq.${country}&${filter}`;

    const suppliers = await supabaseSelect('suppliers', '*', filter);
    return NextResponse.json({
      success: true,
      suppliers: suppliers.map((s: Record<string, unknown>) => mapDbSupplier(s)),
      total: suppliers.length,
    });
  } catch (error) {
    console.error('Public suppliers GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
  }
}

// Map database supplier to frontend Supplier type
function mapDbSupplier(db: Record<string, unknown>, products?: Record<string, unknown>[]) {
  const certifications = Array.isArray(db.certifications)
    ? (db.certifications.filter((c: unknown) => typeof c === 'string') as string[])
    : [];

  const categories = Array.isArray(db.categories)
    ? (db.categories.filter((c: unknown) => typeof c === 'string') as string[])
    : [];

  const mainProducts = Array.isArray(db.main_products)
    ? (db.main_products.filter((p: unknown) => typeof p === 'string') as string[])
    : [];

  const images = Array.isArray(db.images)
    ? (db.images.filter((img: unknown) => typeof img === 'string') as string[])
    : [];

  const country = (db.country || '') as string;
  const city = (db.city || '') as string;
  const address = (db.address || '') as string;
  const locationParts = [city, country].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(', ') : address;

  const yearEstablished = db.year_established ? Number(db.year_established) : 0;
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = yearEstablished > 0 ? currentYear - yearEstablished : 0;

  const mappedProducts = products ? products.map((p: Record<string, unknown>) => {
    const tierPrices = Array.isArray(p.tier_prices)
      ? p.tier_prices.map((tp: Record<string, unknown>) => ({
          minQuantity: Number(tp.minQuantity ?? tp.min_quantity ?? 0),
          maxQuantity: tp.maxQuantity != null ? Number(tp.maxQuantity) : (tp.max_quantity != null ? Number(tp.max_quantity) : null),
          price: Number(tp.price ?? 0),
          discount: (tp.discount as string) ?? '',
        }))
      : [];
    return {
      id: String(p.id),
      name: (p.name_en || p.name || '') as string,
      nameEn: (p.name_en || '') as string,
      description: '',
      images: p.main_image_url ? [p.main_image_url as string] : [],
      mainImage: (p.main_image_url || '') as string,
      categoryId: (p.category || '') as string,
      category: (p.category || '') as string,
      supplierId: String(db.id),
      moq: Number(p.moq || 1),
      unit: 'pcs',
      specifications: [],
      tierPrices,
      sampleAvailable: true,
      customizationAvailable: true,
      leadTime: '7-15 business days',
      status: 'active' as const,
      createdAt: '',
      updatedAt: '',
    };
  }) : [];

  return {
    id: String(db.id),
    name: (db.company_name_en || db.company_name || '') as string,
    logo: (db.logo_url || '') as string,
    description: (db.description_en || db.description || '') as string,
    location,
    country,
    businessType: (db.business_type || '') as string,
    categories,
    rating: Number(db.rating || 4.5),
    reviewCount: Number(db.review_count || 0),
    verified: Boolean(db.is_verified),
    yearsInBusiness,
    employees: Number(db.employees || 0),
    productCount: Number(db.product_count || (products ? products.length : 0)),
    annualRevenue: (db.total_revenue || '') as string,
    certifications,
    mainProducts,
    images,
    website: (db.website || '') as string,
    contactPerson: (db.contact_person || '') as string,
    contactPhone: (db.contact_phone || '') as string,
    contactEmail: (db.contact_email || '') as string,
    responseTime: 'Within 24 hours',
    status: db.is_active ? 'active' as const : 'inactive' as const,
    products: mappedProducts,
    createdAt: (db.created_at || '') as string,
    updatedAt: (db.updated_at || '') as string,
  };
}
