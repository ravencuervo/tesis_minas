import React, { useState } from 'react';
import {
  FlaskConical, TrendingUp, TrendingDown, Scale, BarChart2,
  Shuffle, Target, CheckCircle2, AlertTriangle, Lightbulb,
  ChevronDown, ChevronUp, Sigma, Activity, PieChart, GitCompare
} from 'lucide-react';
import MathFormula from './MathFormula';

/* ─── Datos fijos de la tesis ──────────────────────────────── */
const escenarios = [
  {
    id: 'Esc 01',
    nombre: 'Base / Ideal',
    color: 'emerald',
    bgClass: 'bg-emerald-50 border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    descripcion: 'Sin restricciones: rendimientos nominales, disponibilidad mecánica del 90%, UoD 84%, sin horas de demora.',
    cumplimiento: 100,
    produccion: '3,735,217.2 t',
    analogia: 'Como si todos los camiones y perforadoras funcionaran perfectos durante los 90 días.',
  },
  {
    id: 'Esc 02',
    nombre: 'Con Restricciones',
    color: 'amber',
    bgClass: 'bg-amber-50 border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800',
    descripcion: '57.64 h de demoras no programadas + bloqueo temporal de frentes por vías y topografía.',
    cumplimiento: 98.75,
    produccion: '3,688,610.0 t',
    analogia: 'Como si algunos días los camiones se quedasen parados o las vías cerradas, perdiendo tiempo productivo.',
  },
  {
    id: 'Esc 03',
    nombre: 'Variación KPIs',
    color: 'rose',
    bgClass: 'bg-rose-50 border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800',
    descripcion: 'Degradación mecánica de DM45 (88.67% → 80%) y DM390FL (92% → 86%). Mayor desgaste acumulado.',
    cumplimiento: 98.61,
    produccion: '3,683,483.5 t',
    analogia: 'Como si las máquinas ya estuviesen desgastadas y fallaran con más frecuencia conforme avanza el trimestre.',
  },
];

const conceptos = [
  {
    id: 'normalidad',
    icono: Activity,
    colorIcon: 'text-indigo-600',
    bgIcon: 'bg-indigo-50',
    titulo: 'Prueba de Normalidad (Shapiro-Wilk)',
    pregunta: '¿Qué es y por qué se hace primero?',
    termino: 'Normalidad de los datos',
    significado: 'Verificar si los 90 datos de producción diaria siguen una distribución "campana de Gauss" o no.',
    porQueImporta: 'Antes de usar t de Student (prueba paramétrica), la estadística exige confirmar que los datos se distribuyen normalmente. Si no pasan el filtro, debes usar Wilcoxon.',
    analogia: 'Como revisar si los ingredientes de una receta son los correctos antes de cocinar: si usas ingredientes erróneos, el resultado no vale.',
    resultado: 'Escenario 01 → p = 0.582 ✓ normal. Escenario 02 → p = 0.000003 ✗ no-normal (caídas discretas severas). Ambas pruebas se aplicaron por robustez.',
    color: 'indigo',
  },
  {
    id: 'tStudent',
    icono: Scale,
    colorIcon: 'text-blue-600',
    bgIcon: 'bg-blue-50',
    titulo: 'Prueba t de Student Pareada',
    pregunta: '¿Qué compara exactamente?',
    termino: 't de Student pareada',
    significado: 'Compara la misma mina en dos estados: Escenario 01 (ideal) vs Escenario 02 (con demoras). Calcula si la diferencia media de 517.86 t/día es estadísticamente real o solo azar.',
    porQueImporta: 'Al ser "pareada", cada semana del Esc01 se empareja con la misma semana del Esc02 — eliminando variación por temporada o contexto. Esto hace la comparación más precisa.',
    analogia: 'Como pesar a la misma persona antes y después de una dieta, no comparar personas distintas. El "antes" es el Esc01 y el "después" (con demoras) es el Esc02.',
    resultado: 't = 2.1513, gl = 89, p = 0.03416 < 0.05 → Se rechaza H₀. Las demoras SÍ reducen significativamente la producción.',
    color: 'blue',
  },
  {
    id: 'wilcoxon',
    icono: Shuffle,
    colorIcon: 'text-violet-600',
    bgIcon: 'bg-violet-50',
    titulo: 'Prueba de Wilcoxon (No paramétrica)',
    pregunta: '¿Por qué se usa además de la t de Student?',
    termino: 'Prueba de Wilcoxon de rangos con signo',
    significado: 'Es el "plan B" robusto de la t de Student. No requiere normalidad: trabaja con los rangos ordenados de las diferencias, no con los valores directos.',
    porQueImporta: 'El Esc02 no pasó la prueba de normalidad (p = 0.0127). Al aplicar también Wilcoxon y obtener el mismo veredicto (p < 0.05), el resultado queda blindado ante cualquier crítica metodológica del jurado.',
    analogia: 'Como llevar una segunda opinión médica que confirma el diagnóstico: si dos métodos independientes llegan al mismo resultado, la conclusión es sólida.',
    resultado: 'W = 1420.5, p = 0.0284 < 0.05 → Confirma que la diferencia es real. Resultado idéntico al de t de Student.',
    color: 'violet',
  },
  {
    id: 'pearson',
    icono: TrendingUp,
    colorIcon: 'text-teal-600',
    bgIcon: 'bg-teal-50',
    titulo: 'Correlación de Pearson (r)',
    pregunta: '¿Qué mide el coeficiente r?',
    termino: 'Coeficiente de correlación de Pearson (r)',
    significado: 'Mide la fuerza y dirección de la relación lineal entre dos variables. Va de −1 (relación negativa perfecta) a +1 (relación positiva perfecta). Cerca de 0 significa sin relación.',
    porQueImporta: 'En la tesis se mide: (1) frentes activos vs producción diaria, y (2) horas de demora vs producción diaria. Permite cuantificar cuánto "arrastra" cada variable a la producción.',
    analogia: 'Como medir cuánto sube la temperatura del motor cuando aumenta la velocidad. r cercano a +1 → suben juntos; r cercano a −1 → cuando uno sube, el otro baja.',
    resultado: 'r(frentes, producción) = +0.7410 → Fuerte positiva. r(demoras, producción) = −0.7384 → Fuerte negativa.',
    color: 'teal',
  },
  {
    id: 'regresion',
    icono: TrendingDown,
    colorIcon: 'text-orange-600',
    bgIcon: 'bg-orange-50',
    titulo: 'Regresión Lineal Simple (OLS)',
    pregunta: '¿Qué predice el modelo y qué es R²?',
    termino: 'Regresión lineal por Mínimos Cuadrados Ordinarios',
    significado: 'Encuentra la recta que mejor describe cómo cambia la producción cuando cambia la variable independiente (frentes o demoras). La ecuación permite hacer predicciones cuantitativas.',
    porQueImporta: 'R² (coeficiente de determinación) dice qué porcentaje de la variación de producción es explicado por el modelo. R² = 0.549 → el 54.9% de los cambios en producción se explican solo por los frentes activos.',
    analogia: 'R² es como el "porcentaje de responsabilidad": si R² = 0.55, los frentes son responsables del 55% de lo que sube o baja la producción. El 45% restante viene de otros factores.',
    resultado: 'Modelo 1 (frentes): Ŷ = −6,993.68 + 16,052.20×X, R² = 0.549. Modelo 2 (demoras): Ŷ = 41,502.41 − 873.70×X.',
    color: 'orange',
  },
  {
    id: 'pareto',
    icono: PieChart,
    colorIcon: 'text-pink-600',
    bgIcon: 'bg-pink-50',
    titulo: 'Análisis de Pareto (80/20)',
    pregunta: '¿Qué dice el principio de Pareto?',
    termino: 'Diagrama de Pareto',
    significado: 'Clasifica las causas de demora de mayor a menor frecuencia y acumula su porcentaje. Las primeras causas que suman ~80% del tiempo perdido son las prioritarias a atacar.',
    porQueImporta: 'Permite enfocar la gestión operativa en los pocos problemas que causan la mayoría del daño. No tiene sentido gastar energía en causas que representan el 5% del impacto.',
    analogia: 'Como en un hospital: si el 80% de las emergencias son por 3 causas, mejor equipar bien esas 3 áreas que repartir recursos en las 20 causas restantes.',
    resultado: 'Espera de disparo → 38.20% (prioridad 1) | Mant. vías → 23.40% | Fallas mecánicas → 16.80% | Interferencias → 12.50% | Clima → 9.10%.',
    color: 'pink',
  },
  {
    id: 'reconciliacion',
    icono: GitCompare,
    colorIcon: 'text-cyan-600',
    bgIcon: 'bg-cyan-50',
    titulo: 'Reconciliación Espacial (DE = 100%)',
    pregunta: '¿Qué significa DE = 100%?',
    termino: 'Desviación Estándar de Reconciliación = 0 (coincidencia perfecta)',
    significado: 'Compara los sólidos de minado que genera MinePlan (plan computacional) con el plan semanal real aprobado por la mina. DE = 100% significa que el modelo 3D y el plan coinciden perfectamente.',
    porQueImporta: 'Garantiza que la simulación no "inventó" recursos ni perdió bloques. Es el control de calidad geométrico que valida que la base de datos de simulación es fiel a la realidad de la mina.',
    analogia: 'Como comparar el plano del arquitecto con la obra construida: DE = 100% significa que lo que se planeó en el computador coincide exactamente con lo que se programó cavar.',
    resultado: 'Reconciliación MinePlan vs. Plan Semanal: DE = 100% en todos los bloques del Q1 2027.',
    color: 'cyan',
  },
  {
    id: 'alpha',
    icono: Target,
    colorIcon: 'text-red-600',
    bgIcon: 'bg-red-50',
    titulo: 'Nivel de Significancia α = 0.05',
    pregunta: '¿Qué es α y cómo se decide?',
    termino: 'Nivel de significancia estadística (α, alfa)',
    significado: 'Es el umbral de riesgo aceptado de equivocarse al concluir que "hay diferencia" cuando en realidad no la hay (error tipo I). α = 0.05 significa aceptar como máximo un 5% de probabilidad de error.',
    porQueImporta: 'Si p < 0.05 → rechazas la hipótesis nula (H₀) y concluyes que la diferencia es real. Si p ≥ 0.05 → no rechazas H₀. Es la regla de decisión universal en ingeniería e investigación científica.',
    analogia: 'Como el margen de tolerancia en una balanza de laboratorio: si el desvío pesa menos del 5% del total, se acepta que no hay error; si pesa más del 5%, se activa la alarma.',
    resultado: 'En la tesis: p(Esc02) = 0.03416 < 0.05 → Alarma activada. Se rechaza H₀ y se acepta la hipótesis alterna (demoras afectan la producción).',
    color: 'red',
  },
];

const paretoCausas = [
  { causa: 'Espera de disparo / frentes sin voladura', pct: 38.20, color: '#EF4444' },
  { causa: 'Mantenimiento no programado de vías de acarreo', pct: 23.40, color: '#F97316' },
  { causa: 'Fallas mecánicas imprevistas (perforación y carguío)', pct: 16.80, color: '#EAB308' },
  { causa: 'Interferencias operativas y cambios de guardia', pct: 12.50, color: '#22C55E' },
  { causa: 'Clima adverso y neblina en accesos altos', pct: 9.10, color: '#3B82F6' },
];

/* ─── Componente tarjeta expandible ───────────────────────── */
function ConceptCard({ concepto }) {
  const [open, setOpen] = useState(false);
  const Icon = concepto.icono;
  const colorMap = {
    indigo: { ring: 'ring-indigo-200', border: 'border-indigo-200', bg: 'bg-indigo-50', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-800' },
    blue:   { ring: 'ring-blue-200', border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' },
    violet: { ring: 'ring-violet-200', border: 'border-violet-200', bg: 'bg-violet-50', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-800' },
    teal:   { ring: 'ring-teal-200', border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-800' },
    orange: { ring: 'ring-orange-200', border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' },
    pink:   { ring: 'ring-pink-200', border: 'border-pink-200', bg: 'bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-800' },
    cyan:   { ring: 'ring-cyan-200', border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-800' },
    red:    { ring: 'ring-red-200', border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
  };
  const c = colorMap[concepto.color] || colorMap.blue;

  return (
    <div className={`rounded-2xl border bg-white shadow-xs transition-all duration-200 ${open ? `ring-2 ${c.ring} ${c.border}` : 'border-slate-200 hover:border-slate-300'}`}>
      {/* Header siempre visible */}
      <button
        className="w-full text-left p-5 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-xl ${concepto.bgIcon} ${concepto.colorIcon} flex items-center justify-center shrink-0`}>
            <Icon className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 leading-tight">{concepto.titulo}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{concepto.pregunta}</p>
          </div>
        </div>
        <div className="shrink-0 text-slate-400">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Contenido expandido */}
      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-slate-100 pt-4">
          {/* Término → Significado → Por qué importa */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl ${c.bg} ${c.border} border`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Término técnico</span>
              <p className="text-xs font-semibold text-slate-900">{concepto.termino}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Significado en la tesis</span>
              <p className="text-xs text-slate-700">{concepto.significado}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Por qué importa</span>
              <p className="text-xs text-amber-900">{concepto.porQueImporta}</p>
            </div>
          </div>

          {/* Analogía */}
          <div className="flex gap-2.5 items-start p-3 rounded-xl bg-indigo-50 border border-indigo-200">
            <Lightbulb className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">Analogía para explicar al jurado</span>
              <p className="text-xs text-indigo-900 italic">"{concepto.analogia}"</p>
            </div>
          </div>

          {/* Resultado real */}
          <div className={`p-3 rounded-xl ${c.bg} ${c.border} border`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Resultado en la tesis</span>
            <p className="text-xs font-mono font-semibold text-slate-900">{concepto.resultado}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Barra de Pareto ──────────────────────────────────────── */
function ParetoBar({ causa, pct, color, acumulado }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="font-medium text-slate-700 truncate pr-2">{causa}</span>
        <span className="font-mono font-bold text-slate-900 shrink-0">{pct.toFixed(2)}%</span>
      </div>
      <div className="relative h-5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct / 35 * 100}%`, backgroundColor: color }}
        />
      </div>
      <div className="text-[10px] text-slate-400 text-right">Acumulado: {acumulado.toFixed(2)}%</div>
    </div>
  );
}

/* ─── Módulo principal ─────────────────────────────────────── */
export default function DataTreatmentModule({ defenseMode }) {
  const [seccionActiva, setSeccionActiva] = useState('escenarios');

  const secciones = [
    { id: 'escenarios', label: 'Los 3 Escenarios', icon: FlaskConical },
    { id: 'conceptos', label: 'Conceptos Estadísticos', icon: Sigma },
    { id: 'pareto', label: 'Análisis de Pareto', icon: BarChart2 },
    { id: 'decision', label: 'Regla de Decisión', icon: CheckCircle2 },
  ];

  let acumPareto = 0;

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* ── Encabezado ── */}
      <div className="bg-gradient-to-r from-[#020618] via-[#0A1628] to-[#020618] rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold leading-tight">
              Resumen del Tratamiento de Datos
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
              Guía completa en términos simples para prepararte para la sustentación. Cada método explicado con su significado, analogía y resultado real de la tesis.
            </p>
            {defenseMode && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Modo Sustentación activo — respuestas orientadas al jurado
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Tabs internos ── */}
      <div className="flex flex-wrap gap-1.5">
        {secciones.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSeccionActiva(id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              seccionActiva === id
                ? 'bg-[#0052FF] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 1: Los 3 Escenarios
      ═══════════════════════════════════════════════════════ */}
      {seccionActiva === 'escenarios' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">¿Qué es un Escenario de Simulación?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un <strong>escenario</strong> es una versión del mismo plan de minería con distintas condiciones operativas inyectadas en MinePlan Activity Scheduler.
              Es como simular tres "mundos posibles" para la mina en el <strong>Q1 2027 (90 días, 13 semanas)</strong>:
              uno ideal sin fallas, uno con restricciones reales y uno con degradación mecánica progresiva.
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Plan meta: <strong>290,516.9 t/semana</strong> · Horizonte: <strong>Q1 2027</strong> · Duración: <strong>90 días</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {escenarios.map((esc) => (
              <div key={esc.id} className={`rounded-2xl border p-5 ${esc.bgClass} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${esc.badgeClass}`}>{esc.id}</span>
                  <span className="font-mono font-black text-slate-900 text-lg">{esc.cumplimiento}%</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{esc.nombre}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{esc.descripcion}</p>
                </div>
                <div className="pt-2 border-t border-slate-200/60">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Producción total Q1</div>
                  <div className="font-mono text-sm font-bold text-slate-900">{esc.produccion}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/60 border border-white/80">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Analogía</span>
                  <p className="text-xs text-slate-700 italic">{esc.analogia}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla resumen */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="py-2.5 px-4">Escenario</th>
                  <th className="py-2.5 px-4 text-center">Producción Q1</th>
                  <th className="py-2.5 px-4 text-center">Cumplimiento</th>
                  <th className="py-2.5 px-4 text-center">Déficit vs Plan</th>
                  <th className="py-2.5 px-4">Causa principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-emerald-50/40">
                  <td className="py-2.5 px-4 font-bold text-emerald-700">Esc 01 – Base</td>
                  <td className="py-2.5 px-4 text-center font-mono font-semibold">3,735,217.2 t</td>
                  <td className="py-2.5 px-4 text-center"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">100%</span></td>
                  <td className="py-2.5 px-4 text-center font-mono">0 t</td>
                  <td className="py-2.5 px-4">Sin restricciones</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="py-2.5 px-4 font-bold text-amber-700">Esc 02 – Restricciones</td>
                  <td className="py-2.5 px-4 text-center font-mono font-semibold">3,688,610.0 t</td>
                  <td className="py-2.5 px-4 text-center"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">98.75%</span></td>
                  <td className="py-2.5 px-4 text-center font-mono text-rose-600">46,607.2 t</td>
                  <td className="py-2.5 px-4">Demoras + bloqueo vías</td>
                </tr>
                <tr className="hover:bg-rose-50/40">
                  <td className="py-2.5 px-4 font-bold text-rose-700">Esc 03 – KPIs degradados</td>
                  <td className="py-2.5 px-4 text-center font-mono font-semibold">3,683,483.5 t</td>
                  <td className="py-2.5 px-4 text-center"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">98.61%</span></td>
                  <td className="py-2.5 px-4 text-center font-mono text-rose-600">51,733.7 t</td>
                  <td className="py-2.5 px-4">Degradación DM45 y DM390FL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 2: Conceptos estadísticos
      ═══════════════════════════════════════════════════════ */}
      {seccionActiva === 'conceptos' && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900">
            <strong>Instrucciones:</strong> Haz clic en cada tarjeta para expandir la explicación completa.
            Cada concepto incluye su significado en la tesis, por qué importa, una analogía y el resultado numérico real.
          </div>
          {conceptos.map((c) => (
            <ConceptCard key={c.id} concepto={c} />
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 3: Análisis de Pareto
      ═══════════════════════════════════════════════════════ */}
      {seccionActiva === 'pareto' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900">¿Qué es el análisis de Pareto?</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Es un método que identifica qué <strong>pocas causas</strong> generan la <strong>mayoría del impacto</strong>.
              La regla 80/20 dice: aproximadamente el 80% del tiempo perdido proviene del 20% de las causas.
              En la tesis, se analizaron las horas de demora acumuladas en el Q1 2027 por categoría operativa.
            </p>
            <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-xs text-pink-900">
              <strong>Respuesta clave para el jurado:</strong> "El análisis de Pareto nos permitió priorizar intervenciones:
              si la empresa reduce la espera de disparo (malla de voladura), el mantenimiento de vías y las fallas mecánicas, elimina el <strong>78.4%</strong> de las horas de demora."
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Causas de demora operativa — Q1 2027</h4>
            <div className="space-y-3">
              {paretoCausas.map((item) => {
                acumPareto += item.pct;
                const snap = acumPareto;
                return (
                  <ParetoBar
                    key={item.causa}
                    causa={item.causa}
                    pct={item.pct}
                    color={item.color}
                    acumulado={snap}
                  />
                );
              })}
            </div>

            {/* Línea 80% */}
            <div className="pt-3 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-600">
              <div className="w-3 h-0.5 bg-slate-900 rounded" />
              <span>Las primeras <strong>3 causas</strong> acumulan <strong className="text-pink-700">78.4%</strong> del tiempo perdido → objetivo estratégico de mejora.</span>
            </div>
          </div>

          {/* Tabla de causas */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="py-2.5 px-4">Prioridad</th>
                  <th className="py-2.5 px-4">Causa de demora</th>
                  <th className="py-2.5 px-4 text-center">% Individual</th>
                  <th className="py-2.5 px-4 text-center">% Acumulado</th>
                  <th className="py-2.5 px-4">¿Es crítica?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {paretoCausas.map((item, idx) => {
                  const cumSum = paretoCausas.slice(0, idx + 1).reduce((a, b) => a + b.pct, 0);
                  return (
                    <tr key={idx} className={cumSum <= 80 ? 'bg-rose-50/30' : ''}>
                      <td className="py-2.5 px-4 font-bold text-slate-700">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-medium">{item.causa}</td>
                      <td className="py-2.5 px-4 text-center font-mono font-semibold">{item.pct.toFixed(2)}%</td>
                      <td className="py-2.5 px-4 text-center font-mono">{cumSum.toFixed(2)}%</td>
                      <td className="py-2.5 px-4">
                        {cumSum <= 79 ? (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[11px]">Crítica ★</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[11px]">Secundaria</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          SECCIÓN 4: Regla de decisión estadística
      ═══════════════════════════════════════════════════════ */}
      {seccionActiva === 'decision' && (
        <div className="space-y-5">

          {/* Diagrama de flujo de decisión */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Flujo de decisión estadística paso a paso</h3>
            <p className="text-sm text-slate-600">Este es el razonamiento que siguió la tesis para validar todas sus hipótesis:</p>

            <div className="space-y-2">
              {[
                { paso: '1', titulo: 'Formular hipótesis', desc: 'H₀: Las demoras NO afectan la producción. H₁: Las demoras SÍ afectan la producción.', estado: 'done', color: 'emerald' },
                { paso: '2', titulo: 'Fijar α = 0.05', desc: 'Umbral de riesgo del 5%. Si p < 0.05 → rechazo H₀. Si p ≥ 0.05 → no rechazo H₀.', estado: 'done', color: 'emerald' },
                { paso: '3', titulo: 'Verificar normalidad (Shapiro-Wilk)', desc: 'Esc01: p = 0.5361 → normal ✓. Esc02: p = 0.0127 → no normal ✗ → requiere Wilcoxon de respaldo.', estado: 'done', color: 'emerald' },
                { paso: '4', titulo: 'Aplicar prueba t pareada', desc: 't = 2.1513, gl = 89, p = 0.03416 < 0.05 → Diferencia estadísticamente significativa.', estado: 'done', color: 'emerald' },
                { paso: '5', titulo: 'Confirmar con Wilcoxon', desc: 'W = 19.0, p = 0.0284 < 0.05 → Mismo veredicto. Resultado blindado.', estado: 'done', color: 'emerald' },
                { paso: '6', titulo: 'Cuantificar con regresión OLS', desc: 'R²(frentes) = 0.549. Cada frente aporta +16,052 t/día. Cada hora de demora resta −873.70 t/día.', estado: 'done', color: 'emerald' },
                { paso: '7', titulo: 'Conclusión final', desc: 'Se RECHAZA H₀. Las demoras operativas y los frentes disponibles afectan de forma estadísticamente significativa la producción minera.', estado: 'done', color: 'blue' },
              ].map(({ paso, titulo, desc, color }) => (
                <div key={paso} className="flex gap-3 items-start">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                    color === 'blue' ? 'bg-[#0052FF] text-white' : 'bg-emerald-500 text-white'
                  }`}>{paso}</div>
                  <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-bold text-slate-900">{titulo}</div>
                    <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chuleta de frases para sustentación */}
          <div className="bg-gradient-to-r from-[#020618] via-[#0A1628] to-[#020618] rounded-2xl p-5 text-white space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-amber-300">Frases clave para el jurado</h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  pregunta: '¿Por qué usó t de Student pareada y no independiente?',
                  respuesta: '"Porque los tres escenarios comparten exactamente las mismas semanas y el mismo plan base. Al parear, elimino la variabilidad temporal y comparo el mismo instante en diferentes condiciones, obteniendo una prueba más sensible."',
                },
                {
                  pregunta: '¿Por qué R² = 54.9% es aceptable?',
                  respuesta: '"En sistemas mineros con alta variabilidad operativa, un R² de 54.9% es estadísticamente robusto. Significa que solo el número de frentes explica más de la mitad de la variación de producción, lo cual tiene un valor práctico directo para la planificación."',
                },
                {
                  pregunta: '¿Qué significa que p = 0.034?',
                  respuesta: '"Significa que la probabilidad de que la diferencia de 517.86 t/día que observamos entre el escenario ideal y el real sea solo producto del azar es de apenas el 3.4%. Como fijamos el umbral en 5%, la diferencia es estadísticamente real."',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="text-xs font-bold text-amber-300">❓ {item.pregunta}</div>
                  <div className="text-xs text-blue-100 leading-relaxed">✅ {item.respuesta}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fórmula central */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900">La ecuación central de la tesis</h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-center">
              <MathFormula math={String.raw`t = \frac{\bar{D} - \mu_0}{\frac{S_D}{\sqrt{n}}} = \frac{517.86 - 0}{\frac{2{,}283.45}{\sqrt{90}}} = 2.1513 \quad (p = 0.03416 < \alpha = 0.05)`} />
            </div>
            <p className="text-xs text-slate-500">
              Donde <strong>D̄ = 517.86 t/día</strong> es la diferencia media semanal entre Esc01 y Esc02,
              <strong> S_D = 2,283.45</strong> es la desviación estándar de las diferencias, y <strong>n = 90</strong> días.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
