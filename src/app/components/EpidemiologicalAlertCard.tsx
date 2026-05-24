import React from 'react';
import { Button } from './ui/button';
import { MapPin, AlertTriangle } from 'lucide-react';

interface EpidemiologicalAlertCardProps {
  alertMessage?: string;
  location?: string;
  severity?: 'low' | 'medium' | 'high';
  onViewDetails?: () => void;
  className?: string;
}

export function EpidemiologicalAlertCard({ 
  alertMessage = "Aumento de casos de dengue en tu zona. Mantén precauciones.",
  location = "Bogotá, Colombia", 
  severity = 'medium',
  onViewDetails,
  className = '' 
}: EpidemiologicalAlertCardProps) {
  
  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-warning';
    }
  };

  const getSeverityBadge = (level: string) => {
    switch (level) {
      case 'low': return 'Precaución';
      case 'medium': return 'Alerta';
      case 'high': return 'Urgente';
      default: return 'Alerta';
    }
  };

  return (
    <div 
      className={`
        w-full rounded-lg p-5 bg-amber-50 border border-warning/20 shadow-subtle
        flex flex-col gap-4
        hover:shadow-subtle transition-all duration-200
        ${className}
      `}
    >
      {/* Header con ícono de localización */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <MapPin 
            className="h-4 w-4 text-neutral-700"
          />
          <span className="text-xs text-neutral-500 font-medium">{location}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <AlertTriangle 
            className={`h-4 w-4 ${getSeverityColor(severity)}`}
          />
          <span className={`text-xs font-semibold ${getSeverityColor(severity)}`}>
            {getSeverityBadge(severity)}
          </span>
        </div>
      </div>

      {/* Título */}
      <div>
        <h3 className="font-semibold text-base mb-2 text-neutral-900">
          Alerta Epidemiológica
        </h3>
        
        {/* Mensaje dinámico */}
        <p className="text-sm leading-relaxed text-neutral-700">
          {alertMessage}
        </p>
      </div>

      {/* Botón de navegación */}
      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="w-full text-sm border-primary-300 border-[1.5px] text-primary-600 hover:bg-primary-050 font-semibold transition-all min-h-[44px]"
        >
          Ver más detalles
        </Button>
      </div>
    </div>
  );
}