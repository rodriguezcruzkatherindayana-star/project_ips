import React, { useState } from 'react';
import { ArrowLeft, Heart, Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, Tooltip, BarChart, Bar } from 'recharts';

interface HeartRateDetailScreenProps {
  onBack: () => void;
}

export function HeartRateDetailScreen({ onBack }: HeartRateDetailScreenProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Mock heart rate data
  const hourlyHeartRateData = [
    { time: '06:00', bpm: 65, zone: 'Descanso' },
    { time: '07:00', bpm: 78, zone: 'Ligera' },
    { time: '08:00', bpm: 95, zone: 'Moderada' },
    { time: '09:00', bpm: 88, zone: 'Ligera' },
    { time: '10:00', bpm: 72, zone: 'Descanso' },
    { time: '11:00', bpm: 85, zone: 'Ligera' },
    { time: '12:00', bpm: 79, zone: 'Ligera' },
    { time: '13:00', bpm: 92, zone: 'Moderada' },
    { time: '14:00', bpm: 110, zone: 'Intensa' },
    { time: '15:00', bpm: 98, zone: 'Moderada' },
    { time: '16:00', bpm: 75, zone: 'Descanso' },
    { time: '17:00', bpm: 68, zone: 'Descanso' },
    { time: '18:00', bpm: 105, zone: 'Moderada' },
    { time: '19:00', bpm: 88, zone: 'Ligera' },
    { time: '20:00', bpm: 71, zone: 'Descanso' },
    { time: '21:00', bpm: 66, zone: 'Descanso' },
    { time: '22:00', bpm: 72, zone: 'Descanso' }
  ];

  const weeklyHeartRateData = [
    { day: 'Lun', promedio: 78, maximo: 125, minimo: 62 },
    { day: 'Mar', promedio: 82, maximo: 138, minimo: 65 },
    { day: 'Mié', promedio: 75, maximo: 115, minimo: 58 },
    { day: 'Jue', promedio: 85, maximo: 142, minimo: 67 },
    { day: 'Vie', promedio: 80, maximo: 128, minimo: 63 },
    { day: 'Sáb', promedio: 73, maximo: 108, minimo: 60 },
    { day: 'Dom', promedio: 77, maximo: 110, minimo: 65 }
  ];

  const heartRateZones = [
    { zone: 'Descanso', range: '60-70 bpm', time: '8h 15m', color: '#10B981', percentage: 55 },
    { zone: 'Ligera', range: '70-85 bpm', time: '4h 30m', color: '#3B82F6', percentage: 25 },
    { zone: 'Moderada', range: '85-100 bpm', time: '2h 45m', color: '#F59E0B', percentage: 15 },
    { zone: 'Intensa', range: '100+ bpm', time: '45m', color: '#EF4444', percentage: 5 }
  ];

  const restingHeartRateData = [
    { week: 'Sem 1', bpm: 68 },
    { week: 'Sem 2', bpm: 66 },
    { week: 'Sem 3', bpm: 64 },
    { week: 'Sem 4', bpm: 62 },
    { week: 'Sem 5', bpm: 65 },
    { week: 'Sem 6', bpm: 63 }
  ];

  const getCurrentHeartRateStatus = (bpm: number) => {
    if (bpm < 60) return { status: 'Bajo', color: 'text-blue-600', icon: TrendingUp };
    if (bpm <= 100) return { status: 'Normal', color: 'text-green-600', icon: CheckCircle };
    if (bpm <= 120) return { status: 'Elevado', color: 'text-orange-600', icon: AlertTriangle };
    return { status: 'Alto', color: 'text-red-600', icon: AlertTriangle };
  };

  const currentBPM = 72;
  const heartRateStatus = getCurrentHeartRateStatus(currentBPM);
  const StatusIcon = heartRateStatus.icon;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="text-gray-600">{`${label}`}</p>
          <p className="text-red-600 font-medium">
            {`${payload[0].value} bpm`}
          </p>
          {payload[0].payload.zone && (
            <p className="text-gray-500 text-sm">
              {`Zona: ${payload[0].payload.zone}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Métricas
        </button>
        
        <div className="flex items-center text-red-600">
          <Heart className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-medium">Ritmo Cardíaco</h1>
        </div>

        <div className="w-16"></div>
      </div>

      {/* Current Stats */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{currentBPM}</p>
              <p className="text-sm text-red-600">bpm actual</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">63</p>
              <p className="text-sm text-green-600">bpm en reposo</p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">142</p>
              <p className="text-sm text-orange-600">bpm máximo</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <StatusIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${heartRateStatus.color}`}>
                {heartRateStatus.status}
              </p>
              <p className="text-sm text-blue-600">Estado actual</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Status Alert */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Tu ritmo cardíaco está normal</h3>
                <p className="text-sm text-green-700">
                  Mantén tu actividad física regular para un corazón saludable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="zones">Zonas</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Today's Heart Rate Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Ritmo cardíaco de hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyHeartRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="bpm" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        fill="url(#heartRateGradient)"
                      />
                      <defs>
                        <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Heart Rate Zones Today */}
            <Card>
              <CardHeader>
                <CardTitle>Tiempo en zonas cardíacas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heartRateZones.map((zone, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: zone.color }}
                          ></div>
                          <span className="font-medium">{zone.zone}</span>
                          <span className="text-sm text-gray-600">{zone.range}</span>
                        </div>
                        <span className="font-bold">{zone.time}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${zone.percentage}%`,
                            backgroundColor: zone.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ritmo cardíaco esta semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyHeartRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          `${value} bpm`, 
                          name === 'promedio' ? 'Promedio' : 
                          name === 'maximo' ? 'Máximo' : 'Mínimo'
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="promedio" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="maximo" 
                        stroke="#F59E0B" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="minimo" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de zonas cardíacas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={heartRateZones} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="zone" type="category" width={80} />
                      <Tooltip 
                        formatter={(value: any) => [`${value}%`, 'Tiempo']}
                      />
                      <Bar dataKey="percentage" fill="#EF4444" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beneficios por zona</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Zona de Descanso (60-70 bpm)</h4>
                    <p className="text-sm text-green-700">Recuperación activa y mejora del metabolismo básico.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Zona Ligera (70-85 bpm)</h4>
                    <p className="text-sm text-blue-700">Quema de grasas y mejora de la resistencia básica.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-900 mb-2">Zona Moderada (85-100 bpm)</h4>
                    <p className="text-sm text-orange-700">Mejora cardiovascular y quema eficiente de calorías.</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900 mb-2">Zona Intensa (100+ bpm)</h4>
                    <p className="text-sm text-red-700">Desarrollo de potencia anaeróbica y velocidad.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia del ritmo cardíaco en reposo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={restingHeartRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <Tooltip 
                        formatter={(value: any) => [`${value} bpm`, 'BPM en reposo']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="bpm" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Tendencia positiva 📈</h4>
                  <p className="text-sm text-green-700">
                    Tu ritmo cardíaco en reposo ha mejorado un 8% en las últimas 6 semanas. 
                    Esto indica una mejora en tu condición cardiovascular.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}