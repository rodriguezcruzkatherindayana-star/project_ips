import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun, Clock, Star, TrendingUp, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface SleepDetailScreenProps {
  onBack: () => void;
}

export function SleepDetailScreen({ onBack }: SleepDetailScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock sleep data
  const sleepPhasesData = [
    { time: '22:00', awake: 1, light: 0, deep: 0, rem: 0 },
    { time: '22:30', awake: 0, light: 1, deep: 0, rem: 0 },
    { time: '23:00', awake: 0, light: 1, deep: 0, rem: 0 },
    { time: '23:30', awake: 0, light: 0, deep: 1, rem: 0 },
    { time: '00:00', awake: 0, light: 0, deep: 1, rem: 0 },
    { time: '00:30', awake: 0, light: 0, deep: 1, rem: 0 },
    { time: '01:00', awake: 0, light: 0, deep: 0, rem: 1 },
    { time: '01:30', awake: 0, light: 0, deep: 0, rem: 1 },
    { time: '02:00', awake: 0, light: 1, deep: 0, rem: 0 },
    { time: '02:30', awake: 0, light: 0, deep: 1, rem: 0 },
    { time: '03:00', awake: 0, light: 0, deep: 1, rem: 0 },
    { time: '03:30', awake: 0, light: 0, deep: 0, rem: 1 },
    { time: '04:00', awake: 0, light: 0, deep: 0, rem: 1 },
    { time: '04:30', awake: 0, light: 1, deep: 0, rem: 0 },
    { time: '05:00', awake: 0, light: 1, deep: 0, rem: 0 },
    { time: '05:30', awake: 0, light: 0, deep: 0, rem: 1 },
    { time: '06:00', awake: 0, light: 1, deep: 0, rem: 0 },
    { time: '06:30', awake: 1, light: 0, deep: 0, rem: 0 }
  ];

  const weeklySleepData = [
    { day: 'Lun', duration: 7.2, quality: 85, bedtime: '22:15', waketime: '06:30' },
    { day: 'Mar', duration: 8.1, quality: 92, bedtime: '21:45', waketime: '06:15' },
    { day: 'Mié', duration: 6.8, quality: 78, bedtime: '23:30', waketime: '06:45' },
    { day: 'Jue', duration: 7.8, quality: 88, bedtime: '22:00', waketime: '06:15' },
    { day: 'Vie', duration: 6.5, quality: 72, bedtime: '23:45', waketime: '06:30' },
    { day: 'Sáb', duration: 8.5, quality: 95, bedtime: '22:30', waketime: '07:30' },
    { day: 'Dom', duration: 7.5, quality: 89, bedtime: '22:00', waketime: '06:00' }
  ];

  const sleepDistributionData = [
    { phase: 'Sueño ligero', percentage: 45, duration: '3h 22m', color: '#3B82F6' },
    { phase: 'Sueño profundo', percentage: 25, duration: '1h 52m', color: '#1E40AF' },
    { phase: 'REM', percentage: 23, duration: '1h 43m', color: '#8B5CF6' },
    { phase: 'Despierto', percentage: 7, duration: '32m', color: '#F59E0B' }
  ];

  const sleepMetricsHistory = [
    { week: 'Sem 1', duration: 6.8, quality: 78 },
    { week: 'Sem 2', duration: 7.2, quality: 82 },
    { week: 'Sem 3', duration: 7.5, quality: 85 },
    { week: 'Sem 4', duration: 7.1, quality: 80 },
    { week: 'Sem 5', duration: 7.6, quality: 87 },
    { week: 'Sem 6', duration: 7.5, quality: 89 }
  ];

  const getSleepQualityStatus = (quality: number) => {
    if (quality >= 90) return { status: 'Excelente', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (quality >= 80) return { status: 'Buena', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (quality >= 70) return { status: 'Regular', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { status: 'Mala', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const currentQuality = 89;
  const qualityStatus = getSleepQualityStatus(currentQuality);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {entry.value > 0 ? 'Activo' : 'Inactivo'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Métricas
        </button>
        
        <div className="flex items-center text-purple-600">
          <Moon className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-medium">Sueño</h1>
        </div>

        <div className="w-16"></div>
      </div>

      {/* Current Stats */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">7.5h</p>
              <p className="text-sm text-purple-600">Duración</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{currentQuality}%</p>
              <p className="text-sm text-blue-600">Calidad</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <Bed className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">22:00</p>
              <p className="text-sm text-green-600">Hora de dormir</p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <Sun className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">06:00</p>
              <p className="text-sm text-orange-600">Hora de despertar</p>
            </CardContent>
          </Card>
        </div>

        {/* Sleep Quality Status */}
        <Card className={`mb-6 ${qualityStatus.bgColor} border-purple-200`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-purple-600" />
              <div>
                <h3 className="font-medium text-purple-900">
                  Calidad del sueño: {qualityStatus.status}
                </h3>
                <p className="text-sm text-purple-700">
                  {currentQuality >= 80 
                    ? 'Tuviste una noche de sueño reparador. ¡Sigue así!' 
                    : 'Intenta mantener horarios regulares para mejorar tu descanso.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="today">Anoche</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="phases">Fases</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Sleep Phases Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-purple-600" />
                  Fases del sueño anoche
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sleepPhasesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis hide />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="awake" 
                        stackId="1"
                        stroke="#F59E0B" 
                        fill="#F59E0B"
                        name="Despierto"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="light" 
                        stackId="1"
                        stroke="#3B82F6" 
                        fill="#3B82F6"
                        name="Sueño ligero"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="deep" 
                        stackId="1"
                        stroke="#1E40AF" 
                        fill="#1E40AF"
                        name="Sueño profundo"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="rem" 
                        stackId="1"
                        stroke="#8B5CF6" 
                        fill="#8B5CF6"
                        name="REM"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de la noche</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">22:00</p>
                    <p className="text-sm text-purple-600">Te dormiste</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">15min</p>
                    <p className="text-sm text-blue-600">Tiempo para dormir</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">2</p>
                    <p className="text-sm text-green-600">Despertares</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">95%</p>
                    <p className="text-sm text-orange-600">Eficiencia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Duración del sueño esta semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklySleepData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [`${value}h`, 'Duración']}
                      />
                      <Bar 
                        dataKey="duration" 
                        fill="#8B5CF6" 
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calidad del sueño esta semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklySleepData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[60, 100]} />
                      <Tooltip 
                        formatter={(value: any) => [`${value}%`, 'Calidad']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="quality" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horarios de sueño</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklySleepData.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{day.day}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-purple-600">🌙 {day.bedtime}</span>
                        <span className="text-orange-600">☀️ {day.waketime}</span>
                        <span className="font-medium">{day.duration}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de fases del sueño</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sleepDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="percentage"
                        label={({ phase, percentage }) => `${phase}: ${percentage}%`}
                      >
                        {sleepDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value}%`, 'Porcentaje']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalles de las fases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sleepDistributionData.map((phase, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: phase.color }}
                          ></div>
                          <span className="font-medium">{phase.phase}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{phase.duration}</p>
                          <p className="text-sm text-gray-600">{phase.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${phase.percentage}%`,
                            backgroundColor: phase.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>¿Qué significan las fases?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Sueño Ligero</h4>
                    <p className="text-sm text-blue-700">Transición hacia el sueño profundo. Fácil despertar.</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-medium text-indigo-900 mb-2">Sueño Profundo</h4>
                    <p className="text-sm text-indigo-700">Reparación física y consolidación de memoria.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">REM</h4>
                    <p className="text-sm text-purple-700">Sueños vívidos y procesamiento emocional.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencias del sueño</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sleepMetricsHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="duration" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        name="Duración (h)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="quality" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                        name="Calidad (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de tendencias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Mejora en calidad 📈</h4>
                    <p className="text-sm text-green-700">
                      Tu calidad de sueño ha mejorado un 14% en las últimas 6 semanas.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Duración estable ⏰</h4>
                    <p className="text-sm text-blue-700">
                      Mantienes un promedio constante de 7.3 horas de sueño por noche.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">Recomendación 💡</h4>
                    <p className="text-sm text-purple-700">
                      Intenta mantener horarios regulares para optimizar aún más tu descanso.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}