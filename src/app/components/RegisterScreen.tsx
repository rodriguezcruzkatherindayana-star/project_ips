import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: (userData: any) => void;
  onBackToLogin: () => void;
}

export function RegisterScreen({ onRegister, onBackToLogin }: RegisterScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    documentType: '',
    documentId: '',
    birthDate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    eps: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const documentTypes = [
    'Cédula de Ciudadanía',
    'Tarjeta de Identidad',
    'Cédula de Extranjería',
    'Pasaporte'
  ];

  const epsList = [
    'Nueva EPS',
    'Sanitas',
    'Salud Total',
    'Compensar',
    'Famisanar',
    'Medimás',
    'Coosalud',
    'Aliansalud',
    'Cafesalud',
    'Otra'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoogleRegister = () => {
    setLoading(true);
    // Simulate Google OAuth registration
    setTimeout(() => {
      const mockGoogleUser = {
        id: Date.now().toString(),
        name: 'Usuario Google',
        email: 'usuario@gmail.com',
        role: 'patient' as const,
        documentId: '000000000',
        phone: '+57 300 000 0000',
        eps: 'Nueva EPS',
        registeredWith: 'google'
      };
      onRegister(mockGoogleUser);
      setLoading(false);
    }, 2000);
  };

  const validateStep1 = () => {
    return formData.firstName && formData.lastName && formData.documentType && 
           formData.documentId && formData.birthDate && formData.phone;
  };

  const validateStep2 = () => {
    return formData.email && formData.password && formData.confirmPassword && 
           formData.password === formData.confirmPassword && formData.eps;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      alert('Por favor completa todos los campos requeridos y verifica que las contraseñas coincidan.');
      return;
    }

    setLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        role: 'patient' as const,
        documentId: formData.documentId,
        phone: formData.phone,
        eps: formData.eps,
        registeredWith: 'manual'
      };
      onRegister(newUser);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={step === 1 ? onBackToLogin : handlePrevStep}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {step === 1 ? 'Volver al login' : 'Anterior'}
        </button>
        
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="text-2xl font-light text-gray-900 italic tracking-wide" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              integra
            </h1>
            <div className="absolute -top-1 -right-4">
              <div className="grid grid-cols-3 gap-0.5">
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-light text-center mb-2">
          {step === 1 ? 'Información Personal' : 'Cuenta y Seguridad'}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {step === 1 ? 'Completa tus datos básicos' : 'Configura tu acceso'}
        </p>

        {step === 1 ? (
          // Step 1: Personal Information
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Nombre"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
                required
              />
              <Input
                placeholder="Apellido"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
                required
              />
            </div>

            <Select value={formData.documentType} onValueChange={(value) => handleInputChange('documentType', value)}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300">
                <SelectValue placeholder="Tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Número de documento"
              value={formData.documentId}
              onChange={(e) => handleInputChange('documentId', e.target.value)}
              className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
              required
            />

            <Input
              type="date"
              placeholder="Fecha de nacimiento"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
              required
            />

            <Input
              type="tel"
              placeholder="Teléfono (ej: +57 300 123 4567)"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
              required
            />

            <Button
              onClick={handleNextStep}
              disabled={!validateStep1()}
              className="w-full h-12 rounded-xl"
              style={{ backgroundColor: '#1a2b4b' }}
            >
              Continuar
            </Button>
          </div>
        ) : (
          // Step 2: Account and Security
          <div className="space-y-4">
            {/* Google Register Option */}
            <Button
              onClick={handleGoogleRegister}
              disabled={loading}
              variant="outline"
              className="w-full h-12 rounded-xl border-2 border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Registrando...' : 'Continuar con Google'}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-gray-500">O completa manualmente</span>
              </div>
            </div>

            {/* Manual Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <Select value={formData.eps} onValueChange={(value) => handleInputChange('eps', value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300">
                  <SelectValue placeholder="Selecciona tu EPS" />
                </SelectTrigger>
                <SelectContent>
                  {epsList.map((eps) => (
                    <SelectItem key={eps} value={eps}>
                      {eps}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Dirección (opcional)"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Contacto emergencia"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
                />
                <Input
                  type="tel"
                  placeholder="Teléfono emergencia"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-gray-300"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !validateStep2()}
                className="w-full h-12 rounded-xl"
                style={{ backgroundColor: '#1a2b4b' }}
              >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </Button>
            </form>
          </div>
        )}

        {/* Terms and Privacy */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Al registrarte, aceptas nuestros{' '}
            <button className="text-blue-600 hover:underline">
              Términos y Condiciones
            </button>{' '}
            y{' '}
            <button className="text-blue-600 hover:underline">
              Política de Privacidad
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}