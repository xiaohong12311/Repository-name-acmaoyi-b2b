'use client';

import { useEffect } from 'react';
import { getAdsConfig } from '@/config/brand-config';

/**
 * 广告 Pixel 集成组件
 * 
 * 自动加载 TikTok 和 Facebook Pixel 代码
 * 支持页面浏览、产品查看、购买等事件追踪
 * 
 * 使用方法：
 * 在 layout.tsx 中引入：<AdsPixel />
 */
export function AdsPixel() {
  const adsConfig = getAdsConfig();

  useEffect(() => {
    // TikTok Pixel 初始化
    if (adsConfig.tiktokPixelId) {
      initTikTokPixel(adsConfig.tiktokPixelId);
    }

    // Facebook Pixel 初始化
    if (adsConfig.facebookPixelId) {
      initFacebookPixel(adsConfig.facebookPixelId);
    }
  }, [adsConfig.tiktokPixelId, adsConfig.facebookPixelId]);

  return null; // 不渲染任何 UI
}

/**
 * TikTok Pixel 初始化
 */
function initTikTokPixel(pixelId: string) {
  if (typeof window === 'undefined' || window.ttq) return;

  // TikTok Pixel 代码
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,t){
      w.TiktokAnalyticsObject=t;
      var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","off","on","once","ready","alias","group","enableCookie","disableCookie"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
      ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i=t._i||{};
        ttq._i[e]=[];
        ttq._i[e]._u=i;
        var s={};for(var o in n)n.hasOwnProperty(o)&&(s[o]=n[o]);
        s._cdn=i;s._apiKey=e;s._companyId=n.companyId;
        var a=d.createElement("script");
        a.type="text/javascript";a.async=!0;a.src=i;
        d.head.appendChild(a);
        ttq._i[e]._preloadOptions=s;
      };
      ttq.__all_i=[];
      for(var c in ttq._i)ttq._i.hasOwnProperty(c)&&ttq.__all_i.push(c);
      ttq._i=ttq.__all_i;
      ttq.load("${pixelId}");
      ttq.page();
    }(window,document,"ttq"));
  `;
  document.head.appendChild(script);
}

/**
 * Facebook Pixel 初始化
 */
function initFacebookPixel(pixelId: string) {
  if (typeof window === 'undefined' || window.fbq) return;

  // Facebook Pixel 代码
  const script = document.createElement('script');
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);

  // Facebook Pixel noscript fallback
  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.head.appendChild(noscript);
}

/**
 * 追踪事件工具函数
 * 可在页面中使用这些函数追踪特定行为
 */

// TikTok 事件追踪
export function trackTikTokEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track(eventName, params);
  }
}

// Facebook 事件追踪
export function trackFacebookEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

// 同时追踪两个平台
export function trackAdsEvent(eventName: string, params?: Record<string, unknown>) {
  trackTikTokEvent(eventName, params);
  trackFacebookEvent(eventName, params);
}

// 常用事件追踪函数
export function trackPageView() {
  trackAdsEvent('PageView');
}

export function trackProductView(productId: string, productName: string, price: number) {
  trackAdsEvent('ViewContent', {
    content_id: productId,
    content_name: productName,
    content_type: 'product',
    value: price,
    currency: 'USD',
  });
}

export function trackAddToCart(productId: string, productName: string, price: number, quantity: number) {
  trackAdsEvent('AddToCart', {
    content_id: productId,
    content_name: productName,
    content_type: 'product',
    value: price * quantity,
    currency: 'USD',
    num_items: quantity,
  });
}

export function trackInitiateCheckout(totalValue: number) {
  trackAdsEvent('InitiateCheckout', {
    value: totalValue,
    currency: 'USD',
  });
}

export function trackPurchase(orderId: string, totalValue: number) {
  trackAdsEvent('Purchase', {
    order_id: orderId,
    value: totalValue,
    currency: 'USD',
  });
}

// Type declarations
declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
    };
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}