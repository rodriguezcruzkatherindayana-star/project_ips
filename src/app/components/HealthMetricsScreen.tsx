import React, { useState } from 'react';
import { ArrowLeft, Footprints, Heart, Moon, Zap, TrendingUp, MapPin, BarChart3 } from 'lucide-react';
import { StepsDetailScreen } from './health/StepsDetailScreen';
import { HeartRateDetailScreen } from './health/HeartRateDetailScreen';
import { SleepDetailScreen } from './health/SleepDetailScreen';
import { CaloriesDetailScreen } from './health/CaloriesDetailScreen';

interface HealthMetricsScreenProps {
  onBack: () => void;
}

interface MetricData {
  id: string;
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  unit?: string;
}

export function HealthMetricsScreen({ onBack }: HealthMetricsScreenProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metricsData: MetricData[] = [
    {
      id: 'steps',
      title: 'Pasos',
      value: '8542',
      icon: <Footprints className="h-8 w-8" />,
      color: '#3B82F6',
      bgColor: '#EBF4FF'
    },
    {
      id: 'heart',
      title: 'Pulso',
      value: '72',
      unit: 'bpm',
      icon: <Heart className="h-8 w-8" />,
      color: '#EF4444',
      bgColor: '#FEF2F2'
    },
    {
      id: 'sleep',
      title: 'Sueño',
      value: '7.5',
      unit: 'h',
      icon: <Moon className="h-8 w-8" />,
      color: '#8B5CF6',
      bgColor: '#F3F0FF'
    },
    {
      id: 'calories',
      title: 'Calorías',
      value: '2150',
      icon: <Zap className="h-8 w-8" />,
      color: '#F59E0B',
      bgColor: '#FEF3C7'
    }
  ];

  const handleMetricClick = (metricId: string) => {
    setSelectedMetric(metricId);
  };

  const handleBackToMetrics = () => {
    setSelectedMetric(null);
  };

  if (selectedMetric) {
    switch (selectedMetric) {
      case 'steps':
        return <StepsDetailScreen onBack={handleBackToMetrics} />;
      case 'heart':
        return <HeartRateDetailScreen onBack={handleBackToMetrics} />;
      case 'sleep':
        return <SleepDetailScreen onBack={handleBackToMetrics} />;
      case 'calories':
        return <CaloriesDetailScreen onBack={handleBackToMetrics} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pt-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>
        
        <div className="flex items-center text-gray-900">
          <TrendingUp className="h-5 w-5 mr-2" />
          <h1 className="text-lg font-medium">Métricas de Salud Hoy</h1>
        </div>

        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      {/* Metrics Grid */}
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-5">
          {metricsData.map((metric) => (
            <button
              key={metric.id}
              onClick={() => handleMetricClick(metric.id)}
              className="group relative bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ backgroundColor: metric.bgColor }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className="p-3 rounded-2xl"
                  style={{ color: metric.color }}
                >
                  {metric.icon}
                </div>
              </div>

              {/* Title */}
              <p 
                className="text-sm font-medium mb-1 text-center"
                style={{ color: metric.color }}
              >
                {metric.title}
              </p>

              {/* Value */}
              <div className="text-center">
                <span 
                  className="text-xl font-bold"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </span>
                {metric.unit && (
                  <span 
                    className="text-sm font-medium ml-1"
                    style={{ color: metric.color }}
                  >
                    {metric.unit}
                  </span>
                )}
              </div>

              {/* Hover indicator */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: metric.color }}
              ></div>
            </button>
          ))}
        </div>

        {/* Quick Summary */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Resumen del día</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Meta de pasos</span>
              <span className="font-medium text-green-600">85% completado</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Zona cardíaca</span>
              <span className="font-medium text-blue-600">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Calidad del sueño</span>
              <span className="font-medium text-purple-600">Excelente</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Balance calórico</span>
              <span className="font-medium text-orange-600">+320 kcal</span>
            </div>
          </div>
        </div>

        {/* Tip of the day */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Consejo del día</h4>
              <p className="text-sm text-blue-700">
                ¡Excelente progreso! Intenta caminar 10 minutos más para alcanzar tu meta diaria de pasos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}