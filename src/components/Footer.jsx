import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#020618] border-t border-slate-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-1.5 rounded-lg shadow-xs">
              <img 
                src="/images/navbar_brand.png" 
                alt="Tesis Altiplánica" 
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold text-white block">Tesis Altiplánica</span>
              <span className="text-xs text-slate-400 block">Consultoría Integral de Tesis, Estadística & Minería</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right space-y-0.5">
            <p>Plataforma Metodológica para Bach. Mireya Yanina Deza Velarde</p>
            <p className="text-blue-400 font-semibold">Escuela Profesional de Ingeniería de Minas • UNAP Puno</p>
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
