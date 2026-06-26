'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Trash2, Edit3, Eye, EyeOff, GripVertical, 
  Loader2, Image as ImageIcon, ArrowUp, ArrowDown, Save, X, Layers
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/admin/image-upload';

interface SectionItem {
  id: number;
  item_type: string;
  reference_id: number | null;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  link_url: string;
  icon_name: string;
  content: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
}

interface PageSection {
  id: number;
  page: string;
  section_type: string;
  title: string;
  subtitle: string;
  content: Record<string, unknown>;
  image_url: string;
  background_color: string;
  sort_order: number;
  is_visible: boolean;
  items?: SectionItem[];
}

const sectionTypes = [
  { value: 'hero', label: 'Hero 横幅' },
  { value: 'core_features', label: '核心功能' },
  { value: 'categories', label: '分类展示' },
  { value: 'featured_products', label: '推荐产品' },
  { value: 'featured_suppliers', label: '推荐供应商' },
  { value: 'more_features', label: '更多功能' },
  { value: 'trust_indicators', label: '信任指标' },
  { value: 'trust_stats', label: '信任统计' },
  { value: 'cta', label: 'CTA 行动呼吁' },
  { value: 'custom', label: '自定义板块' },
];

export default function SectionsPage() {
  const router = useRouter();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSection, setNewSection] = useState({ section_type: 'custom', title: '', subtitle: '' });

  const getToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; admin_session=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/sections?page=home', { headers: { 'x-session': token } });
      const data = await res.json();
      if (data.success) setSections(data.sections);
    } catch (error) {
      console.error('Fetch sections error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (section: PageSection) => {
    const token = getToken();
    if (!token) return;

    try {
      await fetch('/api/admin/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify({ id: section.id, is_visible: !section.is_visible }),
      });
      setSections(prev => prev.map(s => s.id === section.id ? { ...s, is_visible: !s.is_visible } : s));
    } catch (error) {
      console.error('Toggle visibility error:', error);
    }
  };

  const moveSection = async (section: PageSection, direction: 'up' | 'down') => {
    const token = getToken();
    if (!token) return;

    const idx = sections.findIndex(s => s.id === section.id);
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const targetSection = sections[targetIdx];

    try {
      await Promise.all([
        fetch('/api/admin/sections', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-session': token },
          body: JSON.stringify({ id: section.id, sort_order: targetSection.sort_order }),
        }),
        fetch('/api/admin/sections', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-session': token },
          body: JSON.stringify({ id: targetSection.id, sort_order: section.sort_order }),
        }),
      ]);

      fetchSections();
    } catch (error) {
      console.error('Move section error:', error);
    }
  };

  const deleteSection = async (id: number) => {
    if (!confirm('确定删除此板块？板块内的所有内容也将被删除。')) return;
    const token = getToken();
    if (!token) return;

    try {
      await fetch(`/api/admin/sections?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-session': token },
      });
      setSections(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Delete section error:', error);
    }
  };

  const addSection = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const maxOrder = sections.length > 0 ? Math.max(...sections.map(s => s.sort_order)) : 0;
      await fetch('/api/admin/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify({
          page: 'home',
          section_type: newSection.section_type,
          title: newSection.title,
          subtitle: newSection.subtitle,
          sort_order: maxOrder + 1,
        }),
      });
      setShowAddForm(false);
      setNewSection({ section_type: 'custom', title: '', subtitle: '' });
      fetchSections();
    } catch (error) {
      console.error('Add section error:', error);
    }
  };

  const saveSection = async () => {
    if (!editingSection) return;
    const token = getToken();
    if (!token) return;

    setSaving(true);
    try {
      await fetch('/api/admin/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-session': token },
        body: JSON.stringify({
          id: editingSection.id,
          title: editingSection.title,
          subtitle: editingSection.subtitle,
          content: editingSection.content,
          image_url: editingSection.image_url,
          background_color: editingSection.background_color,
        }),
      });
      setEditingSection(null);
      fetchSections();
    } catch (error) {
      console.error('Save section error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">板块管理</h1>
          <p className="text-gray-500 mt-1">管理首页的各个内容板块，可添加、编辑、删除和排序</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          添加板块
        </Button>
      </div>

      {/* Add Section Form */}
      {showAddForm && (
        <Card className="mb-6 border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">添加新板块</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">板块类型</label>
                <select
                  value={newSection.section_type}
                  onChange={(e) => setNewSection(prev => ({ ...prev, section_type: e.target.value }))}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                >
                  {sectionTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">标题</label>
                <Input
                  value={newSection.title}
                  onChange={(e) => setNewSection(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="板块标题"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">副标题</label>
                <Input
                  value={newSection.subtitle}
                  onChange={(e) => setNewSection(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="板块副标题"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addSection} className="gap-2">
                <Plus className="h-4 w-4" /> 添加
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>取消</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section List */}
      <div className="space-y-3">
        {sections.map((section, idx) => (
          <Card key={section.id} className={`transition-all ${!section.is_visible ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Drag handle & order */}
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    disabled={idx === 0}
                    onClick={() => moveSection(section, 'up')}
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <GripVertical className="h-4 w-4 text-gray-400 mx-auto" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    disabled={idx === sections.length - 1}
                    onClick={() => moveSection(section, 'down')}
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </div>

                {/* Section Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {sectionTypes.find(t => t.value === section.section_type)?.label || section.section_type}
                    </Badge>
                    <span className="font-semibold text-gray-900 truncate">{section.title || '无标题'}</span>
                    {!section.is_visible && (
                      <Badge variant="secondary" className="text-xs bg-gray-200">隐藏</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{section.subtitle || '无副标题'}</p>
                  {section.image_url && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <ImageIcon className="h-3 w-3" />
                      已设置背景图
                    </div>
                  )}
                  {section.items && section.items.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">{section.items.length} 个子项目</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Switch
                    checked={section.is_visible}
                    onCheckedChange={() => toggleVisibility(section)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => router.push(`/admin/sections/${section.id}`)}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    编辑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => deleteSection(section.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sections.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>暂无板块，点击右上角添加</p>
          </div>
        )}
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">编辑板块</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditingSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">标题</label>
                <Input
                  value={editingSection.title}
                  onChange={(e) => setEditingSection(prev => prev ? { ...prev, title: e.target.value } : prev)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">副标题</label>
                <Textarea
                  value={editingSection.subtitle}
                  onChange={(e) => setEditingSection(prev => prev ? { ...prev, subtitle: e.target.value } : prev)}
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">背景颜色</label>
                <Input
                  value={editingSection.background_color || ''}
                  onChange={(e) => setEditingSection(prev => prev ? { ...prev, background_color: e.target.value } : prev)}
                  placeholder="如: bg-blue-50, #f0f0f0"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">背景图片</label>
                <ImageUpload
                  value={editingSection.image_url || ''}
                  onChange={(url) => setEditingSection(prev => prev ? { ...prev, image_url: url } : prev)}
                  type="general"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">内容 (JSON)</label>
                <Textarea
                  value={JSON.stringify(editingSection.content, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setEditingSection(prev => prev ? { ...prev, content: parsed } : prev);
                    } catch { /* invalid JSON, ignore */ }
                  }}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={saveSection} disabled={saving} className="gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                保存
              </Button>
              <Button variant="outline" onClick={() => setEditingSection(null)}>取消</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
