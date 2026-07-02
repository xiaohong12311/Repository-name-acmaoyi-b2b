'use client';

import { useState, useEffect, useCallback } from 'react';

interface CarouselSlide {
  image_url: string;
  title?: string;
  link_url?: string;
}

// Default placeholder slides (10 slides as requested)
const DEFAULT_SLIDES: CarouselSlide[] = [
  { image_url: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400', title: 'Product 1' },
  { image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', title: 'Product 2' },
  { image_url: 'https://images.unsplash.com/photo-1504148455328-c3769071a1e8?w=400', title: 'Product 3' },
  { image_url: 'https://images.unsplash.com/photo-1513506003901-1a6a0db60fbb?w=400', title: 'Product 4' },
  { image_url: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400', title: 'Product 5' },
  { image_url: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400', title: 'Product 6' },
  { image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', title: 'Product 7' },
  { image_url: 'https://images.unsplash.com/photo-1504148455328-c3769071a1e8?w=400', title: 'Product 8' },
  { image_url: 'https://images.unsplash.com/photo-1513506003901-1a6a0db60fbb?w=400', title: 'Product 9' },
  { image_url: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400', title: 'Product 10' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DynamicImageCarousel({ section }: { section: any }) {
  // Priority: section.items from DB > content.slides > default
  const itemSlides: CarouselSlide[] = (section.items || [])
    .filter((item: CarouselSlide | null) => item != null && item.image_url)
    .map((item: CarouselSlide) => ({
      image_url: item.image_url,
      title: item.title || '',
      link_url: item.link_url || '',
    }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content = section.content || {} as any;
  const dbSlides: CarouselSlide[] = content.slides || [];
  const slides: CarouselSlide[] = itemSlides.length > 0 ? itemSlides : dbSlides.length > 0 ? dbSlides : DEFAULT_SLIDES;
  const autoPlayInterval: number = content.autoPlayInterval || 4000;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = currentIndex + 1;
    if (next >= totalSlides) {
      // At the end (slide 10), snap back to start (slide 1)
      setCurrentIndex(0);
    } else {
      goToSlide(next);
    }
  }, [currentIndex, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = currentIndex - 1;
    if (prev < 0) {
      setCurrentIndex(totalSlides - 1);
    } else {
      goToSlide(prev);
    }
  }, [currentIndex, totalSlides, goToSlide]);

  // Auto play
  useEffect(() => {
    if (isPaused || totalSlides === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoPlayInterval, totalSlides]);

  if (totalSlides === 0) return null;

  return (
    <section
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden">
        {/* Slide track - show multiple cards */}
        <div
          className="flex transition-transform duration-500 ease-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {slides.map((slide: CarouselSlide, idx: number) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{ width: 'calc(33.333% - 11px)' }}
            >
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl group cursor-pointer">
                <img
                  src={slide.image_url}
                  alt={slide.title || `Slide ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.placeholder-bg')) {
                      const div = document.createElement('div');
                      div.className = 'placeholder-bg absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center';
                      const span = document.createElement('span');
                      span.className = 'text-primary/40 text-lg font-semibold';
                      span.textContent = slide.title || `Product ${idx + 1}`;
                      div.appendChild(span);
                      parent.appendChild(div);
                    }
                  }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg text-gray-800 flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-lg text-gray-800 flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_s: CarouselSlide, idx: number) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === idx
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
