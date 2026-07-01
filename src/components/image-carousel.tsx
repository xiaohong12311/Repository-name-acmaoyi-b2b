'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface CarouselSlide {
  image_url: string;
  title?: string;
  link_url?: string;
}

interface DynamicImageCarouselProps {
  section: {
    content: Record<string, unknown>;
  };
}

export default function DynamicImageCarousel({ section }: DynamicImageCarouselProps) {
  const content = section.content as Record<string, unknown>;
  const slides = (content.slides as CarouselSlide[]) || [];
  const autoPlayInterval = (content.autoPlayInterval as number) || 4000;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalSlides = slides.length;
  // We duplicate slides for infinite loop: [0..9, 0..9]
  const extendedSlides = [...slides, ...slides];

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto play
  useEffect(() => {
    if (isPaused || totalSlides === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoPlayInterval, totalSlides]);

  // Infinite loop: when reaching the clone set, snap back
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      const timeout = setTimeout(() => {
        setCurrentIndex(currentIndex - totalSlides);
      }, 500);
      return () => clearTimeout(timeout);
    }
    if (currentIndex < 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex(currentIndex + totalSlides);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalSlides]);

  if (totalSlides === 0) return null;

  // Show 1 image at a time on mobile, 3 on md, 4 on lg
  return (
    <section
      className="w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative">
        {/* Slide track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 1)}%)`,
          }}
        >
          {extendedSlides.map((slide, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 px-2"
              style={{ width: '100%' }}
            >
              <div className="relative w-full aspect-[3/1] md:aspect-[4/1] overflow-hidden rounded-lg">
                {slide.link_url ? (
                  <a href={slide.link_url} className="block w-full h-full">
                    <img
                      src={slide.image_url}
                      alt={slide.title || `Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ) : (
                  <img
                    src={slide.image_url}
                    alt={slide.title || `Slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                (currentIndex % totalSlides) === idx
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
