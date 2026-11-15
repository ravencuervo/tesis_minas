import React from 'react';
import { BookOpen, BarChart3, Calculator, Cpu, ShieldAlert, Table, Image, Download, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, defenseMode, setDefenseMode }) {
  const navItems = [
    { id: 'overview', label: 'Resumen & Matriz', icon: BookOpen },
    { id: 'formulas', label: 'Fórmulas Mineras', icon: Calculator },
    { id: 'simulation', label: 'Simulación MPAS', icon: Cpu },
    { id: 'data', label: 'Datos & Reconciliación', icon: Table },
    { id: 'figures', label: '10 Figuras 300 DPI', icon: Image },
    { id: 'statistics', label: 'Núcleo Estadístico', icon: BarChart3 },
    { id: 'defense', label: 'Balotario de Jurados', icon: ShieldAlert },
    { id: 'resources', label: 'Descargas & Recursos', icon: Download },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top corporate brand header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img 
              src="/images/navbar_brand.png" 
              alt="Tesis Altiplánica - Consultoría de Tesis & Estadística" 
              className="h-9 sm:h-11 w-auto object-contain cursor-pointer"
              onClick={() => setActiveTab('overview')}
            />
          </div>
          <div className="hidden md:block h-6 w-px bg-slate-200"></div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-slate-800 tracking-tight">GUÍA INTERACTIVA DE METODOLOGÍA & DEFENSA</span>
            <span className="text-[11px] font-medium text-blue-600">UNAP - Escuela Profesional de Ingeniería de Minas</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setDefenseMode(!defenseMode)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs ${
              defenseMode 
                ? 'bg-amber-500 text-white shadow-amber-200 ring-2 ring-amber-300' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
            title="Activar modo con respuestas clave y tips para el jurado"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{defenseMode ? 'Modo Sustentación: ACTIVO' : 'Activar Modo Sustentación'}</span>
          </button>
        </div>
      </div>

      {/* Navigation menu tabs */}
      <div className="bg-slate-50/80 border-t border-slate-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#0052FF] text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
