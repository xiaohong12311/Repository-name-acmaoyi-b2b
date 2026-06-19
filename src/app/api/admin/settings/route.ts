import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 获取网站设置
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('x-session');
    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const supabase = getSupabaseClient();
    
    // 验证登录状态
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: '登录已过期' }, { status: 401 });
    }

    // 检查是否是管理员
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!adminData) {
      return NextResponse.json({ error: '不是管理员' }, { status: 403 });
    }

    // 获取设置
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: '获取设置失败' }, { status: 500 });
    }

    // 如果没有设置，返回默认设置
    const defaultSettings = {
      id: null,
      site_name: 'ACMAOYI',
      site_description: 'Professional B2B Wholesale Platform',
      logo_url: '/logo.png',
      favicon_url: '/favicon.ico',
      contact_email: 'xiaohong12311@outlook.com',
      contact_phone: '+86 19924277263',
      contact_address: 'FLAT 2304,23/F HO KING,COMMCENTRE, 2-16 FA YUEN STREET,KOKHONG',
      facebook_url: '',
      tiktok_url: '',
      tiktok_pixel_id: '',
      facebook_pixel_id: '',
      shopify_domain: 'btbvuh-7y.myshopify.com',
      updated_at: null
    };

    return NextResponse.json({ 
      success: true, 
      settings: settings || defaultSettings 
    });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 更新网站设置
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-session');
    if (!token) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const supabase = getSupabaseClient();
    
    // 验证登录状态
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: '登录已过期' }, { status: 401 });
    }

    // 检查是否是管理员
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!adminData) {
      return NextResponse.json({ error: '不是管理员' }, { status: 403 });
    }

    const body = await request.json();
    const { settings } = body;

    // 检查是否已有设置记录
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .single();

    let result;
    if (existing?.id) {
      // 更新现有设置
      result = await supabase
        .from('site_settings')
        .update({
          site_name: settings.site_name,
          site_description: settings.site_description,
          logo_url: settings.logo_url,
          favicon_url: settings.favicon_url,
          contact_email: settings.contact_email,
          contact_phone: settings.contact_phone,
          contact_address: settings.contact_address,
          facebook_url: settings.facebook_url,
          tiktok_url: settings.tiktok_url,
          tiktok_pixel_id: settings.tiktok_pixel_id,
          facebook_pixel_id: settings.facebook_pixel_id,
          shopify_domain: settings.shopify_domain,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // 创建新设置
      result = await supabase
        .from('site_settings')
        .insert({
          site_name: settings.site_name,
          site_description: settings.site_description,
          logo_url: settings.logo_url,
          favicon_url: settings.favicon_url,
          contact_email: settings.contact_email,
          contact_phone: settings.contact_phone,
          contact_address: settings.contact_address,
          facebook_url: settings.facebook_url,
          tiktok_url: settings.tiktok_url,
          tiktok_pixel_id: settings.tiktok_pixel_id,
          facebook_pixel_id: settings.facebook_pixel_id,
          shopify_domain: settings.shopify_domain
        })
        .select()
        .single();
    }

    if (result.error) {
      return NextResponse.json({ error: '保存失败' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      settings: result.data 
    });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}