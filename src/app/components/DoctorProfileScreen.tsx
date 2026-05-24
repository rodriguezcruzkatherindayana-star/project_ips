import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  MapPin, 
  Award, 
  GraduationCap, 
  Star, 
  Clock, 
  Globe,
  CheckCircle,
  Stethoscope
} from 'lucide-react';
import { motion } from 'motion/react';
import { Doctor } from '../data/doctors';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DoctorProfileScreenProps {
  doctor: Doctor;
  onBookAppointment?: () => void;
}

export const DoctorProfileScreen: React.FC<DoctorProfileScreenProps> = ({
  doctor,
  onBookAppointment
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header con foto y nombre */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <ImageWithFallback
                src={doctor.image}
                alt={`${doctor.title} ${doctor.name}`}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-200"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {doctor.title} {doctor.name}
              </h1>
              <p className="text-blue-600 text-sm mb-2">{doctor.specialty}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{doctor.ratingScore}</span>
                  <span className="text-xs text-gray-600">({doctor.totalReviews})</span>
                </div>
                <Badge className="bg-blue-50 text-blue-700 border-0">
                  {doctor.yearsExperience} años de experiencia
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">{/* Removed -mt-4 */}
        {/* Botón de agendar cita */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button 
            onClick={onBookAppointment}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Cita
          </Button>
        </motion.div>

        {/* Biografía */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              Acerca del especialista
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {doctor.bio}
            </p>
          </CardContent>
        </Card>

        {/* Ubicación */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Ubicación</h4>
                <p className="text-sm text-gray-600">{doctor.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Horario de atención */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Horario de Atención
            </h3>
            <div className="space-y-2">
              {doctor.schedule.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm font-medium text-gray-700">{item.day}</span>
                  <span className="text-sm text-gray-600">{item.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Educación */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Educación
            </h3>
            <div className="space-y-4">
              {doctor.education.map((edu, index) => (
                <div key={index} className="flex gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg h-fit">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificaciones */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Certificaciones y Formación Especial
            </h3>
            <div className="space-y-2">
              {doctor.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{cert}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Áreas de Experticia */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              Áreas de Experticia
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.expertise.map((area, index) => (
                <Badge 
                  key={index}
                  className="bg-blue-50 text-blue-700 border-0 hover:bg-blue-100"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">Idiomas</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, index) => (
                    <Badge 
                      key={index}
                      className="bg-gray-100 text-gray-700 border-0"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card className="bg-blue-50 border-0">
          <CardContent className="p-5">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Información</h4>
            <p className="text-sm text-blue-800">
              Para agendar una cita o solicitar más información, puedes contactarnos 
              directamente o usar nuestro sistema de agendamiento en línea.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};