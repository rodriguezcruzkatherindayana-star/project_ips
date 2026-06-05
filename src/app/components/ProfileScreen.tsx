import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { ListItem } from './ListItem';
import { useApp } from '../contexts/AppContext';
import { 
  User, 
  ChevronRight,
  Bell, 
  Shield, 
  LogOut, 
  Pill,
  Download,
  Share2,
  Eye,
  FileText,
  Lock,
  Smartphone,
  HelpCircle,
  Star,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  documentId: string;
  phone: string;
  eps: string;
}

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

export function ProfileScreen({ user, onLogout }: ProfileScreenProps) {
  const { setActiveScreen, currentUser } = useApp();
  const [notifications, setNotifications] = useState({
    appointments: true,
    results: true,
    medications: true,
    epidemiological: false,
    marketing: false
  });

  // Mock user extended data
  const userProfile = {
    ...(currentUser || user),
    birthDate: currentUser?.birthDate || '1985-03-15',
    address: currentUser?.address || 'Calle 123 #45-67, Bogotá',
    emergencyContact: currentUser?.emergencyContact || {
      name: 'Carlos García (Esposo)',
      phone: '+57 300 987 6543'
    },
    bloodType: currentUser?.bloodType || 'O+',
    allergies: currentUser?.allergies || ['Penicilina', 'Mariscos'],
    chronicConditions: currentUser?.chronicConditions || ['Hipertensión']
  };

  const handleLogout = () => {
    if (confirm('¿Estás segura de que deseas cerrar sesión?')) {
      onLogout();
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden min-h-screen pb-4">
      <div className="px-5 pt-4 space-y-4">
        {/* User Profile Card */}
        <Card className="bg-white border-0">
          <CardContent className="p-0">
            <div 
              className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all rounded-3xl"
              onClick={() => setActiveScreen('profile-full')}
            >
              {/* Avatar */}
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-7 w-7 text-blue-600" />
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 leading-tight">{currentUser?.name || user.name}</h3>
                <p className="text-sm text-gray-600">Ver perfil completo</p>
              </div>
              
              {/* Chevron */}
              <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        {/* Configuration and Notifications Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 px-1">Configuración y Notificaciones</h3>
          <Card className="bg-white border-0">
            <CardContent className="p-0">
              <div className="p-5" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium leading-snug">Recordatorios de Citas</p>
                    <p className="text-sm text-gray-600 leading-snug mt-0.5">Notificaciones 24h antes</p>
                  </div>
                  <Switch
                    checked={notifications.appointments}
                    onCheckedChange={(checked) => handleNotificationChange('appointments', checked)}
                  />
                </div>
              </div>

              <div className="p-5" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium leading-snug">Resultados Disponibles</p>
                    <p className="text-sm text-gray-600 leading-snug mt-0.5">Cuando lleguen nuevos resultados</p>
                  </div>
                  <Switch
                    checked={notifications.results}
                    onCheckedChange={(checked) => handleNotificationChange('results', checked)}
                  />
                </div>
              </div>

              <div className="p-5" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Pill className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium leading-snug">Recordatorios de Medicamentos</p>
                    <p className="text-sm text-gray-600 leading-snug mt-0.5">Horarios de medicinas</p>
                  </div>
                  <Switch
                    checked={notifications.medications}
                    onCheckedChange={(checked) => handleNotificationChange('medications', checked)}
                  />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium leading-snug">Alertas Epidemiológicas</p>
                    <p className="text-sm text-gray-600 leading-snug mt-0.5">Alertas de salud pública</p>
                  </div>
                  <Switch
                    checked={notifications.epidemiological}
                    onCheckedChange={(checked) => handleNotificationChange('epidemiological', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security and Privacy Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 px-1">Seguridad y Privacidad</h3>
          <Card className="bg-white border-0">
            <CardContent className="p-0">
              <ListItem
                icon={Lock}
                iconColor="text-gray-700"
                iconBg="bg-gray-100"
                title="Cambiar Contraseña"
                subtitle="Actualiza tu contraseña"
                onClick={() => setActiveScreen('profile-password')}
              />
              <ListItem
                icon={Shield}
                iconColor="text-blue-500"
                iconBg="bg-blue-50"
                title="Autenticación de Dos Factores"
                subtitle="Mayor seguridad para tu cuenta"
                onClick={() => setActiveScreen('profile-2fa')}
              />
              <ListItem
                icon={Smartphone}
                iconColor="text-purple-500"
                iconBg="bg-purple-50"
                title="Dispositivos Conectados"
                subtitle="Gestiona tus dispositivos"
                onClick={() => setActiveScreen('profile-devices')}
              />
              <ListItem
                icon={Eye}
                iconColor="text-green-500"
                iconBg="bg-green-50"
                title="Privacidad de Datos"
                subtitle="Control de tu información"
                onClick={() => setActiveScreen('profile-privacy')}
                noBorder
              />
            </CardContent>
          </Card>
        </div>

        {/* Data Management Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 px-1">Gestión de Datos</h3>
          <Card className="bg-white border-0">
            <CardContent className="p-0">
              <ListItem
                icon={Download}
                iconColor="text-blue-500"
                iconBg="bg-blue-50"
                title="Descargar Historia Clínica"
                subtitle="PDF completo de tu historial"
                onClick={() => setActiveScreen('profile-download')}
              />
              <ListItem
                icon={Share2}
                iconColor="text-green-500"
                iconBg="bg-green-50"
                title="Compartir Perfil Médico"
                subtitle="Genera código QR temporal"
                onClick={() => setActiveScreen('profile-share')}
              />
              <ListItem
                icon={FileText}
                iconColor="text-purple-500"
                iconBg="bg-purple-50"
                title="Políticas de Privacidad"
                subtitle="Lee nuestras políticas"
                onClick={() => setActiveScreen('profile-policies')}
                noBorder
              />
            </CardContent>
          </Card>
        </div>

        {/* Help and Support Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 px-1">Ayuda y Soporte</h3>
          <Card className="bg-white border-0">
            <CardContent className="p-0">
              <ListItem
                icon={HelpCircle}
                iconColor="text-blue-500"
                iconBg="bg-blue-50"
                title="Preguntas Frecuentes"
                subtitle="Resuelve tus dudas"
                onClick={() => setActiveScreen('profile-faq')}
              />
              <ListItem
                icon={MessageSquare}
                iconColor="text-green-500"
                iconBg="bg-green-50"
                title="Centro de Ayuda"
                subtitle="Contacta con soporte"
                onClick={() => setActiveScreen('profile-help')}
              />
              <ListItem
                icon={Star}
                iconColor="text-yellow-500"
                iconBg="bg-yellow-50"
                title="Califica la App"
                subtitle="Comparte tu experiencia"
                onClick={() => setActiveScreen('profile-rate')}
                noBorder
              />
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <div className="pt-2 pb-2">
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full h-14 rounded-3xl text-red-600 border-red-200 border-2 hover:bg-red-50 font-semibold text-base"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}