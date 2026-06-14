import { NextResponse } from 'next/server';

// 供应商入驻申请数据存储
let supplierApplications: Array<{
  id: string;
  companyName: string;
  businessLicense: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  mainProducts: string[];
  description: string;
  employeeCount: string;
  yearEstablished: string;
  certifications: string[];
  status: string;
  createdAt: string;
}> = [];

// GET - 获取申请列表
export async function GET() {
  return NextResponse.json({
    applications: supplierApplications,
    total: supplierApplications.length,
    pending: supplierApplications.filter(a => a.status === 'pending').length,
  });
}

// POST - 提交入驻申请
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.companyName || !body.businessLicense || !body.email || !body.phone) {
      return NextResponse.json({
        error: '请填写公司名称、营业执照号、邮箱和电话'
      }, { status: 400 });
    }

    const applicationId = `app-${String(supplierApplications.length + 1).padStart(3, '0')}`;
    
    const newApplication = {
      id: applicationId,
      companyName: body.companyName,
      businessLicense: body.businessLicense,
      contactPerson: body.contactPerson || '',
      phone: body.phone,
      email: body.email,
      location: body.location || '',
      mainProducts: body.mainProducts || [],
      description: body.description || '',
      employeeCount: body.employeeCount || '',
      yearEstablished: body.yearEstablished || '',
      certifications: body.certifications || [],
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    supplierApplications.push(newApplication);

    return NextResponse.json({
      success: true,
      applicationId: applicationId,
      message: '入驻申请已提交，我们将在3-5个工作日内审核并联系您',
    });
  } catch {
    return NextResponse.json({ error: '数据解析失败' }, { status: 400 });
  }
}

// PUT - 更新申请状态
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const index = supplierApplications.findIndex(a => a.id === id);
    if (index >= 0) {
      supplierApplications[index].status = status;
      return NextResponse.json({ success: true, application: supplierApplications[index] });
    }

    return NextResponse.json({ error: '申请不存在' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: '数据解析失败' }, { status: 400 });
  }
}