import React from 'react';
import { Calendar, Clock, User as UserIcon, MapPin, ArrowLeft } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { getDoctorByName } from '../data/doctors';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerDescription } from './ui/drawer';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  documentId: string;
  eps: string;
  birthDate?: string;
  [key: string]: any;
}

interface Appointment {
  id: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  status: string;
  location?: string;
  notes?: string;
}

interface AppointmentDetailModalProps {
  appointment: Appointment;
  onClose: () => void;
  onDoctorClick?: (doctorId: string) => void;
  user?: User;
}

export function AppointmentDetailModal({ appointment, onClose, onDoctorClick, user }: AppointmentDetailModalProps) {
  const doctor = getDoctorByName(appointment.doctor);
  
  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).replace('.', ''); 
  };

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return 41; // Default age if not provided based on the mock user
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Drawer open={true} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-[#f4f5f9] rounded-t-[24px] overflow-hidden max-h-[96vh] h-[96vh] p-0 flex flex-col fixed inset-x-0 bottom-0 mt-auto w-full max-w-md mx-auto">
          {(() => {
            const formatAppointmentDateFull = (dateString: string) => {
              try {
                const date = new Date(dateString + 'T12:00:00');
                const formatter = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                const parts = formatter.formatToParts(date);
                const weekday = parts.find(p => p.type === 'weekday')?.value || '';
                const day = parts.find(p => p.type === 'day')?.value || '';
                const month = parts.find(p => p.type === 'month')?.value || '';
                const year = parts.find(p => p.type === 'year')?.value || '';
                const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
                return `${capitalize(weekday)}, ${day} de ${capitalize(month)} de ${year}`;
              } catch (e) {
                return dateString;
              }
            };
            
            const safeUser = user || { name: 'María García', documentId: '12345678', eps: 'Nueva EPS' };
            
            return (
              <div className="flex flex-col h-full overflow-hidden w-full relative">
                {/* Header Azul */}
                <div className="bg-[#2563eb] pt-8 pb-16 px-5 relative shrink-0">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full" />
                  <DrawerTitle className="sr-only">Detalle de la Cita</DrawerTitle>
                  <DrawerDescription className="sr-only">Información de la cita</DrawerDescription>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <DrawerClose className="text-white p-1 hover:bg-white/10 rounded-full transition-colors">
                      <ArrowLeft className="w-6 h-6" />
                    </DrawerClose>
                    <h2 className="text-white text-xl font-medium tracking-wide">Detalle de la cita</h2>
                  </div>
                  
                  {/* Badge flotante "Cita agendada" */}
                  {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
                    <div className="mt-6 flex items-center bg-white rounded-r-full -ml-5 py-2.5 px-4 pr-6 w-max shadow-sm">
                      <div className="bg-[#171f37] rounded-full p-2 mr-3 text-white">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-medium text-[#171f37] leading-tight">Cita agendada</span>
                        <div className="bg-blue-50 px-2 py-0.5 rounded text-xs font-semibold text-blue-700 mt-1 w-max">
                          Pago en sitio
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-5 pb-8 -mt-8 relative z-10 w-full">
                  {/* Main White Card */}
                  <div className="bg-white rounded-2xl shadow-sm p-5 mb-5 w-full border border-gray-100/50">
                    <h3 className="text-[#171f37] font-bold text-[17px] leading-snug mb-5 pr-2">
                      {appointment.notes || appointment.specialty}
                    </h3>
                    
                    <div className="flex flex-col gap-1.5 mb-5">
                      <span className="text-[#171f37] text-[15px] font-medium">
                        {formatAppointmentDateFull(appointment.date)}
                      </span>
                      <span className="text-[#2563eb] font-bold text-[17px]">
                        {appointment.time}
                      </span>
                      <span className="text-[#171f37] font-bold text-[15px] mt-1">
                        Profesional {appointment.doctor}
                      </span>
                    </div>

                    {/* Alerta de preparacion (opcional) */}
                    <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 flex items-center gap-3 mb-5">
                      <div className="w-5 h-5 rounded-full border border-orange-300 text-orange-400 flex items-center justify-center text-[10px] font-bold shrink-0">i</div>
                      <span className="text-[13px] text-[#171f37]/90 underline decoration-[#171f37]/30 underline-offset-2 cursor-pointer hover:text-blue-600 hover:decoration-blue-600 transition-colors">Consulta la preparación para tu cita aquí.</span>
                    </div>

                    <div className="h-px bg-gray-100 w-full mb-4" />

                    <div className="flex flex-col gap-1">
                      <span className="text-[#171f37] text-[15px]">Sede</span>
                      <span className="text-[#171f37] font-bold text-[15px]">
                        {appointment.location || 'Ips Viva 1a Portal Del Prado'}
                      </span>
                    </div>
                  </div>

                  {/* Patient Card */}
                  <div className="bg-[#eef2ff] rounded-[20px] p-4 flex items-center gap-4 mb-6 w-full border border-[#2563eb]/5">
                    <div className="w-[46px] h-[46px] bg-white rounded-full flex items-center justify-center border border-[#2563eb]/20 shrink-0 shadow-sm">
                      <span className="text-[#2563eb] font-bold text-xl">{safeUser.name.charAt(0)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#171f37] font-bold text-[15px]">{safeUser.name}</span>
                      <span className="text-[#171f37] font-medium text-[15px]">C{safeUser.documentId}</span>
                    </div>
                  </div>

                  {/* Recomendaciones */}
                  <div className="mb-8 w-full">
                    <h4 className="text-[#171f37] font-bold text-[17px] mb-4">Recomendaciones:</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-2 shrink-0" />
                        <span className="text-[#171f37]/90 text-[15px] leading-snug">Llegar con 20 minutos de anticipación.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-2 shrink-0" />
                        <span className="text-[#171f37]/90 text-[15px] leading-snug">Si no puedes asistir, cancela con 2 horas de antelación.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3.5 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => toast.info('Reprogramar cita')}
                      className="w-full rounded-full border border-[#171f37] text-[#171f37] hover:bg-[#171f37] hover:text-white h-[52px] text-[16px] font-bold active:scale-[0.98] transition-all bg-transparent"
                    >
                      Reprogramar cita
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => toast.error('Cancelar cita')}
                      className="w-full rounded-full border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white h-[52px] text-[16px] font-bold active:scale-[0.98] transition-all bg-transparent"
                    >
                      Cancelar cita
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}
        </DrawerContent>
    </Drawer>
  );
}