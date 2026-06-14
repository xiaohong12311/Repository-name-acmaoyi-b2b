'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Supplier } from '@/types';
import { MapPin, Clock, Award, Users, Building2 } from 'lucide-react';

interface SupplierCardProps {
  supplier: Supplier;
  compact?: boolean;
}

export function SupplierCard({ supplier, compact = false }: SupplierCardProps) {
  if (compact) {
    return (
      <Link href={`/suppliers/${supplier.id}`}>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={supplier.logo}
                alt={supplier.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-1">{supplier.name}</h4>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                {supplier.location}
              </div>
            </div>
            {supplier.verified && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Award className="h-3 w-3 mr-1" />
                认证
              </Badge>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        {/* 供应商信息 */}
        <div className="p-4">
          <Link href={`/suppliers/${supplier.id}`}>
            <div className="flex items-start gap-4">
              {/* Logo */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={supplier.logo}
                  alt={supplier.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              
              {/* 基本信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 line-clamp-1">
                    {supplier.name}
                  </h3>
                  {supplier.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 shrink-0">
                      <Award className="h-3 w-3 mr-1" />
                      认证供应商
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {supplier.location}
                </div>

                {/* 评分 */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">{supplier.rating}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i <= Math.round(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{supplier.reviewCount}条评价</span>
                </div>

                {/* 主营产品 */}
                <div className="flex flex-wrap gap-1">
                  {supplier.mainProducts.slice(0, 3).map(product => (
                    <Badge key={product} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-3 gap-0 border-t bg-gray-50">
          <div className="p-3 text-center border-r">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
              <Users className="h-3 w-3" />
              员工规模
            </div>
            <div className="text-sm font-medium">{supplier.totalEmployees}</div>
          </div>
          <div className="p-3 text-center border-r">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
              <Building2 className="h-3 w-3" />
              成立年份
            </div>
            <div className="text-sm font-medium">{supplier.yearEstablished}</div>
          </div>
          <div className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
              <Clock className="h-3 w-3" />
              响应时间
            </div>
            <div className="text-sm font-medium">{supplier.responseTime}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

