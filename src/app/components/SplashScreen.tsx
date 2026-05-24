import React, { useEffect } from 'react';
import integraLogo from 'figma:asset/08c5c1af85ce2355fea326aac1e6034eb482b255.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds splash duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1e293b' }}>
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative">
          <div className="animate-fade-in-scale">
            <img 
              src={integraLogo} 
              alt="Integra Health Care IPS" 
              className="h-16 w-auto mx-auto filter brightness-0 invert animate-pulse-gentle"
            />
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in-scale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-fade-in-scale {
          animation: fade-in-scale 2s ease-out;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s infinite;
        }
      `}</style>
    </div>
  );
}