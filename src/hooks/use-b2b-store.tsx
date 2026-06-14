'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { FavoriteItem, SampleCartItem, InquiryItem, Product, Supplier } from '@/types';
import { getProductSupplier, getPriceByQuantity } from '@/data/mock';

interface B2BStoreState {
  favorites: FavoriteItem[];
  sampleCart: SampleCartItem[];
  inquiryItems: InquiryItem[];
}

interface B2BStoreActions {
  // 收藏夹操作
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;

  // 样品车操作
  addToSampleCart: (product: Product, quantity: number, specifications: Record<string, string>) => void;
  updateSampleCartItem: (productId: string, quantity: number) => void;
  removeFromSampleCart: (productId: string) => void;
  clearSampleCart: () => void;
  getSampleCartTotal: () => number;
  getSampleCartCount: () => number;

  // 询盘单操作
  addToInquiry: (product: Product, quantity: number, targetPrice?: number, specifications?: Record<string, string>, notes?: string) => void;
  updateInquiryItem: (productId: string, updates: Partial<InquiryItem>) => void;
  removeFromInquiry: (productId: string) => void;
  clearInquiry: () => void;
  getInquiryCount: () => number;
}

type B2BStore = B2BStoreState & B2BStoreActions;

const B2BStoreContext = createContext<B2BStore | null>(null);

export function B2BStoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [sampleCart, setSampleCart] = useState<SampleCartItem[]>([]);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);

  // 收藏夹操作
  const addToFavorites = useCallback((product: Product) => {
    const supplier = getProductSupplier(product.id);
    if (!supplier) return;
    
    const exists = favorites.some(f => f.productId === product.id);
    if (exists) return;

    const newItem: FavoriteItem = {
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      supplierName: supplier.name,
      price: product.tierPrices[0]?.price || 0,
      moq: product.moq,
      addedAt: new Date().toISOString(),
    };

    setFavorites(prev => [...prev, newItem]);
  }, [favorites]);

  const removeFromFavorites = useCallback((productId: string) => {
    setFavorites(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const isFavorite = useCallback((productId: string) => {
    return favorites.some(f => f.productId === productId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  // 样品车操作
  const addToSampleCart = useCallback((product: Product, quantity: number, specifications: Record<string, string>) => {
    if (!product.sampleAvailable) return;
    
    const supplier = getProductSupplier(product.id);
    if (!supplier) return;

    const existingIndex = sampleCart.findIndex(item => item.productId === product.id);
    
    if (existingIndex >= 0) {
      setSampleCart(prev => prev.map((item, index) => 
        index === existingIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      const newItem: SampleCartItem = {
        productId: product.id,
        productName: product.name,
        productImage: product.images[0],
        supplierId: supplier.id,
        supplierName: supplier.name,
        samplePrice: product.samplePrice || 0,
        quantity,
        specifications,
      };
      setSampleCart(prev => [...prev, newItem]);
    }
  }, [sampleCart]);

  const updateSampleCartItem = useCallback((productId: string, quantity: number) => {
    setSampleCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  }, []);

  const removeFromSampleCart = useCallback((productId: string) => {
    setSampleCart(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const clearSampleCart = useCallback(() => {
    setSampleCart([]);
  }, []);

  const getSampleCartTotal = useCallback(() => {
    return sampleCart.reduce((total, item) => total + item.samplePrice * item.quantity, 0);
  }, [sampleCart]);

  const getSampleCartCount = useCallback(() => {
    return sampleCart.reduce((count, item) => count + item.quantity, 0);
  }, [sampleCart]);

  // 询盘单操作
  const addToInquiry = useCallback((product: Product, quantity: number, targetPrice?: number, specifications?: Record<string, string>, notes?: string) => {
    const supplier = getProductSupplier(product.id);
    if (!supplier) return;

    const existingIndex = inquiryItems.findIndex(item => item.productId === product.id);
    
    if (existingIndex >= 0) {
      setInquiryItems(prev => prev.map((item, index) => 
        index === existingIndex 
          ? { 
              ...item, 
              quantity: item.quantity + quantity,
              targetPrice: targetPrice ?? item.targetPrice,
              notes: notes ?? item.notes,
            }
          : item
      ));
    } else {
      const newItem: InquiryItem = {
        productId: product.id,
        productName: product.name,
        productImage: product.images[0],
        supplierId: supplier.id,
        supplierName: supplier.name,
        quantity,
        targetPrice,
        specifications: specifications || {},
        notes: notes || '',
      };
      setInquiryItems(prev => [...prev, newItem]);
    }
  }, [inquiryItems]);

  const updateInquiryItem = useCallback((productId: string, updates: Partial<InquiryItem>) => {
    setInquiryItems(prev => prev.map(item => 
      item.productId === productId ? { ...item, ...updates } : item
    ));
  }, []);

  const removeFromInquiry = useCallback((productId: string) => {
    setInquiryItems(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const clearInquiry = useCallback(() => {
    setInquiryItems([]);
  }, []);

  const getInquiryCount = useCallback(() => {
    return inquiryItems.length;
  }, [inquiryItems]);

  const store: B2BStore = {
    favorites,
    sampleCart,
    inquiryItems,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    addToSampleCart,
    updateSampleCartItem,
    removeFromSampleCart,
    clearSampleCart,
    getSampleCartTotal,
    getSampleCartCount,
    addToInquiry,
    updateInquiryItem,
    removeFromInquiry,
    clearInquiry,
    getInquiryCount,
  };

  return (
    <B2BStoreContext.Provider value={store}>
      {children}
    </B2BStoreContext.Provider>
  );
}

export function useB2BStore(): B2BStore {
  const context = useContext(B2BStoreContext);
  if (!context) {
    throw new Error('useB2BStore must be used within a B2BStoreProvider');
  }
  return context;
}

// 单独导出各功能的 hooks
export function useFavorites() {
  const store = useB2BStore();
  return {
    favorites: store.favorites,
    addToFavorites: store.addToFavorites,
    removeFromFavorites: store.removeFromFavorites,
    isFavorite: store.isFavorite,
    clearFavorites: store.clearFavorites,
  };
}

export function useSampleCart() {
  const store = useB2BStore();
  return {
    sampleCart: store.sampleCart,
    addToSampleCart: store.addToSampleCart,
    updateSampleCartItem: store.updateSampleCartItem,
    updateQuantity: store.updateSampleCartItem, // Alias for compatibility
    removeFromSampleCart: store.removeFromSampleCart,
    clearSampleCart: store.clearSampleCart,
    getSampleCartTotal: store.getSampleCartTotal,
    getSampleCartCount: store.getSampleCartCount,
  };
}

export function useInquiry() {
  const store = useB2BStore();
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    store.updateInquiryItem(productId, { quantity });
  }, [store]);
  return {
    inquiryItems: store.inquiryItems,
    addToInquiry: store.addToInquiry,
    updateInquiryItem: store.updateInquiryItem,
    updateQuantity,
    removeFromInquiry: store.removeFromInquiry,
    clearInquiry: store.clearInquiry,
    getInquiryCount: store.getInquiryCount,
  };
}

// Supplier join application state
interface SupplierJoinApplication {
  companyInfo: {
    companyName: string;
    businessType: string;
    country: string;
    website: string;
    email: string;
    phone: string;
    address: string;
  };
  certifications: string[];
  productCategories: string[];
  message: string;
  status: 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected';
}

export function useSupplierJoin() {
  const [application, setApplication] = useState<SupplierJoinApplication>({
    companyInfo: {
      companyName: '',
      businessType: '',
      country: '',
      website: '',
      email: '',
      phone: '',
      address: '',
    },
    certifications: [],
    productCategories: [],
    message: '',
    status: 'draft',
  });

  const updateCompanyInfo = useCallback((field: keyof SupplierJoinApplication['companyInfo'], value: string) => {
    setApplication(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value,
      },
    }));
  }, []);

  const updateCertifications = useCallback((certifications: string[]) => {
    setApplication(prev => ({
      ...prev,
      certifications,
    }));
  }, []);

  const updateProductCategories = useCallback((categories: string[]) => {
    setApplication(prev => ({
      ...prev,
      productCategories: categories,
    }));
  }, []);

  const updateMessage = useCallback((message: string) => {
    setApplication(prev => ({
      ...prev,
      message,
    }));
  }, []);

  const submitApplication = useCallback((data?: Record<string, unknown>) => {
    setApplication(prev => ({
      ...prev,
      status: 'submitted',
    }));
    // In real implementation, this would send to API with the data
    console.log('Submitting application:', data);
    return Promise.resolve({ success: true });
  }, []);

  const resetApplication = useCallback(() => {
    setApplication({
      companyInfo: {
        companyName: '',
        businessType: '',
        country: '',
        website: '',
        email: '',
        phone: '',
        address: '',
      },
      certifications: [],
      productCategories: [],
      message: '',
      status: 'draft',
    });
  }, []);

  return {
    application,
    updateCompanyInfo,
    updateCertifications,
    updateProductCategories,
    updateMessage,
    submitApplication,
    resetApplication,
  };
}