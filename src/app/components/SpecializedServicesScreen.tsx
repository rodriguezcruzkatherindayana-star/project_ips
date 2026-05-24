import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Ear, 
  Stethoscope, 
  Volume2, 
  MessageSquare, 
  Activity, 
  Headphones,
  ChevronRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from './LoadingSpinner';

export interface SpecializedService {
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

interface SpecializedServicesScreenProps {
  onServiceClick: (service: SpecializedService) => void;
  onBackToHome?: () => void;
}

export const SpecializedServicesScreen: React.FC<SpecializedServicesScreenProps> = ({
  onServiceClick,
  onBackToHome
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Mock data - 6 servicios especializados
  const services: SpecializedService[] = [
    {
      id: '1',
      title: 'Otorrinolaringología',
      description: 'Diagnóstico, tratamiento y seguimiento integral de las enfermedades de oído, nariz y garganta.',
      icon: 'ear',
      category: 'Especialidad Médica',
      detailedDescription: 'La otorrinolaringología es la especialidad médica que se encarga del diagnóstico, tratamiento y seguimiento integral de las enfermedades de oído, nariz, garganta y estructuras relacionadas de cabeza y cuello. Nuestros especialistas cuentan con equipamiento de última generación para brindarte la mejor atención.',
      whenToConsult: [
        'Dolor de oído persistente o infecciones recurrentes',
        'Pérdida de audición o zumbidos en los oídos',
        'Congestión nasal crónica o sinusitis',
        'Dolor de garganta frecuente o dificultad para tragar',
        'Ronquidos o apnea del sueño',
        'Problemas de voz o disfonía'
      ],
      whatIncludes: [
        'Consulta especializada con otorrinolaringólogo',
        'Otoscopia y examen físico completo',
        'Valoración de oído, nariz y garganta',
        'Diagnóstico y plan de tratamiento personalizado',
        'Seguimiento post-tratamiento'
      ],
      professionals: [
        { name: 'Dr. Carlos Mendoza', availability: 'Próxima disponibilidad: Lun 15:00' },
        { name: 'Dra. Ana Ruiz', availability: 'Próxima disponibilidad: Mar 10:30' },
        { name: 'Dr. Miguel Torres', availability: 'Próxima disponibilidad: Mié 14:00' }
      ]
    },
    {
      id: '2',
      title: 'Otología',
      description: 'Tratamiento médico y quirúrgico de las enfermedades del oído y estructuras relacionadas.',
      icon: 'stethoscope',
      category: 'Subespecialidad',
      detailedDescription: 'La otología es la subespecialidad enfocada en el diagnóstico y tratamiento médico y quirúrgico de las enfermedades del oído y estructuras relacionadas. Tratamos desde infecciones simples hasta condiciones complejas que requieren cirugía especializada.',
      whenToConsult: [
        'Pérdida auditiva súbita o progresiva',
        'Infecciones de oído recurrentes',
        'Secreción del oído o sangrado',
        'Dolor intenso en el oído',
        'Sensación de oído tapado persistente',
        'Necesidad de evaluación pre-quirúrgica del oído'
      ],
      whatIncludes: [
        'Valoración otológica especializada',
        'Microscopía del oído',
        'Evaluación de función auditiva',
        'Diagnóstico de patologías del oído medio e interno',
        'Plan de manejo médico o quirúrgico'
      ],
      professionals: [
        { name: 'Dr. Roberto Silva', availability: 'Próxima disponibilidad: Lun 11:00' },
        { name: 'Dra. Patricia López', availability: 'Próxima disponibilidad: Jue 16:00' }
      ]
    },
    {
      id: '3',
      title: 'Audiología',
      description: 'Diagnóstico, tratamiento y rehabilitación de los trastornos auditivos y del equilibrio.',
      icon: 'volume',
      category: 'Ciencias de la Salud',
      detailedDescription: 'La audiología es la disciplina de las ciencias de la salud que se dedica al estudio, diagnóstico, tratamiento y rehabilitación de los trastornos auditivos y del equilibrio. Contamos con tecnología de punta para realizar estudios audiológicos completos.',
      whenToConsult: [
        'Dificultad para escuchar conversaciones',
        'Necesidad de subir el volumen constantemente',
        'Pérdida de equilibrio o mareos frecuentes',
        'Evaluación auditiva preventiva',
        'Seguimiento de tratamientos auditivos',
        'Valoración para adaptación de audífonos'
      ],
      whatIncludes: [
        'Audiometría tonal y vocal',
        'Impedanciometría',
        'Otoemisiones acústicas',
        'Potenciales evocados auditivos',
        'Evaluación vestibular',
        'Informe audiológico completo'
      ],
      professionals: [
        { name: 'Lic. Laura Martínez', availability: 'Próxima disponibilidad: Lun 09:00' },
        { name: 'Lic. Juan Pérez', availability: 'Próxima disponibilidad: Mar 14:30' },
        { name: 'Lic. Diana Castro', availability: 'Próxima disponibilidad: Vie 10:00' }
      ]
    },
    {
      id: '4',
      title: 'Fonoaudiología',
      description: 'Evaluación, diagnóstico y rehabilitación de trastornos de comunicación, voz, habla, lenguaje y deglución.',
      icon: 'message',
      category: 'Rehabilitación',
      detailedDescription: 'La fonoaudiología se especializa en la evaluación, diagnóstico y rehabilitación de trastornos de la comunicación, voz, habla, lenguaje y deglución. Ofrecemos programas de rehabilitación personalizados para pacientes de todas las edades.',
      whenToConsult: [
        'Dificultades en el habla o pronunciación',
        'Problemas de voz (disfonía o ronquera)',
        'Retraso en el desarrollo del lenguaje en niños',
        'Dificultad para tragar alimentos o líquidos',
        'Tartamudez o disfluencia',
        'Rehabilitación post-cirugía de cabeza y cuello'
      ],
      whatIncludes: [
        'Evaluación fonoaudiológica completa',
        'Valoración de habla y lenguaje',
        'Evaluación de la deglución',
        'Análisis de la voz',
        'Plan de terapia personalizado',
        'Seguimiento y rehabilitación'
      ],
      professionals: [
        { name: 'Fga. María Torres', availability: 'Próxima disponibilidad: Lun 08:00' },
        { name: 'Fgo. Andrés Gómez', availability: 'Próxima disponibilidad: Mié 11:00' },
        { name: 'Fga. Carolina Reyes', availability: 'Próxima disponibilidad: Jue 15:30' }
      ]
    },
    {
      id: '5',
      title: 'Vértigo y Tinnitus',
      description: 'Manejo integral del mareo, la inestabilidad y el zumbido de oídos.',
      icon: 'activity',
      category: 'Programa Especializado',
      detailedDescription: 'Nuestro programa especializado en vértigo y tinnitus ofrece un manejo integral y multidisciplinario del mareo, la inestabilidad y el zumbido de oídos. Contamos con estudios especializados y protocolos de tratamiento basados en evidencia científica.',
      whenToConsult: [
        'Sensación de giro o movimiento (vértigo)',
        'Mareos o inestabilidad al caminar',
        'Zumbido constante en los oídos (tinnitus)',
        'Náuseas o vómito asociado a mareos',
        'Caídas frecuentes o pérdida de equilibrio',
        'Dificultad para concentrarse por el zumbido'
      ],
      whatIncludes: [
        'Valoración médica especializada',
        'Estudios vestibulares avanzados',
        'Evaluación audiológica',
        'Pruebas de equilibrio y coordinación',
        'Plan de manejo personalizado',
        'Terapia de rehabilitación vestibular'
      ],
      professionals: [
        { name: 'Dr. Fernando Rojas', availability: 'Próxima disponibilidad: Mar 09:30' },
        { name: 'Dra. Isabel Vargas', availability: 'Próxima disponibilidad: Jue 13:00' }
      ]
    },
    {
      id: '6',
      title: 'Centro Audiológico Avanzado',
      description: 'Diagnóstico, adaptación y soluciones auditivas (audífonos e implantables).',
      icon: 'headphones',
      category: 'Centro Especializado',
      detailedDescription: 'Nuestro Centro Audiológico Avanzado ofrece servicios integrales de diagnóstico audiológico, adaptación de audífonos de última generación y asesoría en dispositivos implantables. Trabajamos con las mejores marcas y tecnologías del mercado.',
      whenToConsult: [
        'Pérdida auditiva que afecta tu vida diaria',
        'Necesidad de audífonos o reemplazo de los actuales',
        'Evaluación para implantes cocleares',
        'Dificultad para escuchar en ambientes ruidosos',
        'Prueba y adaptación de nuevas tecnologías auditivas',
        'Seguimiento y ajuste de audífonos'
      ],
      whatIncludes: [
        'Evaluación audiológica completa',
        'Asesoría personalizada en soluciones auditivas',
        'Prueba de audífonos de última tecnología',
        'Adaptación y programación de audífonos',
        'Moldes auditivos personalizados',
        'Seguimiento y ajustes ilimitados'
      ],
      professionals: [
        { name: 'Lic. Santiago Moreno', availability: 'Próxima disponibilidad: Lun 10:00' },
        { name: 'Lic. Valentina Cruz', availability: 'Próxima disponibilidad: Mié 15:00' },
        { name: 'Dr. Eduardo Ramírez', availability: 'Próxima disponibilidad: Vie 11:30' }
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ear':
        return <Ear className="h-6 w-6 text-blue-500" />;
      case 'stethoscope':
        return <Stethoscope className="h-6 w-6 text-blue-500" />;
      case 'volume':
        return <Volume2 className="h-6 w-6 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-6 w-6 text-blue-500" />;
      case 'activity':
        return <Activity className="h-6 w-6 text-blue-500" />;
      case 'headphones':
        return <Headphones className="h-6 w-6 text-blue-500" />;
      default:
        return <Stethoscope className="h-6 w-6 text-blue-500" />;
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    // Simulate reload
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 overflow-x-hidden">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="p-4 overflow-x-hidden">
        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No pudimos cargar los servicios</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ha ocurrido un error al cargar la información. Por favor, intenta nuevamente.
            </p>
            <Button onClick={handleRetry} className="bg-blue-500 hover:bg-blue-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty state
  if (services.length === 0) {
    return (
      <div className="p-4 overflow-x-hidden">
        <EmptyState
          icon={Stethoscope}
          title="Aún no hay servicios disponibles"
          description="Estamos trabajando para ofrecerte los mejores servicios especializados."
          actionLabel="Ir a Inicio"
          onAction={onBackToHome}
        />
      </div>
    );
  }

  // Main content
  return (
    <div className="p-5 space-y-4 overflow-x-hidden">
      {/* Header Info */}
      <div className="bg-blue-50 rounded-3xl p-5" style={{ border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <p className="text-sm text-blue-800 leading-relaxed">
          Conoce nuestros servicios especializados de otorrinolaringología y audiología. 
          Contamos con profesionales expertos y tecnología de última generación.
        </p>
      </div>

      {/* Services List */}
      <Card className="bg-white border-0">
        <CardContent className="p-0">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onServiceClick(service)}
              className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all min-h-[80px] first:rounded-t-3xl last:rounded-b-3xl"
              style={{ borderBottom: index < services.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none' }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                {getIcon(service.icon)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 font-semibold leading-snug mb-1">{service.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 leading-snug mb-2">
                  {service.description}
                </p>
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {service.category}
                </Badge>
              </div>

              {/* Chevron */}
              <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-gray-50 border-0">
        <CardContent>
          <h3 className="text-gray-900 font-semibold mb-2">¿Necesitas ayuda?</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Nuestro equipo está disponible para asesorarte en la elección del servicio adecuado.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">Teléfono:</span>
              <span>+57 (1) 234 5678</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">WhatsApp:</span>
              <span>+57 300 123 4567</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">Email:</span>
              <span>servicios@integraips.com</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};