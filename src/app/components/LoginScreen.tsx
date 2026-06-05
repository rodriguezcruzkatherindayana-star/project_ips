import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, EyeOff, Bell } from 'lucide-react';
import integraLogo from 'figma:asset/087495b47610937c9d7aa7f7613363813a44b18b.png';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onShowRegister: () => void;
}

export function LoginScreen({ onLogin, onShowRegister }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(username, password);
      setLoading(false);
    }, 1500);
  };

  const handleFaceIdLogin = () => {
    setLoading(true);
    // Simulate Face ID authentication
    setTimeout(() => {
      onLogin('maria.garcia@email.com', 'password');
      setLoading(false);
    }, 2000);
  };

  const handleDemoLogin = () => {
    setUsername('demo@integra.com');
    setPassword('demo123');
    setTimeout(() => {
      onLogin('demo@integra.com', 'demo123');
    }, 500);
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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div>
              <Input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 px-4 bg-white border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
            </div>
            
            {/* Password Field */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-4 pr-12 bg-white border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
