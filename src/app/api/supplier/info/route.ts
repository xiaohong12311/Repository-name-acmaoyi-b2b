import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// Get supplier info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const client = getSupabaseClient();

    // Get supplier by email
    const { data: supplier, error } = await client
      .from('suppliers')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    // Get stats
    const { count: productsCount } = await client
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('supplier_id', supplier.id);

    // Get inquiries count (for this supplier's products)
    const { count: inquiriesCount } = await client
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('supplier_id', supplier.id);

    return NextResponse.json({
      supplier,
      stats: {
        products: productsCount || 0,
        orders: 0, // Orders are in Shopify
        inquiries: inquiriesCount || 0,
      },
    });
  } catch (error) {
    console.error('Get supplier info error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}