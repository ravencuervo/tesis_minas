import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Aesthetics
sns.set_theme(style="whitegrid")
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 10
plt.rcParams['axes.labelsize'] = 11
plt.rcParams['axes.titlesize'] = 12
plt.rcParams['xtick.labelsize'] = 9.5
plt.rcParams['ytick.labelsize'] = 9.5
plt.rcParams['legend.fontsize'] = 9.5

fig_dir = 'Finalización de borrador/Figuras'
os.makedirs(fig_dir, exist_ok=True)
df_daily = pd.read_csv('Finalización de borrador/data_procesada_completa.csv')
df_weekly = pd.read_csv('Finalización de borrador/data_semanal_agrupada.csv')

# ==============================================================================
# FIGURA 6: DIAGRAMA DE PARETO DE DEMORAS OPERATIVAS (ESCENARIO 02)
# ==============================================================================
pareto_data = pd.DataFrame({
    'Causa': [
        'Falta de frente (Falla compresor DM45)',
        'Restricción geotécnica en talud',
        'Reparación y mantención de vías',
        'Arreglo de frente de carguío',
        'Chequeo y marcado topográfico'
    ],
    'Horas': [20.00, 16.10, 10.90, 8.01, 2.63]
})
pareto_data['Porcentaje'] = (pareto_data['Horas'] / pareto_data['Horas'].sum()) * 100
pareto_data['Acumulado'] = pareto_data['Porcentaje'].cumsum()

fig, ax1 = plt.subplots(figsize=(10, 5.5), dpi=300)

colors = ['#dc2626', '#ea580c', '#f59e0b', '#3b82f6', '#64748b']
bars = ax1.bar(pareto_data['Causa'], pareto_data['Horas'], color=colors, width=0.55, edgecolor='#334155', alpha=0.9)
ax1.set_ylabel('Horas de Demora Acumuladas (h)', color='#1e293b', weight='bold')
ax1.set_ylim(0, 25)
ax1.grid(axis='y', linestyle='--', alpha=0.6)

# Bar labels
for bar in bars:
    yval = bar.get_height()
    ax1.text(bar.get_x() + bar.get_width()/2.0, yval + 0.4, f'{yval:.2f} h', ha='center', va='bottom', fontsize=9, weight='bold')

# Secondary axis for cumulative percentage
ax2 = ax1.twinx()
ax2.plot(pareto_data['Causa'], pareto_data['Acumulado'], color='#1e3a8a', marker='D', linewidth=2.2, markersize=6.5, label='% Acumulado')
ax2.set_ylabel('Porcentaje Acumulado (%)', color='#1e3a8a', weight='bold')
ax2.set_ylim(0, 110)
ax2.grid(False)

# 80% line
ax2.axhline(80, color='#b91c1c', linestyle='--', linewidth=1.5, alpha=0.85)
ax2.text(2.6, 82, 'Línea de Pareto (80%)', color='#b91c1c', fontsize=9, weight='bold')

# Rotate x labels
ax1.set_xticklabels(pareto_data['Causa'], rotation=15, ha='right')

plt.title('Figura 6. Diagrama de Pareto de Causas de Demoras Operativas No Programadas (Escenario 02)', fontsize=11.5, weight='bold', pad=14)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_6_pareto_demoras.png'), dpi=300)
plt.close()
print("Saved figura_6_pareto_demoras.png")

# ==============================================================================
# FIGURA 7: GRÁFICO DE CONTROL DE CUMPLIMIENTO SEMANAL (BANDA ±5%)
# ==============================================================================
semanas = [f'Sem {int(s):02d}' for s in df_weekly['semana_num']]
x = np.arange(len(semanas))
width = 0.38

fig, ax = plt.subplots(figsize=(11, 5.5), dpi=300)

# Tolerance band 95% - 105%
ax.axhspan(95, 105, color='#dcfce7', alpha=0.7, label='Banda de Tolerancia Operativa Minera (±5%)')
ax.axhline(100, color='#15803d', linestyle='-', linewidth=1.5, label='Meta Programada (100%)')
ax.axhline(95, color='#b91c1c', linestyle=':', linewidth=1.3, label='Límite Inferior de Control (95%)')

b2 = ax.bar(x - width/2, df_weekly['cumpl_sc2'], width, label='Escenario 02 (Restricciones y Demoras)', color='#059669', edgecolor='#065f46', alpha=0.85)
b3 = ax.bar(x + width/2, df_weekly['cumpl_sc3'], width, label='Escenario 03 (Variación KPIs DM/UoD)', color='#dc2626', edgecolor='#991b1b', alpha=0.85)

ax.set_ylabel('Cumplimiento del Plan Semanal (%)', weight='bold')
ax.set_xlabel('Semanas de Operación - Primer Trimestre 2027 (Q1)', weight='bold')
ax.set_xticks(x)
ax.set_xticklabels(semanas)
ax.set_ylim(88, 104)

# Annotate out-of-control weeks
ax.annotate('Sem 07: 94.36%\n(Falla DM45)', xy=(6 - width/2, 94.36), xytext=(4.5, 90.0),
            arrowprops=dict(arrowstyle='->', color='#b91c1c', lw=1.5),
            fontsize=8.5, weight='bold', color='#b91c1c',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#fee2e2', edgecolor='#b91c1c'))

ax.annotate('Sem 12: 94.62%\n(Geotecnia y Vías)', xy=(11 - width/2, 94.62), xytext=(9.8, 90.0),
            arrowprops=dict(arrowstyle='->', color='#b91c1c', lw=1.5),
            fontsize=8.5, weight='bold', color='#b91c1c',
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#fee2e2', edgecolor='#b91c1c'))

plt.title('Figura 7. Gráfico de Control y Reconciliación de Cumplimiento Semanal por Escenario (Proyecto NAS)', fontsize=11.5, weight='bold', pad=12)
plt.legend(loc='lower left', frameon=True, facecolor='white', framealpha=0.92)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_7_control_semanal_tolerancia.png'), dpi=300)
plt.close()
print("Saved figura_7_control_semanal_tolerancia.png")

# ==============================================================================
# FIGURA 8: MODELO DE ESTIMACIÓN LINEAL: DEMORAS VS PRODUCCIÓN (ESCENARIO 02)
# ==============================================================================
plt.figure(figsize=(9, 5.5), dpi=300)

sns.regplot(data=df_daily, x='sc2_demora_h', y='sc2_ton', 
            color='#ea580c', 
            scatter_kws={'alpha': 0.65, 's': 50, 'edgecolor': '#9a3412'}, 
            line_kws={'color': '#c2410c', 'linewidth': 2.3})

plt.title('Figura 8. Modelo de Estimación Lineal: Horas de Demora Operativa vs. Producción Diaria (Escenario 02)', fontsize=11.5, weight='bold', pad=12)
plt.xlabel('Horas de Paradas No Programadas y Demoras Operativas (h/día)', weight='bold')
plt.ylabel('Producción Diaria Ejecutada (Toneladas/día)', weight='bold')

# Annotation with equation
eq_text = (r"$\mathbf{\hat{Y} = 41,502.41 - 873.70 \cdot X}$" + "\n" +
           r"Pearson $r = -0.7384$ ($p = 9.90 \times 10^{-17}$)" + "\n" +
           r"Spearman $\rho = -0.9991$ ($p < 0.001$)" + "\n" +
           r"Impacto marginal: -873.70 t por cada hora de demora")
plt.text(7.5, 36000, eq_text, fontsize=9.5, bbox=dict(boxstyle='round,pad=0.6', facecolor='#fff7ed', edgecolor='#ea580c', alpha=0.92))

plt.ylim(24000, 44000)
plt.xlim(-0.5, 21.5)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_8_regresion_demoras_produccion.png'), dpi=300)
plt.close()
print("Saved figura_8_regresion_demoras_produccion.png")

# ==============================================================================
# FIGURA 9: MATRIZ DE CALOR DE CORRELACIONES DE PEARSON (HEATMAP)
# ==============================================================================
corr_df = pd.DataFrame({
    'Frentes (DFM)': df_daily['sc2_frentes'],
    'Demoras (h)': df_daily['sc2_demora_h'],
    'Disp. Mecánica (DM)': df_daily['sc3_dm_prom'],
    'Uso Disp. (UoD)': df_daily['sc3_uod_prom'],
    'Prod. Diaria Esc 02': df_daily['sc2_ton'],
    'Prod. Diaria Esc 03': df_daily['sc3_ton'],
    'Déficit Prod. Esc 02': df_daily['sc2_dif_ton']
})
corr_matrix = corr_df.corr(method='pearson')

plt.figure(figsize=(9, 7), dpi=300)
mask = np.triu(np.ones_like(corr_matrix, dtype=bool), k=1)
cmap = sns.diverging_palette(10, 135, as_cmap=True)

sns.heatmap(corr_matrix, annot=True, fmt='.3f', cmap='coolwarm', vmin=-1.0, vmax=1.0, 
            square=True, linewidths=1.2, cbar_kws={"shrink": 0.82, "label": "Coeficiente de Correlación de Pearson (r)"},
            annot_kws={"size": 9.5, "weight": "bold"})

plt.title('Figura 9. Matriz de Calor de Correlaciones Estadísticas de Pearson (Variables de Estudio)', fontsize=11.5, weight='bold', pad=14)
plt.xticks(rotation=30, ha='right')
plt.yticks(rotation=0)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_9_heatmap_correlaciones.png'), dpi=300)
plt.close()
print("Saved figura_9_heatmap_correlaciones.png")

# ==============================================================================
# FIGURA 10: DIAGRAMA DE FLUJO DEL PROCEDIMIENTO DE SIMULACIÓN EN MINEPLAN
# ==============================================================================
fig, ax = plt.subplots(figsize=(11, 7.5), dpi=300)
ax.axis('off')

# Draw flowchart boxes
boxes = [
    ("FASE 1: INPUTS GEOMÉTRICOS Y MODELO DE RESERVAS\n• Topografía inicial 3D y Modelo de bloques geológico.\n• Digitalización en CAD de bancos (10 m) y cortes de minado (mining cuts).\n• Cálculo de Net Smelter Return (NSR) y definición de destinos.", 0.5, 0.90, '#dbeafe', '#1e40af'),
    
    ("FASE 2: CONFIGURACIÓN EN MINEPLAN ACTIVITY SCHEDULER\n• Configuración de actividades: perforación, voladura, carguío y acarreo.\n• Establecimiento de precedencias geométricas (banco superior liberado antes de perforar inferior).\n• Dimensionamiento de flotas: Flotas 01 y 02 (CAT 390FL) y Flota 03 (CAT 374DL) con volquetes Scania.", 0.5, 0.70, '#e0e7ff', '#3730a3'),
    
    ("FASE 3: INYECCIÓN Y PARAMETRIZACIÓN DE ESCENARIOS OPERATIVOS\n• Escenario 01 (Base/Ideal): Rendimientos nominales (DM=90%, UoD=84%, 0 h demoras).\n• Escenario 02 (Restricciones): 57.64 h de demoras no programadas y bloqueo temporal de frentes.\n• Escenario 03 (Variación KPIs): Inyección de perfiles de degradación mecánica (88.67% a 89.33%).", 0.5, 0.50, '#fef3c7', '#92400e'),
    
    ("FASE 4: EJECUCIÓN DEL MOTOR DE SIMULACIÓN Y SECUENCIAMIENTO\n• Corridas computacionales en horizonte diario y semanal (Q1 2027: 90 días).\n• Generación de diagramas de Gantt operacionales y rutas dinámicas en MS-Haulage.\n• Balance de ritmo diario hacia chancadora (17,040 tpd) y botaderos.", 0.5, 0.30, '#dcfce7', '#166534'),
    
    ("FASE 5: RECONCILIACIÓN ESPACIAL Y ANALÍTICA COMPUTACIONAL EN PYTHON\n• Reconciliación espacial de sólidos de minado (MinePlan vs. Plan semanal).\n• Exportación de series temporales de 90 días a base de datos de análisis.\n• Procesamiento estadístico en Python: t de Student pareada, correlación de Pearson y regresión.", 0.5, 0.10, '#f1f5f9', '#334155')
]

for text, x_c, y_c, bg, border in boxes:
    ax.text(x_c, y_c, text, ha='center', va='center', fontsize=9.2, weight='bold', color='#0f172a',
            bbox=dict(boxstyle='round,pad=0.7', facecolor=bg, edgecolor=border, linewidth=1.8),
            linespacing=1.3)

# Draw arrows between boxes
for y_top in [0.81, 0.61, 0.41, 0.21]:
    ax.annotate('', xy=(0.5, y_top - 0.02), xytext=(0.5, y_top + 0.02),
                arrowprops=dict(facecolor='#1e293b', edgecolor='#1e293b', width=2.5, headwidth=8.5, shrink=0.05))

plt.title('Figura 10. Diagrama de Flujo Metodológico de Simulación en MinePlan Activity Scheduler y Soporte en Python', fontsize=11.5, weight='bold', pad=12)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_10_diagrama_flujo_simulacion_mineplan.png'), dpi=300)
plt.close()
print("Saved figura_10_diagrama_flujo_simulacion_mineplan.png")
