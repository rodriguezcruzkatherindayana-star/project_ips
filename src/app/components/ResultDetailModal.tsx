import React from 'react';
import { X, FileText, Calendar, Download, Share2, CheckCircle, Eye } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Result {
  id: string;
  type: string;
  name: string;
  date: string;
  status: string;
  description?: string;
  doctor?: string;
  findings?: string;
}

interface ResultDetailModalProps {
  result: Result;
  onClose: () => void;
  onViewFull?: () => void;
}

export function ResultDetailModal({ result, onClose, onViewFull }: ResultDetailModalProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDownload = () => {
    toast.success('Descargando resultado...');
    // Simulate download
  };

  const handleShare = () => {
    toast.success('Compartiendo resultado...');
    // Simulate share
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="result-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />

      {/* Modal */}
      <motion.div
        key="result-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-5 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/90 hover:text-white active:text-white/80 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-white text-xl font-semibold pr-10">Resultado Médico</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge className="bg-green-100 text-green-700 font-medium rounded-full px-4 py-2 text-sm">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                Disponible
              </Badge>
            </div>

            {/* Exam Name */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-1">
                {result.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">{result.type}</p>
            </div>

            {/* Date */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Fecha del Examen</p>
                  <p className="text-sm text-gray-900 font-semibold capitalize">
                    {formatDate(result.date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor (if available) */}
            {result.doctor && (
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Médico Solicitante</p>
                  <p className="text-sm text-gray-900 font-semibold">
                    {result.doctor}
                  </p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Descripción</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {result.description || 'Examen de ' + result.name + ' realizado en Centro Médico Integra IPS. Los resultados han sido procesados y están disponibles para su revisión.'}
              </p>
            </div>

            {/* Findings (if available) */}
            {result.findings && (
              <div className="bg-green-50 border-l-4 border-green-500 rounded-r-2xl p-4">
                <h4 className="text-sm font-semibold text-green-900 mb-2">Hallazgos</h4>
                <p className="text-sm text-green-800 leading-relaxed">
                  {result.findings}
                </p>
              </div>
            )}

            {/* Info Notice */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <p className="text-xs text-amber-800 text-center">
                <strong>Importante:</strong> Estos resultados deben ser interpretados por un profesional de la salud.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">Descargar</span>
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-green-200 text-green-600 hover:bg-green-50"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm">Compartir</span>
              </Button>
            </div>

            {/* View Full Button */}
            {onViewFull && (
              <Button
                onClick={() => {
                  onViewFull();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Eye className="h-4 w-4" />
                <span>Ver Resultado Completo</span>
              </Button>
            )}

            {/* Close Button */}
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
    </>
  );
}