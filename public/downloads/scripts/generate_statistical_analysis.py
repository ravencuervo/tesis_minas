import os
import openpyxl
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import statsmodels.api as sm

# Set style for academic publication
sns.set_theme(style="whitegrid")
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 10
plt.rcParams['axes.labelsize'] = 11
plt.rcParams['axes.titlesize'] = 12
plt.rcParams['xtick.labelsize'] = 9
plt.rcParams['ytick.labelsize'] = 9
plt.rcParams['legend.fontsize'] = 10
plt.rcParams['figure.titlesize'] = 13

wb_path = 'Finalización de borrador/Data de simulación/Roundx_Simulación.xlsx'
wb = openpyxl.load_workbook(wb_path, data_only=True)
res = wb['Resultados']

# Extract daily rows
daily_data = []
for r in range(5, 106):
    d = res.cell(r, 2).value
    if d is not None and not isinstance(d, str):
        sem_str = res.cell(r, 1).value
        # Plan
        plan_ton = res.cell(r, 24).value
        plan_frentes = res.cell(r, 25).value
        
        # Sc1
        sc1_ton = res.cell(r, 45).value
        sc1_frentes = res.cell(r, 46).value
        
        # Sc2
        sc2_ex1_dm = res.cell(r, 49).value
        sc2_ex1_uod = res.cell(r, 50).value
        sc2_ex2_dm = res.cell(r, 55).value
        sc2_ex2_uod = res.cell(r, 56).value
        sc2_ex3_dm = res.cell(r, 61).value
        sc2_ex3_uod = res.cell(r, 62).value
        sc2_ton = res.cell(r, 66).value
        sc2_frentes = res.cell(r, 67).value
        
        # Sc3
        sc3_ex1_dm = res.cell(r, 70).value
        sc3_ex1_uod = res.cell(r, 71).value
        sc3_ex2_dm = res.cell(r, 76).value
        sc3_ex2_uod = res.cell(r, 77).value
        sc3_ex3_dm = res.cell(r, 82).value
        sc3_ex3_uod = res.cell(r, 83).value
        sc3_ton = res.cell(r, 87).value
        sc3_frentes = res.cell(r, 88).value
        
        daily_data.append({
            'row': r,
            'semana': sem_str,
            'fecha': d,
            'dia_num': len(daily_data) + 1,
            'plan_ton': plan_ton,
            'plan_frentes': plan_frentes,
            'sc1_ton': sc1_ton,
            'sc1_frentes': sc1_frentes,
            'sc2_ton': sc2_ton,
            'sc2_frentes': sc2_frentes,
            'sc2_dm_prom': (sc2_ex1_dm + sc2_ex2_dm + sc2_ex3_dm) / 3.0,
            'sc2_uod_prom': (sc2_ex1_uod + sc2_ex2_uod + sc2_ex3_uod) / 3.0,
            'sc3_ton': sc3_ton,
            'sc3_frentes': sc3_frentes,
            'sc3_dm_prom': (sc3_ex1_dm + sc3_ex2_dm + sc3_ex3_dm) / 3.0,
            'sc3_uod_prom': (sc3_ex1_uod + sc3_ex2_uod + sc3_ex3_uod) / 3.0,
        })

df = pd.DataFrame(daily_data)
# Add weekly aggregation
# Forward fill semana if needed
df['semana'] = df['semana'].ffill()

# Check total sum
print("=== TOTAL SUMS (90 days) ===")
print(f"Plan Total:        {df['plan_ton'].sum():,.2f} t")
print(f"Escenario 01 Total:{df['sc1_ton'].sum():,.2f} t (Cumplimiento: {df['sc1_ton'].sum()/df['plan_ton'].sum()*100:.2f}%)")
print(f"Escenario 02 Total:{df['sc2_ton'].sum():,.2f} t (Cumplimiento: {df['sc2_ton'].sum()/df['plan_ton'].sum()*100:.2f}%)")
print(f"Escenario 03 Total:{df['sc3_ton'].sum():,.2f} t (Cumplimiento: {df['sc3_ton'].sum()/df['plan_ton'].sum()*100:.2f}%)")

# Extract additional delays from sheet 'Escenario 02'
ws_sc2 = wb['Escenario 02']
delays_sc2 = []
for r in df['row']:
    c11 = ws_sc2.cell(r, 11).value or 0 # demoras adicionales flota 1
    c22 = ws_sc2.cell(r, 22).value or 0 # demoras adicionales flota 2
    c33 = ws_sc2.cell(r, 33).value or 0 # demoras adicionales flota 3
    delays_sc2.append(max(c11, c22, c33))
df['sc2_demora_h'] = delays_sc2

# Differences / deviations
df['sc2_dif_ton'] = df['plan_ton'] - df['sc2_ton']
df['sc3_dif_ton'] = df['plan_ton'] - df['sc3_ton']

# Statistical summary table
desc_stats = pd.DataFrame({
    'Indicador': ['Media (t/día)', 'Desv. Estándar (t/día)', 'Mediana (t/día)', 'Mínimo (t/día)', 'Máximo (t/día)', 'Total Trimestral (t)', 'Cumplimiento (%)', 'Déficit Total (t)'],
    'Plan Semanal': [
        df['plan_ton'].mean(), df['plan_ton'].std(), df['plan_ton'].median(), df['plan_ton'].min(), df['plan_ton'].max(),
        df['plan_ton'].sum(), 100.0, 0.0
    ],
    'Escenario 01 (Ideal)': [
        df['sc1_ton'].mean(), df['sc1_ton'].std(), df['sc1_ton'].median(), df['sc1_ton'].min(), df['sc1_ton'].max(),
        df['sc1_ton'].sum(), df['sc1_ton'].sum()/df['plan_ton'].sum()*100, 0.0
    ],
    'Escenario 02 (Operativo)': [
        df['sc2_ton'].mean(), df['sc2_ton'].std(), df['sc2_ton'].median(), df['sc2_ton'].min(), df['sc2_ton'].max(),
        df['sc2_ton'].sum(), df['sc2_ton'].sum()/df['plan_ton'].sum()*100, df['plan_ton'].sum() - df['sc2_ton'].sum()
    ],
    'Escenario 03 (KPIs)': [
        df['sc3_ton'].mean(), df['sc3_ton'].std(), df['sc3_ton'].median(), df['sc3_ton'].min(), df['sc3_ton'].max(),
        df['sc3_ton'].sum(), df['sc3_ton'].sum()/df['plan_ton'].sum()*100, df['plan_ton'].sum() - df['sc3_ton'].sum()
    ]
})
print("\n=== DESCRIPTIVE STATISTICS ===")
print(desc_stats.to_string(index=False))

# Shapiro-Wilk Normality Test
sw_sc2 = stats.shapiro(df['sc2_ton'])
sw_sc3 = stats.shapiro(df['sc3_ton'])
sw_sc2_diff = stats.shapiro(df['sc2_dif_ton'])
sw_sc3_diff = stats.shapiro(df['sc3_dif_ton'])

print("\n=== NORMALITY TESTS (Shapiro-Wilk) ===")
print(f"Escenario 02: W={sw_sc2.statistic:.4f}, p={sw_sc2.pvalue:.4e}")
print(f"Escenario 03: W={sw_sc3.statistic:.4f}, p={sw_sc3.pvalue:.4e}")
print(f"Diferencia Plan-Esc02: W={sw_sc2_diff.statistic:.4f}, p={sw_sc2_diff.pvalue:.4e}")
print(f"Diferencia Plan-Esc03: W={sw_sc3_diff.statistic:.4f}, p={sw_sc3_diff.pvalue:.4e}")

# Paired t-test
tt_sc2 = stats.ttest_rel(df['plan_ton'], df['sc2_ton'])
tt_sc3 = stats.ttest_rel(df['plan_ton'], df['sc3_ton'])
print("\n=== PAIRED T-TESTS ===")
print(f"Plan vs Escenario 02: t={tt_sc2.statistic:.4f}, gl={len(df)-1}, p={tt_sc2.pvalue:.4e}")
print(f"Plan vs Escenario 03: t={tt_sc3.statistic:.4f}, gl={len(df)-1}, p={tt_sc3.pvalue:.4e}")

# Wilcoxon Signed-Rank Test
w_sc2 = stats.wilcoxon(df['plan_ton'], df['sc2_ton'], alternative='greater')
w_sc3 = stats.wilcoxon(df['plan_ton'], df['sc3_ton'], alternative='greater')
print("\n=== WILCOXON SIGNED-RANK TESTS ===")
print(f"Plan vs Escenario 02: W={w_sc2.statistic:.1f}, p={w_sc2.pvalue:.4e}")
print(f"Plan vs Escenario 03: W={w_sc3.statistic:.1f}, p={w_sc3.pvalue:.4e}")

# Correlations
# Sc2: Frentes vs Sc2_ton, Demoras vs Sc2_ton
r_frentes, p_frentes = stats.pearsonr(df['sc2_frentes'], df['sc2_ton'])
rho_frentes, prho_frentes = stats.spearmanr(df['sc2_frentes'], df['sc2_ton'])

r_demoras, p_demoras = stats.pearsonr(df['sc2_demora_h'], df['sc2_ton'])
rho_demoras, prho_demoras = stats.spearmanr(df['sc2_demora_h'], df['sc2_ton'])

# Sc3: DM vs Sc3_ton, UoD vs Sc3_ton
r_dm, p_dm = stats.pearsonr(df['sc3_dm_prom'], df['sc3_ton'])
r_uod, p_uod = stats.pearsonr(df['sc3_uod_prom'], df['sc3_ton'])

print("\n=== CORRELATIONS ===")
print(f"Esc 02 - Frentes vs Prod: Pearson r={r_frentes:.4f} (p={p_frentes:.4e}), Spearman rho={rho_frentes:.4f}")
print(f"Esc 02 - Demoras vs Prod: Pearson r={r_demoras:.4f} (p={p_demoras:.4e}), Spearman rho={rho_demoras:.4f}")
print(f"Esc 03 - DM vs Prod: Pearson r={r_dm:.4f} (p={p_dm:.4e})")
print(f"Esc 03 - UoD vs Prod: Pearson r={r_uod:.4f} (p={p_uod:.4e})")

# OLS Regressions
# Model 1: Escenario 02 - Prod ~ Frentes
X1 = sm.add_constant(df['sc2_frentes'])
model1 = sm.OLS(df['sc2_ton'], X1).fit()
print("\n=== OLS REGRESSION 1 (Frentes -> Sc2_ton) ===")
print(f"R2={model1.rsquared:.4f}, Intercept={model1.params['const']:.2f}, Slope={model1.params['sc2_frentes']:.2f}, p-val={model1.pvalues['sc2_frentes']:.4e}")

# Model 2: Escenario 03 - Prod ~ DM_prom + UoD_prom
X2 = sm.add_constant(df[['sc3_dm_prom', 'sc3_uod_prom']])
model2 = sm.OLS(df['sc3_ton'], X2).fit()
print("\n=== OLS REGRESSION 2 (DM, UoD -> Sc3_ton) ===")
print(f"R2={model2.rsquared:.4f}, Intercept={model2.params['const']:.2f}")
print(f"Slope DM={model2.params['sc3_dm_prom']:.2f} (p={model2.pvalues['sc3_dm_prom']:.4e})")
print(f"Slope UoD={model2.params['sc3_uod_prom']:.2f} (p={model2.pvalues['sc3_uod_prom']:.4e})")

# Save processed dataframe for later use
df.to_csv('Finalización de borrador/data_procesada_completa.csv', index=False)
print("Saved data_procesada_completa.csv")
