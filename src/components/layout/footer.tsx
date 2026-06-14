import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-white font-bold text-lg">
                B2B
              </div>
              <span className="font-semibold text-lg">批发采购平台</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              专业的B2B批发采购平台，连接优质供应商与采购商，提供一站式批发解决方案。
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-gray-400 hover:text-blue-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.5 19c-5 0-7-2.5-7-5 0-2 1.5-4 3-5.5.5-.5 1-.5 1.5-.5s1 .5 1 1c0 .5-.5 1-1 1.5C4 10 3 12 3 14c0 2.5 2.5 4 5.5 4 2.5 0 4.5-1 6-2.5.5-.5 1-.5 1.5-.5s1 .5 1 1c0 .5-.5 1-1 1.5-1.5 1.5-3.5 2.5-6 2.5zm6.5-9c-4 0-6-2-6-4s2-4 6-4 6 2 6 4-2 4-6 4zm0-6c-3 0-4 1-4 2s1 2 4 2 4-1 4-2-1-2-4-2z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 8h-4c-.5 0-1 .5-1 1v3c0 .5.5 1 1 1h1v3c0 .5-.5 1-1 1h-1c-.5 0-1-.5-1-1v-3c0-.5-.5-1-1-1s-1 .5-1 1v3c0 .5-.5 1-1 1h-1c-.5 0-1-.5-1-1v-3c0-.5-.5-1-1-1s-1 .5-1 1v3c0 .5-.5 1-1 1h-1c-.5 0-1-.5-1-1v-3h1c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1h-4c-.5 0-1 .5-1 1v6c0 3 2 5 5 5h8c3 0 5-2 5-5V9c0-.5-.5-1-1-1z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* 产品分类 */}
          <div>
            <h3 className="font-semibold mb-4">产品分类</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=kitchen" className="text-sm text-gray-600 hover:text-blue-700">
                  厨房用品
                </Link>
              </li>
              <li>
                <Link href="/products?category=lighting" className="text-sm text-gray-600 hover:text-blue-700">
                  照明设备
                </Link>
              </li>
              <li>
                <Link href="/products?category=packaging" className="text-sm text-gray-600 hover:text-blue-700">
                  包装印刷
                </Link>
              </li>
              <li>
                <Link href="/products?category=tools" className="text-sm text-gray-600 hover:text-blue-700">
                  工业工具
                </Link>
              </li>
              <li>
                <Link href="/products?category=garment" className="text-sm text-gray-600 hover:text-blue-700">
                  服装定制
                </Link>
              </li>
              <li>
                <Link href="/products?category=storage" className="text-sm text-gray-600 hover:text-blue-700">
                  仓储设备
                </Link>
              </li>
            </ul>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inquiry" className="text-sm text-gray-600 hover:text-blue-700">
                  发送询盘
                </Link>
              </li>
              <li>
                <Link href="/sample-cart" className="text-sm text-gray-600 hover:text-blue-700">
                  申请样品
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm text-gray-600 hover:text-blue-700">
                  下载目录
                </Link>
              </li>
              <li>
                <Link href="/supplier-join" className="text-sm text-gray-600 hover:text-blue-700">
                  供应商入驻
                </Link>
              </li>
              <li>
                <Link href="/factory" className="text-sm text-gray-600 hover:text-blue-700">
                  工厂展示
                </Link>
              </li>
              <li>
                <Link href="/customization" className="text-sm text-gray-600 hover:text-blue-700">
                  定制批发
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>客服热线：400-888-8888</li>
              <li>工作时间：周一至周五 9:00-18:00</li>
              <li>客服邮箱：support@b2b-platform.com</li>
              <li>公司地址：浙江省杭州市滨江区网商路599号</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 批发采购平台. 保留所有权利.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-blue-700">隐私政策</Link>
            <Link href="#" className="hover:text-blue-700">服务条款</Link>
            <Link href="#" className="hover:text-blue-700">供应商协议</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}