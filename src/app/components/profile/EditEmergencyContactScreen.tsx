import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface EmergencyContact {
  name: string;
  phone: string;
}

interface EditEmergencyContactScreenProps {
  emergencyContact: EmergencyContact;
  onSave: (contact: EmergencyContact) => void;
  onCancel: () => void;
}

export function EditEmergencyContactScreen({ emergencyContact, onSave, onCancel }: EditEmergencyContactScreenProps) {
  const [formData, setFormData] = useState<EmergencyContact>(emergencyContact);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof EmergencyContact, value: string) => {
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
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Editar Contacto de Emergencia</h2>
            <p className="text-sm text-gray-600 mb-6">
              Esta persona será contactada en caso de emergencia médica
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Contact Name */}
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">
                  Nombre del Contacto
                </Label>
                <Input
                  id="contactName"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  placeholder="Nombre completo y parentesco"
                  required
                />
              </div>

              {/* Contact Phone */}
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">
                  Teléfono del Contacto
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="h-12 rounded-xl border-gray-200"
                  placeholder="+57 300 123 4567"
                  required
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Nota:</strong> Asegúrate de que el contacto esté al tanto de su designación como contacto de emergencia.
                </p>
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
