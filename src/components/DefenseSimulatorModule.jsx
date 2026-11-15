import React, { useState } from 'react';
import { defenseQuestions } from '../data/thesisData';
import { ShieldAlert, ChevronDown, ChevronUp, UserCheck, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DefenseSimulatorModule() {
  const [openQuestionId, setOpenQuestionId] = useState(1);
  const [selectedJuradoFilter, setSelectedJuradoFilter] = useState('all');

  const filteredQuestions = defenseQuestions.filter(q => {
    if (selectedJuradoFilter === 'all') return true;
    return q.jurado.includes(selectedJuradoFilter);
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Simulador de Sustentación & Balotario de Preguntas del Jurado</h2>
              <p className="text-xs text-slate-500">Las preguntas clave de los jurados de la UNAP (Dr. Durant, Ing. Chayña e Ing. Ticona) con respuestas maestras</p>
            </div>
          </div>

          <div className="flex space-x-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setSelectedJuradoFilter('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${
                selectedJuradoFilter === 'all' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos (6)
            </button>
            <button
              onClick={() => setSelectedJuradoFilter('Durant')}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${
                selectedJuradoFilter === 'Durant' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dr. Durant
            </button>
            <button
              onClick={() => setSelectedJuradoFilter('Chayña')}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${
                selectedJuradoFilter === 'Chayña' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ing. Chayña
            </button>
            <button
              onClick={() => setSelectedJuradoFilter('Ticona')}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${
                selectedJuradoFilter === 'Ticona' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ing. Ticona
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((item) => {
          const isOpen = openQuestionId === item.id;
          return (
            <div 
              key={item.id} 
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen 
                  ? 'border-[#0052FF] bg-white shadow-md ring-1 ring-blue-100' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Question Header Bar */}
              <div 
                className="p-5 cursor-pointer flex items-start justify-between gap-4"
                onClick={() => setOpenQuestionId(isOpen ? null : item.id)}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#0052FF]">
                      Pregunta #{item.id}
                    </span>
                    <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                      <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.jurado}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">• {item.cargo}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {item.pregunta}
                  </h3>
                </div>

                <div className="shrink-0 pt-1 text-slate-400">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#0052FF]" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Answer Body */}
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-4 animate-fadeIn">
                  {/* Lo que busca el jurado */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600">
                    <strong className="text-slate-900">Lo que el jurado realmente está evaluando:</strong> {item.loQueBusca}
                  </div>

                  {/* Respuesta Maestra Recomendada */}
                  <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0052FF] uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>Respuesta Maestra Recomendada (Guion para Mireya):</span>
                    </div>
                    <p className="leading-relaxed font-normal">
                      {item.respuestaMaestra}
                    </p>
                  </div>

                  {/* Trampas a evitar */}
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Trampa o error común a evitar:</strong> {item.trampasEvitar}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
