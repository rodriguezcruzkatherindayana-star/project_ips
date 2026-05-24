import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { EpidemiologicalAlertCard } from './EpidemiologicalAlertCard';
import { NewsCarousel, NewsArticle } from './NewsCarousel';
import { Calendar, Clock, FileText, Edit3, Stethoscope, Ear, Volume2, MessageSquare, Activity, Headphones, Bell, AlertCircle, CheckCircle, User, X, Download, Share2, MapPin, Phone, Mail, Video } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import type { Notification } from '../contexts/AppContext';
import { getDoctorByName } from '../data/doctors';
import { motion, AnimatePresence } from 'motion/react';
import { AppointmentDetailModal } from './AppointmentDetailModal';
import { ResultDetailModal } from './ResultDetailModal';
import { ArticleDetailModal } from './ArticleDetailModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  documentId: string;
  phone: string;
  eps: string;
}

interface DashboardScreenProps {
  user: User;
  onNavigate?: (screen: string) => void;
  onNavigateToArticle?: (article: NewsArticle) => void;
  onNavigateToService?: (service: SpecializedService) => void;
  onDoctorClick?: (doctorId: string) => void;
  onNavigateToEpidemiologicalAnalysis?: () => void;
  onToggleNotifications?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

interface SpecializedService {
  id: string;
  title: string;
  description: string;
  icon: 'ear' | 'stethoscope' | 'volume' | 'message' | 'activity' | 'headphones';
  category: string;
  detailedDescription: string;
  whenToConsult: string[];
  whatIncludes: string[];
  professionals: {
    name: string;
    availability: string;
  }[];
}

export function DashboardScreen({ 
  user, 
  onNavigate,
  onNavigateToArticle,
  onNavigateToService,
  onDoctorClick,
  onNavigateToEpidemiologicalAnalysis,
  onToggleNotifications,
  onNotificationClick
}: DashboardScreenProps) {
  const { user: contextUser } = useApp();
  
  // Get notifications from context
  const { notifications } = useApp();
  
  // Get the latest (most recent) notification
  const latestNotification = notifications.length > 0 ? notifications[0] : null;

  // Modal states
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Helper function to get notification icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Bell className="h-5 w-5" />;
      case 'authorization':
        return <CheckCircle className="h-5 w-5" />;
      case 'result':
        return <FileText className="h-5 w-5" />;
      case 'appointment':
        return <Calendar className="h-5 w-5" />;
      case 'general':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // Helper function to get notification badge color and text
  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'reminder':
        return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Recordatorio' };
      case 'authorization':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Autorización' };
      case 'result':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Resultado' };
      case 'appointment':
        return { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Cita' };
      case 'general':
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'General' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Notificación' };
    }
  };

  // Helper function to get notification icon color
  const getNotificationIconColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'text-amber-500';
      case 'authorization':
        return 'text-green-500';
      case 'result':
        return 'text-blue-500';
      case 'appointment':
        return 'text-purple-500';
      case 'general':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  // Mock data for news articles
  const newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Integra IPS: Tu salud es nuestra prioridad',
      subtitle: '',
      category: 'SERVICIOS',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FyZSUyMHRlYW18ZW58MXx8fHwxNzU5NDE3NDY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundColor: '#3B82F6',
      buttonText: 'Conoce nuestros servicios',
      content: `En Integra IPS ofrecemos atención médica integral con los más altos estándares de calidad para ti y tu familia.

Nuestros servicios incluyen:
• Medicina General y Especializada
• Laboratorio Clínico certificado
• Imágenes Diagnósticas
• Programas de Prevención y Promoción
• Telemedicina 24/7
• Atención prioritaria para usuarios EPS

Tu bienestar es nuestro compromiso. Confía en Integra IPS.`,
      date: '2 de Enero, 2025',
      author: 'Integra IPS'
    },
    {
      id: '2',
      title: 'Nuevas Especialidades Médicas Disponibles',
      subtitle: 'Ampliamos nuestro portafolio de servicios',
      category: 'NOVEDADES',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBzcGVjaWFsaXN0fGVufDF8fHx8MTc1OTQxNzQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundColor: '#10B981',
      buttonText: 'Agenda tu cita',
      content: `¡Gran noticia! Ahora contamos con nuevas especialidades médicas para brindarte la mejor atención.

Nuevas especialidades disponibles:
• Cardiología - Cuidado integral del corazón
• Otorrinolaringología - Salud auditiva y respiratoria
• Fonoaudiología - Terapias de lenguaje y audición
• Psicología Clínica - Bienestar mental
• Terapia Física - Rehabilitación profesional
• Nutrición - Planes alimenticios personalizados

Agenda tu cita ahora mismo a través de nuestra app o llamando a nuestras líneas de atención. Estamos aquí para cuidarte.`,
      date: '28 de Diciembre, 2024',
      author: 'Integra IPS'
    },
    {
      id: '3',
      title: 'Tecnología al servicio de tu salud',
      subtitle: '',
      category: 'SALUD DIGITAL',
      image: 'https://images.unsplash.com/photo-1758691462493-120a069304e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGhlYWx0aHxlbnwxfHx8fDE3NTkzODQ0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundColor: '#10B981',
      buttonText: 'Conoce más',
      content: `La telemedicina revoluciona la atención en salud. Consulta con especialistas desde la comodidad de tu hogar.

Servicios disponibles:
• Consultas médicas virtuales 24/7
• Especialistas certificados
• Recetas electrónicas
• Seguimiento personalizado
• Acceso a historia clínica digital

La salud digital está aquí para quedarse. Aprovecha la tecnología para cuidar mejor de ti y los tuyos.

¡Agenda tu primera consulta virtual hoy!`,
      date: '25 de Diciembre, 2024',
      author: 'Dr. Carlos Mendoza'
    },
    {
      id: '4',
      title: 'Prevención: Tu mejor inversión en salud',
      subtitle: '',
      category: 'PREVENCIÓN',
      image: 'https://images.unsplash.com/photo-1620805572555-57cf02e85a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJldmVudGlvbnxlbnwxfHx8fDE3NTk0MTc0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundColor: '#8B5CF6',
      buttonText: 'Agenda tu chequeo',
      content: `Los chequeos preventivos pueden salvar vidas. Detectar enfermedades a tiempo marca la diferencia.

Exámenes recomendados según tu edad:
• 20-30 años: Hemograma, glicemia, perfil lipídico
• 30-40 años: + Examen de tiroides, mamografía (mujeres)
• 40-50 años: + Pruebas cardiovasculares, colonoscopia
• 50+ años: Chequeos completos anuales

Incluidos en tu plan de salud:
✓ Exámenes de laboratorio básicos
✓ Consulta médica general
✓ Valoración de riesgos
✓ Plan de prevención personalizado

No esperes a sentir síntomas. La prevención es tu mejor aliada.`,
      date: '20 de Diciembre, 2024',
      author: 'Dra. Ana Ruiz'
    },
    {
      id: '5',
      title: 'Salud Mental: Prioridad en tu bienestar',
      subtitle: '',
      category: 'BIENESTAR',
      image: 'https://images.unsplash.com/photo-1621887348744-6b0444f8a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50YWwlMjBoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NTkzNTg5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      backgroundColor: '#EC4899',
      buttonText: 'Solicita apoyo',
      content: `Tu salud mental es tan importante como tu salud física. No estás solo, estamos aquí para ayudarte.

Servicios de apoyo psicológico:
• Consulta con psicología
• Terapia individual y grupal
• Programas de manejo de estrés
• Apoyo en crisis 24/7
• Talleres de mindfulness

Señales de que podrías necesitar ayuda:
- Cambios en el sueño o apetito
- Pérdida de interés en actividades
- Dificultad para concentrarte
- Sentimientos de tristeza persistente
- Ansiedad o preocupación excesiva

Recuerda: Pedir ayuda es un signo de fortaleza, no de debilidad.

Tu bienestar emocional es nuestra prioridad. Contáctanos hoy.`,
      date: '15 de Diciembre, 2024',
      author: 'Psic. María Torres'
    }
  ];

  // Mock data for dashboard
  const upcomingAppointments = [
    {
      id: '1',
      specialty: 'Otorrinolaringología',
      doctor: 'Dr. Carlos Mendoza',
      date: '2024-12-20',
      time: '10:30',
      status: 'confirmed'
    },
    {
      id: '2',
      specialty: 'Audiología',
      doctor: 'Dra. Ana Ruiz',
      date: '2024-12-22',
      time: '14:00',
      status: 'pending'
    }
  ];

  const recentResults = [
    {
      id: '1',
      type: 'Audiología',
      name: 'Audiometría Tonal',
      date: '2024-12-15',
      status: 'available'
    },
    {
      id: '2',
      type: 'Radiología',
      name: 'Rayos X Tórax',
      date: '2024-12-10',
      status: 'available'
    }
  ];

  // Servicios especializados
  const specializedServices: SpecializedService[] = [
    {
      id: '1',
      title: 'Otorrinolaringología',
      description: 'Diagnóstico, tratamiento y seguimiento integral de las enfermedades de oído, nariz y garganta.',
      icon: 'ear',
      category: 'Especialidad Médica',
      detailedDescription: 'La otorrinolaringología es la especialidad médica que se encarga del diagnóstico, tratamiento y seguimiento integral de las enfermedades de oído, nariz, garganta y estructuras relacionadas de cabeza y cuello.',
      whenToConsult: [
        'Dolor de oído persistente o infecciones recurrentes',
        'Pérdida de audición o zumbidos en los oídos',
        'Congestión nasal crónica o sinusitis',
        'Dolor de garganta frecuente o dificultad para tragar'
      ],
      whatIncludes: [
        'Consulta especializada con otorrinolaringólogo',
        'Otoscopia y examen físico completo',
        'Valoración de oído, nariz y garganta',
        'Diagnóstico y plan de tratamiento personalizado'
      ],
      professionals: [
        { name: 'Dr. Carlos Mendoza', availability: 'Próxima disponibilidad: Lun 15:00' },
        { name: 'Dra. Ana Ruiz', availability: 'Próxima disponibilidad: Mar 10:30' }
      ]
    },
    {
      id: '2',
      title: 'Otología',
      description: 'Tratamiento médico y quirúrgico de las enfermedades del oído y estructuras relacionadas.',
      icon: 'stethoscope',
      category: 'Subespecialidad',
      detailedDescription: 'La otología es la subespecialidad enfocada en el diagnóstico y tratamiento médico y quirúrgico de las enfermedades del oído y estructuras relacionadas.',
      whenToConsult: [
        'Pérdida auditiva súbita o progresiva',
        'Infecciones de oído recurrentes',
        'Secreción del oído o sangrado',
        'Dolor intenso en el oído'
      ],
      whatIncludes: [
        'Valoración otológica especializada',
        'Microscopía del oído',
        'Evaluación de función auditiva',
        'Plan de manejo médico o quirúrgico'
      ],
      professionals: [
        { name: 'Dr. Roberto Silva', availability: 'Próxima disponibilidad: Lun 11:00' }
      ]
    },
    {
      id: '3',
      title: 'Audiología',
      description: 'Diagnóstico, tratamiento y rehabilitación de los trastornos auditivos y del equilibrio.',
      icon: 'volume',
      category: 'Ciencias de la Salud',
      detailedDescription: 'La audiología es la disciplina de las ciencias de la salud que se dedica al estudio, diagnóstico, tratamiento y rehabilitación de los trastornos auditivos y del equilibrio.',
      whenToConsult: [
        'Dificultad para escuchar conversaciones',
        'Necesidad de subir el volumen constantemente',
        'Pérdida de equilibrio o mareos frecuentes',
        'Evaluación auditiva preventiva'
      ],
      whatIncludes: [
        'Audiometría tonal y vocal',
        'Impedanciometría',
        'Otoemisiones acústicas',
        'Informe audiológico completo'
      ],
      professionals: [
        { name: 'Lic. Laura Martínez', availability: 'Próxima disponibilidad: Lun 09:00' },
        { name: 'Lic. Juan Pérez', availability: 'Próxima disponibilidad: Mar 14:30' }
      ]
    },
    {
      id: '4',
      title: 'Fonoaudiología',
      description: 'Evaluación, diagnóstico y rehabilitación de trastornos de comunicación, voz, habla, lenguaje y deglución.',
      icon: 'message',
      category: 'Rehabilitación',
      detailedDescription: 'La fonoaudiología se especializa en la evaluación, diagnóstico y rehabilitación de trastornos de la comunicación, voz, habla, lenguaje y deglución.',
      whenToConsult: [
        'Dificultades en el habla o pronunciación',
        'Problemas de voz (disfonía o ronquera)',
        'Retraso en el desarrollo del lenguaje en niños',
        'Dificultad para tragar alimentos o líquidos'
      ],
      whatIncludes: [
        'Evaluación fonoaudiológica completa',
        'Valoración de habla y lenguaje',
        'Evaluación de la deglución',
        'Plan de terapia personalizado'
      ],
      professionals: [
        { name: 'Fga. María Torres', availability: 'Próxima disponibilidad: Lun 08:00' },
        { name: 'Fgo. Andrés Gómez', availability: 'Próxima disponibilidad: Mié 11:00' }
      ]
    },
    {
      id: '5',
      title: 'Vértigo y Tinnitus',
      description: 'Manejo integral del mareo, la inestabilidad y el zumbido de oídos.',
      icon: 'activity',
      category: 'Programa Especializado',
      detailedDescription: 'Nuestro programa especializado en vértigo y tinnitus ofrece un manejo integral y multidisciplinario del mareo, la inestabilidad y el zumbido de oídos.',
      whenToConsult: [
        'Sensación de giro o movimiento (vértigo)',
        'Mareos o inestabilidad al caminar',
        'Zumbido constante en los oídos (tinnitus)',
        'Náuseas o vómito asociado a mareos'
      ],
      whatIncludes: [
        'Valoración médica especializada',
        'Estudios vestibulares avanzados',
        'Evaluación audiológica',
        'Plan de manejo personalizado'
      ],
      professionals: [
        { name: 'Dr. Fernando Rojas', availability: 'Próxima disponibilidad: Mar 09:30' }
      ]
    },
    {
      id: '6',
      title: 'Centro Audiológico',
      description: 'Diagnóstico, adaptación y soluciones auditivas (audífonos e implantables).',
      icon: 'headphones',
      category: 'Centro Especializado',
      detailedDescription: 'Nuestro Centro Audiológico Avanzado ofrece servicios integrales de diagnóstico audiológico, adaptación de audífonos de última generación y asesoría en dispositivos implantables.',
      whenToConsult: [
        'Pérdida auditiva que afecta tu vida diaria',
        'Necesidad de audífonos o reemplazo de los actuales',
        'Evaluación para implantes cocleares'
      ],
      whatIncludes: [
        'Evaluación audiológica completa',
        'Selección y adaptación de audífonos',
        'Pruebas de audífonos gratuitas',
        'Seguimiento y mantenimiento'
      ],
      professionals: [
        { name: 'Lic. Sandra Ortiz', availability: 'Próxima disponibilidad: Lun 10:00' }
      ]
    }
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ear':
        return <Ear className="h-6 w-6 text-purple-500" />;
      case 'stethoscope':
        return <Stethoscope className="h-6 w-6 text-blue-500" />;
      case 'volume':
        return <Volume2 className="h-6 w-6 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-6 w-6 text-orange-500" />;
      case 'activity':
        return <Activity className="h-6 w-6 text-red-500" />;
      case 'headphones':
        return <Headphones className="h-6 w-6 text-indigo-500" />;
      default:
        return <Stethoscope className="h-6 w-6 text-gray-500" />;
    }
  };

  const getServiceBgColor = (iconName: string) => {
    switch (iconName) {
      case 'ear':
        return 'bg-purple-50';
      case 'stethoscope':
        return 'bg-blue-50';
      case 'volume':
        return 'bg-green-50';
      case 'message':
        return 'bg-orange-50';
      case 'activity':
        return 'bg-red-50';
      case 'headphones':
        return 'bg-indigo-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getServiceHoverColor = (iconName: string) => {
    switch (iconName) {
      case 'ear':
        return 'hover:bg-purple-100';
      case 'stethoscope':
        return 'hover:bg-blue-100';
      case 'volume':
        return 'hover:bg-green-100';
      case 'message':
        return 'hover:bg-orange-100';
      case 'activity':
        return 'hover:bg-red-100';
      case 'headphones':
        return 'hover:bg-indigo-100';
      default:
        return 'hover:bg-gray-100';
    }
  };



  return (
    <>
      <div className="relative overflow-x-hidden">
        {/* Welcome Section with integrated background */}
        <div className="bg-blue-500 px-5 pb-6 -mt-0">
          {/* Greeting with edit icon */}
          <div className="flex items-center gap-2 text-white mb-2">
            <h2 className="text-2xl font-normal">¡Hola, </h2>
            <h2 className="text-2xl font-semibold text-yellow-300">{user.name.split(' ')[0]}!</h2>
            <Edit3 className="h-5 w-5 text-white/70 ml-1" />
          </div>

          {/* Notificaciones Section */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Notificaciones</h3>
            <button 
              onClick={onToggleNotifications}
              className="text-white/90 text-sm hover:text-white active:text-white/80 transition-colors underline font-medium"
            >
              Ver todo
            </button>
          </div>

          {/* Latest Notification Card */}
          {latestNotification ? (
            <div 
              className="bg-white rounded-3xl p-5 shadow-card cursor-pointer hover:shadow-elevated active:scale-[0.98] transition-all"
              onClick={() => onNotificationClick?.(latestNotification)}
            >
              {/* Category Badge and Status */}
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-block ${getNotificationBadge(latestNotification.type).bg} ${getNotificationBadge(latestNotification.type).text} px-3 py-1.5 rounded-full text-xs font-medium`}>
                  {getNotificationBadge(latestNotification.type).label}
                </span>
                {!latestNotification.read && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>

              {/* Notification Message */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`${getNotificationIconColor(latestNotification.type)} mt-0.5`}>
                  {getNotificationIcon(latestNotification.type)}
                </div>
                <p className="text-gray-900 flex-1 line-clamp-2 leading-snug">
                  {latestNotification.message}
                </p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4" />
                <span className="text-xs">{latestNotification.time}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 shadow-card text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No tienes notificaciones</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-5 space-y-4">

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onNavigate?.('appointments')}
              className="h-24 flex flex-col gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-card rounded-3xl min-h-[56px]"
            >
              <Calendar className="h-7 w-7" />
              <span className="text-sm font-medium">Agendar cita</span>
            </Button>
            <Button
              onClick={() => onNavigate?.('results')}
              className="h-24 flex flex-col gap-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-card rounded-3xl min-h-[56px]"
            >
              <FileText className="h-7 w-7" />
              <span className="text-sm font-medium">Mis Resultados</span>
            </Button>
          </div>

          {/* Servicios Especializados */}
          <Card className="bg-white border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Stethoscope className="h-6 w-6 text-blue-500" />
                <span className="text-gray-900 font-semibold">Servicios Especializados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {specializedServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => onNavigateToService?.(service)}
                    className={`flex flex-col gap-2 p-4 ${getServiceBgColor(service.icon)} rounded-2xl ${getServiceHoverColor(service.icon)} transition-all cursor-pointer active:scale-95 min-h-[72px]`}
                  >
                    <div className="flex items-center gap-2">
                      {getServiceIcon(service.icon)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 line-clamp-2 leading-snug">{service.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Próximas Citas */}
          <Card className="bg-white border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg text-gray-900 font-semibold">
              <Calendar className="h-6 w-6 text-blue-500" />
              Próximas Citas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Virtual Appointment Card */}
            <div 
              onClick={() => onNavigate?.('video-call')}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 transition-all min-h-[64px] cursor-pointer shadow-md" 
            >
              <div className="flex-shrink-0 bg-white/20 p-3 rounded-full">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white leading-snug">Consulta Virtual Programada</p>
                <p className="text-sm text-white/90 leading-snug">Dr. Carlos Mendoza - Otorrinolaringología</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-white/80" />
                  <span className="text-xs text-white/80">
                    Hoy - 10:00 AM
                  </span>
                </div>
              </div>
              <Badge className="bg-white/90 text-blue-600 font-medium rounded-full px-3 py-1.5">
                Iniciar
              </Badge>
            </div>

            {upcomingAppointments.map((appointment) => {
              const handleDoctorClick = (e: React.MouseEvent) => {
                e.stopPropagation();
                const doctor = getDoctorByName(appointment.doctor);
                if (doctor && onDoctorClick) {
                  onDoctorClick(doctor.id);
                }
              };

              return (
                <div 
                  key={appointment.id} 
                  onClick={() => setSelectedAppointment(appointment)}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-all min-h-[64px] cursor-pointer" 
                  style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 leading-snug">{appointment.specialty}</p>
                    <button 
                      onClick={handleDoctorClick}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors leading-snug text-left"
                    >
                      {appointment.doctor}
                    </button>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">
                        {appointment.date} - {appointment.time}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    className={appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-600 font-medium rounded-full px-3 py-1.5' 
                      : 'bg-gray-100 text-gray-700 font-medium rounded-full px-3 py-1.5'
                    }
                  >
                    {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

          {/* Recent Results */}
          <Card className="bg-white border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg text-gray-900 font-semibold">
              <FileText className="h-6 w-6 text-gray-700" />
              Resultados Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentResults.map((result) => (
              <div 
                key={result.id} 
                onClick={() => setSelectedResult(result)}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-all min-h-[64px] cursor-pointer" 
                style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 leading-snug">{result.name}</p>
                  <p className="text-sm text-gray-600 leading-snug">{result.type} • {result.date}</p>
                </div>
                <Badge className="bg-green-50 text-green-600 font-medium rounded-full px-3 py-1.5">
                  Disponible
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

          {/* News Blog Section */}
          <div className="space-y-3">
            <h2 className="text-gray-900">Te recomendamos</h2>
            <NewsCarousel 
              articles={newsArticles} 
              onArticleClick={(article) => setSelectedArticle(article)}
            />
          </div>

          {/* Epidemiological Alert */}
          <EpidemiologicalAlertCard 
            alertMessage="Aumento de casos de dengue en tu zona. Mantén precauciones y elimina criaderos de mosquitos."
            location="Bogotá, Colombia"
            severity="medium"
            onViewDetails={onNavigateToEpidemiologicalAnalysis}
          />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedAppointment && (
          <AppointmentDetailModal
            appointment={selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
            onDoctorClick={onDoctorClick}
          />
        )}

        {selectedResult && (
          <ResultDetailModal
            result={selectedResult}
            onClose={() => setSelectedResult(null)}
            onViewFull={() => onNavigate?.('results')}
          />
        )}

        {selectedArticle && (
          <ArticleDetailModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}