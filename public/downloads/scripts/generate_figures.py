import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Set aesthetics
sns.set_theme(style="whitegrid", palette="muted")
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 10
plt.rcParams['axes.labelsize'] = 11
plt.rcParams['axes.titlesize'] = 12
plt.rcParams['xtick.labelsize'] = 9
plt.rcParams['ytick.labelsize'] = 9
plt.rcParams['legend.fontsize'] = 10
plt.rcParams['figure.titlesize'] = 13

df = pd.read_csv('Finalización de borrador/data_procesada_completa.csv')
fig_dir = 'Finalización de borrador/Figuras'
os.makedirs(fig_dir, exist_ok=True)

# -------------------------------------------------------------
# FIGURA 1: Producción Acumulada Q1 2027
# -------------------------------------------------------------
df['plan_acum'] = df['plan_ton'].cumsum() / 1e6
df['sc1_acum'] = df['sc1_ton'].cumsum() / 1e6
df['sc2_acum'] = df['sc2_ton'].cumsum() / 1e6
df['sc3_acum'] = df['sc3_ton'].cumsum() / 1e6

plt.figure(figsize=(10, 5.5), dpi=300)
plt.plot(df['dia_num'], df['plan_acum'], label='Plan Semanal Q1 (Meta)', color='#1f2937', linestyle='--', linewidth=2.2)
plt.plot(df['dia_num'], df['sc1_acum'], label='Escenario 01 (Ideal: 100.0%)', color='#2563eb', linestyle='-', linewidth=1.8, alpha=0.85)
plt.plot(df['dia_num'], df['sc2_acum'], label='Escenario 02 (Restricciones y Demoras: 98.75%)', color='#059669', linestyle='-', linewidth=2.0)
plt.plot(df['dia_num'], df['sc3_acum'], label='Escenario 03 (Variación KPIs DM/UoD: 98.61%)', color='#dc2626', linestyle='-', linewidth=2.0)

# Annotate milestones
plt.axvline(x=32, color='#f59e0b', linestyle=':', alpha=0.7)
plt.text(33, 1.2, 'Feb: Falla compresor\n(Pérdida temporal frente)', color='#b45309', fontsize=8.5, weight='bold')

plt.axvline(x=60, color='#6366f1', linestyle=':', alpha=0.7)
plt.text(61, 2.3, 'Mar: Restricción\ngeotécnica en talud', color='#4338ca', fontsize=8.5, weight='bold')

plt.title('Figura 1. Reconciliación de Producción Acumulada Q1 2027 (Proyecto NAS)', fontsize=12, weight='bold', pad=12)
plt.xlabel('Días de Operación (1 de enero al 31 de marzo de 2027)')
plt.ylabel('Movimiento de Material Acumulado (Millones de Toneladas - Mt)')
plt.xlim(1, 90)
plt.ylim(0, 4.0)
plt.legend(loc='upper left', frameon=True, facecolor='white', framealpha=0.9)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_1_cumplimiento_acumulado.png'), dpi=300)
plt.close()
print("Saved figura_1_cumplimiento_acumulado.png")

# -------------------------------------------------------------
# FIGURA 2: Boxplot de Producción Diaria por Escenario
# -------------------------------------------------------------
plt.figure(figsize=(9, 5.5), dpi=300)
data_box = [df['plan_ton'], df['sc1_ton'], df['sc2_ton'], df['sc3_ton']]
labels_box = ['Plan Semanal\n(Meta)', 'Escenario 01\n(Ideal)', 'Escenario 02\n(Restricciones)', 'Escenario 03\n(Variación KPIs)']
colors_box = ['#9ca3af', '#93c5fd', '#6ee7b7', '#fca5a5']

box = plt.boxplot(data_box, patch_artist=True, labels=labels_box, widths=0.5,
                  medianprops=dict(color='black', linewidth=1.8),
                  flierprops=dict(marker='o', markerfacecolor='#b91c1c', markersize=5, linestyle='none'))

for patch, color in zip(box['boxes'], colors_box):
    patch.set_facecolor(color)
    patch.set_edgecolor('#374151')

plt.title('Figura 2. Variabilidad y Dispersión de la Producción Diaria por Escenario (Proyecto NAS)', fontsize=12, weight='bold', pad=12)
plt.ylabel('Producción Diaria de Material (Toneladas/día)')
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Annotations of means
means = [df['plan_ton'].mean(), df['sc1_ton'].mean(), df['sc2_ton'].mean(), df['sc3_ton'].mean()]
for i, m in enumerate(means):
    plt.text(i+1, m + 400, f'Media:\n{m:,.0f} t', ha='center', fontsize=8.5, weight='bold', color='#1e293b')

plt.ylim(23000, 44000)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_2_boxplot_produccion_diaria.png'), dpi=300)
plt.close()
print("Saved figura_2_boxplot_produccion_diaria.png")

# -------------------------------------------------------------
# FIGURA 3: Regresión Lineal: Frentes Disponibles vs Producción (Escenario 02)
# -------------------------------------------------------------
plt.figure(figsize=(9, 5.5), dpi=300)
sns.regplot(data=df, x='sc2_frentes', y='sc2_ton', 
            color='#059669', 
            scatter_kws={'alpha': 0.6, 's': 45}, 
            line_kws={'color': '#047857', 'linewidth': 2.2})

plt.title('Figura 3. Modelo de Regresión Lineal: Frentes de Minado Disponibles vs. Producción Diaria (Escenario 02)', fontsize=11.5, weight='bold', pad=12)
plt.xlabel('Disponibilidad Física de Frentes de Minado (Frentes Activos)')
plt.ylabel('Producción Diaria Ejecutada (Toneladas/día)')
plt.xticks([1, 2, 3])

# Annotate regression equation
eq_text = (r"$\mathbf{Y = -6,993.68 + 16,052.20 \cdot X}$" + "\n" +
           r"$R^2 = 0.5490$" + "\n" +
           r"Pearson $r = 0.7409$ ($p < 0.001$)" + "\n" +
           r"Significancia: $p = 6.91 \times 10^{-17}$")
plt.text(1.05, 38500, eq_text, fontsize=9.5, bbox=dict(boxstyle='round,pad=0.6', facecolor='#ecfdf5', edgecolor='#059669', alpha=0.9))

plt.ylim(24000, 44000)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_3_dispersion_frentes_escenario2.png'), dpi=300)
plt.close()
print("Saved figura_3_dispersion_frentes_escenario2.png")

# -------------------------------------------------------------
# FIGURA 4: Correlación DM y UoD vs Producción (Escenario 03)
# -------------------------------------------------------------
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5), dpi=300)

# DM vs Prod
sns.regplot(data=df, x=df['sc3_dm_prom']*100, y='sc3_ton', ax=ax1,
            color='#dc2626', scatter_kws={'alpha': 0.5, 's': 40}, line_kws={'color': '#991b1b', 'linewidth': 2})
ax1.set_title('A) Disponibilidad Mecánica Promedio vs. Producción', fontsize=10.5, weight='bold')
ax1.set_xlabel('Disponibilidad Mecánica Promedio de Carguío (%)')
ax1.set_ylabel('Producción Diaria (Toneladas/día)')
ax1.text(0.05, 0.85, r"Pearson $r = 0.9456$" + "\n" + r"$p = 1.07 \times 10^{-44}$", 
         transform=ax1.transAxes, fontsize=9, bbox=dict(boxstyle='round', facecolor='#fef2f2', edgecolor='#dc2626'))

# UoD vs Prod
sns.regplot(data=df, x=df['sc3_uod_prom']*100, y='sc3_ton', ax=ax2,
            color='#ea580c', scatter_kws={'alpha': 0.5, 's': 40}, line_kws={'color': '#c2410c', 'linewidth': 2})
ax2.set_title('B) Uso de la Disponibilidad Promedio vs. Producción', fontsize=10.5, weight='bold')
ax2.set_xlabel('Uso de la Disponibilidad Promedio de Carguío (%)')
ax2.set_ylabel('Producción Diaria (Toneladas/día)')
ax2.text(0.05, 0.85, r"Pearson $r = 0.9469$" + "\n" + r"$p = 3.97 \times 10^{-45}$", 
         transform=ax2.transAxes, fontsize=9, bbox=dict(boxstyle='round', facecolor='#fff7ed', edgecolor='#ea580c'))

fig.suptitle('Figura 4. Correlación entre Indicadores Operacionales de Carguío y Producción Diaria (Escenario 03)', fontsize=12, weight='bold', y=1.02)
plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_4_dispersion_kpis_escenario3.png'), dpi=300)
plt.close()
print("Saved figura_4_dispersion_kpis_escenario3.png")

# -------------------------------------------------------------
# FIGURA 5: Serie Temporal de Demoras y Producción (Escenario 02)
# -------------------------------------------------------------
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(11, 6), sharex=True, dpi=300, gridspec_kw={'height_ratios': [2, 1.2]})

# Top: Producción y déficit
ax1.plot(df['dia_num'], df['plan_ton'], label='Plan Teórico (41,502 t/día)', color='#374151', linestyle='--', linewidth=1.5)
ax1.plot(df['dia_num'], df['sc2_ton'], label='Producción Real Escenario 02', color='#059669', linewidth=1.8)
ax1.fill_between(df['dia_num'], df['sc2_ton'], df['plan_ton'], where=(df['sc2_ton'] < df['plan_ton']), 
                 color='#ef4444', alpha=0.25, label='Déficit de Producción')
ax1.set_ylabel('Producción Diaria (t/día)')
ax1.set_title('Figura 5. Análisis Temporal del Impacto de Demoras Operativas y Restricciones (Escenario 02)', fontsize=11.5, weight='bold')
ax1.legend(loc='lower left', frameon=True, facecolor='white')
ax1.grid(True, linestyle='--', alpha=0.6)

# Bottom: Demoras
ax2.bar(df['dia_num'], df['sc2_demora_h'], color='#f59e0b', width=0.8, label='Horas de Demora / Restricción Operativa')
ax2.set_xlabel('Días de Operación (Q1 2027: Enero a Marzo)')
ax2.set_ylabel('Demoras (h/día)')
ax2.set_xlim(1, 90)
ax2.set_ylim(0, 22)
ax2.legend(loc='upper right', frameon=True, facecolor='white')
ax2.grid(True, linestyle='--', alpha=0.6)

plt.tight_layout()
plt.savefig(os.path.join(fig_dir, 'figura_5_serie_tiempo_demoras_escenario2.png'), dpi=300)
plt.close()
print("Saved figura_5_serie_tiempo_demoras_escenario2.png")
