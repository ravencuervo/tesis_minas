import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#020618] text-white pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Logo Tesis Altiplánica Blanco */}
        <div className="mb-3 flex justify-center">
          <img 
            src="/images/footer_logo_white.png" 
            alt="Logo Tesis Altiplánica" 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Tipografía de Marca */}
        <div className="flex items-center justify-center text-2xl sm:text-3xl font-black tracking-tight leading-none">
          <span className="text-white">Tesis</span>
          <span className="text-[#0052FF]">Altiplánica</span>
        </div>

        {/* Subtítulo Institucional */}
        <div className="text-[11px] sm:text-xs font-bold text-slate-400 tracking-[0.16em] uppercase mt-2">
          CONSULTORÍA DE TESIS & ESTADÍSTICA • PUNO, PERÚ
        </div>

        {/* Descripción de la Empresa */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto mt-4 font-normal">
          Centro especializado en consultoría metodológica, análisis estadístico avanzado, bioestadística y publicación de artículos científicos con sede en Puno, Perú.
        </p>

        {/* Redes Sociales Centradas */}
        <div className="flex items-center justify-center space-x-3 mt-6">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-blue-400 flex items-center justify-center text-slate-300 text-xs font-bold transition-all shadow-xs"
            title="Facebook"
          >
            f
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center text-slate-300 text-xs font-bold transition-all shadow-xs"
            title="Instagram"
          >
            ig
          </a>
          <a 
            href="https://tiktok.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-300 flex items-center justify-center text-slate-300 text-xs font-bold transition-all shadow-xs"
            title="TikTok"
          >
            tk
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-400 hover:text-blue-300 flex items-center justify-center text-slate-300 text-xs font-bold transition-all shadow-xs"
            title="LinkedIn"
          >
            in
          </a>
          <a 
            href="https://wa.me/51958274958" 
            target="_blank" 
            rel="noreferrer" 
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center text-slate-300 text-xs font-bold transition-all shadow-xs"
            title="WhatsApp"
          >
            wa
          </a>
        </div>

        {/* Línea divisoria */}
        <div className="w-full border-t border-slate-800/80 my-8"></div>

        {/* Footer Legal & Copyright Centrado */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-xs text-slate-500 gap-3">
          <div>
            © 2026 TesisAltiplánica. Todos los derechos reservados. Consultoría Académica y Científica.
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer">Términos del Servicio</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Política de Privacidad</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Ética Académica</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
