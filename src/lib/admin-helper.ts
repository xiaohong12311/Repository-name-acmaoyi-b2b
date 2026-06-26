import { NextRequest } from 'next/server';

const SUPABASE_URL = 'https://br-slim-vole-49953439.supabase2.aidap-global.cn-beijing.volces.com';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMzNjIxMzkyMjIsInJvbGUiOiJhbm9uIn0._H7hl6Ra5IjSaRI-XMwObfkJMcXAovvDS7lFwmiB-pI';
const SUPABASE_SERVICE_KEY = process.env.COZE_SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

export function getSupabaseUrl() { return SUPABASE_URL; }
export function getSupabaseAnonKey() { return SUPABASE_ANON_KEY; }
export function getSupabaseServiceKey() { return SUPABASE_SERVICE_KEY; }

export function getAdminHeaders() {
  return {
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };
}

export function getAdminHeadersNoPrefer() {
  return {
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };
}

export async function verifyAdmin(request: NextRequest): Promise<{ userId: string; email: string; role: string } | null> {
  const authHeader = request.headers.get('Authorization');
  const sessionHeader = request.headers.get('x-session');
  const token = authHeader?.replace('Bearer ', '') || sessionHeader;

  if (!token) return null;

  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!userRes.ok) return null;

    const user = await userRes.json();
    if (!user || !user.id) return null;

    const adminRes = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?user_id=eq.${user.id}&select=*`, {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!adminRes.ok) return null;

    const adminData = await adminRes.json();
    if (adminData && adminData.length > 0) {
      return { userId: user.id, email: user.email, role: adminData[0].role };
    }

    return null;
  } catch {
    return null;
  }
}

export async function supabaseSelect(table: string, query: string = '*', filter: string = ''): Promise<Record<string, unknown>[]> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${query}${filter ? `&${filter}` : ''}`;
  const res = await fetch(url, { headers: getAdminHeadersNoPrefer() });
  if (!res.ok) throw new Error(`Supabase select error: ${res.status}`);
  return res.json();
}

export async function supabaseInsert(table: string, data: Record<string, unknown> | Record<string, unknown>[]): Promise<Record<string, unknown>[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: getAdminHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase insert error: ${res.status} - ${err}`);
  }
  return res.json();
}

export async function supabaseUpdate(table: string, data: Record<string, unknown>, filter: string): Promise<Record<string, unknown>[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: getAdminHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase update error: ${res.status} - ${err}`);
  }
  return res.json();
}

export async function supabaseDelete(table: string, filter: string): Promise<Record<string, unknown>[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: 'DELETE',
    headers: { ...getAdminHeadersNoPrefer(), 'Prefer': 'return=representation' },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase delete error: ${res.status} - ${err}`);
  }
  return res.json();
}
