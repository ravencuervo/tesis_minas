import React, { useState } from 'react';
import { Calculator, Play, Info, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { equipmentFleet } from '../data/thesisData';
import MathFormula from './MathFormula';

export default function FormulasModule({ defenseMode }) {
  // Estado para la calculadora de Match Factor
  const [numCamiones, setNumCamiones] = useState(5);
  const [tiempoCarguio, setTiempoCarguio] = useState(2.2); // minutos
  const [numPalas, setNumPalas] = useState(2);
  const [tiempoCicloTotal, setTiempoCicloTotal] = useState(11.5); // minutos
  const [disponibilidadPala, setDisponibilidadPala] = useState(90); // %

  // Cálculo del Match Factor: MF = (N_camiones * t_carguio) / (N_palas * t_ciclo)
  const matchFactor = (numCamiones * tiempoCarguio) / (numPalas * tiempoCicloTotal);

  // Rendimiento estimado (t/h)
  const capacidadCamionTon = 96.0; // CAT 777F
  const viajesPorHoraPorCamion = 60 / tiempoCicloTotal;
  const produccionTeoricaHora = numCamiones * viajesPorHoraPorCamion * capacidadCamionTon * (disponibilidadPala / 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Modelos Matemáticos e Ingeniería de Minado</h2>
            <p className="text-xs text-slate-500">Renderizado matemático formal en LaTeX de las ecuaciones utilizadas en la tesis</p>
          </div>
        </div>
      </div>

      {/* Grid de Ecuaciones en LaTeX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Ecuación de Taylor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Ritmo Óptimo de Producción</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Taylor (1977)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Regla de Taylor para Capacidad de Mina</h3>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-inner flex justify-center items-center min-h-[75px]">
              <MathFormula math="T = 0.013 \times \left( \text{Reservas} \right)^{0.75} \quad [\text{Mt/a\tilde{n}o}]" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Establece la escala económica de extracción anual en función de las reservas explotables totales. Para un depósito de 45 Mt en el Proyecto NAS, determina un ritmo nominal de 14.5 a 15.0 Mt/año, validando el ritmo programado de 3.735 Mt para el primer trimestre (Q1).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            Aplicada para verificar la coherencia entre el plan a corto plazo y la vida útil (LOM).
          </div>
        </div>

        {/* Regla de Long (LOM) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Vida Útil de Mina</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Long (1992)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Regla Empírica de Long para LOM</h3>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-inner flex justify-center items-center min-h-[75px]">
              <MathFormula math="\text{LOM} = 0.20 \times \left( \text{Reservas} \right)^{0.25} \quad [\text{a\tilde{n}os}]" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Modela la vida esperada de la mina (Life of Mine). Permite balancear la velocidad máxima de profundización de bancos (máximo 4 bancos de 10 m por año en fase activa) frente al agotamiento racional del yacimiento.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            Garantiza que la secuencia no acelere la extracción más allá de los límites de acceso de rampa.
          </div>
        </div>

        {/* Ecuación de Retorno Neto de Fundición (NSR) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Valorización Económica</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Cut-off Polimetálico</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Ecuación NSR (Net Smelter Return)</h3>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-inner flex justify-center items-center min-h-[75px]">
              <MathFormula math="\text{NSR} = \sum_{i=1}^{n} \left[ \text{Ley}_i \times \text{Rec}_i \times (\text{Precio}_i - \text{Ded}_i) \right] - C_{\text{flete}} - C_{\text{maquila}}" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Define el valor recuperable neto por tonelada de mineral (US$/t). En el Proyecto NAS (Au-Cu), un bloque se clasifica como mineral de alimentación directa a planta si su NSR supera el costo de procesamiento y transporte (&gt; US$ 12.80/t).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            La simulación en MPAS prioriza frentes con mayor NSR para optimizar el flujo de caja.
          </div>
        </div>

        {/* Ciclo de Acarreo y Carguío */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Cinemática de Transporte</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Hustrulid & Kuchta</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Ciclo Total de Acarreo de Camiones</h3>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-inner flex justify-center items-center min-h-[75px]">
              <MathFormula math="t_{\text{ciclo}} = t_{\text{maniobra}} + t_{\text{carga}} + t_{\text{ida}} + t_{\text{descarga}} + t_{\text{retorno}} + t_{\text{esperas}}" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Tiempo total requerido por un volquete CAT 777F para completar una vuelta entre el frente de carguío y la chancadora o botadero. Una variación de 1 minuto en el tiempo de ida por lluvias representa una merma de más de 400 t/día en la flota.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            En la Semana 12, las lluvias aumentaron el tiempo de ida en 2.4 min por resistencia a la rodadura.
          </div>
        </div>

        {/* Factor de Acoplamiento (Match Factor) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between md:col-span-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Teoría de Colas y Flota</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Equilibrio Pala-Camión</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Factor de Acoplamiento (Match Factor)</h3>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-inner flex justify-center items-center min-h-[75px]">
              <MathFormula math="\text{MF} = \frac{N_{\text{camiones}} \times t_{\text{cargu\acute{\imath}o}}}{N_{\text{palas}} \times t_{\text{ciclo total}}}" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              El Match Factor relaciona la tasa de llegada de camiones con la tasa de servicio de la excavadora. Si <MathFormula math="\text{MF} = 1.0" block={false} />, el sistema opera en equilibrio perfecto. Si <MathFormula math="\text{MF} < 1.0" block={false} />, la pala espera camiones (pérdida de capacidad); si <MathFormula math="\text{MF} > 1.0" block={false} />, los camiones hacen cola esperando ser cargados (pérdida de combustible y horas motor).
            </p>
          </div>
        </div>
      </div>

      {/* Calculadora Interactiva de Match Factor */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Play className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Simulador Interactivo de Factor de Acoplamiento (Match Factor)</h3>
              <p className="text-xs text-slate-500">Mueve los deslizadores y observa el comportamiento de la flota pala-camión</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setNumCamiones(5);
                setTiempoCarguio(2.2);
                setNumPalas(2);
                setTiempoCicloTotal(11.5);
                setDisponibilidadPala(90);
              }}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Restablecer Proyecto NAS</span>
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders de Entrada */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Número de Camiones (CAT 777F):</span>
                  <span className="text-[#0052FF]">{numCamiones} unidades</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={numCamiones}
                  onChange={(e) => setNumCamiones(Number(e.target.value))}
                  className="w-full accent-[#0052FF]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Tiempo de Carguío por Camión:</span>
                  <span className="text-[#0052FF]">{tiempoCarguio.toFixed(1)} min</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="4.0"
                  step="0.1"
                  value={tiempoCarguio}
                  onChange={(e) => setTiempoCarguio(Number(e.target.value))}
                  className="w-full accent-[#0052FF]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Número de Excavadoras Activas:</span>
                  <span className="text-[#0052FF]">{numPalas} palas</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={numPalas}
                  onChange={(e) => setNumPalas(Number(e.target.value))}
                  className="w-full accent-[#0052FF]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Tiempo Ciclo Total de Camión:</span>
                  <span className="text-[#0052FF]">{tiempoCicloTotal.toFixed(1)} min</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="20.0"
                  step="0.5"
                  value={tiempoCicloTotal}
                  onChange={(e) => setTiempoCicloTotal(Number(e.target.value))}
                  className="w-full accent-[#0052FF]"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Disponibilidad Mecánica de Palas (%):</span>
                <span className="text-[#0052FF]">{disponibilidadPala}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                step="1"
                value={disponibilidadPala}
                onChange={(e) => setDisponibilidadPala(Number(e.target.value))}
                className="w-full accent-[#0052FF]"
              />
            </div>
          </div>

          {/* Resultado de Match Factor */}
          <div className="flex flex-col justify-between p-5 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Match Factor Calculado</span>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className={`text-4xl font-black ${
                  matchFactor >= 0.95 && matchFactor <= 1.05 
                    ? 'text-emerald-600' 
                    : matchFactor < 0.95 
                      ? 'text-amber-600' 
                      : 'text-rose-600'
                }`}>
                  {matchFactor.toFixed(3)}
                </span>
                <span className="text-xs font-bold text-slate-400">adimensional</span>
              </div>

              {/* Estado del sistema */}
              <div className="mt-3">
                {matchFactor >= 0.95 && matchFactor <= 1.05 ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span><strong>Flota en Equilibrio Óptimo:</strong> Mínimo tiempo de espera y máxima productividad.</span>
                  </div>
                ) : matchFactor < 0.95 ? (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                    <span><strong>Déficit de Camiones (MF &lt; 0.95):</strong> Palas paradas esperando camión (*stand-by*).</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span><strong>Saturación de Camiones (MF &gt; 1.05):</strong> Camiones haciendo cola en punto de carguío.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Producción Teórica Estimada de Flota:</span>
              <span className="text-lg font-bold text-slate-900 block">
                {produccionTeoricaHora.toLocaleString('en-US', { maximumFractionDigits: 0 })} <span className="text-xs font-normal text-slate-500">t/hora efectiva</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
