'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  type?: 'logo' | 'favicon' | 'product' | 'general';
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  type = 'general',
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, GIF, WebP are allowed.');
      return;
    }

    // 验证文件大小
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }

    setError(null);
    setUploading(true);

    // 显示本地预览
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      // 上传文件
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      // 从 localStorage 获取 token
      const token = localStorage.getItem('admin_token');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'x-session': token || '',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // 更新 URL
      onChange(data.url);
      setPreview(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setPreview(null);
      onChange('');
    } finally {
      setUploading(false);
      // 清理本地预览 URL
      if (localPreview.startsWith('blob:')) {
        URL.revokeObjectURL(localPreview);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label>{label}</Label>
      
      {/* 预览区域 */}
      <div className="relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-gray-50 dark:bg-gray-900">
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
            {!uploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <ImageIcon className="w-8 h-8 mb-2" />
            <span className="text-sm">No image</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}
      </div>

      {/* 上传按钮 */}
      <div className="flex gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </div>

      {/* 错误提示 */}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {/* URL 输入（可选） */}
      <div className="space-y-1">
        <Label className="text-sm text-gray-500">Or enter URL directly:</Label>
        <Input
          value={value || ''}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
          }}
          placeholder="https://example.com/image.png"
          disabled={uploading}
        />
      </div>
    </div>
  );
}