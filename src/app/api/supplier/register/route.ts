import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// Supplier registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, companyName, phone } = body;

    if (!email || !password || !companyName) {
      return NextResponse.json(
        { error: 'Email, password, and company name are required' },
        { status: 400 }
      );
    }

    // Use service client to create user
    const serviceClient = getSupabaseClient();
    
    // Create auth user
    const { data: authData, error: authError } = await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto confirm email
      user_metadata: {
        role: 'supplier',
        company_name: companyName,
        phone: phone || null,
      },
    });

    if (authError) {
      console.error('Create user error:', authError);
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // Create supplier record
    const { error: supplierError } = await serviceClient
      .from('suppliers')
      .insert({
        id: authData.user.id, // Use auth user ID as supplier ID
        company_name: companyName,
        email: email,
        phone: phone || null,
        is_verified: false,
        is_active: true,
      });

    if (supplierError) {
      console.error('Create supplier error:', supplierError);
      // Don't fail, just log
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Please login.',
      userId: authData.user.id,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}