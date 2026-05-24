import React from 'react';
import { ArrowLeft, Calendar, User, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import type { NewsArticle } from './NewsCarousel';

interface BlogDetailScreenProps {
  article: NewsArticle;
  onBack: () => void;
}

export const BlogDetailScreen: React.FC<BlogDetailScreenProps> = ({ article, onBack }) => {
  const handleShare = () => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.subtitle || article.title,
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="min-h-screen bg-gray-50 overflow-x-hidden"
    >
      {/* Header Image */}
      <div className="relative h-64 overflow-hidden" style={{ backgroundColor: article.backgroundColor }}>
        <ImageWithFallback
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Back Button Overlay */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg z-10"
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-gray-900" />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-white text-blue-600 hover:bg-white">
            {article.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 -mt-8">
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            {/* Title */}
            <h1 className="text-gray-900 mb-4">{article.title}</h1>

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-sm max-w-none">
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {article.content}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              <Button
                variant="outline"
                className="flex-1"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Guardar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="text-gray-900 mb-3">Artículos relacionados</h3>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 line-clamp-2">
                    Cuidados preventivos para la temporada de lluvias
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Hace 2 días</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 line-clamp-2">
                    Beneficios de mantener tus vacunas al día
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Hace 5 días</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};