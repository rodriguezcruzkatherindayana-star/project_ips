import React, { useState } from 'react';
import { HealthSummaryCard, useHealthAnalysis } from './HealthSummaryCard';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, RefreshCw, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface HealthSummaryDemoProps {
  onBack: () => void;
}

export function HealthSummaryDemo({ onBack }: HealthSummaryDemoProps) {
  // Diferentes escenarios de métricas para demostrar la IA
  const scenarios = [
    {
      name: 'Usuario Saludable',
      description: 'Todas las métricas en rango normal',
      metrics: {
        steps: 10500,
        heartRate: 68,
        sleep: 8.2,
        calories: 2100,
        calorieGoal: 2200
      }
    },
    {
      name: 'Usuario Sedentario',
      description: 'Baja actividad física y sueño insuficiente',
      metrics: {
        steps: 4200,
        heartRate: 75,
        sleep: 5.5,
        calories: 1800,
        calorieGoal: 2000
      }
    },
    {
      name: 'Usuario en Riesgo',
      description: 'Múltiples métricas fuera de rango',
      metrics: {
        steps: 3000,
        heartRate: 110,
        sleep: 4.5,
        calories: 2800,
        calorieGoal: 2000
      }
    },
    {
      name: 'Usuario Activo',
      description: 'Alta actividad pero ritmo cardíaco elevado',
      metrics: {
        steps: 15000,
        heartRate: 105,
        sleep: 7.8,
        calories: 2400,
        calorieGoal: 2500
      }
    }
  ];

  const [currentScenario, setCurrentScenario] = useState(0);
  const currentMetrics = scenarios[currentScenario].metrics;
  const healthAnalysis = useHealthAnalysis(currentMetrics);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Bajo': return 'bg-green-100 text-green-700';
      case 'Medio': return 'bg-yellow-100 text-yellow-700';
      case 'Alto': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
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
          <h1 className="text-xl font-medium text-gray-900">Demo: IA Estado de Salud</h1>
          <p className="text-sm text-gray-600">Análisis inteligente de métricas</p>
        </div>

        <div className="w-16"></div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Componente Principal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Componente HealthSummaryCard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HealthSummaryCard 
              metrics={currentMetrics}
              className="mb-4"
            />
            
            {/* Información del Escenario Actual */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">
                  {scenarios[currentScenario].name}
                </h3>
                <Badge variant="outline">
                  Escenario {currentScenario + 1}/{scenarios.length}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {scenarios[currentScenario].description}
              </p>
              
              {/* Métricas Actuales */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Pasos:</span>
                  <span className="font-medium ml-2">{currentMetrics.steps.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Pulso:</span>
                  <span className="font-medium ml-2">{currentMetrics.heartRate} bpm</span>
                </div>
                <div>
                  <span className="text-gray-500">Sueño:</span>
                  <span className="font-medium ml-2">{currentMetrics.sleep}h</span>
                </div>
                <div>
                  <span className="text-gray-500">Calorías:</span>
                  <span className="font-medium ml-2">{currentMetrics.calories} kcal</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Análisis Detallado de IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-purple-600" />
              Análisis de Inteligencia Artificial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Puntuación General */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700">Puntuación de Salud</span>
                <span className={`text-2xl font-bold ${getScoreColor(healthAnalysis.overallScore)}`}>
                  {healthAnalysis.overallScore}/100
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Nivel de Riesgo:</span>
                <Badge className={getRiskBadgeColor(healthAnalysis.riskLevel)}>
                  {healthAnalysis.riskLevel}
                </Badge>
              </div>
            </div>

            {/* Problemas Detectados */}
            {healthAnalysis.issues.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Áreas de Mejora Detectadas
                </h4>
                <div className="space-y-2">
                  {healthAnalysis.issues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-yellow-800">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recomendaciones */}
            {healthAnalysis.recommendations.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Recomendaciones Personalizadas
                </h4>
                <div className="space-y-2">
                  {healthAnalysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-green-800">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estado Óptimo */}
            {healthAnalysis.issues.length === 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">¡Excelente estado de salud!</span>
                </div>
                <p className="text-sm text-green-700">
                  Todas tus métricas están en rangos óptimos. Mantén estos hábitos saludables.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controles de Demostración */}
        <Card>
          <CardHeader>
            <CardTitle>Probar Diferentes Escenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scenarios.map((scenario, index) => (
                <Button
                  key={index}
                  variant={currentScenario === index ? "default" : "outline"}
                  onClick={() => setCurrentScenario(index)}
                  className="h-auto p-4 text-left justify-start"
                >
                  <div>
                    <div className="font-medium">{scenario.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {scenario.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Información Técnica */}
        <Card>
          <CardHeader>
            <CardTitle>Lógica de IA Implementada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Rangos de Referencia:</h4>
                <ul className="space-y-1 text-gray-600 ml-4">
                  <li>• <strong>Pasos:</strong> {">"} 8,000 pasos diarios</li>
                  <li>• <strong>Pulso:</strong> 60-100 bpm en reposo</li>
                  <li>• <strong>Sueño:</strong> {">"} 7 horas por noche</li>
                  <li>• <strong>Calorías:</strong> 80%-120% de la meta personal</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Algoritmo de Decisión:</h4>
                <ul className="space-y-1 text-gray-600 ml-4">
                  <li>• <strong>Estable:</strong> Todas las métricas en rango normal</li>
                  <li>• <strong>Mejorable:</strong> 1-2 métricas fuera de rango</li>
                  <li>• <strong>Alerta:</strong> 3+ métricas fuera de rango</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}