import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  User
} from 'lucide-react';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface VideoCallScreenProps {
  appointmentData?: {
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    appointmentType: string;
  };
  onEndCall: () => void;
}

export function VideoCallScreen({ appointmentData, onEndCall }: VideoCallScreenProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');

  // Default appointment data
  const appointment = appointmentData || {
    doctorName: 'Dr. Carlos Mendoza',
    specialty: 'Otorrinolaringología',
    date: '20 Dic 2024',
    time: '10:00 AM',
    appointmentType: 'Consulta Virtual'
  };

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate connection quality changes
  useEffect(() => {
    const qualityInterval = setInterval(() => {
      const qualities: Array<'excellent' | 'good' | 'poor'> = ['excellent', 'good', 'poor'];
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
      setConnectionQuality(randomQuality);
    }, 10000);

    return () => clearInterval(qualityInterval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.success(isMuted ? 'Micrófono activado' : 'Micrófono desactivado');
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast.success(isVideoOff ? 'Cámara activada' : 'Cámara desactivada');
  };

  const toggleSpeaker = () => {
    setIsSpeakerOff(!isSpeakerOff);
    toast.success(isSpeakerOff ? 'Altavoz activado' : 'Altavoz desactivado');
  };

  const handleEndCall = () => {
    toast.success('Llamada finalizada');
    onEndCall();
  };

  const getConnectionColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
    }
  };

  const getConnectionText = () => {
    switch (connectionQuality) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Buena';
      case 'poor': return 'Pobre';
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${getConnectionColor()} animate-pulse`}></div>
          <div>
            <p className="text-white font-medium text-sm">{appointment.doctorName}</p>
            <p className="text-gray-400 text-xs">{appointment.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-gray-700 text-gray-300 text-xs">
            {formatDuration(callDuration)}
          </Badge>
          <Badge className={`${getConnectionColor()} text-white text-xs`}>
            {getConnectionText()}
          </Badge>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-gray-900">
        {/* Main Video (Doctor) */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900">
          {/* Simulated doctor video */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-16 w-16 text-white" />
              </div>
              <p className="text-white text-xl font-medium">{appointment.doctorName}</p>
              <p className="text-gray-400 text-sm mt-1">{appointment.specialty}</p>
            </div>
          </div>

          {/* Connection quality indicator */}
          <div className="absolute top-4 right-4">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getConnectionColor()}`}></div>
              <span className="text-white text-xs">Conexión {getConnectionText()}</span>
            </div>
          </div>
        </div>

        {/* Self Video (Picture in Picture) */}
        <motion.div
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          className="absolute bottom-20 right-4 w-32 h-40 bg-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700 cursor-move"
        >
          <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {isVideoOff ? (
              <div className="flex flex-col items-center gap-2">
                <VideoOff className="h-8 w-8 text-gray-500" />
                <p className="text-xs text-gray-500">Cámara apagada</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <p className="text-white text-xs mt-2">Tú</p>
              </div>
            )}
            {isMuted && (
              <div className="absolute bottom-2 left-2 bg-red-500 rounded-full p-1">
                <MicOff className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800/95 backdrop-blur-sm px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
            aria-pressed={isMuted}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isMuted ? (
              <MicOff className="h-6 w-6 text-white" aria-hidden="true" />
            ) : (
              <Mic className="h-6 w-6 text-white" aria-hidden="true" />
            )}
          </button>

          {/* Video Button */}
          <button
            onClick={toggleVideo}
            aria-label={isVideoOff ? 'Activar cámara' : 'Apagar cámara'}
            aria-pressed={isVideoOff}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isVideoOff
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isVideoOff ? (
              <VideoOff className="h-6 w-6 text-white" aria-hidden="true" />
            ) : (
              <Video className="h-6 w-6 text-white" aria-hidden="true" />
            )}
          </button>

          {/* Speaker Button */}
          <button
            onClick={toggleSpeaker}
            aria-label={isSpeakerOff ? 'Activar altavoz' : 'Silenciar altavoz'}
            aria-pressed={isSpeakerOff}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              isSpeakerOff
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isSpeakerOff ? (
              <VolumeX className="h-6 w-6 text-white" aria-hidden="true" />
            ) : (
              <Volume2 className="h-6 w-6 text-white" aria-hidden="true" />
            )}
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            aria-label="Finalizar llamada"
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
          >
            <PhoneOff className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>

        {/* Control Labels */}
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 mt-2">
          <span className="w-14 text-center text-xs text-gray-400">
            {isMuted ? 'Muteado' : 'Mic'}
          </span>
          <span className="w-14 text-center text-xs text-gray-400">
            {isVideoOff ? 'Sin video' : 'Video'}
          </span>
          <span className="w-14 text-center text-xs text-gray-400">
            {isSpeakerOff ? 'Mudo' : 'Audio'}
          </span>
          <span className="w-14 text-center text-xs text-gray-400">Salir</span>
        </div>
      </div>
    </div>
  );
}
