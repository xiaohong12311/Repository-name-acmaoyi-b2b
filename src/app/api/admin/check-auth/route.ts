import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// Check if user is admin
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ isAdmin: false, error: 'No token provided' }, { status: 401 });
    }

    const client = getSupabaseClient(token);

    // Get user info from token
    const { data: { user }, error: userError } = await client.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ isAdmin: false, error: 'Invalid token' }, { status: 401 });
    }

    // Check if user exists in admin_users table
    const { data: adminData, error: adminError } = await client
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError) {
      console.error('Admin check error:', adminError);
      return NextResponse.json({ isAdmin: false, error: 'Database error' }, { status: 500 });
    }

    // If not in admin_users table, auto-create for first admin (email matches)
    if (!adminData) {
      // Check if this is the first admin (owner's email)
      const ownerEmail = 'xiaohong12311@outlook.com';
      if (user.email === ownerEmail) {
        // Auto-add as super admin
        const { error: insertError } = await client
          .from('admin_users')
          .insert({
            user_id: user.id,
            role: 'super_admin',
            permissions: ['all'],
          });

        if (insertError) {
          console.error('Auto-admin insert error:', insertError);
          return NextResponse.json({ isAdmin: false, error: 'Failed to create admin' }, { status: 500 });
        }

        return NextResponse.json({ 
          isAdmin: true, 
          role: 'super_admin',
          user: { id: user.id, email: user.email }
        });
      }

      return NextResponse.json({ isAdmin: false, error: 'Not an admin user' }, { status: 403 });
    }

    return NextResponse.json({ 
      isAdmin: true, 
      role: adminData.role,
      permissions: adminData.permissions,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAdmin: false, error: 'Internal error' }, { status: 500 });
  }
}