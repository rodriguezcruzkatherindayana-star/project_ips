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
}

export function ResultsScreen({ user, onDoctorClick }: ResultsScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResult, setSelectedResult] = useState<any>(null);

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
        return <Badge className="bg-green-100 text-green-700 font-medium">Disponible</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 font-medium">Pendiente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-700 font-medium">Procesando</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

  if (selectedResult) {
    const handleDoctorClick = () => {
      const doctor = getDoctorByName(selectedResult.doctor);
      if (doctor && onDoctorClick) {
        onDoctorClick(doctor.id);
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 overflow-x-hidden"
      >
        <button
          onClick={() => setSelectedResult(null)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a resultados</span>
        </button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{selectedResult.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{selectedResult.type} • {selectedResult.category}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <User className="h-4 w-4" />
                  <button 
                    onClick={handleDoctorClick}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {selectedResult.doctor}
                  </button>
                </div>
                <p className="text-sm text-gray-600">{selectedResult.date}</p>
              </div>
              {getStatusBadge(selectedResult.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">{selectedResult.description}</p>

            {selectedResult.results && (
              <div className="space-y-3">
                <h3 className="font-medium">Resultados:</h3>
                {Object.entries(selectedResult.results).map(([key, result]: [string, any]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{key}</span>
                      <Badge variant={result.status === 'normal' ? 'default' : 'destructive'} className="text-xs">
                        {result.status === 'normal' ? 'Normal' : 'Anormal'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="block">Valor:</span>
                        <span className="font-medium text-gray-900">{result.value} {result.unit}</span>
                      </div>
                      <div>
                        <span className="block">Referencia:</span>
                        <span>{result.reference} {result.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedResult.summary && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 mb-2">Interpretación:</h4>
                <p className="text-sm text-blue-700">{selectedResult.summary}</p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={() => {
                  toast.success('Descargando resultado...', {
                    description: `El archivo ${selectedResult.name}.pdf se está descargando`
                  });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
              <Button 
                onClick={() => {
                  toast.success('Resultado compartido', {
                    description: 'El enlace seguro ha sido generado y copiado al portapapeles'
                  });
                }}
                variant="outline" 
                className="flex-1"
              >
                <Shield className="h-4 w-4 mr-2" />
                Compartir Seguro
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4 bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-gray-600 mt-0.5" />
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Documento Médico Protegido</p>
                <p>Este resultado está cifrado y protegido. Solo tú y tu médico tratante pueden acceder a esta información.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

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
                <Card className="cursor-pointer hover:shadow-elevated transition-all hover:scale-[1.02]" onClick={() => setSelectedResult(result)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-gray-900">{result.name}</p>
                        <p className="text-sm text-gray-600">{result.type} • {result.category}</p>
                      </div>
                      {getStatusBadge(result.status)}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {result.date}
                      </div>
                      <div className="flex items-center gap-1 text-blue-500">
                        <Eye className="h-4 w-4" />
                        Ver detalles
                      </div>
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