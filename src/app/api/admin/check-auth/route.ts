import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = 'https://br-slim-vole-49953439.supabase2.aidap-global.cn-beijing.volces.com/auth/v1';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMzNjIxMzkyMjIsInJvbGUiOiJhbm9uIn0._H7hl6Ra5IjSaRI-XMwObfkJMcXAovvDS7lFwmiB-pI';

// Check if user is admin using direct fetch API
export async function GET(request: NextRequest) {
  try {
    // 支持两种 header 方式传递 token
    const authHeader = request.headers.get('Authorization');
    const sessionHeader = request.headers.get('x-session');
    const token = authHeader?.replace('Bearer ', '') || sessionHeader;

    if (!token) {
      return NextResponse.json({ isAdmin: false, error: 'No token provided' }, { status: 401 });
    }

    // 直接调用 Supabase API 获取用户信息
    const userRes = await fetch(`${SUPABASE_URL}/user`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!userRes.ok) {
      return NextResponse.json({ isAdmin: false, error: 'Invalid token' }, { status: 401 });
    }

    const user = await userRes.json();

    if (!user || !user.id) {
      return NextResponse.json({ isAdmin: false, error: 'User not found' }, { status: 401 });
    }

    // 检查是否在 admin_users 表中
    // 使用 service role key 来查询（绕过 RLS）
    const { getSupabaseClient } = await import('@/storage/database/supabase-client');
    const adminClient = getSupabaseClient(); // 无 token，使用 service role key

    const { data: adminData, error: adminError } = await adminClient
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError) {
      console.error('Admin check error:', adminError);
      return NextResponse.json({ isAdmin: false, error: 'Database error' }, { status: 500 });
    }

    if (adminData) {
      return NextResponse.json({ 
        isAdmin: true, 
        role: adminData.role,
        permissions: adminData.permissions,
        user: { id: user.id, email: user.email }
      });
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