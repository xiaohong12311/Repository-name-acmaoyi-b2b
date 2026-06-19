import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// Get products for supplier
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Verify user
    const { data: { user } } = await client.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get supplier ID
    const { data: supplier } = await client
      .from('suppliers')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    const search = searchParams.get('search');

    // Build query
    let query = client
      .from('products')
      .select('*', { count: 'exact' })
      .eq('supplier_id', supplier.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Fetch products error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      products: data,
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Create new product
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Verify user
    const { data: { user } } = await client.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get supplier ID
    const { data: supplier } = await client
      .from('suppliers')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      description,
      category,
      main_image,
      images,
      moq,
      unit,
      tier_prices,
      specifications,
      certifications,
      origin_country,
      lead_time,
      payment_terms,
      shopify_handle,
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'Product name required' }, { status: 400 });
    }

    const { data, error } = await client
      .from('products')
      .insert({
        supplier_id: supplier.id,
        name,
        description: description || null,
        category: category || null,
        main_image: main_image || null,
        images: images || [],
        moq: moq || 1,
        unit: unit || 'piece',
        tier_prices: tier_prices || [],
        specifications: specifications || {},
        certifications: certifications || [],
        origin_country: origin_country || 'China',
        lead_time: lead_time || null,
        payment_terms: payment_terms || null,
        shopify_handle: shopify_handle || null,
        is_active: true,
      })
      .select();

    if (error) {
      console.error('Create product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data[0] });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Update product
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Verify user
    const { data: { user } } = await client.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get supplier ID
    const { data: supplier } = await client
      .from('suppliers')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    // Verify product belongs to this supplier
    const { data: existingProduct } = await client
      .from('products')
      .select('supplier_id')
      .eq('id', id)
      .single();

    if (!existingProduct || existingProduct.supplier_id !== supplier.id) {
      return NextResponse.json({ error: 'Product not found or not owned' }, { status: 404 });
    }

    const { data, error } = await client
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Update product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product: data[0] });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Delete product
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Verify user
    const { data: { user } } = await client.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get supplier ID
    const { data: supplier } = await client
      .from('suppliers')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    // Verify product belongs to this supplier
    const { data: existingProduct } = await client
      .from('products')
      .select('supplier_id')
      .eq('id', id)
      .single();

    if (!existingProduct || existingProduct.supplier_id !== supplier.id) {
      return NextResponse.json({ error: 'Product not found or not owned' }, { status: 404 });
    }

    const { error } = await client
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}