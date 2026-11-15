import React, { useState } from 'react';
import { projectInfo, consistencyMatrix, summaryTotals } from '../data/thesisData';
import { CheckCircle2, Award, Calendar, Layers, MapPin, Users, HelpCircle, ArrowRight } from 'lucide-react';

export default function OverviewModule({ setActiveTab, defenseMode }) {
  const [activeMatrixTab, setActiveMatrixTab] = useState(0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#020618] via-[#0A1A4A] to-[#0052FF] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Guía Oficial de Preparación Metodológica & Estadística</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug">
            {projectInfo.title}
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-3xl">
            Plataforma técnica interactiva desarrollada por <strong className="text-white">Tesis Altiplánica</strong> para guiar a la tesista en la comprensión integral, simulación operativa en MinePlan, tratamiento inferencial de datos y defensa exitosa ante los jurados de la UNAP.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] text-blue-200 block">Tesista</span>
              <span className="text-xs sm:text-sm font-bold text-white block truncate">{projectInfo.tesista}</span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] text-blue-200 block">Asesor Metodológico</span>
              <span className="text-xs sm:text-sm font-bold text-white block truncate">{projectInfo.asesor}</span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] text-blue-200 block">Caso de Estudio</span>
              <span className="text-xs sm:text-sm font-bold text-white block truncate">{projectInfo.casoEstudio}</span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
              <span className="text-[11px] text-blue-200 block">Horizonte Temporal</span>
              <span className="text-xs sm:text-sm font-bold text-white block truncate">Q1 2027 (90 días)</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan Base Programado</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">Ideal</span>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {summaryTotals.planTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-500">t</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Meta determinística: 41,502.41 t/día</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Escenario 02 (Demoras)</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">98.75%</span>
          </div>
          <div className="mt-2 text-2xl font-black text-[#0052FF]">
            {summaryTotals.esc02Total.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-500">t</span>
          </div>
          <span className="text-xs text-amber-600 font-medium mt-1 block">Déficit: -46,607.17 t (57.64 h parada)</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Escenario 03 (KPIs Carguío)</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800">98.61%</span>
          </div>
          <div className="mt-2 text-2xl font-black text-indigo-900">
            {summaryTotals.esc03Total.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-500">t</span>
          </div>
          <span className="text-xs text-rose-600 font-medium mt-1 block">Déficit: -51,733.60 t (DM & UoD baja)</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Impacto Económico</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">US$ 2.85/t</span>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            $132,830 <span className="text-xs font-normal text-slate-500">USD</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Sobrecostos y horas ociosas de flota</span>
        </div>
      </div>

      {/* Explicación didáctica: ¿Qué se hizo en la tesis? */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">¿Qué se investigó y cómo explicárselo a cualquier persona?</h2>
            <p className="text-xs text-slate-500">Explicación conceptual y operacional para la tesista Mireya Deza</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="font-bold text-[#0052FF] block text-sm">1. El Problema Real en Mina</span>
            <p className="leading-relaxed">
              En las oficinas de planeamiento se suele hacer un calendario en Excel o AutoCAD asumiendo que las máquinas van a trabajar sin parar y que todos los frentes estarán listos al 100%. Pero en la mina real hay lluvias, taludes inestables, fallas mecánicas en perforadoras y palas vacías esperando camiones.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="font-bold text-[#0052FF] block text-sm">2. La Solución con MinePlan</span>
            <p className="leading-relaxed">
              Mediante el software <strong>MinePlan Activity Scheduler (MPAS)</strong>, simulamos la extracción banco por banco respetando el ancho de minado (35 m), las bermas de seguridad (8.5 m) y metiéndole las demoras reales día a día durante 90 días del primer trimestre 2027.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="font-bold text-[#0052FF] block text-sm">3. La Demostración Estadística</span>
            <p className="leading-relaxed">
              Demostramos con pruebas matemáticas (<em className="font-semibold">t de Student</em> y <em className="font-semibold">Wilcoxon</em> con <strong className="text-emerald-700">p &lt; 0.05</strong>) que esas 57.64 horas de demoras y la falta de frentes no son una casualidad, sino un impacto estadísticamente significativo que costó más de 46,000 toneladas.
            </p>
          </div>
        </div>

        {defenseMode && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
            <div className="flex items-center space-x-2 font-bold text-amber-800">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Tip de Sustentación para Mireya (Frase de Entrada):</span>
            </div>
            <p className="italic">
              «Señores miembros del jurado, mi tesis no es una simple corrida teórica de software; es la demostración matemática y operativa de cómo la incertidumbre de frentes y demoras degrada un plan minero determinístico, aportando una metodología multi-escenario en MinePlan Activity Scheduler para blindar la toma de decisiones.»
            </p>
          </div>
        )}
      </div>

      {/* Matriz de Consistencia Interactiva */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Matriz de Consistencia Metodológica</h2>
            <p className="text-xs text-slate-500">Alineamiento estricto entre Problema, Objetivo, Hipótesis y Resultados Concluyentes</p>
          </div>

          <div className="flex space-x-1 p-1 bg-slate-100 rounded-lg">
            {consistencyMatrix.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMatrixTab(idx)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeMatrixTab === idx
                    ? 'bg-[#0052FF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.tipo}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Matrix Card */}
        {(() => {
          const m = consistencyMatrix[activeMatrixTab];
          return (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Pregunta de Investigación ({m.tipo})</span>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{m.problema}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Objetivo a Lograr</span>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{m.objetivo}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider block mb-1">Hipótesis Planteada</span>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{m.hipotesis}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-bold text-xs uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Resultado y Validación Estadística</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-emerald-950 leading-relaxed">{m.resultado}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Jurado Revisor */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center space-x-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span>Comité de Jurados Revisores (Facultad de Ingeniería de Minas - UNAP)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {projectInfo.jurados.map((j, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
              <span className="text-[11px] font-bold text-[#0052FF] uppercase tracking-wider block">{j.cargo}</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">{j.nombre}</span>
              <span className="text-[11px] text-slate-500 mt-1 block leading-tight">{j.rol}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
