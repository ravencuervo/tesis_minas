# 🎓 Guía Interactiva de Metodología & Defensa de Tesis
### Tesis Altiplánica — Consultoría de Tesis & Estadística

Plataforma web interactiva desarrollada en **React + Vite + Tailwind CSS** diseñada para guiar a la tesista **Bach. Mireya Yanina Deza Velarde** en la comprensión metodológica, modelamiento en **MinePlan Activity Scheduler (MPAS)**, análisis estadístico inferencial y preparación para la sustentación ante el jurado revisor de la **Universidad Nacional del Altiplano - Puno (UNAP)**.

---

## 📌 Tesis de Investigación
- **Título:** *«Evaluación del impacto de las consideraciones operativas en la simulación de la secuencia de minado a corto plazo en tajo abierto, zona Norte del Perú»*
- **Autora:** Bach. Mireya Yanina Deza Velarde
- **Asesor:** Ing. Arturo Rafael Chayña Rodriguez
- **Institución:** Escuela Profesional de Ingeniería de Minas, Facultad de Ingeniería de Minas, UNAP
- **Caso de Estudio:** Proyecto NAS (Norte del Perú) — Primer Trimestre 2027 (Q1, 90 días calendario)

---

## 🚀 Módulos Interactivos de la Aplicación

1. **Resumen & Matriz de Consistencia:** Visión ejecutiva del problema minero, resumen de la investigación y matriz interactiva alineando preguntas, objetivos, hipótesis y conclusiones estadísticas.
2. **Fórmulas de Minado & Calculadora:** Ecuaciones de Taylor, Regla de Long ($LOM$), Retorno Neto de Fundición ($NSR$), ciclo total de acarreo y una **calculadora interactiva de Factor de Acoplamiento (*Match Factor*)** con estimación de productividad en tiempo real.
3. **Simulación en MinePlan Activity Scheduler:** Flujograma metodológico paso a paso (Figura 10) con explicación de precedencias verticales, ancho mínimo de 35 m, criterios geotécnicos y despacho.
4. **Datos & Reconciliación Semanal:** Tabla interactiva de las 13 semanas operativas comparando el Plan Base frente al Escenario 02 (demoras) y Escenario 03 (KPIs carguío), con alertas en las semanas críticas 7 y 12.
5. **Galería de 10 Figuras a 300 DPI:** Visor en alta resolución con zoom interactivo de las 10 figuras generadas en Python, acompañado de dos fichas: *¿Qué muestra este gráfico?* y *¿Cómo defenderlo e interpretarlo ante el Jurado?*.
6. **Núcleo Estadístico & Contrastación:** Explicación detallada de la prueba $t$ de Student pareada ($gl = 89, p < 0.05$), prueba no paramétrica de Wilcoxon, verificación de normalidad (Shapiro-Wilk), regresiones lineales OLS (frentes y demoras) y la guía del $p$-valor.
7. **Balotario del Jurado (Simulador de Sustentación):** Acordeón interactivo con las preguntas más exigentes formuladas por el Dr. Durant, Ing. Chayña e Ing. Ticona, con respuestas maestras recomendadas y trampas comunes a evitar.
8. **Descargas & Recursos:** Acceso y descarga de la tesis en Word con formato UNAP 2.0, datasets en CSV, figuras en alta resolución y scripts en Python.

---

## 🛠️ Tecnologías Utilizadas
- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (Iconografía técnica y moderna)
- **Identidad Gráfica:** Paleta corporativa de Tesis Altiplánica (`#0052FF`, `#020618`, `#62748E`, `#8FCEFF`)

---

## 💻 Instrucciones para Ejecutar en Local

### 1. Clonar o abrir el repositorio
```bash
cd frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible inmediatamente en `http://localhost:5173/`.

### 4. Generar el Build de Producción
```bash
npm run build
```
Los archivos optimizados y listos para distribución se generarán en la carpeta `dist/`.

---

## 🌐 Despliegue en GitHub Pages / Vercel
Este frontend está listo para ser subido a GitHub y desplegado en un solo clic en plataformas gratuitas como **Vercel**, **Netlify** o **GitHub Pages**:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

*Desarrollado para Tesis Altiplánica — Consultoría de Tesis & Estadística.*
