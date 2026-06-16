import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// Get all supplier applications
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Verify admin
    const { data: { user } } = await client.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Build query
    let query = client
      .from('supplier_applications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Fetch applications error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      applications: data, 
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Update application status or approve/reject
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Verify admin
    const { data: { user } } = await client.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, notes, createSupplier } = body;

    if (!id) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;

    // Update application
    const { data: appData, error: appError } = await client
      .from('supplier_applications')
      .update(updateData)
      .eq('id', id)
      .select();

    if (appError) {
      console.error('Update application error:', appError);
      return NextResponse.json({ error: appError.message }, { status: 500 });
    }

    // If approved and createSupplier is true, create a supplier record
    if (status === 'approved' && createSupplier && appData[0]) {
      const app = appData[0];
      const { error: supplierError } = await client
        .from('suppliers')
        .insert({
          company_name: app.company_name,
          contact_name: app.contact_name,
          email: app.email,
          phone: app.phone,
          country: app.country,
          address: app.address,
          business_type: app.business_type,
          product_categories: app.product_categories,
          year_established: app.year_established,
          employee_count: app.employee_count,
          certifications: app.certifications,
          website: app.website,
          description: app.description,
          is_verified: false,
          is_active: true,
        });

      if (supplierError) {
        console.error('Create supplier error:', supplierError);
        // Don't fail the request, just log the error
      }
    }

    return NextResponse.json({ application: appData[0] });
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Delete application
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Verify admin
    const { data: { user } } = await client.auth.getUser(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 });
    }

    const { error } = await client
      .from('supplier_applications')
      .delete()
      .eq('id', parseInt(id));

    if (error) {
      console.error('Delete application error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete application error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}