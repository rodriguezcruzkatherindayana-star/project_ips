import React from 'react';
import { Activity, ChevronRight, Calendar, Clock } from 'lucide-react';

interface HealthMetrics {
  steps: number;
  heartRate: number;
  sleep: number;
  calories: number;
  calorieGoal?: number; // Meta individual de calorías
}

interface HealthSummaryCardProps {
  metrics: HealthMetrics;
  className?: string;
  onAnalysisClick?: () => void; // Callback para análisis avanzado
}

interface HealthStatus {
  status: 'Estable' | 'Mejorable' | 'Alerta';
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export function HealthSummaryCard({ metrics, className = '', onAnalysisClick }: HealthSummaryCardProps) {
  
  // 🧠 Lógica de Inteligencia Artificial para analizar métricas
  const analyzeHealthMetrics = (data: HealthMetrics): HealthStatus => {
    let outOfRangeCount = 0;
    
    // Rangos de referencia para cada métrica
    const ranges = {
      steps: { min: 8000, max: Infinity },
      heartRate: { min: 60, max: 100 },
      sleep: { min: 7, max: Infinity },
      calories: { 
        min: data.calorieGoal ? data.calorieGoal * 0.8 : 1800, // 80% de la meta o 1800 por defecto
        max: data.calorieGoal ? data.calorieGoal * 1.2 : 2200  // 120% de la meta o 2200 por defecto
      }
    };

    // Verificar cada métrica
    if (data.steps < ranges.steps.min) outOfRangeCount++;
    if (data.heartRate < ranges.heartRate.min || data.heartRate > ranges.heartRate.max) outOfRangeCount++;
    if (data.sleep < ranges.sleep.min) outOfRangeCount++;
    if (data.calories < ranges.calories.min || data.calories > ranges.calories.max) outOfRangeCount++;

    // Determinar estado basado en el análisis de IA
    if (outOfRangeCount === 0) {
      return {
        status: 'Estable',
        label: 'Al día',
        color: '#22c55e',
        bgColor: 'bg-success',
        textColor: 'text-on-primary'
      };
    } else if (outOfRangeCount <= 2) {
      return {
        status: 'Mejorable',
        label: 'Revisar',
        color: '#f59e0b',
        bgColor: 'bg-warning',
        textColor: 'text-on-primary'
      };
    } else {
      return {
        status: 'Alerta',
        label: 'Atención',
        color: '#ef4444',
        bgColor: 'bg-error',
        textColor: 'text-on-primary'
      };
    }
  };

  const healthStatus = analyzeHealthMetrics(metrics);

  return (
    <div 
      onClick={onAnalysisClick}
      className={`
        w-full rounded-lg p-5 bg-white border-subtle shadow-subtle relative
        hover:shadow-subtle transition-all duration-200
        ${onAnalysisClick ? 'cursor-pointer group' : ''}
        ${className}
      `}
    >
      {/* Main Content */}
      <div className="space-y-3">
        {/* Category Title */}
        <h4 className="text-neutral-600 font-medium text-sm">
          Estado de Salud
        </h4>
        
        {/* Status - Cambia de color según el estado */}
        <h3 
          className="font-semibold text-xl leading-tight transition-colors duration-200"
          style={{ color: healthStatus.color }}
        >
          {healthStatus.status}
        </h3>
        
        {/* Subtitle */}
        <p className="text-neutral-500 text-sm">
          Análisis basado en tus métricas de salud
        </p>

        {/* Health Metrics Summary */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-neutral-500">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">Métricas actualizadas</span>
          </div>
          
          <div className="flex items-center gap-2 text-neutral-700">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-semibold">{healthStatus.label}</span>
          </div>
        </div>
      </div>

      {/* Indicador de Clickeable */}
      {onAnalysisClick && (
        <ChevronRight 
          className="h-4 w-4 text-neutral-500 group-hover:text-accent-500 transition-colors absolute top-4 right-4" 
        />
      )}
    </div>
  );
}

// Hook personalizado para obtener análisis detallado (opcional)
export const useHealthAnalysis = (metrics: HealthMetrics) => {
  const getDetailedAnalysis = () => {
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (metrics.steps < 8000) {
      issues.push('Actividad física insuficiente');
      recommendations.push('Intenta caminar al menos 8,000 pasos diarios');
    }

    if (metrics.heartRate < 60 || metrics.heartRate > 100) {
      issues.push('Ritmo cardíaco fuera del rango normal');
      recommendations.push('Consulta con tu médico sobre tu ritmo cardíaco');
    }

    if (metrics.sleep < 7) {
      issues.push('Sueño insuficiente');
      recommendations.push('Procura dormir al menos 7 horas por noche');
    }

    const calorieGoal = metrics.calorieGoal || 2000;
    if (metrics.calories < calorieGoal * 0.8 || metrics.calories > calorieGoal * 1.2) {
      issues.push('Balance calórico inadecuado');
      recommendations.push('Mantén un balance calórico adecuado según tu meta');
    }

    return {
      issues,
      recommendations,
      overallScore: Math.max(0, 100 - (issues.length * 25)), // Puntuación del 0-100
      riskLevel: issues.length === 0 ? 'Bajo' : issues.length <= 2 ? 'Medio' : 'Alto'
    };
  };

  return getDetailedAnalysis();
};