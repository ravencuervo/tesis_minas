import React, { useState } from 'react';
import { BarChart3, CheckCircle2, AlertCircle, HelpCircle, Award, TrendingUp, Sparkles, Sliders } from 'lucide-react';
import { statisticalTests } from '../data/thesisData';
import MathFormula from './MathFormula';

export default function StatisticsModule({ defenseMode }) {
  const [frentesInput, setFrentesInput] = useState(3);
  const [demorasInput, setDemorasInput] = useState(2.5);

  // Estimación modelo 1: Y = -6993.68 + 16052.20 * Frentes
  const prodEstimadaFrentes = -6993.68 + 16052.20 * frentesInput;

  // Estimación modelo 2: Y = 41502.41 - 873.70 * Demoras
  const prodEstimadaDemoras = 41502.41 - 873.70 * demorasInput;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">El Núcleo Estadístico & Contrastación Inferencial de Hipótesis</h2>
            <p className="text-xs text-slate-500">Tratamiento econométrico y paramétrico de los 90 días de simulación (gl = 89, α = 0.05)</p>
          </div>
        </div>
      </div>

      {/* Guía Rápida: Qué es el p-valor para la sustentación */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#020618] rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs uppercase mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Concepto Clave para el Jurado de Tesis</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold">¿Cómo explicar qué es el p-valor (p-value) sin equivocarse?</h3>
        <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
          «El <strong>valor p</strong> es la probabilidad de que la diferencia observada entre el plan ideal y la mina con demoras haya ocurrido por mera casualidad o azar. Fijamos un umbral de significancia del 5% (<span className="text-amber-300 font-mono font-bold">α = 0.05</span>). Al obtener <span className="text-emerald-300 font-mono font-bold">p = 0.03416</span> (en el Escenario 02) y <span className="text-emerald-300 font-mono font-bold">p = 1.27 × 10⁻⁵⁸</span> (en el Escenario 03), demostramos con un <strong>95% a 99.9% de certeza</strong> que el impacto de las demoras y el estado de las máquinas es real, sistemático y estadísticamente significativo. Por eso se rechaza la hipótesis nula.»
        </p>
      </div>

      {/* Paso 1: Pruebas de Normalidad (Shapiro-Wilk) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider block">Paso 1: Verificación de Supuestos Paramétricos</span>
          <h3 className="text-base font-bold text-slate-900 mt-1">Pruebas de Normalidad de Shapiro-Wilk (n = 90)</h3>
          <p className="text-xs text-slate-500">¿Por qué se debió comprobar si los datos siguen una distribución normal antes de aplicar t de Student?</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Variable Operativa Analizada</th>
                <th className="py-2.5 px-3 text-center">Estadístico W</th>
                <th className="py-2.5 px-3 text-center">p-valor</th>
                <th className="py-2.5 px-3">Diagnóstico Distribucional</th>
                <th className="py-2.5 px-3">Implicancia Metodológica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {statisticalTests.shapiroWilk.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{item.variable}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold">{item.w.toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-[#0052FF]">{item.pVal}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.pVal > 0.05 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.distribucion}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-500">
                    {item.pVal > 0.05 
                      ? 'Cumple supuesto para prueba t de Student paramétrica.' 
                      : 'Exige complementar con prueba no paramétrica de Wilcoxon.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
          <strong>Blindaje de la Tesis:</strong> Dado que las demoras operativas tienen caídas puntuales (asimetría), aplicamos <strong>ambas pruebas</strong>: la paramétrica (t de Student pareada) y la no paramétrica (Wilcoxon). En ambas se obtuvo p &lt; 0.05, por lo que ningún jurado puede objetar la validez de los resultados.
        </div>
      </div>

      {/* Paso 2: Prueba t de Student Pareada y Wilcoxon (Hipótesis General) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider block">Paso 2: Contrastación de la Hipótesis General</span>
          <h3 className="text-base font-bold text-slate-900 mt-1">Tabla 25. Resultados de la Contrastación Inferencial Pareada</h3>
          <p className="text-xs text-slate-500">Formulación formal de la prueba t de Student para muestras pareadas:</p>
        </div>

        {/* Ecuación de t de Student en KaTeX con String.raw */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-center items-center">
          <MathFormula math={String.raw`t = \frac{\bar{D} - \mu_0}{\frac{S_D}{\sqrt{n}}} = \frac{517.86 - 0}{\frac{2{,}283.45}{\sqrt{90}}} = 2.1513 \quad \left(gl = 89, \; p = 0.03416 < 0.05\right)`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statisticalTests.tStudentPaired.map((test, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0052FF] uppercase">Contraste {idx + 1}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  {test.decision}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{test.comparacion}</h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Diferencia Media</span>
                  <span className="font-bold text-slate-900 font-mono">{test.mediaDif.toFixed(2)} t/día</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">t Calculado</span>
                  <span className="font-bold text-[#0052FF] font-mono">{test.tCalculado.toFixed(4)}</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Grados Libertad</span>
                  <span className="font-bold text-slate-900 font-mono">{test.gl}</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">p-valor</span>
                  <span className="font-bold text-emerald-700 font-mono">{test.pValor < 0.0001 ? '< 0.0001' : test.pValor.toFixed(5)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                <strong>Conclusión:</strong> {test.conclusion}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paso 3: Modelos de Regresión Lineal OLS (Hipótesis 1 y 2) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-[#0052FF] uppercase tracking-wider block">Paso 3: Modelos Econométricos Lineales</span>
          <h3 className="text-base font-bold text-slate-900 mt-1">Ecuaciones de Regresión Lineal por Mínimos Cuadrados Ordinarios (OLS)</h3>
          <p className="text-xs text-slate-500">Cuantificación matemática del impacto de frentes activos y horas de demora</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Modelo Frentes */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#0052FF] uppercase">Hipótesis Específica 1</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">R² = 54.9%</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900">Frentes de Minado Disponibles vs. Producción</h4>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-inner flex justify-center items-center">
              <MathFormula math={String.raw`\hat{Y} = -6{,}993.68 + 16{,}052.20 \times X_{\text{Frentes}}`} />
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>• <strong>Pendiente (+16,052.20 t/frente):</strong> Por cada frente adicional que se habilita con disparo y acceso, la producción diaria se incrementa en 16 mil toneladas.</p>
              <p>• <strong>Correlación de Pearson:</strong> r = +0.7410 (Asociación positiva muy fuerte, p &lt; 0.001).</p>
            </div>

            {/* Simulador modelo 1 */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Probar Frentes Activos:</span>
                <span className="text-[#0052FF]">{frentesInput} frentes</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={frentesInput}
                onChange={(e) => setFrentesInput(Number(e.target.value))}
                className="w-full accent-[#0052FF]"
              />
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Producción Diaria Estimada:</span>
                <strong className="text-slate-900 font-mono text-sm">{prodEstimadaFrentes.toLocaleString('en-US', { maximumFractionDigits: 0 })} t/día</strong>
              </div>
            </div>
          </div>

          {/* Modelo Demoras */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-rose-600 uppercase">Hipótesis Específica 2</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">r = -0.7384</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900">Demoras Operativas No Programadas vs. Producción</h4>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-inner flex justify-center items-center">
              <MathFormula math={String.raw`\hat{Y} = 41{,}502.41 - 873.70 \times X_{\text{Demoras (horas)}}`} />
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>• <strong>Pendiente (-873.70 t/hora):</strong> Por cada hora de parada no programada por vías o voladura, la mina deja de producir 873.70 toneladas métricas.</p>
              <p>• <strong>Intercepto (41,502.41 t/día):</strong> Corresponde a la meta del plan base ideal cuando no existen demoras operativas.</p>
            </div>

            {/* Simulador modelo 2 */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Probar Horas de Demora:</span>
                <span className="text-rose-600">{demorasInput.toFixed(1)} h/día</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="8.0"
                step="0.5"
                value={demorasInput}
                onChange={(e) => setDemorasInput(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500">Producción Diaria Estimada:</span>
                <strong className="text-slate-900 font-mono text-sm">{prodEstimadaDemoras.toLocaleString('en-US', { maximumFractionDigits: 0 })} t/día</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
