import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, Download, Calendar, User, AlertCircle, CheckCircle, Clock, ChevronRight, ArrowLeft, Shield, Eye, FileCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { getDoctorByName } from '../data/doctors';
import { SearchBar } from './SearchBar';
import { EmptyState } from './EmptyState';
import { toast } from 'sonner@2.0.3';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  documentId: string;
  phone: string;
  eps: string;
}

interface ResultsScreenProps {
  user: User;
  onDoctorClick?: (doctorId: string) => void;
  onViewResultDetail: (result: any) => void;
}

export function ResultsScreen({ user, onDoctorClick, onViewResultDetail }: ResultsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for medical results
  const results = [
    {
      id: '1',
      type: 'Audiología',
      name: 'Audiometría Tonal',
      date: '2024-12-15',
      doctor: 'Dra. Ana Ruiz',
      status: 'available',
      category: 'Examen Audiológico',
      description: 'Evaluación de umbrales auditivos por vía aérea y ósea',
      results: {
        'Oído Derecho 250Hz': { value: '15', reference: '0-25', unit: 'dB', status: 'normal' },
        'Oído Derecho 500Hz': { value: '10', reference: '0-25', unit: 'dB', status: 'normal' },
        'Oído Derecho 1000Hz': { value: '12', reference: '0-25', unit: 'dB', status: 'normal' },
        'Oído Izquierdo 250Hz': { value: '18', reference: '0-25', unit: 'dB', status: 'normal' },
        'Oído Izquierdo 500Hz': { value: '15', reference: '0-25', unit: 'dB', status: 'normal' },
        'Oído Izquierdo 1000Hz': { value: '14', reference: '0-25', unit: 'dB', status: 'normal' }
      }
    },
    {
      id: '2',
      type: 'Audiología',
      name: 'Impedanciometría',
      date: '2024-12-10',
      doctor: 'Dra. Ana Ruiz',
      status: 'available',
      category: 'Examen Audiológico',
      description: 'Evaluación de la función del oído medio',
      summary: 'Timpanometría tipo A bilateral. Reflejo estapedial presente en ambos oídos. Función del oído medio dentro de parámetros normales.'
    },
    {
      id: '3',
      type: 'ORL',
      name: 'Videonistagmografía',
      date: '2024-12-08',
      doctor: 'Dr. Roberto Silva',
      status: 'available',
      category: 'Vértigo y Equilibrio',
      description: 'Evaluación del sistema vestibular',
      summary: 'Nistagmo espontáneo ausente. Prueba calórica bilateral simétrica. Sistema vestibular funcionante bilateralmente. No se evidencian signos de hipofunción vestibular.'
    },
    {
      id: '4',
      type: 'Audiología',
      name: 'Logoaudiometría',
      date: '2024-11-28',
      doctor: 'Dra. Ana Ruiz',
      status: 'available',
      category: 'Examen Audiológico',
      description: 'Evaluación de la discriminación del habla',
      summary: 'Umbral de recepción del habla (SRT) en 15 dB bilateral. Discriminación del habla 100% a 45 dB en ambos oídos. Curva de inteligibilidad normal.'
    },
    {
      id: '5',
      type: 'Audiología',
      name: 'Potenciales Evocados Auditivos',
      date: '2024-11-25',
      doctor: 'Dra. Carolina Reyes',
      status: 'pending',
      category: 'Examen Audiológico',
      description: 'Evaluación de la vía auditiva central'
    }
  ];

  const authorizations = [
    {
      id: '1',
      procedure: 'Implante Coclear',
      status: 'approved',
      date: '2024-12-18',
      validUntil: '2025-01-18',
      eps: 'Nueva EPS',
      code: 'AUTH-2024-001234'
    },
    {
      id: '2',
      procedure: 'Terapia de Rehabilitación Auditiva',
      status: 'pending',
      date: '2024-12-16',
      eps: 'Nueva EPS',
      code: 'AUTH-2024-001235'
    },
    {
      id: '3',
      procedure: 'Ecografía Abdominal',
      status: 'approved',
      date: '2024-12-10',
      validUntil: '2025-01-10',
      eps: 'Nueva EPS',
      code: 'AUTH-2024-001236'
    }
  ];

  const certificates = [
    {
      id: '1',
      type: 'Certificado de Afiliación EPS',
      issueDate: '2024-12-01',
      validUntil: '2025-12-01',
      eps: 'Nueva EPS'
    },
    {
      id: '2',
      type: 'Constancia de Derechos y Deberes',
      issueDate: '2024-12-01',
      eps: 'Nueva EPS'
    }
  ];

  const filteredResults = results.filter(result =>
    result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-medium rounded-full px-3 py-1 text-xs border-0">Disponible</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 font-medium rounded-full px-3 py-1 text-xs border-0">Pendiente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-medium rounded-full px-3 py-1 text-xs border-0">Procesando</Badge>;
      default:
        return <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs border-0">{status}</Badge>;
    }
  };

  const getAuthorizationBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 font-medium">Aprobada</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 font-medium">En Trámite</Badge>;
      case 'denied':
        return <Badge className="bg-red-100 text-red-700 font-medium">Negada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getResultStatus = (value: number, reference: string, unit: string) => {
    // Simple logic for demo - in real app this would be more sophisticated
    return 'normal';
  };

  return (
    <div className="p-4 overflow-x-hidden">
      {/* Search */}
      <SearchBar
        placeholder="Buscar resultados, autorizaciones..."
        onSearch={setSearchTerm}
        className="mb-4"
      />

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Resultados</TabsTrigger>
          <TabsTrigger value="authorizations">Autorizaciones</TabsTrigger>
          <TabsTrigger value="certificates">Certificados</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white border-gray-100 shadow-sm rounded-[24px] mb-4 cursor-pointer hover:shadow-md active:scale-[0.98] transition-all" onClick={() => onViewResultDetail(result)}>
                  <CardContent className="p-5 relative">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[17px] text-[#001f3f]">{result.name}</h3>
                      {getStatusBadge(result.status)}
                    </div>
                    
                    <p className="text-gray-500 mb-4 text-[15px]">{result.type} • {result.category}</p>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600 font-medium text-[14px]">
                        {result.date}
                      </span>
                      <span className="text-blue-600 font-semibold text-sm flex items-center gap-1">
                        Ver Detalle <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <EmptyState
              icon={FileCheck}
              title="No se encontraron resultados"
              description="Intenta ajustar los términos de búsqueda o cambia de pestaña"
            />
          )}
        </TabsContent>

        <TabsContent value="authorizations" className="space-y-3">
          {authorizations.map((auth) => (
            <Card key={auth.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{auth.procedure}</p>
                    <p className="text-sm text-gray-600">{auth.eps}</p>
                    <p className="text-xs text-gray-500 mt-1">Código: {auth.code}</p>
                  </div>
                  {getAuthorizationBadge(auth.status)}
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Solicitada:</span>
                    <span>{auth.date}</span>
                  </div>
                  {auth.validUntil && (
                    <div className="flex justify-between">
                      <span>Válida hasta:</span>
                      <span>{auth.validUntil}</span>
                    </div>
                  )}
                </div>

                {auth.status === 'approved' && (
                  <Button size="sm" className="w-full mt-3" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Autorización
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="certificates" className="space-y-3">
          {certificates.map((cert) => (
            <Card key={cert.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{cert.type}</p>
                    <p className="text-sm text-gray-600">{cert.eps}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Vigente</Badge>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Expedido:</span>
                    <span>{cert.issueDate}</span>
                  </div>
                  {cert.validUntil && (
                    <div className="flex justify-between">
                      <span>Válido hasta:</span>
                      <span>{cert.validUntil}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                  <Button size="sm" className="flex-1" variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}