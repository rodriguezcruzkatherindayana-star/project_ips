import React, { useState } from 'react';
import { ArrowLeft, Zap, Target, TrendingUp, Activity, Utensils, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, AreaChart, Area } from 'recharts';

interface CaloriesDetailScreenProps {
  onBack: () => void;
}

export function CaloriesDetailScreen({ onBack }: CaloriesDetailScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock calories data
  const hourlyCaloriesData = [
    { hour: '06:00', burned: 45, consumed: 0 },
    { hour: '07:00', burned: 120, consumed: 350 },
    { hour: '08:00', burned: 180, consumed: 350 },
    { hour: '09:00', burned: 250, consumed: 450 },
    { hour: '10:00', burned: 320, consumed: 450 },
    { hour: '11:00', burned: 450, consumed: 450 },
    { hour: '12:00', burned: 580, consumed: 700 },
    { hour: '13:00', burned: 720, consumed: 700 },
    { hour: '14:00', burned: 890, consumed: 850 },
    { hour: '15:00', burned: 1050, consumed: 850 },
    { hour: '16:00', burned: 1280, consumed: 850 },
    { hour: '17:00', burned: 1450, consumed: 850 },
    { hour: '18:00', burned: 1650, consumed: 950 },
    { hour: '19:00', burned: 1820, consumed: 1200 },
    { hour: '20:00', burned: 1950, consumed: 1650 },
    { hour: '21:00', burned: 2080, consumed: 1650 },
    { hour: '22:00', burned: 2150, consumed: 1650 }
  ];

  const weeklyCaloriesData = [
    { day: 'Lun', burned: 2100, consumed: 1800, net: 300 },
    { day: 'Mar', burned: 2350, consumed: 1950, net: 400 },
    { day: 'Mié', burned: 1980, consumed: 1750, net: 230 },
    { day: 'Jue', burned: 2420, consumed: 2100, net: 320 },
    { day: 'Vie', burned: 2180, consumed: 1900, net: 280 },
    { day: 'Sáb', burned: 2650, consumed: 2200, net: 450 },
    { day: 'Dom', burned: 2150, consumed: 1650, net: 500 }
  ];

  const activityBreakdown = [
    { activity: 'Metabolismo basal', calories: 1680, color: '#3B82F6', percentage: 78 },
    { activity: 'Caminar', calories: 280, color: '#10B981', percentage: 13 },
    { activity: 'Ejercicio', calories: 150, color: '#F59E0B', percentage: 7 },
    { activity: 'Otras actividades', calories: 40, color: '#8B5CF6', percentage: 2 }
  ];

  const foodBreakdown = [
    { meal: 'Desayuno', calories: 350, color: '#F59E0B', time: '07:30' },
    { meal: 'Media mañana', calories: 100, color: '#84CC16', time: '10:00' },
    { meal: 'Almuerzo', calories: 550, color: '#EF4444', time: '12:30' },
    { meal: 'Merienda', calories: 150, color: '#8B5CF6', time: '16:00' },
    { meal: 'Cena', calories: 500, color: '#06B6D4', time: '19:30' }
  ];

  const nutritionBreakdown = [
    { nutrient: 'Carbohidratos', grams: 180, calories: 720, percentage: 44, color: '#3B82F6' },
    { nutrient: 'Proteínas', grams: 85, calories: 340, percentage: 21, color: '#10B981' },
    { nutrient: 'Grasas', grams: 65, calories: 585, percentage: 35, color: '#F59E0B' }
  ];

  const calorieGoals = {
    dailyBurn: 2200,
    dailyIntake: 1800,
    currentBurn: 2150,
    currentIntake: 1650
  };

  const getCalorieBalance = () => {
    const balance = calorieGoals.currentBurn - calorieGoals.currentIntake;
    return {
      value: balance,
      status: balance > 0 ? 'Déficit' : 'Superávit',
      color: balance > 0 ? 'text-green-600' : 'text-red-600',
      bgColor: balance > 0 ? 'bg-green-50' : 'bg-red-50'
    };
  };

  const calorieBalance = getCalorieBalance();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="text-gray-600 mb-1">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {entry.value} kcal
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Métricas
        </button>
        
        <div className="flex items-center text-orange-600">
          <Zap className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-medium">Calorías</h1>
        </div>

        <div className="w-16"></div>
      </div>

      {/* Current Stats */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{calorieGoals.currentBurn}</p>
              <p className="text-sm text-orange-600">Quemadas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Utensils className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{calorieGoals.currentIntake}</p>
              <p className="text-sm text-blue-600">Consumidas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">+{calorieBalance.value}</p>
              <p className="text-sm text-green-600">{calorieBalance.status}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">98%</p>
              <p className="text-sm text-purple-600">Meta diaria</p>
            </CardContent>
          </Card>
        </div>

        {/* Calorie Balance Indicator */}
        <Card className={`mb-6 ${calorieBalance.bgColor} border-orange-200`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-orange-600" />
              <div>
                <h3 className="font-medium text-orange-900">
                  Balance calórico: {calorieBalance.status} de {Math.abs(calorieBalance.value)} kcal
                </h3>
                <p className="text-sm text-orange-700">
                  {calorieBalance.value > 0 
                    ? '¡Excelente! Estás quemando más calorías de las que consumes.'
                    : 'Considera aumentar tu actividad física o reducir el consumo calórico.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">Calorías quemadas</span>
                <span className="text-orange-600 font-bold">
                  {calorieGoals.currentBurn} / {calorieGoals.dailyBurn}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((calorieGoals.currentBurn / calorieGoals.dailyBurn) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">Calorías consumidas</span>
                <span className="text-blue-600 font-bold">
                  {calorieGoals.currentIntake} / {calorieGoals.dailyIntake}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((calorieGoals.currentIntake / calorieGoals.dailyIntake) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="breakdown">Desglose</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrición</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Hourly Calories Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Balance calórico por hora
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={hourlyCaloriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="burned" 
                        stackId="1"
                        stroke="#F59E0B" 
                        fill="#F59E0B"
                        fillOpacity={0.6}
                        name="Quemadas"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="consumed" 
                        stackId="2"
                        stroke="#3B82F6" 
                        fill="#3B82F6"
                        fillOpacity={0.6}
                        name="Consumidas"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Meals Today */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-blue-600" />
                  Comidas de hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {foodBreakdown.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: meal.color }}
                        ></div>
                        <div>
                          <span className="font-medium">{meal.meal}</span>
                          <p className="text-sm text-gray-600">{meal.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{meal.calories}</p>
                        <p className="text-sm text-gray-600">kcal</p>
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
                <CardTitle>Balance calórico semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyCaloriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="burned" fill="#F59E0B" name="Quemadas" />
                      <Bar dataKey="consumed" fill="#3B82F6" name="Consumidas" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Balance neto diario</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyCaloriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any) => [`${value} kcal`, 'Balance neto']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="net" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">15,830</p>
                    <p className="text-sm text-orange-600">Total quemadas</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">13,350</p>
                    <p className="text-sm text-blue-600">Total consumidas</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">+2,480</p>
                    <p className="text-sm text-green-600">Balance total</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">354</p>
                    <p className="text-sm text-purple-600">Promedio diario</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calorías quemadas por actividad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="calories"
                        label={({ activity, percentage }) => `${activity}: ${percentage}%`}
                      >
                        {activityBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value} kcal`, 'Calorías']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desglose detallado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityBreakdown.map((activity, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: activity.color }}
                          ></div>
                          <span className="font-medium">{activity.activity}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{activity.calories}</p>
                          <p className="text-sm text-gray-600">kcal</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${activity.percentage}%`,
                            backgroundColor: activity.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de macronutrientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={nutritionBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="calories"
                        label={({ nutrient, percentage }) => `${nutrient}: ${percentage}%`}
                      >
                        {nutritionBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value} kcal`, 'Calorías']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalles nutricionales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nutritionBreakdown.map((nutrient, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: nutrient.color }}
                          ></div>
                          <span className="font-medium">{nutrient.nutrient}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{nutrient.grams}g</p>
                          <p className="text-sm text-gray-600">{nutrient.calories} kcal</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${nutrient.percentage}%`,
                            backgroundColor: nutrient.color 
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
                <CardTitle>Recomendaciones nutricionales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Carbohidratos (45-65%)</h4>
                    <p className="text-sm text-blue-700">Principal fuente de energía. Prefiere carbohidratos complejos.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Proteínas (10-35%)</h4>
                    <p className="text-sm text-green-700">Esenciales para reparación muscular y saciedad.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-900 mb-2">Grasas (20-35%)</h4>
                    <p className="text-sm text-orange-700">Importantes para absorción de vitaminas. Prefiere grasas saludables.</p>
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