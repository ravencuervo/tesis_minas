// Datos maestros y técnicos de la investigación
export const projectInfo = {
  title: "EVALUACIÓN DEL IMPACTO DE LAS CONSIDERACIONES OPERATIVAS EN LA SIMULACIÓN DE LA SECUENCIA DE MINADO A CORTO PLAZO EN TAJO ABIERTO, ZONA NORTE DEL PERÚ",
  tesista: "Bach. Mireya Yanina Deza Velarde",
  asesor: "Ing. Arturo Rafael Chayña Rodriguez",
  universidad: "Universidad Nacional del Altiplano - Puno (UNAP)",
  facultad: "Facultad de Ingeniería de Minas",
  escuela: "Escuela Profesional de Ingeniería de Minas",
  casoEstudio: "Proyecto NAS (Norte del Perú)",
  periodo: "Primer Trimestre 2027 (Q1, 90 días calendario)",
  software: "MinePlan Activity Scheduler (MPAS) + Soporte Analítico en Python",
  jurados: [
    { cargo: "Presidente de Jurado", nombre: "Dr. Jorge Gabriel Durant Broden", institucion: "Docente Principal - Facultad de Ingeniería de Minas (UNAP)" },
    { cargo: "Primer Miembro de Jurado", nombre: "Ing. Juan Carlos Chayña Contreras", institucion: "Docente - Facultad de Ingeniería de Minas (UNAP)" },
    { cargo: "Segundo Miembro de Jurado", nombre: "Ing. Abdul Ticona Fernandez", institucion: "Docente - Facultad de Ingeniería de Minas (UNAP)" },
    { cargo: "Director / Asesor de Tesis", nombre: "Ing. Arturo Rafael Chayña Rodriguez", institucion: "Docente Asesor - Facultad de Ingeniería de Minas (UNAP)" }
  ]
};

export const consistencyMatrix = [
  {
    tipo: "General",
    problema: "¿Cómo evaluar el impacto de las consideraciones operativas en la simulación de la secuencia de minado a corto plazo en tajo abierto, zona Norte del Perú?",
    objetivo: "Evaluar el impacto de las consideraciones operativas en la simulación de la secuencia de minado a corto plazo en tajo abierto, zona Norte del Perú.",
    hipotesis: "La consideración de parámetros operativos en la simulación de la secuencia de minado a corto plazo genera diferencias estadísticamente significativas respecto al plan base tradicional.",
    variable: "Impacto Operativo en el Secuenciamiento",
    indicador: "Desviación del cumplimiento de tonelaje (%), Variación semanal de tonelaje (t), Cumplimiento acumulado (%)",
    resultado: "Rechazo de H0 (p = 0.03416 en Escenario 02 y p = 1.27e-58 en Escenario 03). El impacto es estadísticamente significativo."
  },
  {
    tipo: "Específica 1",
    problema: "¿Cuáles son las principales consideraciones operativas que influyen en la secuencia de minado a corto plazo?",
    objetivo: "Identificar y cuantificar las principales consideraciones operativas que influyen en la secuencia de minado a corto plazo.",
    hipotesis: "La disponibilidad física de frentes de minado (DFM) y su secuenciación geométrica condicionan directamente la tasa de extracción diaria.",
    variable: "Disponibilidad Física de Frentes de Minado (DFM)",
    indicador: "Número de frentes activos simultáneos, ratio estéril/mineral, tasa de avance por banco",
    resultado: "Aceptada positivamente. Modelo lineal: Y = -6,993.68 + 16,052.20*(Frentes), R² = 0.5490, r = 0.7410, p < 0.001."
  },
  {
    tipo: "Específica 2",
    problema: "¿Cómo simular la secuencia de minado considerando los parámetros operativos en MinePlan?",
    objetivo: "Simular la secuencia de minado considerando los parámetros y demoras operativas mediante MinePlan Activity Scheduler.",
    hipotesis: "La simulación multi-escenario en MinePlan Activity Scheduler permite modelar con precisión las demoras no programadas y cuellos de botella.",
    variable: "Demoras Operativas No Programadas",
    indicador: "Horas de demora registradas, causas de parada (Pareto), pérdida marginal de producción (t/h)",
    resultado: "Aceptada. 57.64 h de demora causaron merma de 46,607 t. Modelo lineal: Y = 41,502.41 - 873.70*(Demoras), r = -0.7384."
  },
  {
    tipo: "Específica 3",
    problema: "¿Cuál es el impacto producido en el cumplimiento de los planes de minado a corto plazo?",
    objetivo: "Evaluar el impacto producido en el cumplimiento del plan de minado a corto plazo en términos de producción y reconciliación.",
    hipotesis: "La variabilidad en los indicadores de rendimiento (KPIs) de los equipos de carguío y acarreo degrada el cumplimiento del plan programado.",
    variable: "KPIs de Carguío y Acarreo",
    indicador: "Disponibilidad Mecánica (DM %), Uso de Disponibilidad (UoD %), Factor de Acoplamiento (Match Factor)",
    resultado: "Aceptada. La degradación de DM (88.7%) y UoD (80.5%) provocó un déficit acumulado de 51,733.60 t (98.61% cumplimiento)."
  }
];

export const weeklyData = [
  { semana: "Semana 1", plan: 287232.00, esc01: 287232.00, esc02: 287232.00, esc03: 285412.30, cumpEsc02: 100.00, cumpEsc03: 99.37, frentes: 3, demoras: 0.0, estado: "Normal", obs: "Inicio regular de campaña Q1" },
  { semana: "Semana 2", plan: 290514.80, esc01: 290514.80, esc02: 290514.80, esc03: 288620.10, cumpEsc02: 100.00, cumpEsc03: 99.35, frentes: 3, demoras: 0.0, estado: "Normal", obs: "Operación estable en Fases 1 y 2" },
  { semana: "Semana 3", plan: 290514.80, esc01: 290514.80, esc02: 289140.20, esc03: 287410.50, cumpEsc02: 99.53, cumpEsc03: 98.93, frentes: 3, demoras: 1.5, estado: "Normal", obs: "Ajuste menor en punto de descarga" },
  { semana: "Semana 4", plan: 290514.80, esc01: 290514.80, esc02: 288410.50, esc03: 286950.40, cumpEsc02: 99.28, cumpEsc03: 98.77, frentes: 3, demoras: 2.2, estado: "Normal", obs: "Demora por voladura diferida" },
  { semana: "Semana 5", plan: 290514.80, esc01: 290514.80, esc02: 287950.10, esc03: 285810.00, cumpEsc02: 99.12, cumpEsc03: 98.38, frentes: 3, demoras: 3.1, estado: "Normal", obs: "Lluvias ligeras en banco 3400" },
  { semana: "Semana 6", plan: 290514.80, esc01: 290514.80, esc02: 288120.40, esc03: 286140.80, cumpEsc02: 99.18, cumpEsc03: 98.49, frentes: 3, demoras: 2.8, estado: "Normal", obs: "Desgaste de cantoneras en CAT 390FL" },
  { semana: "Semana 7", plan: 290514.80, esc01: 290514.80, esc02: 274120.30, esc03: 279540.20, cumpEsc02: 94.36, cumpEsc03: 96.22, frentes: 1, demoras: 18.5, estado: "Crítico", obs: "FALLA COMPRESOR DM45: Pérdida temporal de 2 frentes por falta de disparo" },
  { semana: "Semana 8", plan: 290514.80, esc01: 290514.80, esc02: 286540.10, esc03: 284120.90, cumpEsc02: 98.63, cumpEsc03: 97.80, frentes: 2, demoras: 4.5, estado: "Recuperación", obs: "Retorno progresivo de frentes perforados" },
  { semana: "Semana 9", plan: 290514.80, esc01: 290514.80, esc02: 289410.20, esc03: 287230.10, cumpEsc02: 99.62, cumpEsc03: 98.87, frentes: 3, demoras: 1.2, estado: "Normal", obs: "Ritmo de extracción normalizado" },
  { semana: "Semana 10", plan: 290514.80, esc01: 290514.80, esc02: 288920.60, esc03: 286840.50, cumpEsc02: 99.45, cumpEsc03: 98.74, frentes: 3, demoras: 1.8, estado: "Normal", obs: "Avance regular en Banco 3380" },
  { semana: "Semana 11", plan: 290514.80, esc01: 290514.80, esc02: 287840.40, esc03: 285420.30, cumpEsc02: 99.08, cumpEsc03: 98.25, frentes: 3, demoras: 3.4, estado: "Normal", obs: "Mantenimiento preventivo programado" },
  { semana: "Semana 12", plan: 290514.80, esc01: 290514.80, esc02: 274880.20, esc03: 280140.70, cumpEsc02: 94.62, cumpEsc03: 96.43, frentes: 1, demoras: 16.2, estado: "Crítico", obs: "GEOTECNIA Y VÍAS: Inestabilidad en sector Nor-Este y desvío de rampa" },
  { semana: "Semana 13", plan: 252037.15, esc01: 252037.15, esc02: 250426.08, esc03: 247657.65, cumpEsc02: 99.36, cumpEsc03: 98.26, frentes: 3, demoras: 2.4, estado: "Cierre", obs: "Cierre de campaña trimestral Q1" }
];

export const summaryTotals = {
  planTotal: 3735217.15,
  esc01Total: 3735217.15,
  esc02Total: 3688609.98,
  esc03Total: 3683483.55,
  cumplimientoEsc01: 100.00,
  cumplimientoEsc02: 98.75,
  cumplimientoEsc03: 98.61,
  deficitEsc02: 46607.17,
  deficitEsc03: 51733.60,
  totalDemorasHoras: 57.64,
  costoUnitarioMinaUSD: 2.85,
  impactoEconomicoEsc02USD: 132830.43,
  impactoEconomicoEsc03USD: 147440.76
};

export const paretoCauses = [
  { causa: "Espera de disparo / frentes sin voladura", horas: 22.02, porcentaje: 38.2, acumulado: 38.2 },
  { causa: "Mantenimiento no programado de vías de acarreo", horas: 13.49, porcentaje: 23.4, acumulado: 61.6 },
  { causa: "Fallas mecánicas imprevistas en perforación y carguío", horas: 9.68, porcentaje: 16.8, acumulado: 78.4 },
  { causa: "Interferencias operativas y demoras en cambios de guardia", horas: 7.21, porcentaje: 12.5, acumulado: 90.9 },
  { causa: "Clima adverso y neblina densa en accesos altos", horas: 5.24, porcentaje: 9.1, acumulado: 100.0 }
];

export const statisticalTests = {
  shapiroWilk: [
    { variable: "Producción Planificada (Plan)", w: 0.988, pVal: 0.582, distribucion: "Normal (p > 0.05)" },
    { variable: "Producción Escenario 01 (Base)", w: 0.988, pVal: 0.582, distribucion: "Normal (p > 0.05)" },
    { variable: "Producción Escenario 02 (Restricciones)", w: 0.892, pVal: 0.000003, distribucion: "No Normal (p < 0.05, caídas discretas)" },
    { variable: "Producción Escenario 03 (KPIs carguío)", w: 0.967, pVal: 0.021, distribucion: "Leve asimetría (p < 0.05)" },
    { variable: "Horas de Demora Diaria", w: 0.654, pVal: 0.000001, distribucion: "Asimétrica positiva / Poissoniana" }
  ],
  tStudentPaired: [
    {
      comparacion: "Plan vs Escenario 02 (Restricciones y Demoras)",
      mediaDif: 517.86,
      desvStdDif: 2283.45,
      tCalculado: 2.1513,
      gl: 89,
      pValor: 0.03416,
      decision: "Rechazar H0 (p < 0.05)",
      conclusion: "El impacto de las restricciones y demoras operativas es estadísticamente significativo al 95% de confianza."
    },
    {
      comparacion: "Plan vs Escenario 03 (Variación KPIs Carguío)",
      mediaDif: 574.82,
      desvStdDif: 136.51,
      tCalculado: 39.9460,
      gl: 89,
      pValor: 1.274e-58,
      decision: "Rechazar H0 (p < 0.001)",
      conclusion: "La degradación de disponibilidad y utilización en carguío genera un impacto altamente significativo y persistente."
    }
  ],
  wilcoxonSignedRank: [
    { comparacion: "Plan vs Escenario 02", wStat: 1420.5, pValor: 0.0284, decision: "Rechazar H0 (p < 0.05)" },
    { comparacion: "Plan vs Escenario 03", wStat: 0.0, pValor: 1.48e-16, decision: "Rechazar H0 (p < 0.001)" }
  ],
  regressions: [
    {
      nombre: "Modelo 1: Frentes de Minado vs. Producción Diaria",
      ecuacion: String.raw`\hat{Y} = -6{,}993.68 + 16{,}052.20 \times X_{\text{Frentes}}`,
      r2: 0.5490,
      r2Adj: 0.5439,
      rPearson: 0.7410,
      fStat: 107.13,
      pValor: 1.45e-16,
      interpretacion: "Cada frente activo adicional aporta en promedio 16,052.20 t/día. El 54.9% de la variabilidad productiva se explica por la disponibilidad de frentes."
    },
    {
      nombre: "Modelo 2: Demoras Operativas vs. Producción Diaria",
      ecuacion: String.raw`\hat{Y} = 41{,}502.41 - 873.70 \times X_{\text{Demoras (horas)}}`,
      r2: 0.5452,
      r2Adj: 0.5401,
      rPearson: -0.7384,
      fStat: 105.42,
      pValor: 2.11e-16,
      interpretacion: "Por cada hora de demora no programada que sufre la operación, la producción diaria se reduce en 873.70 toneladas."
    }
  ]
};

export const figuresList = [
  {
    id: 1,
    numero: "Figura 1",
    titulo: "Reconciliación de Producción Acumulada Q1 2027 (Proyecto NAS)",
    archivo: "figura_1_cumplimiento_acumulado.png",
    tipo: "Curva S de Tonelaje Acumulado",
    resumen: "Muestra la trayectoria de extracción acumulada durante los 90 días para el Plan (3.735 Mt), Escenario 01 (100%), Escenario 02 (98.75%) y Escenario 03 (98.61%).",
    queMuestra: "Las 4 curvas marchan idénticas hasta el día 42 (Semana 7), donde el Escenario 02 se despega hacia abajo por la falla de la perforadora DM45. En la Semana 12 vuelve a sufrir una segunda deflexión por la contingencia geotécnica. El Escenario 03 exhibe un rezago suave pero constante debido a la menor disponibilidad de las palas.",
    comoDefender: "«Ingenieros del jurado, en la Figura 1 se observa con nitidez cómo un evento operacional puntual en la Semana 7 generó una brecha irrecuperable de 46,607 toneladas en el Escenario 02, demostrando que en minería a cielo abierto los eventos discretos no se compensan espontáneamente, sino que exigen sobrecostos de aceleración de flota.»"
  },
  {
    id: 2,
    numero: "Figura 2",
    titulo: "Variabilidad y Dispersión de la Producción Diaria por Escenario",
    archivo: "figura_2_boxplot_produccion_diaria.png",
    tipo: "Diagrama de Cajas y Bigotes (Boxplot)",
    resumen: "Compara la mediana, rango intercuartil (IQR) y valores atípicos inferiores de la producción diaria entre los 3 escenarios.",
    queMuestra: "El Plan y Escenario 01 tienen una caja casi plana en torno a 41,500 t/día sin dispersión. El Escenario 02 muestra bigotes largos hacia abajo con valores atípicos que descienden hasta 36,000 t/día en los días de frentes paralizados. El Escenario 03 tiene una mediana desplazada a 40,927 t/día con varianza reducida.",
    comoDefender: "«Este diagrama de cajas evidencia que el Escenario 02 padece una asimetría negativa severa provocada por colas pesadas de baja productividad, confirmando la necesidad de aplicar pruebas no paramétricas como Wilcoxon además de la t de Student.»"
  },
  {
    id: 3,
    numero: "Figura 3",
    titulo: "Modelo de Regresión Lineal: Frentes de Minado Disponibles vs. Producción Diaria",
    archivo: "figura_3_dispersion_frentes_escenario2.png",
    tipo: "Gráfico de Dispersión y Ajuste MCO",
    resumen: "Visualiza la relación lineal directa entre el número de frentes habilitados (1, 2 o 3) y el tonelaje extraído por día.",
    queMuestra: "Puntos claramente estratificados en 3 nubes: con 1 frente la producción cae al rango de 36,000-38,000 t; con 2 frentes a 39,500-41,000 t; y con 3 frentes se alcanza la meta plena de 41,500 t/día. La recta ajustada tiene pendiente positiva de +16,052.20 t/frente.",
    comoDefender: "«La pendiente de 16,052 t/día indica el costo de oportunidad de no tener un frente disparado a tiempo. Si una voladura se posterga 24 horas, la operación pierde inmediatamente más de 16 mil toneladas de capacidad extractiva.»"
  },
  {
    id: 4,
    numero: "Figura 4",
    titulo: "Correlación entre Indicadores Operacionales de Carguío y Producción",
    archivo: "figura_4_dispersion_kpis_escenario3.png",
    tipo: "Diagrama de Dispersión Bivariada",
    resumen: "Ilustra el impacto de la Disponibilidad Mecánica (DM %) y el Uso de la Disponibilidad (UoD %) de excavadoras sobre la producción.",
    queMuestra: "Relación lineal ascendente muy apretada (r = 0.812). A medida que la disponibilidad de las excavadoras cae del 92% al 88.7%, la producción desciende de manera proporcional sin poder ser compensada por los camiones.",
    comoDefender: "«La correlación de 0.812 demuestra que la excavadora es el equipo gobernante o paso crítico del ciclo minero; cualquier falla mecánica en carguío se traslada instantáneamente a una merma volumétrica en balanza.»"
  },
  {
    id: 5,
    numero: "Figura 5",
    titulo: "Análisis Temporal del Impacto de Demoras Operativas y Restricciones",
    archivo: "figura_5_serie_tiempo_demoras_escenario2.png",
    tipo: "Serie de Tiempo y Gráfico de Barras",
    resumen: "Muestra los 90 días cronológicos comparando las horas de demora registradas frente al tonelaje diario extraído.",
    queMuestra: "Dos picos marcados de demoras: Día 43-46 (pico de 6.5 h/día de demora) y Día 78-81 (pico de 5.8 h/día). En ambos picos, la curva de producción presenta caídas en 'V' pronunciadas.",
    comoDefender: "«La sincronía perfecta entre los picos de barras de demoras y las caídas de la curva de producción en la Figura 5 valida empíricamente la relación causa-efecto de nuestra segunda hipótesis específica.»"
  },
  {
    id: 6,
    numero: "Figura 6",
    titulo: "Diagrama de Pareto de Causas de Demoras Operativas No Programadas",
    archivo: "figura_6_pareto_demoras.png",
    tipo: "Diagrama de Pareto 80/20",
    resumen: "Jerarquiza las 5 causas principales de demoras no programadas que sumaron 57.64 horas en el trimestre.",
    queMuestra: "El 78.4% acumulado de las demoras se concentra en las primeras 3 barras: voladura diferida (38.2%), mantenimiento de pistas (23.4%) y fallas mecánicas imprevistas (16.8%).",
    comoDefender: "«El principio de Pareto nos indica dónde debe actuar la gerencia de mina: interviniendo en la disponibilidad de perforación y en el mantenimiento preventivo de bermas y rampas se controla casi el 80% de las pérdidas operativas.»"
  },
  {
    id: 7,
    numero: "Figura 7",
    titulo: "Gráfico de Control y Reconciliación de Cumplimiento Semanal por Escenario",
    archivo: "figura_7_control_semanal_tolerancia.png",
    tipo: "Gráfico de Control Estadístico Shewhart (Límites +/- 5% y 3-sigma)",
    resumen: "Evalúa el porcentaje de cumplimiento semanal de las 13 semanas respecto a la banda de tolerancia industrial del 95% al 105%.",
    queMuestra: "La mayoría de semanas fluctúa en la zona de control (98.5% - 100.0%). Sin embargo, la Semana 7 (94.36%) y la Semana 12 (94.62%) caen claramente por debajo del Límite de Control Inferior (LCI = 95.0%).",
    comoDefender: "«Las Semanas 7 y 12 quedan fuera de control estadístico, lo que demuestra que los planes determinísticos son vulnerables a eventos de baja frecuencia y alto impacto geotécnico u operacional.»"
  },
  {
    id: 8,
    numero: "Figura 8",
    titulo: "Modelo de Estimación Lineal: Horas de Demora Operativa vs. Producción Diaria",
    archivo: "figura_8_regresion_demoras_produccion.png",
    tipo: "Recta de Regresión OLS con Banda de Confianza al 95%",
    resumen: "Modela la sensibilidad de la producción diaria ante el incremento de horas de parada no programada.",
    queMuestra: "Nube de puntos con pendiente negativa bien definida y banda de confianza estrecha. Intercepto en 41,502.41 t/día (producción sin demoras) y pendiente negativa de -873.70 t/h.",
    comoDefender: "«Esta recta nos entrega una regla de decisión operativa inmediata: cada hora de parada no programada que no se evite le cuesta a la operación 873.70 toneladas métricas de desvío.»"
  },
  {
    id: 9,
    numero: "Figura 9",
    titulo: "Matriz de Calor de Correlaciones Estadísticas de Pearson (Heatmap)",
    archivo: "figura_9_heatmap_correlaciones.png",
    tipo: "Heatmap Triangular de Correlaciones",
    resumen: "Sintetiza la fuerza y sentido de correlación entre todas las variables analizadas (Producción, Frentes, Demoras, DM, UoD, Match Factor).",
    queMuestra: "Correlaciones directas fuertes: Producción con DM (0.812), Frentes (0.741) y Match Factor (0.698). Correlación inversa fuerte: Producción con Demoras (-0.738).",
    comoDefender: "«El mapa de calor resume de un solo vistazo la consistencia multivariable de la tesis: confirma que los factores físicos y de equipos empujan en la misma dirección positiva, mientras que las demoras son el gran detractor.»"
  },
  {
    id: 10,
    numero: "Figura 10",
    titulo: "Diagrama de Flujo Metodológico de Simulación en MinePlan Activity Scheduler",
    archivo: "figura_10_diagrama_flujo_simulacion_mineplan.png",
    tipo: "Flujograma Metodológico y Algorítmico",
    resumen: "Detalla la secuencia computacional desde la geología y modelo de bloques hasta la generación de reportes y reconciliación.",
    queMuestra: "Estructura en 5 fases concatenadas: 1. Inputs (Modelo de bloques, geometrías CAD, topografía); 2. Configuración MPAS (restricciones espaciales y anchos de minado); 3. Parámetros Operativos (flotas, calendarios, geotecnia); 4. Simulación Multi-escenario; 5. Reconciliación analítica en Python.",
    comoDefender: "«El flujograma evidencia la rigurosidad científica del procedimiento: no se trató de una simple corrida de software, sino de un proceso iterativo con validación geotécnica, límites de capacidad de flota y control de calidad estadístico.»"
  }
];

export const defenseQuestions = [
  {
    id: 1,
    jurado: "Dr. Jorge Gabriel Durant Broden",
    cargo: "Presidente de Jurado",
    pregunta: "¿Por qué utilizó una prueba t de Student para muestras pareadas y no una prueba ANOVA o una prueba t para muestras independientes?",
    loQueBusca: "Verificar si la tesista domina el diseño experimental y la dependencia de las observaciones.",
    respuestaMaestra: "«Distinguido doctor, se seleccionó la prueba t de Student para muestras pareadas debido a que el diseño de investigación compara exactamente la misma unidad experimental (el día operativo t_i, desde el día 1 hasta el día 90) bajo dos tratamientos o condiciones de simulación distintos: el plan base ideal frente al escenario con consideraciones operativas. Al tratarse de los mismos días calendario, existe una correlación intrínseca temporal y espacial que invalida el supuesto de independencia de una prueba t tradicional o ANOVA entre grupos no relacionados. La prueba pareada evalúa la distribución de las diferencias diarias (D_i = Y_base - Y_simulado), controlando la variabilidad de bloque y maximizando la potencia estadística del contraste.»",
    trampasEvitar: "No decir 'porque el software lo calculó así' ni decir que eran muestras independientes."
  },
  {
    id: 2,
    jurado: "Ing. Juan Carlos Chayña Contreras",
    cargo: "Primer Miembro de Jurado",
    pregunta: "En el Escenario 02 se observa una caída drástica en la Semana 7 y Semana 12. ¿A qué se debieron y por qué no pudieron recuperarse en las semanas siguientes?",
    loQueBusca: "Evaluar si conoce la realidad física del tajo o solo manejó números fríos.",
    respuestaMaestra: "«Ingeniero Chayña, la caída de la Semana 7 (94.36% de cumplimiento) fue provocada por la avería crítica del compresor de la perforadora primaria DM45. Al no contarse con suficiente presión de aire para perforar la malla de producción en el Banco 3400, no se pudo realizar el disparo programado, inhabilitando 2 frentes de carguío simultáneos y dejando a la pala CAT 390FL sin mineral quebrado disponible. La caída de la Semana 12 (94.62%) respondió a una restricción geotécnica por agrietamiento en la cresta del talud Nor-Este y trabajos de reacondicionamiento de la rampa principal tras precipitaciones. La razón por la que no se recupera el tonelaje acumulado en las semanas posteriores es que la capacidad de carguío y acarreo de la mina ya opera al 92% de utilización; no existía holgura de flota ociosa (camiones o palas adicionales) para absorber un déficit de más de 30 mil toneladas sin incurrir en sobrecostos no presupuestados.»",
    trampasEvitar: "No inventar que contrataron más volquetes ni decir que la mina paró por completo."
  },
  {
    id: 3,
    jurado: "Ing. Abdul Ticona Fernandez",
    cargo: "Segundo Miembro de Jurado",
    pregunta: "¿Qué diferencia concreta existe entre planificar en AutoCAD mediante corte y relleno y realizar la simulación en MinePlan Activity Scheduler?",
    loQueBusca: "Comprobar que sabe cómo opera el algoritmo de MPAS.",
    respuestaMaestra: "«Ingeniero Ticona, la planificación convencional en CAD se limita a cubicaciones estáticas y volumétricas que ignoran la dinámica temporal y operativa. En cambio, MinePlan Activity Scheduler (MPAS) incorpora un motor de optimización que respeta restricciones operacionales duras: en primer lugar, las precedencias espaciales verticales (no permite minar un banco inferior si no se ha desbrozado el banco superior respetando el ancho de berma de 8.5 m); en segundo lugar, controla la tasa máxima de profundización y el ancho mínimo de minado (fijado en 35 m para el giro de camiones CAT 777F); y en tercer lugar, asigna rendimientos de flota dependientes de la distancia y perfil de transporte hacia planta o botadero. Esto convierte a MPAS en un simulador dinámico y no en un mero graficador volumétrico.»",
    trampasEvitar: "No decir que MinePlan es simplemente 'un AutoCAD en 3D' o un programa de dibujo."
  },
  {
    id: 4,
    jurado: "Dr. Jorge Gabriel Durant Broden",
    cargo: "Presidente de Jurado",
    pregunta: "Si el cumplimiento del plan en el Escenario 02 fue de 98.75% y en el Escenario 03 fue de 98.61%, la desviación es de apenas 1.25% a 1.39%. ¿Por qué afirma que el impacto es crítico si faltó tan poco para el 100%?",
    loQueBusca: "Poner a prueba su criterio económico y de gestión minera.",
    respuestaMaestra: "«Excelente observación, Dr. Durant. Aunque un 98.75% parezca muy cercano a la meta a nivel trimestral, en la escala de una operación a tajo abierto ese 1.25% representa una merma física de 46,607 toneladas métricas en el Escenario 02 y 51,733 toneladas en el Escenario 03. A un costo de minado directo de 2.85 dólares por tonelada, el impacto en costos improductivos asciende a más de 132,000 a 147,000 dólares. Pero el impacto más grave es estratégico: como se demostró en la Figura 7, el promedio trimestral enmascara caídas semanales del 94.36%, lo que genera desabastecimiento en la ley de cabeza de la planta concentradora, altera el ratio de desbroce estéril/mineral y obliga a recurrir al mineral de stock de baja ley, degradando el flujo de caja del proyecto.»",
    trampasEvitar: "No minimizar la cifra; 46,000 toneladas son casi 500 viajes de camión de 100 toneladas."
  },
  {
    id: 5,
    jurado: "Ing. Juan Carlos Chayña Contreras",
    cargo: "Primer Miembro de Jurado",
    pregunta: "¿Por qué en el modelo de regresión lineal entre Frentes y Producción el R² es de 0.549 y no superior al 90%? ¿Significa que el modelo es débil?",
    loQueBusca: "Evaluar si comprende el significado del coeficiente de determinación en procesos industriales.",
    respuestaMaestra: "«No, ingeniero Chayña; al contrario, un R² de 0.5490 con un valor p de 1.45e-16 es sumamente robusto para un entorno minero real. Significa que una sola variable operativa —el número de frentes activos— explica por sí sola casi el 55% de toda la fluctuación diaria de la mina. El 45% restante de la variabilidad corresponde a otros factores operacionales independientes, tales como las demoras por clima, variaciones en los tiempos de ciclo de los camiones, fragmentación de la roca por voladura y habilidades de los operadores. Intentar forzar un R² del 95% en minería a cielo abierto sería un síntoma de sobreajuste ficticio (*overfitting*).»",
    trampasEvitar: "No asustarse ni disculparse por el R²; defender con seguridad que el 55% en campo es un poder explicativo muy alto."
  },
  {
    id: 6,
    jurado: "Ing. Abdul Ticona Fernandez",
    cargo: "Segundo Miembro de Jurado",
    pregunta: "¿Cómo calculó el Match Factor de la flota y qué ocurrió cuando dicho factor se alejó del valor 1.0?",
    loQueBusca: "Comprobar que maneja la teoría de colas y dimensionamiento de palas y camiones.",
    respuestaMaestra: "«Ingeniero Ticona, el Match Factor se determinó mediante la formulación clásica de Hustrulid: relacionando el número de camiones CAT 777F multiplicado por el tiempo de carguío de la pala, entre el número de excavadoras multiplicado por el tiempo total de ciclo de acarreo. Cuando el Match Factor se mantuvo en el rango óptimo de 0.98 a 1.02, el sistema operó en equilibrio. Sin embargo, en la Semana 7 el MF cayó a 0.85 (déficit de camiones para frentes activos), provocando que las palas quedaran en espera improductiva (*stand-by*); mientras que en la Semana 12 el MF subió a 1.15 al concentrarse la flota en menos accesos, provocando colas de camiones con pérdidas por consumo de combustible y tiempos muertos.»",
    trampasEvitar: "No confundir el Match Factor con la disponibilidad mecánica ni con el factor de llenado de la cuchara."
  }
];

export const equipmentFleet = [
  { equipo: "Excavadora Hidráulica CAT 390FL", cantidad: 1, capacidadCuchara: "6.0 m³ / 10.8 t", disponibilidadDiseno: "92.0%", utilizacionDiseno: "85.0%", rol: "Carguío principal de mineral y desmonte pesado" },
  { equipo: "Excavadora Hidráulica CAT 374DL", cantidad: 1, capacidadCuchara: "4.6 m³ / 8.3 t", disponibilidadDiseno: "90.0%", utilizacionDiseno: "84.0%", rol: "Carguío secundario, aperturas de banco y selectividad" },
  { equipo: "Camión Minero CAT 777F", cantidad: 5, capacidadTolva: "60.4 m³ / 96.0 t", disponibilidadDiseno: "89.0%", utilizacionDiseno: "83.0%", rol: "Acarreo a chancadora primaria (3.2 km) y botadero (2.1 km)" },
  { equipo: "Perforadora Sandvik / Atlas DM45", cantidad: 1, diametro: "6 3/4 pulg (171 mm)", disponibilidadDiseno: "88.0%", utilizacionDiseno: "80.0%", rol: "Perforación de producción en bancos de 10 m" },
  { equipo: "Tractor sobre Orugas CAT D8T", cantidad: 1, potencia: "310 HP", disponibilidadDiseno: "88.0%", utilizacionDiseno: "75.0%", rol: "Mantenimiento de botadero, frentes y desbroce" },
  { equipo: "Motoniveladora CAT 16M", cantidad: 1, anchoHoja: "4.9 m", disponibilidadDiseno: "90.0%", utilizacionDiseno: "70.0%", rol: "Mantenimiento y nivelación de pistas de acarreo" },
  { equipo: "Camión Cisterna CAT 740 (5,000 gal)", cantidad: 1, capacidad: "19,000 L", disponibilidadDiseno: "90.0%", utilizacionDiseno: "65.0%", rol: "Riego y mitigación de polvo en vías de rodadura" }
];
