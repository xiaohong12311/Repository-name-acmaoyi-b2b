import { NextResponse } from 'next/server';

/**
 * 获取 Supabase 公开配置
 * URL 和 anon key 是可以公开的（用于前端 SDK）
 * 
 * 注意：anon key 是公开密钥，不敏感，可以硬编码
 * service_role key 才是敏感的，必须通过环境变量传递
 */
export async function GET() {
  // Supabase 公开配置（这些值可以公开）
  const supabaseUrl = 'https://br-slim-vole-49953439.supabase2.aidap-global.cn-beijing.volces.com';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMzNjIxMzkyMjIsInJvbGUiOiJhbm9uIn0._H7hl6Ra5IjSaRI-XMwObfkJMcXAovvDS7lFwmiB-pI';
  
  return NextResponse.json({
    supabaseUrl,
    supabaseAnonKey
  });
}