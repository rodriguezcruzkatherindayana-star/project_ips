import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  address: string;
  documentId: string;
  eps: string;
}

interface EditPersonalInfoScreenProps {
  userProfile: PersonalInfo;
  onSave: (info: PersonalInfo) => void;
  onCancel: () => void;
}

export function EditPersonalInfoScreen({ userProfile, onSave, onCancel }: EditPersonalInfoScreenProps) {
  const [formData, setFormData] = useState<PersonalInfo>(userProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(formData);
    setIsSaving(false);
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden min-h-screen pb-4">
      <div className="px-5 pt-4 space-y-4">
        <Card className="bg-white border-0">
          <CardContent className="p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Editar Información Personal</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  required
                />
              </div>

              {/* Document ID */}
              <div className="space-y-2">
                <Label htmlFor="documentId" className="text-sm font-medium text-gray-700">
                  Documento de Identidad
                </Label>
                <Input
                  id="documentId"
                  type="text"
                  value={formData.documentId}
                  onChange={(e) => handleChange('documentId', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  placeholder="1234567890"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  placeholder="+57 300 123 4567"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  required
                />
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Dirección de Residencia
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  placeholder="Calle 123 #45-67"
                  required
                />
              </div>

              {/* EPS */}
              <div className="space-y-2">
                <Label htmlFor="eps" className="text-sm font-medium text-gray-700">
                  EPS Asignada
                </Label>
                <Input
                  id="eps"
                  type="text"
                  value={formData.eps}
                  onChange={(e) => handleChange('eps', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl border-2"
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700"
                  disabled={isSaving}
                >
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}