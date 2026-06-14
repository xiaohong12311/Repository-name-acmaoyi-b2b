import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { B2BStoreProvider } from '@/hooks/use-b2b-store';

export const metadata: Metadata = {
  title: {
    default: 'B2B批发采购平台',
    template: '%s | B2B批发采购平台',
  },
  description:
    '专业的B2B批发采购平台，连接优质供应商与采购商。提供询盘单、样品车、阶梯价格、定制批发等一站式批发解决方案。',
  keywords: [
    'B2B批发',
    '批发采购',
    '工厂直供',
    '供应商入驻',
    '阶梯价格',
    '定制批发',
    '样品申请',
    '询盘单',
  ],
  authors: [{ name: 'B2B Platform Team' }],
  generator: 'Next.js',
  openGraph: {
    title: 'B2B批发采购平台 | 专业批发采购解决方案',
    description:
      '连接优质供应商与采购商，提供询盘单、样品车、阶梯价格、定制批发等一站式批发解决方案。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased min-h-screen flex flex-col bg-[#F8FAFC]`}>
        <B2BStoreProvider>
          {isDev && <Inspector />}
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </B2BStoreProvider>
      </body>
    </html>
  );
}