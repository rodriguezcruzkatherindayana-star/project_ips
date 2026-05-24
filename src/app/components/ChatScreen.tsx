import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Send, Bot, User as UserIcon, Phone, Mail, MessageCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  documentId: string;
  phone: string;
  eps: string;
}

interface ChatScreenProps {
  user: User;
}

interface Message {
  id: string;
  type: 'user' | 'bot' | 'agent';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface PQRSTicket {
  id: string;
  type: 'peticion' | 'queja' | 'reclamo' | 'sugerencia';
  title: string;
  description: string;
  status: 'abierto' | 'en_proceso' | 'cerrado';
  date: string;
  responseTime: string;
}

export function ChatScreen({ user }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy el asistente virtual de Integra IPS. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPQRSForm, setShowPQRSForm] = useState(false);
  const [pqrsType, setPqrsType] = useState('');
  const [pqrsTitle, setPqrsTitle] = useState('');
  const [pqrsDescription, setPqrsDescription] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock PQRS data
  const pqrsTickets: PQRSTicket[] = [
    {
      id: 'PQRS-001',
      type: 'queja',
      title: 'Demora en la entrega de resultados',
      description: 'Han pasado más de 5 días desde mi examen y no he recibido los resultados.',
      status: 'en_proceso',
      date: '2024-12-16',
      responseTime: '2-3 días hábiles'
    },
    {
      id: 'PQRS-002',
      type: 'peticion',
      title: 'Solicitud de copia de historia clínica',
      description: 'Necesito una copia completa de mi historia clínica para un segundo concepto médico.',
      status: 'cerrado',
      date: '2024-12-10',
      responseTime: 'Respondido'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response with Integra IPS context
    setTimeout(() => {
      const botResponse = getIntegraIPSResponse(inputMessage.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getIntegraIPSResponse = (input: string): string => {
    // Servicios especializados
    if (input.includes('otorrinolaringolog') || input.includes('oido') || input.includes('nariz') || input.includes('garganta')) {
      return '🏥 Servicio de Otorrinolaringología\n\nOfrecemos diagnóstico, tratamiento y seguimiento integral de enfermedades de oído, nariz y garganta.\n\n¿Cuándo acudir?\n• Dolor de oído persistente\n• Pérdida de audición\n• Sinusitis crónica\n• Ronquidos o apnea\n\n¿Te gustaría agendar una cita? Tenemos disponibilidad en nuestra sede de la Carrera 50 #86–56, Barranquilla.';
    }
    
    if (input.includes('otolog') || input.includes('audiolog') || input.includes('audición') || input.includes('sordera')) {
      return '👂 Servicios de Otología y Audiología\n\nContamos con:\n• Otología: Tratamiento de enfermedades del oído\n• Audiología: Diagnóstico de trastornos auditivos\n• Centro Audiológico: Adaptación de audífonos\n\nNuestros especialistas cuentan con tecnología de última generación.\n\n📞 ¿Deseas más información? Llama al +57 (605) 3855052';
    }
    
    if (input.includes('fonoaudiolog') || input.includes('habla') || input.includes('lenguaje') || input.includes('voz')) {
      return '🗣️ Servicio de Fonoaudiología\n\nEvaluación y rehabilitación de:\n• Trastornos del habla\n• Problemas de voz\n• Dificultades de deglución\n• Retraso del lenguaje en niños\n\n¿Necesitas una valoración? Agenda tu cita en la sección "Citas" de la app.';
    }
    
    if (input.includes('vertigo') || input.includes('vértigo') || input.includes('mareo') || input.includes('zumbido') || input.includes('tinnitus')) {
      return '🌀 Programa de Vértigo y Tinnitus\n\nManejo integral de:\n• Sensación de giro (vértigo)\n• Mareos e inestabilidad\n• Zumbido en los oídos (tinnitus)\n• Pérdida de equilibrio\n\nCuenta con estudios vestibulares avanzados y terapia de rehabilitación.\n\n¿Cuándo nos visitas?';
    }

    // Horarios y ubicación
    if (input.includes('horario') || input.includes('hora') || input.includes('atención')) {
      return '🕐 Horarios de Atención\n\n📍 Sede Principal: Carrera 50 #86–56, Barranquilla – Atlántico\n\n• Lunes a Viernes: 7:00 AM - 6:00 PM\n• Sábados: 8:00 AM - 12:00 PM\n\n📞 Contacto:\n• Teléfono: +57 (605) 3855052\n• Email: info@integraips.com';
    }
    
    if (input.includes('donde') || input.includes('dónde') || input.includes('dirección') || input.includes('direccion') || input.includes('ubicación') || input.includes('ubicacion')) {
      return '📍 Ubicación\n\nNos encuentras en:\nCarrera 50 #86–56\nBarranquilla – Atlántico\n\n🚗 Cómo llegar:\nEstamos en una zona de fácil acceso con parqueadero disponible.\n\n📞 ¿Necesitas indicaciones? Llama al +57 (605) 3855052';
    }

    // Citas
    if (input.includes('cita') || input.includes('agendar') || input.includes('turno') || input.includes('consulta')) {
      return '📅 Agendar Cita\n\nPuedes agendar tu cita de 3 formas:\n\n1️⃣ Desde la app: Toca el botón "Agendar cita" en el menú inferior\n2️⃣ Por teléfono: +57 (605) 3855052\n3️⃣ Por WhatsApp: +57 300 123 4567\n\nEspecialidades disponibles:\n• Otorrinolaringología\n• Otología\n• Audiología\n• Fonoaudiología\n• Vértigo y Tinnitus\n\n¿Con qué especialidad necesitas tu cita?';
    }

    // Resultados
    if (input.includes('resultado') || input.includes('examen') || input.includes('laboratorio') || input.includes('estudio')) {
      return '📋 Resultados de Exámenes\n\nTiempos de entrega:\n• Audiometría: Inmediato\n• Impedanciometría: Inmediato\n• Estudios vestibulares: 2-3 días\n• Otoemisiones acústicas: 24 horas\n\nPuedes revisar tus resultados en la sección "Resultados" de la app.\n\nTe notificaremos cuando estén disponibles. 🔔';
    }

    // Autorizaciones
    if (input.includes('autorización') || input.includes('autorizacion') || input.includes('eps') || input.includes('seguro')) {
      return '🏥 Autorizaciones EPS\n\nTrabajos con todas las EPS del país.\n\nPara procedimientos que requieren autorización:\n1. Solicita la orden médica\n2. Tramita la autorización con tu EPS\n3. Preséntala al momento de agendar\n\nTiempos de respuesta: 2-5 días hábiles según tu EPS.\n\n¿Necesitas ayuda con tu autorización?';
    }

    // Equipo
    if (input.includes('doctor') || input.includes('médico') || input.includes('medico') || input.includes('especialista') || input.includes('profesional')) {
      return '👨‍⚕️ Nuestro Equipo\n\nDirectiva:\n• Heder Xiques - CEO\n• Dr. Wolmark Xiques - Director Médico\n• Carolina Ramírez - Gerente\n• Heidi Cepeda - Médica Audióloga\n\nContamos con más de 15 especialistas certificados en otorrinolaringología y áreas relacionadas.\n\nTodos nuestros profesionales tienen amplia experiencia y están en continua actualización.';
    }

    // Emergencias
    if (input.includes('emergencia') || input.includes('urgencia') || input.includes('grave') || input.includes('dolor fuerte')) {
      return '🚨 EMERGENCIA MÉDICA\n\nSi presentas:\n• Dolor intenso\n• Sangrado abundante\n• Pérdida súbita de audición\n• Vértigo severo con vómito\n\n⚠️ Acude inmediatamente a urgencias o llama:\n• Línea de Emergencias: 123 o 125\n• Integra IPS: +57 (605) 3855052\n\nNo esperes, tu salud es lo primero.';
    }

    // Agente humano
    if (input.includes('humano') || input.includes('agente') || input.includes('operador') || input.includes('persona') || input.includes('asesor')) {
      return '👤 Contacto con Agente Humano\n\n¿Prefieres hablar con una persona?\n\nContáctanos por:\n📞 Teléfono: +57 (605) 3855052\n💬 WhatsApp: +57 300 123 4567\n📧 Email: info@integraips.com\n\nHorario de atención:\nLun-Vie 7AM-6PM, Sáb 8AM-12PM\n\n¡Te atenderemos con gusto!';
    }

    // Información general
    if (input.includes('integra') || input.includes('quienes') || input.includes('quiénes') || input.includes('empresa') || input.includes('institución')) {
      return '🏥 Integra IPS Health Care\n\nSomos una institución especializada en servicios de otorrinolaringología y audiología en Barranquilla.\n\nNuestra Visión 2030:\nSer referente nacional en atención especializada del oído, nariz y garganta.\n\nNos caracterizamos por:\n✅ Tecnología de última generación\n✅ Equipo altamente calificado\n✅ Atención humanizada\n✅ Resultados confiables\n\n¿En qué más te puedo ayudar?';
    }

    // Preparaciones
    if (input.includes('preparación') || input.includes('preparacion') || input.includes('ayuno') || input.includes('cómo prepararme')) {
      return '📝 Preparaciones para Exámenes\n\nAudiometría:\n• No requiere preparación especial\n• Evitar ruidos fuertes antes\n\nEstudios vestibulares:\n• Ayuno de 4 horas\n• No usar maquillaje ni cremas faciales\n\nImportante:\n• Llegar 10 minutos antes\n• Traer documento de identidad\n• Traer orden médica y autorización\n\n¿Tienes dudas sobre tu examen específico?';
    }

    // PQRS
    if (input.includes('queja') || input.includes('reclamo') || input.includes('petición') || input.includes('sugerencia') || input.includes('pqrs')) {
      return '📢 PQRS (Peticiones, Quejas, Reclamos y Sugerencias)\n\nPuedes radicar tu PQRS desde la pestaña "PQRS" en esta sección de Chat.\n\nTiempos de respuesta:\n• Peticiones: 5-7 días hábiles\n• Quejas: 5-7 días hábiles\n• Reclamos: 5-7 días hábiles\n• Sugerencias: 7-10 días hábiles\n\nRecibirás un radicado para seguimiento.\n\n¿Deseas radicar un PQRS ahora?';
    }

    // Default response
    return '¡Entiendo tu consulta! Soy el asistente de Integra IPS y puedo ayudarte con:\n\n🏥 Servicios especializados (Otorrinolaringología, Audiología, Fonoaudiología)\n📅 Agendar citas\n📋 Información sobre resultados\n🏥 Autorizaciones EPS\n📍 Ubicación y horarios\n👨‍⚕️ Nuestro equipo médico\n\n¿Sobre cuál te gustaría saber más?\n\nO si prefieres, escribe "humano" para hablar con un agente.';
  };

  const handleSubmitPQRS = () => {
    if (!pqrsType || !pqrsTitle || !pqrsDescription) return;
    
    const radicado = `PQRS-${Date.now().toString().slice(-6)}`;
    
    // Add bot message with confirmation
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: `✅ PQRS Radicado Exitosamente\n\nNúmero de radicado: ${radicado}\nTipo: ${pqrsType.charAt(0).toUpperCase() + pqrsType.slice(1)}\nTítulo: ${pqrsTitle}\n\nRecibirás respuesta en 5-7 días hábiles a tu correo registrado: ${user.email}\n\nPuedes hacer seguimiento con el número de radicado.\n\nGracias por tu confianza en Integra IPS.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
    setShowPQRSForm(false);
    setPqrsType('');
    setPqrsTitle('');
    setPqrsDescription('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'abierto':
        return <Badge className="bg-amber-100 text-amber-700">Abierto</Badge>;
      case 'en_proceso':
        return <Badge className="bg-blue-100 text-blue-700">En Proceso</Badge>;
      case 'cerrado':
        return <Badge className="bg-green-100 text-green-700">Cerrado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPQRSIcon = (type: string) => {
    switch (type) {
      case 'peticion':
        return <MessageCircle className="h-4 w-4" />;
      case 'queja':
        return <AlertTriangle className="h-4 w-4" />;
      case 'reclamo':
        return <AlertTriangle className="h-4 w-4" />;
      case 'sugerencia':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  if (showPQRSForm) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 overflow-x-hidden"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nuevo PQRS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-900">Tipo de PQRS</label>
              <div className="grid grid-cols-2 gap-2">
                {['peticion', 'queja', 'reclamo', 'sugerencia'].map((type) => (
                  <Button
                    key={type}
                    variant={pqrsType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPqrsType(type)}
                    className="text-sm capitalize min-h-[44px]"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-900">Título</label>
              <Input
                placeholder="Breve descripción del asunto..."
                value={pqrsTitle}
                onChange={(e) => setPqrsTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-900">Descripción detallada</label>
              <textarea
                className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Describe detalladamente tu petición, queja, reclamo o sugerencia..."
                value={pqrsDescription}
                onChange={(e) => setPqrsDescription(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleSubmitPQRS}
              className="w-full bg-blue-500 hover:bg-blue-600 min-h-[44px]"
              disabled={!pqrsType || !pqrsTitle || !pqrsDescription}
            >
              Enviar PQRS
            </Button>

            <Button 
              onClick={() => setShowPQRSForm(false)}
              variant="outline"
              className="w-full min-h-[44px]"
            >
              Cancelar
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="text-sm text-blue-900 mb-2">📋 Información importante</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Respuesta en 5-7 días hábiles</li>
              <li>• Recibirás notificación cuando tengamos respuesta</li>
              <li>• Para urgencias usa los canales de emergencia</li>
              <li>• Guarda el número de radicado para seguimiento</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-x-hidden">
      <Tabs defaultValue="chat" className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-3 flex-shrink-0 mx-4 mt-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="pqrs">PQRS</TabsTrigger>
          <TabsTrigger value="contact">Contacto</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex flex-col flex-1 mt-4 px-4 pb-4 overflow-hidden">
          {/* Chat Area */}
          <Card className="flex flex-col flex-1 overflow-hidden mb-4">
            <CardHeader className="pb-3 border-b flex-shrink-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-blue-600" />
                Asistente Virtual
                <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">En línea</Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto space-y-3 p-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />}
                      {message.type === 'user' && <UserIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
          </Card>

          {/* Input Area - Fixed at bottom */}
          <div className="flex gap-2 flex-shrink-0">
            <Input
              placeholder="Escribe tu mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 min-h-[44px]"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              aria-label="Enviar mensaje"
              className="bg-blue-500 hover:bg-blue-600 min-h-[44px] min-w-[44px]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="pqrs" className="space-y-4 px-4 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Mis solicitudes PQRS</p>
            <Button 
              onClick={() => setShowPQRSForm(true)}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 min-h-[44px]"
            >
              Nuevo PQRS
            </Button>
          </div>

          <div className="space-y-3">
            {pqrsTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-2">
                      {getPQRSIcon(ticket.type)}
                      <div>
                        <p className="text-sm text-gray-900">{ticket.title}</p>
                        <p className="text-xs text-gray-600 capitalize">{ticket.type} • {ticket.id}</p>
                      </div>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{ticket.date}</span>
                    <span>{ticket.responseTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 px-4 pb-4 overflow-y-auto">
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">Línea de Atención</p>
                    <p className="text-sm text-gray-600">+57 (605) 3855052</p>
                    <p className="text-xs text-gray-500">Lun-Vie 7AM-6PM, Sáb 8AM-12PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">+57 300 123 4567</p>
                    <p className="text-xs text-gray-500">Respuesta en 15-30 minutos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">info@integraips.com</p>
                    <p className="text-xs text-gray-500">Respuesta en 24-48 horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-gray-900">📍 Ubicación</p>
                  <p className="text-sm text-gray-600">
                    Carrera 50 #86–56<br />
                    Barranquilla – Atlántico
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-red-900">Emergencias</p>
                    <p className="text-sm text-red-700">123 o 125</p>
                    <p className="text-xs text-red-600">Atención médica 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}