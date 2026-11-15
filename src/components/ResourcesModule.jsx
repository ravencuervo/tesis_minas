import React from 'react';
import { Download, FileText, FileSpreadsheet, Image, Code2, Award, ExternalLink, CheckCircle } from 'lucide-react';

export default function ResourcesModule() {
  const downloadItems = [
    {
      categoria: "Documentos de Tesis Formateados",
      icono: FileText,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      archivos: [
        { nombre: "02_Avance de borrador de tesis_final.docx", desc: "Tesis completa formateada con UNAP Guía 2.0 (921 párrafos, 28 tablas, 10 figuras y discusión integrada)", tamano: "3.6 MB" },
        { nombre: "02_Avance de borrador de tesis_UNAP_2.0.docx", desc: "Versión de entrega formal lista para revisión de jurados", tamano: "3.6 MB" },
        { nombre: "01_Formato de Proyecto de Tesis-Mireya Deza.pdf", desc: "Perfil original aprobado por la Universidad Nacional del Altiplano", tamano: "218 KB" }
      ]
    },
    {
      categoria: "Bases de Datos & Hojas de Cálculo",
      icono: FileSpreadsheet,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      archivos: [
        { nombre: "data_procesada_completa.csv", desc: "Dataset limpio con las 90 observaciones diarias de los 3 escenarios de simulación", tamano: "18 KB", path: "/data/data_procesada_completa.csv" },
        { nombre: "data_semanal_agrupada.csv", desc: "Resumen de las 13 semanas operativas de Q1 2027 con métricas de variabilidad", tamano: "2.6 KB", path: "/data/data_semanal_agrupada.csv" },
        { nombre: "00_Propuesta de indice.xlsx", desc: "Matriz de seguimiento de contenido de tesis con estado 'Listo'", tamano: "64 KB" }
      ]
    },
    {
      categoria: "Paquete de Figuras en Alta Resolución (300 DPI)",
      icono: Image,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      archivos: [
        { nombre: "figura_1_cumplimiento_acumulado.png", desc: "Curva S de producción acumulada (300 DPI)", tamano: "316 KB", path: "/figuras/figura_1_cumplimiento_acumulado.png" },
        { nombre: "figura_2_boxplot_produccion_diaria.png", desc: "Boxplots de dispersión y colas de producción diaria", tamano: "164 KB", path: "/figuras/figura_2_boxplot_produccion_diaria.png" },
        { nombre: "figura_6_pareto_demoras.png", desc: "Diagrama de Pareto de las 57.64 horas de demora", tamano: "282 KB", path: "/figuras/figura_6_pareto_demoras.png" },
        { nombre: "figura_7_control_semanal_tolerancia.png", desc: "Gráfico de control con límites de tolerancia +/- 5%", tamano: "254 KB", path: "/figuras/figura_7_control_semanal_tolerancia.png" },
        { nombre: "figura_9_heatmap_correlaciones.png", desc: "Matriz de calor de correlaciones estadísticas de Pearson", tamano: "346 KB", path: "/figuras/figura_9_heatmap_correlaciones.png" },
        { nombre: "figura_10_diagrama_flujo_simulacion_mineplan.png", desc: "Flujograma metodológico en MinePlan Activity Scheduler", tamano: "518 KB", path: "/figuras/figura_10_diagrama_flujo_simulacion_mineplan.png" }
      ]
    },
    {
      categoria: "Scripts de Análisis & Automatización en Python",
      icono: Code2,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      archivos: [
        { nombre: "generate_figures.py", desc: "Generación automatizada de las primeras 5 figuras analíticas", tamano: "8.8 KB" },
        { nombre: "generate_extra_figures.py", desc: "Generación de figuras 6 a 10 con diagramas de control y Pareto", tamano: "11.0 KB" },
        { nombre: "generate_statistical_analysis.py", desc: "Cálculo de Shapiro-Wilk, t de Student pareada, Wilcoxon y OLS", tamano: "8.3 KB" },
        { nombre: "apply_full_unap_format.py", desc: "Script de estandarización al formato UNAP Repositorio 2.0", tamano: "14.5 KB" }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Repositorio de Descargas & Recursos de Tesis</h2>
            <p className="text-xs text-slate-500">Archivos oficiales listos para consulta, diapositivas y sustento de investigación</p>
          </div>
        </div>
      </div>

      {/* Grid de Categorías de Descarga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadItems.map((cat, idx) => {
          const Icon = cat.icono;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
                <div className={`p-2 rounded-lg border ${cat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{cat.categoria}</h3>
              </div>

              <div className="space-y-2">
                {cat.archivos.map((file, i) => (
                  <div key={i} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 flex items-start justify-between gap-3 transition-colors">
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 block truncate">{file.nombre}</span>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{file.desc}</p>
                      <span className="text-[10px] font-mono text-slate-400 mt-1 block">{file.tamano}</span>
                    </div>

                    {file.path ? (
                      <a
                        href={file.path}
                        download
                        className="px-2.5 py-1 text-xs font-bold text-[#0052FF] bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center space-x-1 shrink-0 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Bajar</span>
                      </a>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400 shrink-0 italic">En carpeta raíz</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card de Soporte Tesis Altiplánica */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200 text-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-slate-900">¿Necesitas asesoría personalizada o ensayos de sustentación?</h4>
          <p className="text-xs text-slate-600">El equipo de Tesis Altiplánica brinda simulación de jurados, revisión antiplagio Turnitin y soporte en diapositivas.</p>
        </div>
        <div className="shrink-0 flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#0052FF] text-white text-xs font-bold shadow-xs">
            Tesis Altiplánica • Puno
          </span>
        </div>
      </div>
    </div>
  );
}
