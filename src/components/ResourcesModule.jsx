import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Image, Code2, ExternalLink, Check, Lock, ShieldAlert, X } from 'lucide-react';

export default function ResourcesModule() {
  const [downloadedItem, setDownloadedItem] = useState(null);
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockedDocTitle, setLockedDocTitle] = useState('');

  const handleDownloadClick = (nombre) => {
    setDownloadedItem(nombre);
    setTimeout(() => setDownloadedItem(null), 3000);
  };

  const handleLockedClick = (titulo) => {
    setLockedDocTitle(titulo);
    setShowLockModal(true);
  };

  const pdfDriveUrl = "https://drive.google.com/file/d/1kfWbKkfgUjopTY8nWTU1Qua5y7edb5BL/view";

  const downloadCategories = [
    {
      categoria: "Documentos de Tesis (Entrega & Lectura)",
      icono: FileText,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      archivos: [
        { 
          nombre: "Borrador de Tesis Completo (PDF Oficial)", 
          desc: "Versión de lectura completa con los 921 párrafos, 28 tablas normadas y 10 figuras en 300 DPI", 
          tamano: "Google Drive (Online)", 
          isExternalLink: true,
          link: pdfDriveUrl,
          badge: "Lectura Habilitada"
        },
        { 
          nombre: "02_Avance de borrador de tesis_final.docx", 
          desc: "Versión editable oficial en Word con estilos tipográficos UNAP 2.0 y macros de formato", 
          tamano: "2.2 MB • En Custodia", 
          isLocked: true,
          badge: "Entrega contra Cancelación"
        },
        { 
          nombre: "02_Avance de borrador de tesis_UNAP_2.0.docx", 
          desc: "Versión formal editable para presentación a mesa de partes", 
          tamano: "3.6 MB • En Custodia", 
          isLocked: true,
          badge: "Entrega contra Cancelación"
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
      {/* Banner Principal de Borrador en Google Drive */}
      <div className="bg-gradient-to-r from-blue-600 via-[#0052FF] to-indigo-700 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Borrador Oficial Habilitado para Lectura</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Borrador Completo de Tesis (Formato PDF)
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              El documento oficial con la estructura del Repositorio Institucional UNAP 2.0 (921 párrafos, 28 tablas, 10 figuras y discusión) se encuentra disponible para su revisión directa en Google Drive.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={pdfDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white text-[#0052FF] font-bold text-sm shadow-lg hover:bg-blue-50 transition-all hover:scale-102"
            >
              <span>Abrir PDF en Google Drive</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Header de Sección */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Repositorio de Recursos & Archivos del Proyecto</h2>
            <p className="text-xs text-slate-500">Accede a las figuras en 300 DPI, scripts en Python, datasets de simulación y enlaces oficiales</p>
          </div>
        </div>
      </div>

      {/* Grid de Categorías de Descarga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadCategories.map((cat, idx) => {
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
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-900 truncate">{file.nombre}</span>
                          {file.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              file.isLocked 
                                ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}>
                              {file.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{file.desc}</p>
                        <span className="text-[10px] font-mono text-slate-400 mt-1 block">{file.tamano}</span>
                      </div>

                      {/* Botón condicional: Enlace externo Drive, Archivo bloqueado o Descarga directa */}
                      {file.isExternalLink ? (
                        <a
                          href={file.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-bold rounded-lg flex items-center space-x-1.5 shrink-0 transition-all text-white bg-[#0052FF] hover:bg-blue-700 shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Abrir</span>
                        </a>
                      ) : file.isLocked ? (
                        <button
                          type="button"
                          onClick={() => handleLockedClick(file.nombre)}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg flex items-center space-x-1.5 shrink-0 transition-all text-amber-800 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-xs cursor-pointer"
                          title="Haga clic para ver el estado de entrega"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          <span>En Custodia</span>
                        </button>
                      ) : (
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
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card de Soporte y Contacto Tesis Altiplánica */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200 text-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-slate-900">¿Requieres la entrega final del archivo editable (.docx) o simulación de sustentación?</h4>
          <p className="text-xs text-slate-600">El equipo de Tesis Altiplánica entrega el archivo Word final editable con macros una vez regularizado el saldo pendiente.</p>
        </div>
        <div className="shrink-0 flex items-center space-x-2">
          <a
            href="https://wa.me/51958274958?text=Hola%20Tesis%20Altipl%C3%A1nica,%20solicito%20informaci%C3%B3n%20para%20la%20liquidaci%C3%B3n%20y%20entrega%20del%20Word%20editable%20final."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0052FF] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      {/* Modal Informativo de Archivo en Custodia */}
      {showLockModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button 
              onClick={() => setShowLockModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-amber-600" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Archivo en Custodia Oficial</h3>
              <p className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full inline-block">
                {lockedDocTitle}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed pt-2">
                El documento editable en Microsoft Word (.docx) con todas las macros de formato, estilos tipográficos del Repositorio UNAP 2.0 y tablas dinámicas está **100% terminado**.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Por política de consultoría de <strong>Tesis Altiplánica</strong>, la versión editable final se entrega directamente tras la liquidación del saldo pendiente del servicio.
              </p>
            </div>

            <div className="pt-2 flex flex-col space-y-2">
              <a
                href="https://wa.me/51958274958?text=Hola%20Tesis%20Altipl%C3%A1nica,%20deseo%20liquidar%20el%20saldo%20para%20la%20entrega%20del%20Word%20editable%20final."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#0052FF] hover:bg-blue-700 text-white text-xs font-bold text-center shadow-xs transition-colors"
              >
                Coordinar Liquidación y Entrega por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setShowLockModal(false)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Entendido, cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
