'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';

interface MediaItem {
  id: number;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  alt_text: string;
  category: string;
  created_at: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; admin_session=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => { fetchMedia(); }, []);

  const fetchMedia = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch('/api/admin/media?limit=100', { headers: { 'x-session': token } });
      const data = await res.json();
      if (data.success) setMedia(data.media);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const token = getToken();
    if (!token) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'general');

        await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-session': token },
          body: formData,
        });
      }
      fetchMedia();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: number) => {
    if (!confirm('确定删除此文件？')) return;
    const token = getToken();
    if (!token) return;
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE', headers: { 'x-session': token } });
      setMedia(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">媒体库</h1>
        <div>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="max-w-xs"
          />
        </div>
      </div>

      {uploading && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-blue-700 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> 上传中...
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map(item => (
          <Card key={item.id} className="group overflow-hidden">
            <div className="aspect-square bg-gray-100 relative">
              <img
                src={item.file_url}
                alt={item.alt_text || item.file_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => copyUrl(item.file_url)}>
                  复制URL
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteMedia(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-2">
              <p className="text-xs text-gray-500 truncate">{item.file_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {media.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>暂无媒体文件</p>
          <p className="text-sm mt-1">点击上传按钮添加图片</p>
        </div>
      )}
    </div>
  );
}
