import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Share2, FileText, HelpCircle, MessageSquare, Star, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FAQ {
  question: string;
  answer: string;
}

interface HelpScreenProps {
  type: 'download' | 'share' | 'policies' | 'faq' | 'help' | 'rate';
  email?: string;
}

const faqItems: FAQ[] = [
  { 
    question: '¿Cómo agendar una cita médica?', 
    answer: 'Puedes agendar una cita desde la sección "Citas" en el menú principal. Selecciona la especialidad, el médico y el horario disponible. Recibirás una confirmación por email y SMS.' 
  },
  { 
    question: '¿Cómo ver mis resultados de laboratorio?', 
    answer: 'Los resultados están disponibles en la sección "Resultados" del menú. Recibirás una notificación cuando estén listos. Puedes descargarlos en PDF o compartirlos con tu médico.' 
  },
  { 
    question: '¿Puedo cancelar una cita?', 
    answer: 'Sí, puedes cancelar una cita hasta 24 horas antes de la hora programada desde la sección "Mis Citas". Recuerda que cancelaciones frecuentes pueden afectar tu historial.' 
  },
  { 
    question: '¿Cómo actualizo mi información de contacto?', 
    answer: 'Ve a "Perfil" y selecciona "Ver perfil completo" para editar tu información personal. Recuerda mantener actualizado tu número de teléfono y email para recibir notificaciones importantes.' 
  },
  { 
    question: '¿Cómo solicito una autorización de la EPS?', 
    answer: 'Las autorizaciones se gestionan automáticamente cuando agendas una cita especializada. Puedes ver el estado en la sección "Resultados" bajo la pestaña "Autorizaciones".' 
  },
  { 
    question: '¿Es segura mi información médica?', 
    answer: 'Sí, toda tu información está protegida con cifrado de extremo a extremo y cumple con las normativas colombianas (Ley 1581 de 2012) y estándares internacionales HIPAA.' 
  }
];

export function HelpScreen({ type, email }: HelpScreenProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [rating, setRating] = useState(0);

  const handleDownload = () => {
    toast.success('Generando historia clínica...', {
      description: `Se enviará un PDF cifrado a ${email} en los próximos 5 minutos.`
    });
  };

  const handleShare = () => {
    toast.success('Código QR generado', {
      description: 'El código es válido por 24 horas.'
    });
  };

  const handleRate = (stars: number) => {
    setRating(stars);
    toast.success(`¡Gracias por calificarnos con ${stars} estrellas!`, {
      description: 'Tu opinión nos ayuda a mejorar.'
    });
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden min-h-screen pb-4">
      <div className="px-5 pt-4 space-y-4">
        {/* Download */}
        {type === 'download' && (
          <>
            <Card className="bg-white border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Download className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Descargar Historia Clínica</h3>
                    <p className="text-sm text-gray-600">PDF completo de tu historial médico</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-700">
                    Se generará un documento PDF completo con toda tu información médica:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 ml-4">
                    <li>• Datos personales y de contacto</li>
                    <li>• Historial completo de citas y consultas</li>
                    <li>• Resultados de exámenes y laboratorios</li>
                    <li>• Medicamentos y tratamientos actuales</li>
                    <li>• Vacunas, alergias y condiciones crónicas</li>
                    <li>• Autorizaciones de EPS</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    🔐 El documento será enviado a tu email <strong>{email}</strong> y estará protegido con una contraseña segura que recibirás por SMS.
                  </p>
                </div>

                <Button 
                  className="w-full rounded-2xl h-12"
                  onClick={handleDownload}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Generar y Descargar
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Share */}
        {type === 'share' && (
          <>
            <Card className="bg-white border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Compartir Perfil Médico</h3>
                    <p className="text-sm text-gray-600">Código QR temporal</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  Genera un código QR temporal para compartir tu información médica básica con profesionales de la salud en caso de emergencia.
                </p>

                <div className="bg-yellow-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-yellow-800 mb-3">
                    ⚠️ <strong>Información compartida:</strong>
                  </p>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Nombre completo y documento</li>
                    <li>• Tipo de sangre</li>
                    <li>• Alergias registradas</li>
                    <li>• Condiciones crónicas</li>
                    <li>• Medicamentos actuales</li>
                    <li>• Contacto de emergencia</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                      <Share2 className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Presiona el botón para generar</p>
                  </div>
                </div>

                <Button 
                  className="w-full rounded-2xl h-12"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Generar Código QR
                </Button>

                <p className="text-xs text-center text-gray-500 mt-3">
                  El código tendrá validez de 24 horas
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {/* Policies */}
        {type === 'policies' && (
          <>
            <Card className="bg-white border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Políticas de Privacidad</h3>
                    <p className="text-sm text-gray-600">Protección de datos personales</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-gray-700">
                  <section className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">1. Recopilación de Datos</h4>
                    <p>Integra IPS recopila información personal y médica necesaria para brindar servicios de salud de calidad, incluyendo datos de identificación, contacto, historial médico y tratamientos.</p>
                  </section>

                  <section className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">2. Uso de la Información</h4>
                    <p>Utilizamos tu información exclusivamente para prestación de servicios médicos, seguimiento de tratamientos, comunicación relacionada con tu salud y mejora continua de nuestros servicios.</p>
                  </section>

                  <section className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">3. Protección de Datos</h4>
                    <p>Implementamos medidas de seguridad técnicas y organizativas robustas para proteger tus datos personales, incluyendo cifrado de extremo a extremo, autenticación multifactor y auditorías regulares.</p>
                  </section>

                  <section className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">4. Tus Derechos</h4>
                    <p>Tienes derecho a acceder, rectificar, cancelar y oponerte al tratamiento de tus datos personales. Puedes ejercer estos derechos contactando a nuestro equipo de protección de datos.</p>
                  </section>

                  <section className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">5. Cumplimiento Normativo</h4>
                    <p>Cumplimos estrictamente con la Ley 1581 de 2012 de Colombia sobre protección de datos personales y estándares internacionales como HIPAA y GDPR.</p>
                  </section>

                  <section className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">6. Compartir Información</h4>
                    <p>Solo compartimos tu información con profesionales de la salud autorizados, entidades de salud relacionadas (EPS, laboratorios) y cuando sea requerido por ley.</p>
                  </section>
                </div>

                <div className="bg-blue-50 rounded-2xl p-4 mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Última actualización:</strong> Enero 2025
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* FAQ */}
        {type === 'faq' && (
          <>
            <Card className="bg-white border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Preguntas Frecuentes</h3>
                    <p className="text-sm text-gray-600">Encuentra respuestas rápidas</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden">
                      <button
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      >
                        <h4 className="font-semibold text-gray-900 pr-2">{item.question}</h4>
                        {expandedFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-0">
              <CardContent className="p-5">
                <p className="text-sm text-blue-800">
                  ¿No encuentras la respuesta que buscas? Contacta con nuestro <strong>Centro de Ayuda</strong> para asistencia personalizada.
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {/* Help Center */}
        {type === 'help' && (
          <>
            <Card className="bg-white border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Centro de Ayuda</h3>
                    <p className="text-sm text-gray-600">Contacta con soporte</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-6">
                  Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta o problema:
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Línea telefónica</p>
                      <p className="font-semibold text-gray-900">+57 (1) 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">WhatsApp</p>
                      <p className="font-semibold text-gray-900">+57 300 123 4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Correo electrónico</p>
                      <p className="font-semibold text-gray-900">soporte@integraips.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Horario de atención:</strong>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Lunes a Viernes: 8:00 AM - 6:00 PM</li>
                    <li>• Sábados: 8:00 AM - 12:00 PM</li>
                    <li>• Domingos y festivos: Cerrado</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-3">
                    *Para emergencias médicas, dirígete al servicio de urgencias más cercano o llama al 123
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Rate */}
        {type === 'rate' && (
          <>
            <Card className="bg-white border-0">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Califica la App</h3>
                    <p className="text-sm text-gray-600">Comparte tu experiencia</p>
                  </div>
                </div>

                <p className="text-center text-gray-700 mb-6">
                  ¿Cómo ha sido tu experiencia con Integra IPS?
                </p>

                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform rounded-full hover:bg-yellow-50"
                      onClick={() => handleRate(star)}
                    >
                      <Star 
                        className={`h-12 w-12 ${
                          rating >= star 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>

                {rating > 0 && (
                  <div className="bg-green-50 rounded-2xl p-4 mb-4">
                    <p className="text-sm text-green-800 text-center">
                      ✨ ¡Gracias por tu calificación de {rating} estrellas!
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 rounded-2xl p-4">
                  <p className="text-sm text-blue-800 text-center">
                    💡 Tu opinión nos ayuda a mejorar continuamente nuestros servicios y atención
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
