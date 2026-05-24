import React, { useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ListItem } from '../ListItem';
import { User, Phone, Mail, CreditCard, Calendar, MapPin, Stethoscope, AlertCircle, Heart, Activity, Pill, Syringe, Camera, Edit2 } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  documentId: string;
  phone: string;
  birthDate: string;
  address: string;
  eps: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  bloodType?: string;
  allergies?: string[];
  chronicConditions?: string[];
  avatar?: string;
  vaccinations?: string[];
}

interface FullProfileScreenProps {
  userProfile: UserProfile;
  onNavigate?: (screen: string) => void;
  onUpdateProfile?: (profile: Partial<UserProfile>) => void;
}

export function FullProfileScreen({ userProfile, onNavigate, onUpdateProfile }: FullProfileScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona una imagen válida');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Update profile immediately
        onUpdateProfile?.({ avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPersonalInfo = () => {
    onNavigate?.('edit-personal-info');
  };

  const handleEditEmergencyContact = () => {
    onNavigate?.('edit-emergency-contact');
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden min-h-screen pb-4">
      <div className="px-5 pt-4 space-y-4">
        {/* Profile Header Card */}
        <Card className="bg-white border-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              {/* Avatar with Edit Button */}
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                  {userProfile.avatar ? (
                    <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-blue-600" />
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition-all border-2 border-white"
                  aria-label="Cambiar foto de perfil"
                >
                  <Camera className="h-4 w-4 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{userProfile.name}</h2>
              <p className="text-sm text-gray-600 mb-3">Paciente</p>
              <Badge className="bg-green-100 text-green-700 border-0 font-semibold px-4 py-1">
                Perfil Verificado
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white border-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Información Personal
              </h3>
              <Button
                onClick={handleEditPersonalInfo}
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Documento de Identidad</p>
                  <p className="font-semibold text-gray-900">{userProfile.documentId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Teléfono</p>
                  <p className="font-semibold text-gray-900">{userProfile.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Correo Electrónico</p>
                  <p className="font-semibold text-gray-900 break-all">{userProfile.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Fecha de Nacimiento</p>
                  <p className="font-semibold text-gray-900">{userProfile.birthDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Dirección de Residencia</p>
                  <p className="font-semibold text-gray-900">{userProfile.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">EPS Asignada</p>
                  <p className="font-semibold text-gray-900">{userProfile.eps}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 px-1">Información Médica</h3>
          <Card className="bg-white border-0">
            <CardContent className="p-0">
              <ListItem
                icon={Heart}
                iconColor="text-red-500"
                iconBg="bg-red-50"
                title="Tipo de Sangre"
                subtitle={userProfile.bloodType || 'No especificado'}
                onClick={() => onNavigate?.('profile-blood')}
              />
              <ListItem
                icon={AlertCircle}
                iconColor="text-orange-500"
                iconBg="bg-orange-50"
                title="Alergias"
                subtitle={userProfile.allergies && userProfile.allergies.length > 0 
                  ? userProfile.allergies.join(', ') 
                  : 'No especificado'}
                onClick={() => onNavigate?.('profile-allergies')}
              />
              <ListItem
                icon={Activity}
                iconColor="text-purple-500"
                iconBg="bg-purple-50"
                title="Condiciones Crónicas"
                subtitle={userProfile.chronicConditions && userProfile.chronicConditions.length > 0 
                  ? userProfile.chronicConditions.join(', ') 
                  : 'No especificado'}
                onClick={() => onNavigate?.('profile-conditions')}
              />
              <ListItem
                icon={Pill}
                iconColor="text-blue-500"
                iconBg="bg-blue-50"
                title="Medicamentos Actuales"
                subtitle="2 medicamentos activos"
                onClick={() => onNavigate?.('profile-medications')}
              />
              <ListItem
                icon={Syringe}
                iconColor="text-purple-500"
                iconBg="bg-purple-50"
                title="Vacunas"
                subtitle={`${userProfile.vaccinations?.length || 0} vacunas registradas`}
                onClick={() => onNavigate?.('profile-vaccinations')}
                noBorder
              />
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-white border-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Contacto de Emergencia
              </h3>
              <Button
                onClick={handleEditEmergencyContact}
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Editar
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600">Nombre del Contacto</p>
                <p className="font-semibold text-gray-900">{userProfile.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Teléfono de Contacto</p>
                <p className="font-semibold text-gray-900">{userProfile.emergencyContact.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}