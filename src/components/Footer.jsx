import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#020618] border-t border-slate-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          {/* Logo y Nombre Coded en React */}
          <div className="flex items-center space-x-3.5 select-none">
            <div className="bg-white/10 p-1.5 rounded-xl backdrop-blur-xs border border-white/15">
              <img 
                src="/images/tesis_logo.svg" 
                alt="Logo Tesis Altiplánica" 
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain shrink-0" 
              />
            </div>
            <div className="flex flex-col justify-center text-left leading-none">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-none flex items-center">
                <span className="text-white font-black">Tesis</span>
                <span className="text-[#3B82F6] font-black">Altiplánica</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-400 tracking-[0.16em] uppercase mt-1 leading-none">
                CONSULTORÍA DE TESIS & ESTADÍSTICA
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right space-y-0.5">
            <p>Plataforma Metodológica desarrollada para <strong className="text-white">Bach. Mireya Yanina Deza Velarde</strong></p>
            <p className="text-[#3B82F6] font-semibold">Escuela Profesional de Ingeniería de Minas • UNAP Puno</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2026 Tesis Altiplánica. Todos los derechos reservados. Desarrollado con React & Tailwind CSS.</p>
          <div className="flex space-x-4">
            <span>MinePlan Activity Scheduler</span>
            <span>•</span>
            <span>Python Data Science</span>
            <span>•</span>
            <span>Norma UNAP 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
