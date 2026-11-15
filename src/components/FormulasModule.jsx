import React, { useState } from 'react';
import { Calculator, Play, Info, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { equipmentFleet } from '../data/thesisData';

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
            <p className="text-xs text-slate-500">Fundamentación matemática de ritmo de producción, valorización NSR y cinemática de flota</p>
          </div>
        </div>
      </div>

      {/* Grid de Ecuaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ecuación de Taylor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Ritmo Óptimo de Producción</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Taylor (1977)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Regla de Taylor para Capacidad de Mina</h3>
            
            <div className="p-4 rounded-xl bg-slate-900 text-blue-200 font-mono text-center text-sm sm:text-base tracking-wide">
              Ritmo (Mt/año) = 0.013 × (Reservas)^0.75
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Establece la escala económica de extracción en función de las reservas geológicas totales. Para un depósito como NAS (aproximadamente 45 Mt de reservas explotables), determina una tasa nominal en el rango de 14.5 a 15.0 Mt/año, validando el ritmo programado de 3.73 Mt en el primer trimestre.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            Aplicada para verificar que el plan a corto plazo sea congruente con el ritmo óptimo del LOM.
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
            
            <div className="p-4 rounded-xl bg-slate-900 text-blue-200 font-mono text-center text-sm sm:text-base tracking-wide">
              LOM (años) = 0.20 × (Reservas)^0.25
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Modela la vida esperada de la mina (Life of Mine). Permite balancear la velocidad de profundización de los bancos en el Proyecto NAS (máximo 4 bancos de 10 m por año en la fase activa) frente al agotamiento racional del yacimiento.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            Garantiza que la secuencia no acelere la extracción más allá del límite físico de rampas.
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
            
            <div className="p-3.5 rounded-xl bg-slate-900 text-blue-200 font-mono text-xs sm:text-sm text-center leading-relaxed">
              NSR (US$/t) = Σ [ Ley_i × Rec_i × (Precio_i - Deducción_i) ] - Fletes - Maquila
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Define el valor recuperable neto de cada bloque de mineral en el modelo de bloques. En el Proyecto NAS (Au-Cu), un bloque se clasifica como mineral de alimentación directa a planta si su NSR supera el costo de procesamiento y transporte (&gt; US$ 12.80/t).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            La simulación en MPAS prioriza frentes con mayor NSR para maximizar el VPN del trimestre.
          </div>
        </div>

        {/* Ciclo de Acarreo y Carguío */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider">Dinámica de Transporte</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">Hustrulid & Kuchta</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Ciclo Total de Transporte de Camiones</h3>
            
            <div className="p-3.5 rounded-xl bg-slate-900 text-blue-200 font-mono text-xs sm:text-sm text-center leading-relaxed">
              t_ciclo = t_maniobra + t_carga + t_ida(lleno) + t_descarga + t_retorno(vacío) + t_esperas
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Tiempo total requerido por un volquete CAT 777F para completar una vuelta entre el frente de carguío y la chancadora primaria o botadero. Una variación de 1 minuto por mal estado de vías representa una merma de más de 400 t/día en la flota.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 italic">
            En la Semana 12, las lluvias aumentaron el tiempo de ida en 2.4 min por resistencia de rodadura.
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

        {defenseMode && (
          <div className="mt-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <strong>Explicación para el Jurado:</strong> «El Match Factor del Proyecto NAS se calibró para operar en 1.00 en condiciones estándar (5 volquetes CAT 777F y 2 excavadoras). En la Semana 7 cayó a 0.85 por falta de frentes, provocando que las palas perdieran horas útiles esperando material.»
          </div>
        )}
      </div>

      {/* Flota de Equipos del Proyecto NAS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3">Flota de Equipos Mineros Considerada en la Simulación (Proyecto NAS)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Equipo Minero</th>
                <th className="py-2.5 px-3 text-center">Cantidad</th>
                <th className="py-2.5 px-3">Capacidad / Dimensión</th>
                <th className="py-2.5 px-3 text-center">Disp. Diseño</th>
                <th className="py-2.5 px-3 text-center">Uso Diseño</th>
                <th className="py-2.5 px-3">Rol Operativo en la Secuencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {equipmentFleet.map((eq, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2 px-3 font-semibold text-slate-900">{eq.equipo}</td>
                  <td className="py-2 px-3 text-center font-bold text-[#0052FF]">{eq.cantidad}</td>
                  <td className="py-2 px-3">{eq.capacidadCuchara || eq.capacidadTolva || eq.diametro || eq.potencia || eq.anchoHoja || eq.capacidad}</td>
                  <td className="py-2 px-3 text-center">{eq.disponibilidadDiseno}</td>
                  <td className="py-2 px-3 text-center">{eq.utilizacionDiseno}</td>
                  <td className="py-2 px-3 text-slate-500">{eq.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
