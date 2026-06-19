import { NextRequest, NextResponse } from 'next/server';
import { S3Storage } from 'coze-coding-dev-sdk';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { adminUsers } from '@/storage/database/shared/schema';
import { eq } from 'drizzle-orm';

// 初始化对象存储
const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL || '',
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME || '',
  region: 'cn-beijing',
});

// 验证管理员权限
async function verifyAdmin(request: NextRequest): Promise<string | null> {
  const token = request.headers.get('x-session');
  if (!token) return null;

  try {
    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;

    // 检查是否是管理员
    const db = supabase;
    const adminRecord = await db
      .from('admin_users')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!adminRecord.data) return null;
    return user.id;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  // 验证管理员权限
  const adminId = await verifyAdmin(request);
  if (!adminId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'general'; // logo, favicon, product, general

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // 验证文件大小（最大 5MB）
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 生成文件名
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileName = `uploads/${type}/${timestamp}_${originalName}`;

    // 上传文件
    const key = await storage.uploadFile({
      fileContent: buffer,
      fileName: fileName,
      contentType: file.type,
    });

    // 生成签名 URL（有效期 30 天）
    const url = await storage.generatePresignedUrl({
      key: key,
      expireTime: 2592000, // 30 天
    });

    return NextResponse.json({
      success: true,
      key: key,
      url: url,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// 获取文件 URL
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'No key provided' }, { status: 400 });
  }

  try {
    const url = await storage.generatePresignedUrl({
      key: key,
      expireTime: 2592000, // 30 天
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Get URL error:', error);
    return NextResponse.json({ error: 'Failed to generate URL' }, { status: 500 });
  }
}