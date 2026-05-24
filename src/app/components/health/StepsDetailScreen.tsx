import React, { useState } from 'react';
import { ArrowLeft, Footprints, MapPin, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface StepsDetailScreenProps {
  onBack: () => void;
}

export function StepsDetailScreen({ onBack }: StepsDetailScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock data for charts
  const hourlyStepsData = [
    { hour: '6:00', steps: 120 },
    { hour: '7:00', steps: 450 },
    { hour: '8:00', steps: 890 },
    { hour: '9:00', steps: 1250 },
    { hour: '10:00', steps: 1580 },
    { hour: '11:00', steps: 2100 },
    { hour: '12:00', steps: 2650 },
    { hour: '13:00', steps: 3200 },
    { hour: '14:00', steps: 3850 },
    { hour: '15:00', steps: 4200 },
    { hour: '16:00', steps: 4950 },
    { hour: '17:00', steps: 5680 },
    { hour: '18:00', steps: 6420 },
    { hour: '19:00', steps: 7200 },
    { hour: '20:00', steps: 7890 },
    { hour: '21:00', steps: 8340 },
    { hour: '22:00', steps: 8542 }
  ];

  const weeklyStepsData = [
    { day: 'Lun', steps: 8200 },
    { day: 'Mar', steps: 9150 },
    { day: 'Mié', steps: 7800 },
    { day: 'Jue', steps: 10200 },
    { day: 'Vie', steps: 8900 },
    { day: 'Sáb', steps: 6500 },
    { day: 'Dom', steps: 8542 }
  ];

  const activityTypeData = [
    { name: 'Caminar', value: 5200, color: '#3B82F6' },
    { name: 'Correr', value: 2100, color: '#10B981' },
    { name: 'Subir escaleras', value: 980, color: '#F59E0B' },
    { name: 'Otros', value: 262, color: '#8B5CF6' }
  ];

  const distanceData = [
    { time: '08:00', distance: 1.2 },
    { time: '10:00', distance: 2.8 },
    { time: '12:00', distance: 4.1 },
    { time: '14:00', distance: 5.9 },
    { time: '16:00', distance: 7.2 },
    { time: '18:00', distance: 8.8 },
    { time: '20:00', distance: 9.5 },
    { time: '22:00', distance: 10.2 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="text-gray-600">{`${label}`}</p>
          <p className="text-blue-600 font-medium">
            {`Pasos: ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Métricas
        </button>
        
        <div className="flex items-center text-blue-600">
          <Footprints className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-medium">Pasos</h1>
        </div>

        <div className="w-16"></div>
      </div>

      {/* Current Stats */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Footprints className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">8,542</p>
              <p className="text-sm text-blue-600">Pasos hoy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">10.2</p>
              <p className="text-sm text-green-600">km recorridos</p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">127</p>
              <p className="text-sm text-orange-600">min activo</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">85%</p>
              <p className="text-sm text-purple-600">de la meta</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700 font-medium">Progreso de la meta diaria</span>
              <span className="text-blue-600 font-bold">8,542 / 10,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: '85.42%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              ¡Faltan solo 1,458 pasos para alcanzar tu meta! 🎯
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Hourly Steps Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Pasos por hora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyStepsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="steps" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Distance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Distancia acumulada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={distanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [`${value} km`, 'Distancia']}
                        labelFormatter={(label) => `Hora: ${label}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="distance" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pasos esta semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyStepsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [`${value.toLocaleString()} pasos`, 'Pasos']}
                      />
                      <Bar dataKey="steps" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">58,272</p>
                    <p className="text-sm text-gray-600">Total pasos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">68.4</p>
                    <p className="text-sm text-gray-600">km totales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">8,325</p>
                    <p className="text-sm text-gray-600">Promedio diario</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">6/7</p>
                    <p className="text-sm text-gray-600">Días con meta</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tipos de actividad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {activityTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value.toLocaleString()} pasos`, 'Pasos']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desglose por actividad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityTypeData.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: activity.color }}
                        ></div>
                        <span className="font-medium">{activity.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{activity.value.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">pasos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}