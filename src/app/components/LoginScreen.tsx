import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, Bell, AlertCircle } from 'lucide-react';
import integraLogo from 'figma:asset/087495b47610937c9d7aa7f7613363813a44b18b.png';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onShowRegister: () => void;
  onBiometricLogin?: () => Promise<void>;
  error?: string | null;
}

export function LoginScreen({ onLogin, onShowRegister, onBiometricLogin, error }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(username, password);
    } finally {
      setLoading(false);
    }
  };

  const handleFaceIdLogin = async () => {
    if (!onBiometricLogin) return;
    setLoading(true);
    try {
      await onBiometricLogin();
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUsername('demo@integra.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header con campana de notificaciones */}
      <div className="flex justify-end items-center px-6 pt-4">
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notificaciones"
        >
          <Bell className="h-6 w-6 text-gray-400" />
        </button>
      </div>

      {/* Contenido centrado */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="animate-fade-in">
                <img 
                  src={integraLogo} 
                  alt="Integra Health Care IPS" 
                  className="h-16 w-auto mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm" role="alert">
              <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="login-username" className="sr-only">Usuario o correo electrónico</label>
              <Input
                id="login-username"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 px-4 bg-white border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
                autoComplete="username"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="login-password" className="sr-only">Contraseña</label>
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-4 pr-12 bg-white border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>

            {/* Login Button */}
            <Button 
              type="submit" 
              className="w-full h-14 rounded-lg font-semibold transition-all min-h-[44px]"
              style={{ backgroundColor: '#1e293b', color: 'white' }}
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          {/* Forgot Password */}
          <div className="text-center pt-4">
            <button className="hover:underline transition-colors" style={{ color: '#1e293b' }}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Face ID Section */}
          <div className="text-center space-y-4 pt-8">
            <button
              onClick={handleFaceIdLogin}
              aria-label="Iniciar sesión con Face ID"
              className="inline-flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
              disabled={loading}
            >
              {/* Face ID Icon - simplified geometric pattern matching the image */}
              <div className="w-12 h-12 border-2 rounded-lg relative" style={{ borderColor: '#64748b' }}>
                {/* Corner brackets */}
                <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 rounded-tl" style={{ borderColor: '#64748b' }}></div>
                <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 rounded-tr" style={{ borderColor: '#64748b' }}></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 rounded-bl" style={{ borderColor: '#64748b' }}></div>
                <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 rounded-br" style={{ borderColor: '#64748b' }}></div>
                {/* Simple face outline */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 border rounded-full" style={{ borderColor: '#64748b' }}></div>
                  <div className="w-1 h-1 rounded-full mx-auto mt-0.5" style={{ backgroundColor: '#64748b' }}></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm" style={{ color: '#64748b' }}>Ingresa con</p>
                <p className="text-sm font-semibold" style={{ color: '#64748b' }}>Face ID</p>
              </div>
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center pt-8">
            <button 
              onClick={onShowRegister}
              className="hover:underline transition-colors"
              style={{ color: '#64748b' }}
            >
              ¿Aún no tienes usuario o cuenta?
            </button>
          </div>
          
          {/* Demo Access - Oculto en producción, solo para desarrollo */}
          <div className="text-center pt-2">
            <button
              onClick={handleDemoLogin}
              className="text-blue-500 text-sm hover:underline font-medium transition-colors"
            >
              🚀 Acceso Demo (Para pruebas)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
