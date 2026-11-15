import React, { useState } from 'react';
import { Cpu, ArrowRight, Layers, ShieldCheck, CheckCircle2, AlertCircle, Eye, Sparkles } from 'lucide-react';

export default function SimulationModule({ defenseMode }) {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const simulationPhases = [
    {
      id: 1,
      titulo: "Fase 1: Preparación de Datos & Geología",
      icono: Layers,
      items: [
        "Importación del modelo de bloques geológico (bloques de 10 m × 10 m × 10 m).",
        "Asignación de densidades por litología (Andesita: 2.65 t/m³, Skarn: 3.10 t/m³, Intrusivo: 2.55 t/m³).",
        "Estimación de leyes de oro (Au g/t) y cobre (Cu %) mediante Kriging Ordinario.",
        "Cálculo del campo NSR (Net Smelter Return en US$/t) por cada celda para definir el destino (Planta > US$ 12.80/t o Botadero)."
      ],
      destacado: "Asegura que el secuenciamiento se base en leyes y valor económico real de bloque y no en un tonelaje indiferenciado."
    },
    {
      id: 2,
      titulo: "Fase 2: Geometría CAD & Precedencias Verticales",
      icono: ShieldCheck,
      items: [
        "Discretización del tajo en sólidos minables y fases de explotación (Fase 1 y Fase 2).",
        "Configuración de precedencias verticales estrictas: el banco N-1 no puede minarse si no se ha liberado el banco superior N respetando la berma de seguridad.",
        "Control de la tasa máxima de profundización: límite de 4 bancos de 10 m por año (máximo 1 banco por trimestre en fase activa).",
        "Ancho mínimo de minado fijado en 35.0 m para permitir el radio de giro seguro y carguío en paralelo de camiones CAT 777F."
      ],
      destacado: "MinePlan Activity Scheduler rechaza automáticamente secuencias imposibles de construir físicamente en banco."
    },
    {
      id: 3,
      titulo: "Fase 3: Parámetros Operativos & Geotecnia",
      icono: Cpu,
      items: [
        "Inclusión de restricciones geotécnicas dictadas por el estudio de estabilidad de taludes: ángulo interrampa de 52° y bermas de 8.5 m.",
        "Rampa principal con gradiente máxima del 10% y ancho de calzada de 25.0 m (3.5 veces el ancho del camión más ancho).",
        "Asignación de calendarios de trabajo: 2 turnos de 12 horas por día, 7 días a la semana durante 90 días (Q1 2027).",
        "Modelamiento de tiempos fijos de cambio de guardia (30 min/turno), refrigerio e inspección pre-uso (360° check)."
      ],
      destacado: "Convierte una simulación teórica en un plan ajustado al D.S. 024-2016-EM (Reglamento de Seguridad Minera)."
    },
    {
      id: 4,
      titulo: "Fase 4: Ejecución Multi-Escenario (MPAS)",
      icono: ArrowRight,
      items: [
        "Escenario 01 (Base): Simulación sin demoras fortuitas, disponibilidad mecánica teórica de palas (92%) y frentes siempre listos.",
        "Escenario 02 (Restricciones y Demoras): Incorporación del vector de 57.64 horas de demoras registradas e inhabilitación de frentes en Semanas 7 y 12.",
        "Escenario 03 (Variación de KPIs de Carguío): Degradación de la disponibilidad mecánica (88.7%) y uso de las excavadoras CAT 390FL y CAT 374DL.",
        "Generación de reportes diarios de producción, movimiento de desmonte y leyes de cabeza a planta."
      ],
      destacado: "Permite contrastar tres realidades operativas para medir matemáticamente la sensibilidad del plan."
    },
    {
      id: 5,
      titulo: "Fase 5: Reconciliación Analítica en Python",
      icono: CheckCircle2,
      items: [
        "Exportación de logs diarios de MPAS a archivos planos CSV (90 registros por escenario).",
        "Limpieza y validación de consistencia numérica en scripts de Python (Pandas y SciPy).",
        "Cálculo de estadísticos descriptivos, intervalos de confianza y verificación de supuestos de normalidad (Shapiro-Wilk).",
        "Pruebas inferenciales paramétricas (t de Student pareada) y no paramétricas (Wilcoxon), matrices de correlación y regresiones OLS."
      ],
      destacado: "Cierra la brecha entre el software de mina (MinePlan) y el análisis estadístico riguroso exigido por la UNAP."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Procedimiento Metodológico de Simulación en MinePlan Activity Scheduler</h2>
            <p className="text-xs text-slate-500">Flujo paso a paso desde el modelo geológico hasta la reconciliación analítica</p>
          </div>
        </div>
      </div>

      {/* Flujograma Visual (Figura 10) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Figura 10. Diagrama de Flujo Metodológico de Simulación en MinePlan</h3>
            <p className="text-xs text-slate-500">Esquema metodológico completo implementado en la investigación</p>
          </div>
          <span className="text-[11px] font-bold text-[#0052FF] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Figura Oficial de Tesis
          </span>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 flex justify-center">
          <img 
            src="/figuras/figura_10_diagrama_flujo_simulacion_mineplan.png" 
            alt="Figura 10. Diagrama de Flujo Metodológico de Simulación en MinePlan Activity Scheduler" 
            className="max-h-[500px] w-auto object-contain rounded-lg shadow-xs"
          />
        </div>
        <p className="text-[11px] text-slate-500 mt-2 italic text-center">
          Nota. Flujograma integral de secuenciamiento en MinePlan Activity Scheduler (MPAS) articulado con análisis estadístico en Python.
        </p>
      </div>

      {/* Selector de Fases de Simulación */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">Las 5 Fases del Procedimiento de Simulación</h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {simulationPhases.map((phase, idx) => {
            const Icon = phase.icono;
            const isSelected = selectedPhase === idx;
            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(idx)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0052FF] bg-blue-50/70 text-[#0052FF] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Paso {phase.id}</span>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold mt-2 line-clamp-1">{phase.titulo.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Phase Details Card */}
        {(() => {
          const p = simulationPhases[selectedPhase];
          return (
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900">{p.titulo}</h4>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0052FF] text-white">Fase {p.id} de 5</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {p.items.map((item, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                <div>
                  <strong>Por qué es clave para el Jurado:</strong> {p.destacado}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Parámetros de Diseño y Geotecnia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider block">Criterios de Seguridad y Geotecnia</span>
          <h4 className="text-sm font-bold text-slate-900">Parámetros Geotécnicos en Banco (Proyecto NAS)</h4>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Altura de Banco:</span>
              <strong className="text-slate-900">10.0 metros</strong>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Ángulo de Cara de Banco:</span>
              <strong className="text-slate-900">70°</strong>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Ancho de Berma de Seguridad:</span>
              <strong className="text-slate-900">8.5 metros</strong>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Ángulo Interrampa:</span>
              <strong className="text-slate-900">52°</strong>
            </li>
            <li className="flex justify-between py-1">
              <span>Factor de Seguridad Geotécnico (FoS):</span>
              <strong className="text-emerald-700">&gt; 1.30 (Condición Pseudo-estática)</strong>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider block">Criterios Geométricos de Rampas</span>
          <h4 className="text-sm font-bold text-slate-900">Diseño Vial de Transporte Minero</h4>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Ancho del Camión CAT 777F:</span>
              <strong className="text-slate-900">6.50 metros</strong>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Ancho de Calzada de Rampa:</span>
              <strong className="text-slate-900">25.0 metros (doble vía + bermas)</strong>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Pendiente / Gradiente Máxima:</span>
              <strong className="text-slate-900">10.0%</strong>
            </li>
            <li className="flex justify-between py-1 border-b border-slate-100">
              <span>Altura de Berma de Seguridad Vial:</span>
              <strong className="text-slate-900">1.80 metros (3/4 diámetro neumático)</strong>
            </li>
            <li className="flex justify-between py-1">
              <span>Ancho Mínimo de Frente de Carguío:</span>
              <strong className="text-emerald-700">35.0 metros (giro en herradura)</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
