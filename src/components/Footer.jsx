import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030712] text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Columna 1: Brand & Bio (4.5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2">
              <img 
                src="/images/footer_logo_white.png" 
                alt="Logo Tesis Altiplánica" 
                className="h-14 w-auto object-contain"
              />
              <div className="flex items-center text-2xl font-black tracking-tight leading-none">
                <span className="text-white">Tesis</span>
                <span className="text-[#0052FF]">Altiplánica</span>
              </div>
              <div className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase">
                CONSULTORÍA DE TESIS & ESTADÍSTICA • PUNO, PERÚ
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Centro especializado en consultoría metodológica, análisis estadístico avanzado, bioestadística y publicación de artículos científicos con sede en Puno, Perú.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-blue-400 flex items-center justify-center text-slate-300 text-xs transition-all"
                title="Facebook"
              >
                f
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center text-slate-300 text-xs transition-all"
                title="Instagram"
              >
                ig
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-300 flex items-center justify-center text-slate-300 text-xs transition-all"
                title="TikTok"
              >
                tk
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-400 hover:text-blue-300 flex items-center justify-center text-slate-300 text-xs transition-all"
                title="LinkedIn"
              >
                in
              </a>
              <a 
                href="https://wa.me/51958274958" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center text-slate-300 text-xs transition-all"
                title="WhatsApp"
              >
                wa
              </a>
            </div>
          </div>

          {/* Columna 2: Servicios (2.5 cols) */}
          <div className="lg:col-span-2.5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">SERVICIOS</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">Análisis Estadístico SPSS / R</li>
              <li className="hover:text-white transition-colors cursor-pointer">Perfil y Plan de Tesis</li>
              <li className="hover:text-white transition-colors cursor-pointer">Artículos Scopus, WoS y RIA (EPG)</li>
              <li className="hover:text-white transition-colors cursor-pointer">Formato APA & Repositorio Institucional</li>
              <li className="hover:text-white transition-colors cursor-pointer">Subsanación de Observaciones</li>
              <li className="hover:text-white transition-colors cursor-pointer">Software y Modelamiento</li>
            </ul>
          </div>

          {/* Columna 3: Programas (2.5 cols) */}
          <div className="lg:col-span-2.5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">PROGRAMAS</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="hover:text-white transition-colors cursor-pointer">Tesis de Pregrado y Licenciatura</li>
              <li className="hover:text-white transition-colors cursor-pointer">Titulación por Artículo Científico</li>
              <li className="hover:text-white transition-colors cursor-pointer">Segunda Especialidad</li>
              <li className="hover:text-white transition-colors cursor-pointer">Maestrías y Doctorados</li>
              <li className="hover:text-white transition-colors cursor-pointer">Metodología y Cronogramas</li>
            </ul>
          </div>

          {/* Columna 4: Contacto & Mapa (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">CONTACTO</h4>
            
            <div className="space-y-2 text-xs text-slate-300">
              <a href="mailto:tesisaltiplanica@gmail.com" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="truncate">tesisaltiplanica@gmail.com</span>
              </a>
              <a href="tel:+51958274958" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>+51 958 274 958</span>
              </a>
              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Puno, Puno, Perú</span>
              </div>
            </div>

            {/* Mapa de Google Puno */}
            <div className="pt-2">
              <a 
                href="https://maps.google.com/?q=Puno,Peru" 
                target="_blank" 
                rel="noreferrer"
                className="block group rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all shadow-md relative"
              >
                <img 
                  src="/images/puno_map_card.png" 
                  alt="Ubicación Puno - Tesis Altiplánica" 
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-200"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© 2026 TesisAltiplánica. Todos los derechos reservados. Consultoría Académica y Científica.</p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Términos del Servicio</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Política de Privacidad</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Ética Académica</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
