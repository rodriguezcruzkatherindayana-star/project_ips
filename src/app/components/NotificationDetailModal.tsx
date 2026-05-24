import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Calendar, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Notification } from '../contexts/AppContext';

interface NotificationDetailModalProps {
  notification: Notification | null;
  onClose: () => void;
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  const renderContent = () => {
    const { type, actionData } = notification;

    switch (type) {
      case 'result':
        return renderResultContent();
      case 'appointment':
        return renderAppointmentContent();
      case 'authorization':
        return renderAuthorizationContent();
      case 'reminder':
        return renderReminderContent();
      default:
        return renderGeneralContent();
    }
  };

  const renderResultContent = () => {
    // Datos de ejemplo basados en ResultsScreen
    const resultData = {
      '1': {
        name: 'Hemograma Completo',
        date: '2024-12-15',
        doctor: 'Dr. Carlos Mendoza',
        category: 'Hematología',
        description: 'Conteo completo de células sanguíneas',
        results: {
          'Hemoglobina': { value: '14.2', reference: '12.0-15.5', unit: 'g/dL', status: 'normal' },
          'Hematocrito': { value: '42.1', reference: '37.0-47.0', unit: '%', status: 'normal' },
          'Leucocitos': { value: '7.200', reference: '4.500-11.000', unit: '/μL', status: 'normal' },
          'Plaquetas': { value: '285.000', reference: '150.000-450.000', unit: '/μL', status: 'normal' }
        }
      },
      '3': {
        name: 'Perfil Lipídico',
        date: '2024-12-08',
        doctor: 'Dr. Miguel Torres',
        category: 'Bioquímica',
        description: 'Evaluación de lípidos en sangre',
        results: {
          'Colesterol Total': { value: '195', reference: '<200', unit: 'mg/dL', status: 'normal' },
          'HDL': { value: '55', reference: '>40', unit: 'mg/dL', status: 'normal' },
          'LDL': { value: '125', reference: '<130', unit: 'mg/dL', status: 'normal' },
          'Triglicéridos': { value: '75', reference: '<150', unit: 'mg/dL', status: 'normal' }
        }
      }
    };

    const itemId = notification.actionData?.itemId || '1';
    const result = resultData[itemId as keyof typeof resultData] || resultData['1'];

    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-blue-900">{result.name}</h3>
            <p className="text-sm text-blue-700 mt-1">{result.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Fecha del examen</p>
            <p className="text-gray-900 mt-1">{result.date}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Médico tratante</p>
            <p className="text-gray-900 mt-1">{result.doctor}</p>
          </div>
        </div>

        <div>
          <h4 className="text-gray-900 mb-3">Resultados del Examen</h4>
          <div className="space-y-2">
            {Object.entries(result.results).map(([key, data]) => (
              <div key={key} className="p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-gray-900">{key}</p>
                  <Badge className="bg-green-100 text-green-700">Normal</Badge>
                </div>
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="text-blue-600">{data.value} {data.unit}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">Ref: {data.reference} {data.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>
          <Button className="flex-1" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Ver completo
          </Button>
        </div>

        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>Estos resultados son preliminares. Consulta con tu médico tratante para una interpretación completa.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderAppointmentContent = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <Calendar className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-purple-900">Cita Médica Confirmada</h3>
            <p className="text-sm text-purple-700 mt-1">Tu cita ha sido programada exitosamente</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Médico</p>
            <p className="text-gray-900 mt-1">Dr. Carlos Mendoza</p>
            <p className="text-sm text-gray-600">Medicina General</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Fecha</p>
              <p className="text-gray-900 mt-1">20 Dic 2024</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Hora</p>
              <p className="text-gray-900 mt-1">10:00 AM</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Ubicación</p>
            <p className="text-gray-900 mt-1">Integra IPS - Sede Principal</p>
            <p className="text-sm text-gray-600">Calle 45 # 23-67, Bogotá</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Tipo de cita</p>
            <p className="text-gray-900 mt-1">Consulta de Control</p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2 text-sm text-amber-900">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="font-medium">Recordatorios importantes:</p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-amber-800">
                <li>Llegar 15 minutos antes</li>
                <li>Traer documento de identidad</li>
                <li>Traer carné de la EPS</li>
              </ul>
            </div>
          </div>
        </div>

        <Button className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          Agregar al Calendario
        </Button>
      </div>
    );
  };

  const renderAuthorizationContent = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-green-900">Autorización Aprobada</h3>
            <p className="text-sm text-green-700 mt-1">Tu solicitud ha sido aprobada por la EPS</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Procedimiento autorizado</p>
            <p className="text-gray-900 mt-1">Consulta Especializada - Cardiología</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Código de autorización</p>
              <p className="text-gray-900 mt-1">AUTH-2024-001234</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Estado</p>
              <div className="mt-1">
                <Badge className="bg-green-100 text-green-700">Aprobada</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Fecha de autorización</p>
              <p className="text-gray-900 mt-1">18 Dic 2024</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Válida hasta</p>
              <p className="text-gray-900 mt-1">18 Ene 2025</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">EPS</p>
            <p className="text-gray-900 mt-1">Nueva EPS</p>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2 text-sm text-blue-900">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
            <p>Esta autorización es válida por 30 días. Programa tu cita antes de que expire.</p>
          </div>
        </div>

        <Button className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Descargar Autorización
        </Button>
      </div>
    );
  };

  const renderReminderContent = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-amber-900">Recordatorio de Medicamento</h3>
            <p className="text-sm text-amber-700 mt-1">Es hora de tomar tu medicamento</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Medicamento</p>
            <p className="text-gray-900 mt-1">Losartán 50mg</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Dosis</p>
              <p className="text-gray-900 mt-1">1 tableta</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">Frecuencia</p>
              <p className="text-gray-900 mt-1">Cada 12 horas</p>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Instrucciones</p>
            <p className="text-gray-900 mt-1">Tomar con el estómago vacío, 1 hora antes de las comidas</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Prescrito por</p>
            <p className="text-gray-900 mt-1">Dr. Carlos Mendoza</p>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2 text-sm text-blue-900">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
            <p>No olvides tomar tu medicamento a la misma hora todos los días para mejores resultados.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">
            Posponer 15 min
          </Button>
          <Button>
            Marcar como tomado
          </Button>
        </div>
      </div>
    );
  };

  const renderGeneralContent = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-gray-900">{notification.message}</p>
          <p className="text-sm text-gray-600 mt-2">{notification.time}</p>
        </div>
      </div>
    );
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'result':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'appointment':
        return <Calendar className="h-6 w-6 text-purple-500" />;
      case 'authorization':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'reminder':
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  const getTitle = () => {
    switch (notification.type) {
      case 'result':
        return 'Resultado Médico';
      case 'appointment':
        return 'Cita Médica';
      case 'authorization':
        return 'Autorización EPS';
      case 'reminder':
        return 'Recordatorio';
      default:
        return 'Notificación';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: '100%', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: '100%', scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getIcon()}
              <div>
                <h2 className="text-gray-900">{getTitle()}</h2>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
