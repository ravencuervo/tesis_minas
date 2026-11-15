import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Image, Code2, Award, ExternalLink, CheckCircle, Check } from 'lucide-react';

export default function ResourcesModule() {
  const [downloadedItem, setDownloadedItem] = useState(null);

  const handleDownloadClick = (nombre) => {
    setDownloadedItem(nombre);
    setTimeout(() => setDownloadedItem(null), 3000);
  };

  const downloadItems = [
    {
      categoria: "Documentos de Tesis Formateados (Word & PDF)",
      icono: FileText,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      archivos: [
        { 
          nombre: "02_Avance de borrador de tesis_final.docx", 
          desc: "Tesis completa formateada con UNAP Guía 2.0 (921 párrafos, 28 tablas, 10 figuras y discusión integrada)", 
          tamano: "2.2 MB", 
          path: "/downloads/02_Avance de borrador de tesis_final.docx" 
        },
        { 
          nombre: "02_Avance de borrador de tesis_UNAP_2.0.docx", 
          desc: "Versión de entrega formal lista para revisión de jurados", 
          tamano: "3.6 MB", 
          path: "/downloads/02_Avance de borrador de tesis_UNAP_2.0.docx" 
        },
        { 
          nombre: "01_Formato de Proyecto de Tesis-Mireya Deza.pdf", 
          desc: "Perfil de proyecto original aprobado por la Escuela Profesional de Ingeniería de Minas (UNAP)", 
          tamano: "218 KB", 
          path: "/downloads/01_Formato de Proyecto de Tesis-Mireya Deza.pdf" 
        }
      ]
    },
    {
      categoria: "Bases de Datos & Hojas de Cálculo (Excel & CSV)",
      icono: FileSpreadsheet,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      archivos: [
        { 
          nombre: "data_procesada_completa.csv", 
          desc: "Base de datos diaria limpia con las 90 observaciones de los 3 escenarios de simulación", 
          tamano: "18 KB", 
          path: "/downloads/data_procesada_completa.csv" 
        },
        { 
          nombre: "data_semanal_agrupada.csv", 
          desc: "Resumen de las 13 semanas operativas con métricas de tonelaje y cumplimiento", 
          tamano: "2.6 KB", 
          path: "/downloads/data_semanal_agrupada.csv" 
        },
        { 
          nombre: "00_Propuesta de indice.xlsx", 
          desc: "Matriz de seguimiento y avance de secciones marcada en estado 'Listo'", 
          tamano: "64 KB", 
          path: "/downloads/00_Propuesta de indice.xlsx" 
        }
      ]
    },
    {
      categoria: "Paquete de Figuras en Alta Resolución (300 DPI)",
      icono: Image,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      archivos: [
        { nombre: "figura_1_cumplimiento_acumulado.png", desc: "Curva S de producción acumulada (300 DPI)", tamano: "316 KB", path: "/figuras/figura_1_cumplimiento_acumulado.png" },
        { nombre: "figura_2_boxplot_produccion_diaria.png", desc: "Boxplots de dispersión y variabilidad de producción diaria", tamano: "164 KB", path: "/figuras/figura_2_boxplot_produccion_diaria.png" },
        { nombre: "figura_3_dispersion_frentes_escenario2.png", desc: "Regresión Frentes vs Producción Diaria (R² = 0.549)", tamano: "230 KB", path: "/figuras/figura_3_dispersion_frentes_escenario2.png" },
        { nombre: "figura_4_dispersion_kpis_escenario3.png", desc: "Correlación de Disponibilidad Mecánica y Uso de Carguío", tamano: "306 KB", path: "/figuras/figura_4_dispersion_kpis_escenario3.png" },
        { nombre: "figura_5_serie_tiempo_demoras_escenario2.png", desc: "Serie temporal de 90 días de demoras no programadas", tamano: "258 KB", path: "/figuras/figura_5_serie_tiempo_demoras_escenario2.png" },
        { nombre: "figura_6_pareto_demoras.png", desc: "Diagrama de Pareto 80/20 de causas de parada en mina", tamano: "282 KB", path: "/figuras/figura_6_pareto_demoras.png" },
        { nombre: "figura_7_control_semanal_tolerancia.png", desc: "Gráfico de control con límites de tolerancia +/- 5%", tamano: "254 KB", path: "/figuras/figura_7_control_semanal_tolerancia.png" },
        { nombre: "figura_8_regresion_demoras_produccion.png", desc: "Regresión OLS de Demoras vs Pérdida de Producción", tamano: "269 KB", path: "/figuras/figura_8_regresion_demoras_produccion.png" },
        { nombre: "figura_9_heatmap_correlaciones.png", desc: "Mapa de calor de correlaciones estadísticas de Pearson", tamano: "346 KB", path: "/figuras/figura_9_heatmap_correlaciones.png" },
        { nombre: "figura_10_diagrama_flujo_simulacion_mineplan.png", desc: "Flujograma metodológico en MinePlan Activity Scheduler", tamano: "518 KB", path: "/figuras/figura_10_diagrama_flujo_simulacion_mineplan.png" }
      ]
    },
    {
      categoria: "Scripts de Análisis & Automatización en Python",
      icono: Code2,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      archivos: [
        { nombre: "generate_figures.py", desc: "Generación automatizada de las primeras 5 figuras analíticas", tamano: "8.8 KB", path: "/downloads/scripts/generate_figures.py" },
        { nombre: "generate_extra_figures.py", desc: "Generación de figuras 6 a 10 con diagramas de control y Pareto", tamano: "11.0 KB", path: "/downloads/scripts/generate_extra_figures.py" },
        { nombre: "generate_statistical_analysis.py", desc: "Cálculo de Shapiro-Wilk, t de Student pareada, Wilcoxon y OLS", tamano: "8.3 KB", path: "/downloads/scripts/generate_statistical_analysis.py" },
        { nombre: "apply_full_unap_format.py", desc: "Script de estandarización al formato UNAP Repositorio 2.0", tamano: "14.5 KB", path: "/downloads/scripts/apply_full_unap_format.py" }
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
            <h2 className="text-xl font-bold text-slate-900">Repositorio Oficial de Descargas Directas</h2>
            <p className="text-xs text-slate-500">Haz clic en «Descargar» en cualquiera de los archivos para guardarlo directamente en tu computadora</p>
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
                {cat.archivos.map((file, i) => {
                  const isDone = downloadedItem === file.nombre;
                  return (
                    <div key={i} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 flex items-start justify-between gap-3 transition-colors">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-slate-900 block truncate">{file.nombre}</span>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{file.desc}</p>
                        <span className="text-[10px] font-mono text-slate-400 mt-1 block">{file.tamano}</span>
                      </div>

                      <a
                        href={file.path}
                        download={file.nombre}
                        onClick={() => handleDownloadClick(file.nombre)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center space-x-1.5 shrink-0 transition-all ${
                          isDone 
                            ? 'bg-emerald-600 text-white shadow-xs' 
                            : 'text-white bg-[#0052FF] hover:bg-blue-700 shadow-xs'
                        }`}
                      >
                        {isDone ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Descargado</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar</span>
                          </>
                        )}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card de Soporte Tesis Altiplánica */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200 text-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-slate-900">¿Necesitas asesoría personalizada o ensayos de sustentación con jurados simulados?</h4>
          <p className="text-xs text-slate-600">El equipo de Tesis Altiplánica brinda simulación de jurados, revisión antiplagio Turnitin y soporte integral en diapositivas.</p>
        </div>
        <div className="shrink-0 flex items-center space-x-2">
          <a
            href="https://wa.me/51958274958"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0052FF] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
