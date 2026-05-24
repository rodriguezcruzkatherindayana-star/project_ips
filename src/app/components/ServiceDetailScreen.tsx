import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { 
  Ear, 
  Stethoscope, 
  Volume2, 
  MessageSquare, 
  Activity, 
  Headphones,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  User,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import type { SpecializedService } from './SpecializedServicesScreen';
import { toast } from 'sonner@2.0.3';

interface ServiceDetailScreenProps {
  service: SpecializedService;
  onBack: () => void;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  service,
  onBack
}) => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const getIcon = (iconName: string) => {
    const iconClass = "h-12 w-12 text-blue-500";
    switch (iconName) {
      case 'ear':
        return <Ear className={iconClass} />;
      case 'stethoscope':
        return <Stethoscope className={iconClass} />;
      case 'volume':
        return <Volume2 className={iconClass} />;
      case 'message':
        return <MessageSquare className={iconClass} />;
      case 'activity':
        return <Activity className={iconClass} />;
      case 'headphones':
        return <Headphones className={iconClass} />;
      default:
        return <Stethoscope className={iconClass} />;
    }
  };

  // Mock available dates
  const availableDates = [
    '2025-01-06',
    '2025-01-07',
    '2025-01-08',
    '2025-01-09',
    '2025-01-10'
  ];

  // Mock available times
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleConfirmAppointment = () => {
    if (!selectedProfessional || !selectedDate || !selectedTime) {
      toast.error('Completa todos los campos', {
        description: 'Por favor selecciona profesional, fecha y hora'
      });
      return;
    }

    const professional = service.professionals.find(p => p.name === selectedProfessional);
    setShowConfirmation(true);
    
    toast.success('¡Cita agendada exitosamente!', {
      description: `Tu cita ha sido confirmada`
    });
  };

  const handleContact = (type: 'phone' | 'whatsapp' | 'email') => {
    switch (type) {
      case 'phone':
        toast.info('Llamando...', { description: '+57 (1) 234 5678' });
        break;
      case 'whatsapp':
        toast.info('Abriendo WhatsApp...', { description: '+57 300 123 4567' });
        break;
      case 'email':
        toast.info('Abriendo correo...', { description: 'servicios@integraips.com' });
        break;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 space-y-4 pb-24 overflow-x-hidden"
    >
      {/* Header with Icon */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-elevated">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            {getIcon(service.icon)}
          </div>
          <h1 className="text-white mb-2">{service.title}</h1>
          <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/40">
            {service.category}
          </Badge>
        </CardContent>
      </Card>

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
                    Tu cita ha sido agendada para el {formatDate(selectedDate)} a las {selectedTime} con {selectedProfessional}.
                  </p>
                  <p className="text-xs text-green-700">
                    Te enviaremos un recordatorio 24 horas antes de tu cita.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Description */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Descripción del Servicio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {service.detailedDescription}
          </p>
        </CardContent>
      </Card>

      {/* When to Consult */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">¿Cuándo acudir?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Consulta este servicio si presentas alguno de estos síntomas o situaciones:
          </p>
          <ul className="space-y-2">
            {service.whenToConsult.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* What Includes */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">¿Qué incluye la atención?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {service.whatIncludes.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Available Professionals */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Profesionales Disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {service.professionals.map((professional, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{professional.name}</p>
                <p className="text-xs text-gray-600">{professional.availability}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appointment Form */}
      {!showConfirmation && (
        <Card className="bg-white border-blue-200 shadow-sm border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Agendar Cita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showAppointmentForm ? (
              <Button 
                onClick={() => setShowAppointmentForm(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 min-h-[44px]"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar cita ahora
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Professional Selection */}
                <div>
                  <Label htmlFor="professional" className="text-gray-900 mb-2 block">
                    Selecciona el profesional
                  </Label>
                  <select
                    id="professional"
                    value={selectedProfessional}
                    onChange={(e) => setSelectedProfessional(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    <option value="">-- Selecciona un profesional --</option>
                    {service.professionals.map((prof, index) => (
                      <option key={index} value={prof.name}>
                        {prof.name} - {prof.availability}
                      </option>
                    ))}
                  </select>
                </div>

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
                  onClick={() => setShowAppointmentForm(false)}
                  variant="outline"
                  className="w-full min-h-[44px]"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Contact Options */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">¿Tienes preguntas?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 mb-3">
            Nuestro equipo está disponible para resolver todas tus dudas
          </p>
          
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => handleContact('phone')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-3 min-h-[44px]"
            >
              <Phone className="h-5 w-5 text-blue-500" />
              <span className="text-xs">Llamar</span>
            </Button>
            <Button
              onClick={() => handleContact('whatsapp')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-3 min-h-[44px]"
            >
              <MessageCircle className="h-5 w-5 text-green-500" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            <Button
              onClick={() => handleContact('email')}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-3 min-h-[44px]"
            >
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="text-xs">Email</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Location Info */}
      <Card className="bg-gray-50 border-gray-200 shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-gray-900 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Ubicación y Contacto
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Dirección:</span><br />
              Calle 100 #15-20, Bogotá, Colombia
            </p>
            <p>
              <span className="font-medium">Teléfono:</span><br />
              +57 (1) 234 5678
            </p>
            <p>
              <span className="font-medium">Email:</span><br />
              servicios@integraips.com
            </p>
            <p>
              <span className="font-medium">Horario:</span><br />
              Lunes a Viernes: 7:00 AM - 6:00 PM<br />
              Sábados: 8:00 AM - 12:00 PM
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};