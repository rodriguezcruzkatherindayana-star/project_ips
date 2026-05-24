import React from 'react';
import { X, Calendar, Clock, MapPin, User, FileText, Phone, Mail } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { getDoctorByName } from '../data/doctors';

interface Appointment {
  id: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
  location?: string;
  notes?: string;
}

interface AppointmentDetailModalProps {
  appointment: Appointment;
  onClose: () => void;
  onDoctorClick?: (doctorId: string) => void;
}

export function AppointmentDetailModal({ appointment, onClose, onDoctorClick }: AppointmentDetailModalProps) {
  const doctor = getDoctorByName(appointment.doctor);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDoctorClick = () => {
    if (doctor && onDoctorClick) {
      onDoctorClick(doctor.id);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="appointment-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />

      {/* Modal */}
      <motion.div
        key="appointment-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 px-6 py-5 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/90 hover:text-white active:text-white/80 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-white text-xl font-semibold pr-10">Detalle de Cita</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge 
                className={appointment.status === 'confirmed' 
                  ? 'bg-green-100 text-green-700 font-medium rounded-full px-4 py-2 text-sm' 
                  : 'bg-amber-100 text-amber-700 font-medium rounded-full px-4 py-2 text-sm'
                }
              >
                {appointment.status === 'confirmed' ? '✓ Cita Confirmada' : '⏱ Pendiente de Confirmación'}
              </Badge>
            </div>

            {/* Specialty */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-1">
                {appointment.specialty}
              </h3>
            </div>

            {/* Date & Time */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Fecha</p>
                  <p className="text-sm text-gray-900 font-semibold capitalize">
                    {formatDate(appointment.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Hora</p>
                  <p className="text-sm text-gray-900 font-semibold">{appointment.time}</p>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Profesional</p>
                  <button
                    onClick={handleDoctorClick}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors text-left"
                  >
                    {appointment.doctor}
                  </button>
                </div>
              </div>
              {doctor && (
                <p className="text-xs text-gray-600 pl-11">{doctor.specialty}</p>
              )}
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Ubicación</p>
                <p className="text-sm text-gray-900">
                  {appointment.location || 'Centro Médico Integra IPS'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Calle 123 #45-67, Bogotá
                </p>
              </div>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Notas</p>
                  <p className="text-sm text-gray-700">{appointment.notes}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm">Llamar</span>
              </Button>
              <Button
                className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">Contactar</span>
              </Button>
            </div>

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