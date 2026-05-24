import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Users,
  Calendar,
  Shield,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

interface EpidemiologicalAnalysisScreenProps {
  onBack: () => void;
}

export function EpidemiologicalAnalysisScreen({ onBack }: EpidemiologicalAnalysisScreenProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  // Datos simulados de casos por semana
  const weeklyData = [
    { week: 'Sem 1', casos: 45, tendencia: 'estable' },
    { week: 'Sem 2', casos: 52, tendencia: 'aumento' },
    { week: 'Sem 3', casos: 67, tendencia: 'aumento' },
    { week: 'Sem 4', casos: 71, tendencia: 'aumento' },
    { week: 'Sem 5', casos: 63, tendencia: 'descenso' },
    { week: 'Sem 6', casos: 58, tendencia: 'descenso' },
    { week: 'Sem 7', casos: 49, tendencia: 'descenso' },
    { week: 'Sem 8', casos: 44, tendencia: 'estable' }
  ];

  // Datos de tendencia mensual
  const monthlyTrend = [
    { mes: 'Ene', casos: 156, proyeccion: 160 },
    { mes: 'Feb', casos: 189, proyeccion: 185 },
    { mes: 'Mar', casos: 234, proyeccion: 225 },
    { mes: 'Abr', casos: 267, proyeccion: 270 },
    { mes: 'May', casos: 298, proyeccion: 295 },
    { mes: 'Jun', casos: 312, proyeccion: 320 },
    { mes: 'Jul', casos: 289, proyeccion: 285 },
    { mes: 'Ago', casos: 245, proyeccion: 250 }
  ];

  // Datos por grupos de edad
  const ageGroupData = [
    { grupo: '0-18', casos: 89, porcentaje: 24 },
    { grupo: '19-35', casos: 134, porcentaje: 36 },
    { grupo: '36-60', casos: 98, porcentaje: 26 },
    { grupo: '60+', casos: 52, porcentaje: 14 }
  ];

  // Datos del mapa de calor simulado (por localidades de Bogotá)
  const heatMapData = [
    { zona: 'Suba', casos: 89, riesgo: 'alto', coordenadas: { lat: 4.7564, lng: -74.0876 } },
    { zona: 'Kennedy', casos: 76, riesgo: 'alto', coordenadas: { lat: 4.6282, lng: -74.1561 } },
    { zona: 'Engativá', casos: 62, riesgo: 'medio', coordenadas: { lat: 4.7540, lng: -74.1166 } },
    { zona: 'Bosa', casos: 58, riesgo: 'medio', coordenadas: { lat: 4.6186, lng: -74.1928 } },
    { zona: 'Ciudad Bolívar', casos: 54, riesgo: 'medio', coordenadas: { lat: 4.5736, lng: -74.1719 } },
    { zona: 'Fontibón', casos: 43, riesgo: 'bajo', coordenadas: { lat: 4.6697, lng: -74.1403 } },
    { zona: 'Usaquén', casos: 41, riesgo: 'bajo', coordenadas: { lat: 4.7049, lng: -74.0308 } },
    { zona: 'Chapinero', casos: 29, riesgo: 'bajo', coordenadas: { lat: 4.6533, lng: -74.0620 } }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'alto': return 'bg-red-100 text-red-700 border-red-200';
      case 'medio': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'bajo': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRiskIntensity = (casos: number) => {
    if (casos > 70) return 'alta';
    if (casos > 45) return 'media';
    return 'baja';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6 overflow-x-hidden">
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
          <h1 className="text-xl font-medium text-gray-900">Análisis de Vigilancia Epidemiológica</h1>
          <p className="text-sm text-gray-600">Dengue · Colombia · Agosto 2024</p>
        </div>

        <div className="w-16"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Resumen estadístico */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Casos</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <Users className="h-8 w-8 text-red-200" />
              </div>
              <div className="flex items-center mt-2 text-red-100 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% vs mes anterior
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Casos Activos</p>
                  <p className="text-2xl font-bold">373</p>
                </div>
                <Activity className="h-8 w-8 text-yellow-200" />
              </div>
              <div className="flex items-center mt-2 text-yellow-100 text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                -8% última semana
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Tasa Incidencia</p>
                  <p className="text-2xl font-bold">15.2</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-200" />
              </div>
              <div className="flex items-center mt-2 text-blue-100 text-xs">
                Por 100,000 habitantes
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Letalidad</p>
                  <p className="text-2xl font-bold">0.8%</p>
                </div>
                <Shield className="h-8 w-8 text-green-200" />
              </div>
              <div className="flex items-center mt-2 text-green-100 text-xs">
                Dentro del rango esperado
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos principales */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
            <TabsTrigger value="demographics">Demografía</TabsTrigger>
            <TabsTrigger value="geographic">Geográfico</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Gráfico de barras semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-600" />
                  Casos por Semana - Últimas 8 Semanas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [value, 'Casos']}
                        labelFormatter={(label) => `Semana: ${label}`}
                      />
                      <Bar 
                        dataKey="casos" 
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de líneas de tendencia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Tendencia Mensual con Proyección
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="casos" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                        name="Casos Reportados"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="proyeccion" 
                        stroke="#f59e0b" 
                        strokeDasharray="5 5"
                        name="Proyección"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribución por edad */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Grupos de Edad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ageGroupData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ grupo, porcentaje }) => `${grupo}: ${porcentaje}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="casos"
                        >
                          {ageGroupData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Análisis demográfico */}
              <Card>
                <CardHeader>
                  <CardTitle>Análisis Demográfico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ageGroupData.map((group, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="font-medium">{group.grupo} años</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{group.casos}</p>
                          <p className="text-sm text-gray-600">{group.porcentaje}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Observaciones</h4>
                        <p className="text-sm text-blue-800">
                          Mayor incidencia en adultos jóvenes (19-35 años), seguido por el grupo de 36-60 años. 
                          Los casos en menores de edad representan el 24% del total.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geographic" className="space-y-6">
            {/* Mapa de calor simulado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  Distribución Geográfica por Localidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {heatMapData.map((zona, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border-2 bg-white"
                      style={{
                        borderColor: zona.riesgo === 'alto' ? '#ef4444' : 
                                   zona.riesgo === 'medio' ? '#f59e0b' : '#10b981'
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{zona.zona}</h4>
                        <Badge className={getRiskColor(zona.riesgo)}>
                          {zona.riesgo.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{zona.casos}</p>
                      <p className="text-sm text-gray-600">casos reportados</p>
                    </div>
                  ))}
                </div>

                {/* Simulación visual del mapa */}
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-6 min-h-[300px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      <path d="M50,50 Q200,20 350,50 Q380,150 350,250 Q200,280 50,250 Q20,150 50,50 Z" 
                            fill="currentColor" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Mapa de Intensidad - Bogotá D.C.</h3>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      {heatMapData.slice(0, 4).map((zona, index) => (
                        <div 
                          key={index}
                          className={`
                            p-3 rounded-lg text-white text-center text-sm font-medium
                            ${zona.riesgo === 'alto' ? 'bg-red-500' : 
                              zona.riesgo === 'medio' ? 'bg-yellow-500' : 'bg-green-500'}
                          `}
                        >
                          <div>{zona.zona}</div>
                          <div className="text-lg font-bold">{zona.casos}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>Alto riesgo ({">"}70 casos)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span>Riesgo medio (45-70 casos)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Riesgo bajo ({"<"}45 casos)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recomendaciones */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6" />
              <h3 className="text-lg font-medium">Recomendaciones de Salud Pública</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
              <div>
                <h4 className="font-medium text-white mb-2">Para la Comunidad:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Eliminar criaderos de mosquitos en recipientes con agua</li>
                  <li>• Usar repelente y ropa de manga larga</li>
                  <li>• Consultar inmediatamente ante síntomas de fiebre</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Para el Personal de Salud:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Intensificar vigilancia en zonas de alto riesgo</li>
                  <li>• Fortalecer diagnóstico temprano</li>
                  <li>• Reportar casos sospechosos inmediatamente</li>
                </ul>
              </div>
            </div>
            <Button 
              variant="secondary" 
              className="mt-4 bg-white text-blue-700 hover:bg-blue-50"
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