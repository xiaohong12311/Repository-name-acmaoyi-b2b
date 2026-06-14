import { NextResponse } from 'next/server';

// 询盘数据存储
let inquiries: Array<{
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
    notes: string;
  }>;
  message: string;
  status: string;
  createdAt: string;
}> = [];

// GET - 获取询盘列表
export async function GET() {
  return NextResponse.json({
    inquiries: inquiries,
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === 'pending').length,
  });
}

// POST - 提交询盘
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.companyName || !body.email || !body.products || body.products.length === 0) {
      return NextResponse.json({
        error: '请填写公司名称、邮箱和产品信息'
      }, { status: 400 });
    }

    const inquiryId = `inq-${String(inquiries.length + 1).padStart(3, '0')}`;
    
    const newInquiry = {
      id: inquiryId,
      companyName: body.companyName,
      contactPerson: body.contactPerson || '',
      email: body.email,
      phone: body.phone || '',
      products: body.products.map((p: { productId: string; productName: string; quantity: number; notes: string }) => ({
        productId: p.productId,
        productName: p.productName,
        quantity: p.quantity,
        notes: p.notes || '',
      })),
      message: body.message || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    inquiries.push(newInquiry);

    return NextResponse.json({
      success: true,
      inquiryId: inquiryId,
      message: '询盘已提交，我们会尽快处理并联系您',
    });
  } catch {
    return NextResponse.json({ error: '数据解析失败' }, { status: 400 });
  }
}

// PUT - 更新询盘状态
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const index = inquiries.findIndex(i => i.id === id);
    if (index >= 0) {
      inquiries[index].status = status;
      return NextResponse.json({ success: true, inquiry: inquiries[index] });
    }

    return NextResponse.json({ error: '询盘不存在' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: '数据解析失败' }, { status: 400 });
  }
}