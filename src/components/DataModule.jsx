import React, { useState } from 'react';
import { weeklyData, summaryTotals, paretoCauses } from '../data/thesisData';
import { Table, Search, Filter, AlertTriangle, ArrowDownRight, Layers, FileSpreadsheet } from 'lucide-react';

export default function DataModule({ defenseMode }) {
  const [filterState, setFilterState] = useState('all'); // all, critical, normal
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = weeklyData.filter(item => {
    const matchesFilter = 
      filterState === 'all' ? true :
      filterState === 'critical' ? item.estado === 'Crítico' :
      item.estado !== 'Crítico';

    const matchesSearch = item.semana.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.obs.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Reconciliación de Datos y Balances de Producción</h2>
            <p className="text-xs text-slate-500">Comparativa semanal detallada de los 90 días calendario (Q1 2027) entre el Plan y los 3 Escenarios</p>
          </div>
        </div>
      </div>

      {/* Resumen Comparativo de Escenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Escenario 01 (Base / Ideal)</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">100.00%</span>
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">
            3,735,217.15 <span className="text-xs font-normal text-slate-500">t</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Condición ideal de simulación: 3 frentes de carguío activos ininterrumpidos y 0 horas de paradas no programadas.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-[#0052FF]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0052FF] uppercase">Escenario 02 (Restricciones)</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">98.75%</span>
          </div>
          <div className="mt-2 text-xl font-black text-[#0052FF]">
            3,688,609.98 <span className="text-xs font-normal text-slate-500">t</span>
          </div>
          <div className="mt-2 text-xs font-bold text-amber-600 flex items-center space-x-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Déficit acumulado: 46,607.17 toneladas</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Afectado por 57.64 horas de paradas no programadas y pérdida de frentes en Semanas 7 y 12.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs border-l-4 border-l-indigo-600">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 uppercase">Escenario 03 (Variación KPIs)</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800">98.61%</span>
          </div>
          <div className="mt-2 text-xl font-black text-indigo-900">
            3,683,483.55 <span className="text-xs font-normal text-slate-500">t</span>
          </div>
          <div className="mt-2 text-xs font-bold text-rose-600 flex items-center space-x-1">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Déficit acumulado: 51,733.60 toneladas</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Afectado por degradación de disponibilidad mecánica (88.7%) y uso de excavadoras principales.
          </p>
        </div>
      </div>

      {/* Tabla Semanal Interactiva */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tabla 23. Balance y Reconciliación Semanal por Escenario</h3>
            <p className="text-xs text-slate-500">Las 13 semanas de simulación operativa con tonelajes y porcentajes de cumplimiento</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar semana u observación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0052FF]"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setFilterState('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                  filterState === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas (13)
              </button>
              <button
                onClick={() => setFilterState('critical')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md ${
                  filterState === 'critical' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Críticas (2)
              </button>
            </div>
          </div>
        </div>

        {/* The Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Semana</th>
                <th className="py-2.5 px-3 text-right">Plan (t)</th>
                <th className="py-2.5 px-3 text-right">Escenario 02 (t)</th>
                <th className="py-2.5 px-3 text-center">Cumpl. Esc 02</th>
                <th className="py-2.5 px-3 text-right">Escenario 03 (t)</th>
                <th className="py-2.5 px-3 text-center">Cumpl. Esc 03</th>
                <th className="py-2.5 px-3 text-center">Frentes</th>
                <th className="py-2.5 px-3 text-center">Demoras (h)</th>
                <th className="py-2.5 px-3">Incidencias / Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredData.map((row, idx) => {
                const isCritical = row.estado === 'Crítico';
                return (
                  <tr 
                    key={idx} 
                    className={`transition-colors ${
                      isCritical 
                        ? 'bg-rose-50/70 hover:bg-rose-100/60 font-medium' 
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center space-x-1.5">
                      {isCritical && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                      <span>{row.semana}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">{row.plan.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0052FF]">
                      {row.esc02.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        row.cumpEsc02 >= 99.0 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : row.cumpEsc02 >= 95.0 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                      }`}>
                        {row.cumpEsc02.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-indigo-900">
                      {row.esc03.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        row.cumpEsc03 >= 99.0 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : row.cumpEsc03 >= 95.0 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                      }`}>
                        {row.cumpEsc03.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold">{row.frentes}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-amber-700">{row.demoras} h</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-500">{row.obs}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-100/90 font-bold text-slate-900 border-t border-slate-300">
              <tr>
                <td className="py-2.5 px-3">TOTAL Q1</td>
                <td className="py-2.5 px-3 text-right font-mono">{summaryTotals.planTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 text-right font-mono text-[#0052FF]">{summaryTotals.esc02Total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 text-center text-blue-900">{summaryTotals.cumplimientoEsc02.toFixed(2)}%</td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-900">{summaryTotals.esc03Total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 text-center text-indigo-900">{summaryTotals.cumplimientoEsc03.toFixed(2)}%</td>
                <td className="py-2.5 px-3 text-center">Prom. 2.7</td>
                <td className="py-2.5 px-3 text-center text-amber-700">{summaryTotals.totalDemorasHoras.toFixed(2)} h</td>
                <td className="py-2.5 px-3 text-[11px] text-slate-600">Déficit Esc 02: 46,607.17 t | Déficit Esc 03: 51,733.60 t</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Causas de Demora (Diagrama de Pareto) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3">Distribución de Pareto de Causas de Demora (57.64 Horas Acumuladas)</h3>
        <p className="text-xs text-slate-500 mb-4">El 78.4% del tiempo no productivo de la mina se concentró en 3 eventos específicos:</p>
        
        <div className="space-y-3">
          {paretoCauses.map((c, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900">
                  {idx + 1}. {c.causa}
                </span>
                <span className="font-mono text-slate-700 font-semibold">
                  {c.horas.toFixed(2)} h ({c.porcentaje}%) | Acum: {c.acumulado}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    idx === 0 ? 'bg-rose-500' : idx === 1 ? 'bg-amber-500' : 'bg-[#0052FF]'
                  }`} 
                  style={{ width: `${c.porcentaje}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
