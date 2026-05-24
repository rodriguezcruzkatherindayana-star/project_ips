import React from 'react';
import { X, Calendar, User, Share2, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import type { NewsArticle } from './NewsCarousel';

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export function ArticleDetailModal({ article, onClose }: ArticleDetailModalProps) {
  if (!article) return null;

  const handleShare = () => {
    toast.success('¡Artículo compartido!');
  };

  const handleBookmark = () => {
    toast.success('Artículo guardado en favoritos');
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="article-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />

      {/* Modal */}
      <motion.div
        key="article-modal"
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-x-4 bottom-4 top-16 z-50 max-w-2xl mx-auto"
      >
        <div className="bg-white h-full rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header with close button */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge 
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: article.backgroundColor || '#3B82F6',
                  color: 'white'
                }}
              >
                {article.category}
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Image */}
            {article.image && (
              <div className="relative w-full h-64 sm:h-80 bg-gray-200">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p className="text-lg text-gray-600">
                    {article.subtitle}
                  </p>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author || 'Integra IPS'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date || new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {article.content.split('\n').map((paragraph, index) => {
                  // Check if paragraph starts with bullet point
                  if (paragraph.trim().startsWith('•')) {
                    return (
                      <div key={index} className="flex items-start gap-3 mb-3">
                        <span className="text-blue-500 text-xl mt-1">•</span>
                        <p className="text-gray-700 leading-relaxed flex-1">
                          {paragraph.trim().substring(1).trim()}
                        </p>
                      </div>
                    );
                  }
                  
                  // Regular paragraph
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  
                  return null;
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Compartir</span>
                </Button>
                <Button
                  onClick={handleBookmark}
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Guardar</span>
                </Button>
              </div>

              {/* CTA Button */}
              {article.buttonText && (
                <Button
                  className="w-full rounded-2xl text-white font-semibold py-6"
                  style={{ backgroundColor: article.backgroundColor || '#3B82F6' }}
                >
                  {article.buttonText}
                </Button>
              )}

              {/* Disclaimer */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-6">
                <p className="text-xs text-blue-900 text-center">
                  <strong>Nota:</strong> La información contenida en este artículo es de carácter informativo y educativo. Siempre consulta con un profesional de la salud para obtener asesoramiento médico personalizado.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full rounded-2xl text-gray-600 hover:bg-gray-100"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}