import { NextResponse } from 'next/server';

/**
 * 获取 Supabase 公开配置
 * URL 和 anon key 是可以公开的（用于前端 SDK）
 */
export async function GET() {
  const supabaseUrl = process.env.COZE_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.COZE_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Supabase configuration not found' },
      { status: 500 }
    );
  }
  
  return NextResponse.json({
    supabaseUrl,
    supabaseAnonKey
  });
}