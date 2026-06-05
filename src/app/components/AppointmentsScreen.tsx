import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Calendar, Clock, User, MapPin, Plus, CheckCircle, X, ArrowLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { getDoctorByName } from '../data/doctors';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  documentId: string;
  phone: string;
  eps: string;
  birthDate?: string;
}

interface AppointmentsScreenProps {
  user: User;
  showNewAppointmentForm?: boolean;
  onDoctorClick?: (doctorId: string) => void;
  onViewAppointmentDetail?: (appointment: any) => void;
}

export function AppointmentsScreen({ user, showNewAppointmentForm = false, onDoctorClick, onViewAppointmentDetail }: AppointmentsScreenProps) {
  const [showNewAppointment, setShowNewAppointment] = useState(showNewAppointmentForm);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  // Mock data
  const appointments = [
    {
      id: '1',
      specialty: 'Otorrinolaringología',
      doctor: 'Dr. Carlos Mendoza',
      date: '2024-12-20',
      time: '10:30',
      status: 'confirmed',
      location: 'Consulta 201',
      notes: 'Fibronasolaringoscopia de control'
    },
    {
      id: '2',
      specialty: 'Audiología',
      doctor: 'Dra. Ana Ruiz',
      date: '2024-12-22',
      time: '14:00',
      status: 'pending',
      location: 'Sala de Audiometría',
      notes: 'Audiometría tonal y logoaudiometría'
    },
    {
      id: '3',
      specialty: 'Fonoaudiología',
      doctor: 'Fgo. Luis Ramírez',
      date: '2024-12-15',
      time: '09:00',
      status: 'completed',
      location: 'Consulta 102',
      notes: 'Terapia de rehabilitación auditiva'
    },
    {
      id: '4',
      specialty: 'Vértigo y Tinnitus',
      doctor: 'Dr. Roberto Silva',
      date: '2024-12-10',
      time: '16:30',
      status: 'cancelled',
      location: 'Consulta 204',
      notes: 'Videonistagmografía - Cancelada por el paciente'
    }
  ];

  const specialties = [
    { 
      name: 'Otorrinolaringología', 
      doctors: ['Dr. Carlos Mendoza', 'Dra. Laura Martínez'] 
    },
    { 
      name: 'Otología', 
      doctors: ['Dr. Fernando Rojas', 'Dra. Patricia López'] 
    },
    { 
      name: 'Audiología', 
      doctors: ['Dra. Ana Ruiz', 'Dra. Carolina Reyes'] 
    },
    { 
      name: 'Fonoaudiología', 
      doctors: ['Fgo. Luis Ramírez', 'Fga. Valentina Cruz', 'Fga. Diana Castro'] 
    },
    { 
      name: 'Vértigo y Tinnitus', 
      doctors: ['Dr. Roberto Silva', 'Dra. María Torres'] 
    }
  ];

  // Mock available dates (next 5 days)
  const availableDates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    // Para que quede como "28 May 2026"
    return date.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).replace('.', ''); // a veces 'short' incluye un punto
  };

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return 45; // Default age if not provided
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleConfirmAppointment = () => {
    if (!selectedSpecialty || !selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Completa todos los campos', {
        description: 'Por favor selecciona especialidad, profesional, fecha y hora'
      });
      return;
    }

    setShowConfirmation(true);
    toast.success('¡Cita agendada exitosamente!', {
      description: 'Recibirás confirmación por email y SMS'
    });
  };

  const handleNewAppointment = () => {
    setShowConfirmation(false);
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedReason('');
    setShowNewAppointment(false);
  };

  const filterAppointments = (status?: string) => {
    if (!status) return appointments;
    return appointments.filter(apt => apt.status === status);
  };

  const getDoctorsForSpecialty = (specialty: string) => {
    const spec = specialties.find(s => s.name === specialty);
    return spec ? spec.doctors : [];
  };

  if (showNewAppointment) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 space-y-4 pb-24 overflow-x-hidden"
      >
        {/* Confirmation Message */}
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-green-50 border-green-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-green-900 mb-1">¡Cita confirmada!</h3>
                    <p className="text-sm text-green-800 mb-2">
                      Tu cita ha sido agendada para el {formatDate(selectedDate)} a las {selectedTime} con {selectedDoctor}.
                    </p>
                    <p className="text-xs text-green-700">
                      Te enviaremos un recordatorio 24 horas antes de tu cita por SMS y correo electrónico.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Appointment Form */}
        {!showConfirmation && (
          <Card className="bg-white border-blue-200 shadow-sm border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Agendar Cita Médica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Specialty Selection */}
              <div>
                <Label htmlFor="specialty" className="text-gray-900 mb-2 block">
                  Selecciona la especialidad
                </Label>
                <select
                  id="specialty"
                  value={selectedSpecialty}
                  onChange={(e) => {
                    setSelectedSpecialty(e.target.value);
                    setSelectedDoctor(''); // Reset doctor when specialty changes
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="">-- Selecciona una especialidad --</option>
                  {specialties.map((spec) => (
                    <option key={spec.name} value={spec.name}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Selection */}
              {selectedSpecialty && (
                <div>
                  <Label htmlFor="doctor" className="text-gray-900 mb-2 block">
                    Selecciona el profesional
                  </Label>
                  <select
                    id="doctor"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    <option value="">-- Selecciona un profesional --</option>
                    {getDoctorsForSpecialty(selectedSpecialty).map((doctor) => (
                      <option key={doctor} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date Selection */}
              <div>
                <Label htmlFor="date" className="text-gray-900 mb-2 block">
                  Selecciona la fecha
                </Label>
                <select
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="">-- Selecciona una fecha --</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {formatDate(date)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <Label htmlFor="time" className="text-gray-900 mb-2 block">
                    Selecciona la hora
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg border text-sm transition-all min-h-[44px] ${
                          selectedTime === time
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reason (optional) */}
              <div>
                <Label htmlFor="reason" className="text-gray-900 mb-2 block">
                  Motivo de la consulta (opcional)
                </Label>
                <textarea
                  id="reason"
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  placeholder="Describe brevemente el motivo de tu consulta..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 resize-none"
                />
              </div>

              {/* Confirm Button */}
              <Button 
                onClick={handleConfirmAppointment}
                className="w-full bg-green-600 hover:bg-green-700 min-h-[44px]"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmar cita
              </Button>

              {/* Cancel Button */}
              <Button 
                onClick={() => setShowNewAppointment(false)}
                variant="outline"
                className="w-full min-h-[44px]"
              >
                Cancelar
              </Button>
            </CardContent>
          </Card>
        )}

        {showConfirmation && (
          <Button 
            onClick={handleNewAppointment}
            className="w-full bg-blue-500 hover:bg-blue-600 min-h-[44px]"
          >
            Volver a mis citas
          </Button>
        )}

        {/* Info Box */}
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm text-blue-900 mb-2">💡 Información importante</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Las citas se confirman en 24-48 horas</li>
              <li>• Recibirás notificación por SMS y email</li>
              <li>• Puedes cancelar hasta 4 horas antes</li>
              <li>• Llega 15 minutos antes de tu cita</li>
              <li>• Trae tu documento de identidad y carnet de EPS</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-gray-50 border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-gray-900 mb-3">¿Necesitas ayuda?</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Teléfono:</span> +57 (1) 234 5678
              </p>
              <p>
                <span className="font-medium">WhatsApp:</span> +57 300 123 4567
              </p>
              <p>
                <span className="font-medium">Email:</span> citas@integraips.com
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const handleViewDetail = (appointment: any) => {
    if (onViewAppointmentDetail) {
      onViewAppointmentDetail(appointment);
    }
  };

  return (
    <div className="p-4 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2>Mis Citas</h2>
        <Button 
          onClick={() => setShowNewAppointment(true)}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white shadow-md min-h-[44px]"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Agendar cita
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="text-center bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <p className="text-2xl text-blue-600">{filterAppointments('confirmed').length}</p>
            <p className="text-xs text-gray-600">Confirmadas</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <p className="text-2xl text-amber-500">{filterAppointments('pending').length}</p>
            <p className="text-xs text-gray-600">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <p className="text-2xl text-green-500">{filterAppointments('completed').length}</p>
            <p className="text-xs text-gray-600">Completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" className="mb-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="completed">Pasadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} onDoctorClick={onDoctorClick} onViewDetail={() => handleViewDetail(appointment)} />
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-3">
          {filterAppointments('confirmed').concat(filterAppointments('pending')).map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} onDoctorClick={onDoctorClick} onViewDetail={() => handleViewDetail(appointment)} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3">
          {filterAppointments('completed').map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} onDoctorClick={onDoctorClick} onViewDetail={() => handleViewDetail(appointment)} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-3">
          {filterAppointments('cancelled').map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} onDoctorClick={onDoctorClick} onViewDetail={() => handleViewDetail(appointment)} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AppointmentCard({ appointment, onDoctorClick, onViewDetail }: { appointment: any; onDoctorClick?: (doctorId: string) => void; onViewDetail: () => void }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-full px-3 py-1 text-xs font-medium border-0">Confirmada</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 rounded-full px-3 py-1 text-xs font-medium border-0">Asignada</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-3 py-1 text-xs font-medium border-0">Completada</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 rounded-full px-3 py-1 text-xs font-medium border-0">Cancelada</Badge>;
      default:
        return <Badge variant="secondary" className="rounded-full px-3 py-1">{status}</Badge>;
    }
  };

  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).replace('.', ''); 
  };

  return (
    <Card className="bg-white border-gray-100 shadow-sm rounded-[24px] mb-4 cursor-pointer hover:shadow-md active:scale-[0.98] transition-all" onClick={onViewDetail}>
      <CardContent className="p-5 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-[17px] text-[#001f3f]">{appointment.specialty}</h3>
          {getStatusBadge(appointment.status)}
        </div>
        
        <p className="text-gray-500 mb-4 text-[15px]">{appointment.doctor}</p>
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-600 font-medium text-[14px]">
            {formatAppointmentDate(appointment.date)} | {appointment.time}
          </span>
          <span className="text-blue-600 font-semibold text-sm flex items-center gap-1">
            Ver Detalle Cita <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}