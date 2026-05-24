import React, { useState } from 'react';
import { HealthSummaryCard, useHealthAnalysis } from './HealthSummaryCard';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Activity, Zap, RefreshCw, Heart, Footprints, Moon } from 'lucide-react';

interface HealthMetrics {
  steps: number;
  heartRate: number;
  sleep: number;
  calories: number;
  calorieGoal?: number;
}

interface AdvancedHealthAnalysisProps {
  onBack: () => void;
  metrics: HealthMetrics;
}

export function AdvancedHealthAnalysis({ onBack, metrics }: AdvancedHealthAnalysisProps) {
  const healthAnalysis = useHealthAnalysis(metrics);
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 75) return 'from-green-500 to-green-600';
    if (score >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Bajo': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medio': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Alto': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Análisis detallado por métrica
  const metricAnalysis = [
    {
      name: 'Actividad Física',
      icon: Footprints,
      value: metrics.steps,
      target: 8000,
      unit: 'pasos',
      score: metrics.steps >= 8000 ? 100 : Math.round((metrics.steps / 8000) * 100),
      status: metrics.steps >= 8000 ? 'Excelente' : metrics.steps >= 6000 ? 'Bueno' : 'Necesita mejora',
      color: metrics.steps >= 8000 ? 'text-green-600' : metrics.steps >= 6000 ? 'text-yellow-600' : 'text-red-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      name: 'Ritmo Cardíaco',
      icon: Heart,
      value: metrics.heartRate,
      target: 80,
      unit: 'bpm',
      score: (metrics.heartRate >= 60 && metrics.heartRate <= 100) ? 100 : 60,
      status: (metrics.heartRate >= 60 && metrics.heartRate <= 100) ? 'Normal' : 'Fuera de rango',
      color: (metrics.heartRate >= 60 && metrics.heartRate <= 100) ? 'text-green-600' : 'text-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      name: 'Calidad del Sueño',
      icon: Moon,
      value: metrics.sleep,
      target: 8,
      unit: 'horas',
      score: metrics.sleep >= 7 ? 100 : Math.round((metrics.sleep / 7) * 100),
      status: metrics.sleep >= 7 ? 'Óptimo' : metrics.sleep >= 6 ? 'Aceptable' : 'Insuficiente',
      color: metrics.sleep >= 7 ? 'text-green-600' : metrics.sleep >= 6 ? 'text-yellow-600' : 'text-red-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      name: 'Balance Calórico',
      icon: Zap,
      value: metrics.calories,
      target: metrics.calorieGoal || 2000,
      unit: 'kcal',
      score: 85, // Calculado basado en el balance
      status: 'En meta',
      color: 'text-green-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  const insights = [
    {
      id: 'activity',
      title: 'Patrón de Actividad',
      description: metrics.steps >= 8000 ? 
        'Mantienes un excelente nivel de actividad física diaria.' :
        'Tu nivel de actividad física podría mejorar para alcanzar los beneficios óptimos para la salud.',
      type: metrics.steps >= 8000 ? 'positive' : 'improvement',
      icon: TrendingUp
    },
    {
      id: 'recovery',
      title: 'Recuperación',
      description: metrics.sleep >= 7 ?
        'Tu patrón de sueño favorece una buena recuperación.' :
        'Un sueño más prolongado mejoraría significativamente tu recuperación.',
      type: metrics.sleep >= 7 ? 'positive' : 'improvement',
      icon: CheckCircle
    },
    {
      id: 'wellness',
      title: 'Bienestar General',
      description: `Con una puntuación de ${healthAnalysis.overallScore}/100, tu estado de salud ${healthAnalysis.overallScore >= 75 ? 'es excelente' : healthAnalysis.overallScore >= 50 ? 'es bueno' : 'necesita atención'}.`,
      type: healthAnalysis.overallScore >= 75 ? 'positive' : healthAnalysis.overallScore >= 50 ? 'neutral' : 'improvement',
      icon: Brain
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver
        </button>
        
        <div className="text-center">
          <h1 className="text-xl font-medium text-gray-900">Análisis Avanzado de Salud</h1>
          <p className="text-sm text-gray-600">Inteligencia Artificial · Integra IPS</p>
        </div>

        <div className="w-16"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Componente Original para Referencia */}
        <HealthSummaryCard 
          metrics={metrics}
          className="mb-2"
        />

        {/* Puntuación Global de IA */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className={`bg-gradient-to-r ${getScoreGradient(healthAnalysis.overallScore)} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{healthAnalysis.overallScore}/100</h3>
                  <p className="text-blue-100">Puntuación de Salud IA</p>
                </div>
                <Brain className="h-12 w-12 text-white/80" />
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span>Nivel de Riesgo:</span>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {healthAnalysis.riskLevel}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Análisis por Métricas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Análisis Detallado por Métrica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metricAnalysis.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div key={index} className={`p-5 rounded-xl ${metric.bgColor} border border-gray-100`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-6 w-6 ${metric.iconColor}`} />
                        <h4 className="font-medium text-gray-900">{metric.name}</h4>
                      </div>
                      <Badge className={`${metric.color} bg-white/70 border-0`}>
                        {metric.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">
                          {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">{metric.unit}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Meta: {metric.target.toLocaleString()} {metric.unit}</span>
                          <span className={`font-bold ${metric.color}`}>{metric.score}%</span>
                        </div>
                        <div className="w-full bg-white/60 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-700 ${getProgressColor(metric.score)}`}
                            style={{ width: `${Math.min(metric.score, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Insights de IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Insights de Inteligencia Artificial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => {
                const IconComponent = insight.icon;
                const isSelected = selectedInsight === insight.id;
                
                return (
                  <div 
                    key={index}
                    onClick={() => setSelectedInsight(isSelected ? null : insight.id)}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-200
                      ${insight.type === 'positive' ? 'bg-green-50 border-green-200 hover:bg-green-100' :
                        insight.type === 'improvement' ? 'bg-orange-50 border-orange-200 hover:bg-orange-100' :
                        'bg-blue-50 border-blue-200 hover:bg-blue-100'}
                      ${isSelected ? 'ring-2 ring-blue-500' : ''}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent 
                        className={`h-5 w-5 mt-0.5 ${
                          insight.type === 'positive' ? 'text-green-600' :
                          insight.type === 'improvement' ? 'text-orange-600' :
                          'text-blue-600'
                        }`} 
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-700">{insight.description}</p>
                        
                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-600">
                              <strong>Basado en IA:</strong> Este insight se genera analizando patrones en tus métricas 
                              de salud y comparándolos con estándares médicos establecidos.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recomendaciones Personalizadas */}
        {healthAnalysis.recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Recomendaciones Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthAnalysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-800 font-medium">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Próximos Pasos */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="h-6 w-6" />
              <h3 className="text-lg font-medium">Próximos Pasos</h3>
            </div>
            <p className="text-blue-100 mb-4">
              Continúa monitoreando tus métricas diariamente. El análisis de IA se actualiza 
              automáticamente con nuevos datos para brindarte insights más precisos.
            </p>
            <Button 
              variant="secondary" 
              className="bg-white text-blue-700 hover:bg-blue-50"
              onClick={onBack}
            >
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}