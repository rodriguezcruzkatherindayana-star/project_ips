import React from 'react';
import { ArrowLeft, Download, FileText, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { useApp } from '../contexts/AppContext';

interface ResultDetailScreenProps {
  result: any;
  onDoctorClick?: (doctorId: string) => void;
}

export function ResultDetailScreen({ result, onDoctorClick }: ResultDetailScreenProps) {
  const { goBack } = useApp();

  if (!result) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString + 'T12:00:00');
      const formatter = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const parts = formatter.formatToParts(date);
      const weekday = parts.find(p => p.type === 'weekday')?.value || '';
      const day = parts.find(p => p.type === 'day')?.value || '';
      const month = parts.find(p => p.type === 'month')?.value || '';
      const year = parts.find(p => p.type === 'year')?.value || '';
      
      const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
      
      return `${capitalizedWeekday}, ${day} de ${capitalizedMonth} de ${year}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#f4f5f9] w-full relative">
      {/* Header Azul */}
      <div className="bg-[#2563eb] pt-12 pb-16 px-5 relative shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={goBack}
            className="text-white p-1 hover:bg-white/10 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-white text-xl font-medium tracking-wide">Detalle del resultado</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 -mt-8 relative z-10 w-full">
        {/* Main White Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5 w-full border border-gray-100/50">
          <h3 className="text-[#171f37] font-bold text-[17px] leading-snug mb-5 pr-2">
            {result.name}
          </h3>
          
          <div className="flex flex-col gap-1.5 mb-5">
            <span className="text-[#171f37] text-[15px] font-medium">
              {formatDate(result.date)}
            </span>
            <span className="text-[#2563eb] font-bold text-[17px]">
              {result.type}
            </span>
            <span className="text-[#171f37] font-bold text-[15px] mt-1">
              Profesional {result.doctor}
            </span>
          </div>

          <div className="h-px bg-gray-100 w-full my-4"></div>
          
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm">Sede</span>
            <span className="text-[#171f37] font-bold text-[15px]">
              Ips Viva 1a Portal Del Prado
            </span>
          </div>
        </div>

        {/* Patient Card (simulated like in the detail image) */}
        <div className="bg-blue-50/60 rounded-2xl p-4 flex items-center gap-4 mb-6 border border-blue-100/50">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-blue-200 shrink-0 text-[#2563eb] font-bold text-xl">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-[#171f37] font-bold text-[15px]">Paciente</span>
            <span className="text-[#2563eb] font-medium text-sm mt-0.5">
              Identificación en sistema
            </span>
          </div>
        </div>

        {/* Data / Summary from result */}
        {(result.results || result.summary || result.description) && (
          <div className="mb-6">
            <h4 className="text-[#171f37] font-bold text-[16px] mb-3">Información del Resultado:</h4>
            
            {result.description && (
              <p className="text-[#171f37] text-[15px] mb-4">{result.description}</p>
            )}

            {result.results && (
              <div className="space-y-3 mb-4">
                {Object.entries(result.results).map(([key, resItem]: [string, any]) => (
                  <div key={key} className="border border-gray-200 rounded-xl p-3 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-[#171f37]">{key}</span>
                      <Badge className={resItem.status === 'normal' ? 'bg-green-100 text-green-800 border-0' : 'bg-red-100 text-red-800 border-0'} variant="outline">
                        {resItem.status === 'normal' ? 'Normal' : 'Anormal'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="block text-xs text-gray-500">Valor:</span>
                        <span className="font-medium text-[#2563eb]">{resItem.value} {resItem.unit}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500">Referencia:</span>
                        <span>{resItem.reference} {resItem.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {result.summary && (
              <div className="bg-blue-50/50 rounded-xl p-4 mt-2">
                <span className="text-[#171f37] font-bold block mb-1 text-sm">Interpretación:</span>
                <span className="text-[#171f37] text-[15px] block">
                  {result.summary}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button 
            className="w-full bg-white text-[#2563eb] border border-[#2563eb] rounded-full py-6 text-[16px] font-bold shadow-sm hover:bg-blue-50"
            onClick={() => {
              toast.success('Descargando resultado...', {
                description: `El archivo ${result.name}.pdf se está descargando`
              });
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            Descargar PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
