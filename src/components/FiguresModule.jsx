import React, { useState } from 'react';
import { figuresList } from '../data/thesisData';
import { Image as ImageIcon, ZoomIn, X, ChevronRight, Award, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function FiguresModule({ defenseMode }) {
  const [selectedFigure, setSelectedFigure] = useState(figuresList[0]);
  const [modalImage, setModalImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredFigures = figuresList.filter(fig => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'produccion') return fig.id === 1 || fig.id === 2 || fig.id === 7;
    if (activeFilter === 'demoras') return fig.id === 5 || fig.id === 6 || fig.id === 8;
    if (activeFilter === 'correlacion') return fig.id === 3 || fig.id === 4 || fig.id === 9;
    if (activeFilter === 'metodologia') return fig.id === 10;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Galería de las 10 Figuras Oficiales de Tesis (300 DPI)</h2>
              <p className="text-xs text-slate-500">Gráficos de alta resolución generados en Python con guion de defensa para Mireya Deza</p>
            </div>
          </div>

          {/* Categorías */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                activeFilter === 'all' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas (10)
            </button>
            <button
              onClick={() => setActiveFilter('produccion')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                activeFilter === 'produccion' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Producción (3)
            </button>
            <button
              onClick={() => setActiveFilter('demoras')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                activeFilter === 'demoras' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Demoras & Pareto (3)
            </button>
            <button
              onClick={() => setActiveFilter('correlacion')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                activeFilter === 'correlacion' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Regresión & Heatmap (3)
            </button>
            <button
              onClick={() => setActiveFilter('metodologia')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                activeFilter === 'metodologia' ? 'bg-[#0052FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              MinePlan (1)
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Thumbnails List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredFigures.map((fig) => {
            const isSelected = selectedFigure.id === fig.id;
            return (
              <div
                key={fig.id}
                onClick={() => setSelectedFigure(fig)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0052FF] bg-blue-50/80 shadow-xs ring-1 ring-[#0052FF]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-14 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center">
                    <img 
                      src={`/figuras/${fig.archivo}`} 
                      alt={fig.titulo} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#0052FF] uppercase">{fig.numero}</span>
                      <span className="text-[10px] text-slate-400 font-mono truncate">{fig.tipo}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate mt-0.5">{fig.titulo}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{fig.resumen}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Figure Viewer & Defense Guide (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">{selectedFigure.numero} • {selectedFigure.tipo}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedFigure.titulo}</h3>
              </div>
              <button
                onClick={() => setModalImage(`/figuras/${selectedFigure.archivo}`)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center space-x-1.5 transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5 text-[#0052FF]" />
                <span>Ampliar en Alta Resolución</span>
              </button>
            </div>

            {/* Image Preview Container */}
            <div 
              className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-950 p-2 flex justify-center items-center cursor-pointer min-h-[350px]"
              onClick={() => setModalImage(`/figuras/${selectedFigure.archivo}`)}
            >
              <img 
                src={`/figuras/${selectedFigure.archivo}`} 
                alt={selectedFigure.titulo} 
                className="max-h-[420px] w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold flex items-center space-x-1.5 backdrop-blur-xs">
                  <ZoomIn className="w-4 h-4 text-[#0052FF]" />
                  <span>Click para ver a 300 DPI</span>
                </span>
              </div>
            </div>

            {/* Ficha de Explicación y Guion de Defensa */}
            <div className="space-y-3 pt-2">
              {/* Qué muestra */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase">
                  <FileText className="w-4 h-4 text-[#0052FF]" />
                  <span>¿Qué muestra este gráfico? (Interpretación Técnica)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedFigure.queMuestra}
                </p>
              </div>

              {/* Cómo defenderlo ante el jurado */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-1.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 uppercase">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>¿Cómo defenderlo e interpretarlo ante el Jurado de la UNAP?</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 italic leading-relaxed">
                  {selectedFigure.comoDefender}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Zoom en Alta Resolución */}
      {modalImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[95vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold truncate pl-2">{selectedFigure.numero}: {selectedFigure.titulo}</span>
              <button 
                onClick={() => setModalImage(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-4 flex justify-center items-center bg-slate-950 flex-1">
              <img 
                src={modalImage} 
                alt="Alta Resolución" 
                className="max-h-[85vh] w-auto object-contain rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
