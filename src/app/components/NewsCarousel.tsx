import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  backgroundColor: string;
  buttonText?: string;
  content: string;
  date: string;
  author?: string;
}

interface NewsCarouselProps {
  articles: NewsArticle[];
  onArticleClick: (article: NewsArticle) => void;
}

export const NewsCarousel: React.FC<NewsCarouselProps> = ({ articles, onArticleClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, articles.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  };

  return (
    <div 
      className="news-carousel-container pb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div 
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {articles.map((article) => (
            <div key={article.id} className="w-full flex-shrink-0 px-1">
              <Card
                className="overflow-hidden cursor-pointer transition-all hover:shadow-elevated"
                onClick={() => onArticleClick(article)}
                style={{ backgroundColor: article.backgroundColor }}
              >
                <div className="relative h-48 overflow-hidden">
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-white text-blue-600 hover:bg-white">
                      {article.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex-1 flex items-center">
                      <div className="text-white max-w-[60%]">
                        {article.subtitle && (
                          <p className="text-sm opacity-90 mb-1">{article.subtitle}</p>
                        )}
                        <h3 className="text-white mb-3">{article.title}</h3>
                        {article.buttonText && (
                          <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onArticleClick(article);
                            }}
                          >
                            {article.buttonText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Image on the right */}
                  <div className="absolute right-0 top-0 bottom-0 w-1/2">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide 
                ? 'bg-blue-600 w-6 h-2' 
                : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};