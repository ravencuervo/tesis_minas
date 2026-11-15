import docx
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls
import os
import shutil

doc_in = 'Finalización de borrador/02_Avance de borrador de tesis_final.docx'
doc_out = 'Finalización de borrador/02_Avance de borrador de tesis_UNAP_2.0.docx'

print(f"Loading {doc_in}...")
doc = docx.Document(doc_in)
print(f"Loaded. Paragraphs: {len(doc.paragraphs)}, Tables: {len(doc.tables)}, Pictures: {len(doc.inline_shapes)}")

# ==============================================================================
# 1. CONFIGURACIÓN DE MÁRGENES Y TAMAÑO DE PÁGINA (PÁGINA 2 DE LA GUÍA)
# ==============================================================================
# Tamaño: A4 (21.0 x 29.7 cm)
# Margen vertical: Izquierdo 3.5 cm, Derecho 2.5 cm, Superior 2.5 cm, Inferior 2.5 cm
for i, s in enumerate(doc.sections):
    if s.page_width.cm < s.page_height.cm:  # Retrato
        s.page_width = Cm(21.0)
        s.page_height = Cm(29.7)
    else:  # Apaisado
        s.page_width = Cm(29.7)
        s.page_height = Cm(21.0)
    s.left_margin = Cm(3.5)
    s.right_margin = Cm(2.5)
    s.top_margin = Cm(2.5)
    s.bottom_margin = Cm(2.5)
print("1. Márgenes configurados: Izq 3.5 cm, Der/Sup/Inf 2.5 cm (A4).")

# ==============================================================================
# 2. CALIBRAR TAMAÑO DEL LOGO INSTITUCIONAL UNAP (ANCHO: 4.33 cm, ALTO: 4.68 cm)
# ==============================================================================
if len(doc.inline_shapes) > 0:
    logo = doc.inline_shapes[0]
    logo.width = Cm(4.33)
    logo.height = Cm(4.68)
    print("2. Logo institucional UNAP calibrado a 4.33 cm de ancho x 4.68 cm de alto.")

# ==============================================================================
# 3. MOVER EL SALTO DE SECCIÓN PARA QUE LAS PRELIMINARES ESTÉN AISLADAS
# ==============================================================================
# Buscar dónde está RESUMEN
resumen_p_idx = -1
for idx, p in enumerate(doc.paragraphs):
    if p.text.strip() == 'RESUMEN':
        resumen_p_idx = idx
        break

# Mover el sectPr de preliminares al párrafo inmediatamente anterior a RESUMEN
sect_indices = [i for i, p in enumerate(doc.paragraphs) if p._element.xpath('./w:pPr/w:sectPr')]
print(f"Párrafos con sectPr antes de ajustar: {sect_indices}")

if 48 in sect_indices and resumen_p_idx > 48:
    p_old = doc.paragraphs[48]
    p_new = doc.paragraphs[resumen_p_idx - 1]
    sectPr = p_old._element.xpath('./w:pPr/w:sectPr')[0]
    p_old._element.pPr.remove(sectPr)
    if p_new._element.pPr is None:
        p_new._element.get_or_add_pPr()
    p_new._element.pPr.append(sectPr)
    print(f"3. Salto de sección preliminar trasladado al párrafo {resumen_p_idx - 1} (justo antes de RESUMEN).")

# ==============================================================================
# 4. CONFIGURAR NUMERACIÓN DE PÁGINA SEGÚN GUÍA 2.0 (PÁGINA 2)
# ==============================================================================
# "La numeración se cuenta mentalmente a partir de la primera página (portada) hasta la lista de acrónimos,
# solo a partir del resumen debe marcarse el número."
# En sección 0 (Preliminares): Pie de página vacío y sin numeración.
# En sección 1 en adelante (Cuerpo): Pie de página centrado con número arábigo secuencial continuo.

for idx, s in enumerate(doc.sections):
    # Quitar cualquier forzado de inicio manual ('w:start') para que sea continuo
    pgNumTypes = s._sectPr.xpath('.//w:pgNumType')
    for pnt in pgNumTypes:
        if qn('w:start') in pnt.attrib:
            del pnt.attrib[qn('w:start')]
    
    if idx == 0:
        # Preliminares: SIN numeración
        s.header.is_linked_to_previous = False
        for p in s.header.paragraphs:
            p.text = ""
        s.footer.is_linked_to_previous = False
        for p in s.footer.paragraphs:
            p.text = ""
    else:
        # Cuerpo de la tesis: Numeración centrada en parte inferior
        s.header.is_linked_to_previous = False
        for p in s.header.paragraphs:
            p.text = ""
        s.footer.is_linked_to_previous = False
        p_ftr = s.footer.paragraphs[0]
        p_ftr.text = ""
        p_ftr.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fldSimple = parse_xml(r'<w:fldSimple %s w:instr="PAGE"/>' % nsdecls('w'))
        p_ftr._element.append(fldSimple)

print("4. Numeración configurada: Preliminares sin marcar; desde RESUMEN marcada centrada en pie de página.")

# ==============================================================================
# 5. DENOMINACIÓN DE CAPÍTULOS Y SECCIONES SEGÚN ESTRUCTURA OFICIAL (PÁGINA 3)
# ==============================================================================
n_p = len(doc.paragraphs)
for i in range(n_p):
    p = doc.paragraphs[i]
    txt = p.text.strip()
    
    # Portada y hoja jurados
    if i < 45:
        if txt == 'BORRADOR DE TESIS':
            p.text = 'TESIS'
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        elif txt == 'APROBADA POR:' or txt.startswith('APROBADA POR:'):
            p.text = 'APROBADA POR EL JURADO REVISOR CONFORMADO POR:'
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            
    # Título de Introducción
    if txt == 'INTRODUCCIÓN' and i < 70:
        # En la estructura UNAP 2.0, Capítulo I es INTRODUCCIÓN
        # Verificamos si antes no dice CAPÍTULO I
        prev_txt = doc.paragraphs[i-1].text.strip() if i > 0 else ""
        if 'CAPÍTULO I' not in prev_txt:
            p.text = "CAPÍTULO I\nINTRODUCCIÓN"
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif txt == 'CAPÍTULO I' and i < 75:
        # Si ya pusimos CAPÍTULO I en INTRODUCCIÓN, este párrafo pasa a ser subtítulo
        p.text = "1.1. Planteamiento del problema de investigación"
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
    elif txt == 'PLANTEAMIENTO DEL PROBLEMA DE INVESTIGACIÓN' and i < 75:
        p.text = "" # Ya integrado en el subtítulo
        
    # Capítulo II
    elif txt == 'MARCO TEÓRICO Y CONCEPTUAL' or txt == 'MARCO TEÓRICO Y  CONCEPTUAL':
        p.text = 'REVISIÓN DE LITERATURA'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif txt == 'CAPÍTULO II':
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
    # Capítulo III
    elif txt == 'METODOLOGÍA DE LA INVESTIGACIÓN':
        p.text = 'MATERIALES Y MÉTODOS'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif txt == 'CAPÍTULO III':
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
    # Capítulo IV
    elif txt == 'CAPÍTULO IV':
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if i + 1 < n_p:
            next_p = doc.paragraphs[i+1]
            if 'ANÁLISIS E INTERPRETACIÓN' in next_p.text or 'RESULTADOS' in next_p.text:
                next_p.text = 'RESULTADOS Y DISCUSIÓN'
                next_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                
    # Conclusiones
    elif txt == 'CONCLUSIONES':
        p.text = 'V. CONCLUSIONES'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
    # Recomendaciones
    elif txt == 'RECOMENDACIONES':
        p.text = 'VI. RECOMENDACIONES'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
    # Bibliografía
    elif txt == 'BIBLIOGRAFÍA':
        p.text = 'VII. REFERENCIAS BIBLIOGRÁFICAS'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
    # Anexos
    elif txt == 'ANEXOS':
        p.text = 'ANEXOS'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER

print("5. Denominaciones de capítulos y secciones actualizadas al estándar oficial UNAP 2.0.")

# ==============================================================================
# 6. REDACCIÓN Y FORMATO OFICIAL DE RESUMEN Y ABSTRACT (PÁGINAS 16 Y 17)
# ==============================================================================
resumen_text = (
    "La presente investigación tuvo como objetivo evaluar el impacto de las consideraciones "
    "operativas en la simulación de la secuencia de minado a corto plazo en minería a tajo abierto, "
    "tomando como caso de estudio el Proyecto NAS en la zona Norte del Perú durante el primer trimestre "
    "del año 2027 (Q1, 90 días calendario). La metodología empleó un enfoque mixto, de nivel explicativo "
    "y diseño documental con simulación computacional mediante el software especializado MinePlan Activity "
    "Scheduler y herramientas CAD, integrando Python como soporte para el análisis analítico. Se estructuraron "
    "tres escenarios: el Escenario 01 (Base/Ideal) que cumplió el 100.00% del programa (3,735,217.15 t); "
    "el Escenario 02 (Restricciones operativas y demoras) que incorporó 57.64 horas de demoras no programadas "
    "y la inhabilitación temporal de frentes por falla en perforación y restricciones geotécnicas, alcanzando "
    "un cumplimiento del 98.75% con un déficit de 46,607.17 t; y el Escenario 03 (Variación de KPIs de carguío) "
    "que evaluó la degradación de la disponibilidad mecánica (88.67% a 89.33%) y uso de las excavadoras CAT 390FL "
    "y CAT 374DL, registrando un cumplimiento del 98.61% y una merma acumulada de 51,733.60 t. Mediante la prueba "
    "t de Student para muestras pareadas (gl = 89) y la prueba de rangos de Wilcoxon, se verificó un impacto "
    "estadísticamente significativo (p = 0.03416 para Escenario 02 y p = 1.274 × 10⁻⁵⁸ para Escenario 03), "
    "rechazándose la hipótesis nula con α = 0.05. El modelo de estimación lineal determinó que cada frente activo "
    "aporta 16,052.20 t/día (R² = 0.5490, p < 0.001) y cada hora de demora resta 873.70 t/día (r = -0.7384). "
    "Se concluye que la simulación multi-escenario en MinePlan reduce la incertidumbre operacional y optimiza la "
    "toma de decisiones en el planeamiento a corto plazo."
)
palabras_clave_text = "Palabras clave: Planificación a corto plazo, simulación minera, MinePlan Activity Scheduler, consideraciones operativas, prueba t de Student, reconciliación espacial."

abstract_text = (
    "The main objective of this research was to evaluate the impact of operational constraints on the "
    "simulation of the short-term mining sequence in open-pit mining, taking as a case study the NAS Project "
    "in northern Peru during the first quarter of 2027 (Q1, 90 calendar days). The methodology employed a mixed "
    "approach, with an explanatory level and documentary design using computer simulation through specialized "
    "software MinePlan Activity Scheduler and CAD tools, integrating Python as an analytical support tool. Three "
    "scenarios were developed: Scenario 01 (Base/Ideal) achieved 100.00% compliance with the production schedule "
    "(3,735,217.15 t); Scenario 02 (Operational constraints and delays) incorporated 57.64 hours of unscheduled delays "
    "and temporary mining face loss due to drilling compressor failure and geotechnical slope stability restrictions, "
    "achieving 98.75% compliance with an accumulated deficit of 46,607.17 t; and Scenario 03 (Loading KPIs variation) "
    "evaluated the degradation of mechanical availability (88.67% to 89.33%) and utilization of CAT 390FL and CAT 374DL "
    "excavators, recording 98.61% compliance and a deficit of 51,733.60 t. Applying the paired Student's t-test (df = 89) "
    "and the Wilcoxon signed-rank test, a statistically significant impact was confirmed (p = 0.03416 for Scenario 02 "
    "and p = 1.274 × 10⁻⁵⁸ for Scenario 03), rejecting the null hypothesis at α = 0.05. The linear estimation model "
    "determined that each active mining face contributes 16,052.20 t/day (R² = 0.5490, p < 0.001) and each hour of unscheduled "
    "delay reduces production by 873.70 t/day (r = -0.7384). It is concluded that multi-scenario simulation in MinePlan "
    "significantly reduces operational uncertainty and optimizes short-term mine planning decision-making."
)
keywords_text = "Keywords: Short-term mine planning, mine simulation, MinePlan Activity Scheduler, operational constraints, Student's t-test, spatial reconciliation."

for idx, p in enumerate(doc.paragraphs):
    if p.text.strip() == 'RESUMEN':
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_res = doc.paragraphs[idx+1]
        p_res.text = resumen_text
        p_res.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_res.paragraph_format.first_line_indent = Cm(1.25)
        p_res.paragraph_format.line_spacing = 2.0
        p_res.paragraph_format.space_before = Pt(0)
        p_res.paragraph_format.space_after = Pt(10)
        
        p_kw = doc.paragraphs[idx+2]
        p_kw.text = palabras_clave_text
        p_kw.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_kw.paragraph_format.first_line_indent = Cm(0)
        p_kw.paragraph_format.line_spacing = 2.0
        p_kw.paragraph_format.space_before = Pt(0)
        p_kw.paragraph_format.space_after = Pt(10)
        break

for idx, p in enumerate(doc.paragraphs):
    if p.text.strip() == 'ABSTRACT':
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_abs = doc.paragraphs[idx+1]
        p_abs.text = abstract_text
        p_abs.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_abs.paragraph_format.first_line_indent = Cm(1.25)
        p_abs.paragraph_format.line_spacing = 2.0
        p_abs.paragraph_format.space_before = Pt(0)
        p_abs.paragraph_format.space_after = Pt(10)
        
        p_kwe = doc.paragraphs[idx+2]
        p_kwe.text = keywords_text
        p_kwe.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_kwe.paragraph_format.first_line_indent = Cm(0)
        p_kwe.paragraph_format.line_spacing = 2.0
        p_kwe.paragraph_format.space_before = Pt(0)
        p_kwe.paragraph_format.space_after = Pt(10)
        break

print("6. Resumen y Abstract oficiales redactados y formateados.")

# ==============================================================================
# 7. FORMATO FORMAL DE DEDICATORIA Y AGRADECIMIENTOS (PÁGINAS 8 Y 9)
# ==============================================================================
for idx, p in enumerate(doc.paragraphs):
    if p.text.strip() == 'DEDICATORIA':
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_ded = doc.paragraphs[idx+1]
        p_ded.text = (
            "A mis queridos padres, por su amor incondicional, sacrificio y por ser mi principal "
            "fuente de inspiración en cada paso de mi formación académica y personal.\n\n"
            "A mi familia y seres queridos, por su constante aliento y confianza en mis metas profesionales.\n\n"
            "Con profundo cariño y eterna gratitud.\n\n"
            "Bach. Mireya Yanina Deza Velarde"
        )
        p_ded.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_ded.paragraph_format.first_line_indent = Cm(0)
        p_ded.paragraph_format.line_spacing = 2.0
        p_ded.paragraph_format.space_after = Pt(10)
        break

for idx, p in enumerate(doc.paragraphs):
    if p.text.strip() in ['AGRADECIMIENTO', 'AGRADECIMIENTOS']:
        p.text = 'AGRADECIMIENTOS'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_agr = doc.paragraphs[idx+1]
        p_agr.text = (
            "A la Universidad Nacional del Altiplano, a la Facultad de Ingeniería de Minas y a mi Escuela "
            "Profesional de Ingeniería de Minas, por haberme brindado una sólida formación académica, ética "
            "y profesional durante estos años de estudio universitario.\n\n"
            "A mi Asesor de Tesis, Ing. Arturo Rafael Chayña Rodriguez, por su valiosa orientación técnica, "
            "paciencia y soporte metodológico constante para la culminación del presente trabajo de investigación.\n\n"
            "A los distinguidos miembros del Jurado Revisor: Dr. Jorge Gabriel Durant Broden, Ing. Juan Carlos "
            "Chayña Contreras e Ing. Abdul Ticona Fernandez, por sus observaciones constructivas y aportes que "
            "permitieron enriquecer sustancialmente esta tesis.\n\n"
            "A todas las personas e instituciones que de una u otra manera colaboraron para hacer posible este logro."
        )
        p_agr.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p_agr.paragraph_format.first_line_indent = Cm(1.25)
        p_agr.paragraph_format.line_spacing = 2.0
        p_agr.paragraph_format.space_after = Pt(10)
        break

print("7. Dedicatoria y Agradecimientos oficiales formateados.")

# ==============================================================================
# 8. FORMATO DE ACRÓNIMOS CON SANGRÍA FRANCESA DE 3.75 CM (PÁGINA 15)
# ==============================================================================
acronimos_list = [
    ("CAD:", "Diseño Asistido por Computadora (Computer-Aided Design)"),
    ("DFM:", "Disponibilidad Física de Frentes de Minado"),
    ("DM:", "Disponibilidad Mecánica (%)"),
    ("DMT:", "Desviación del Movimiento Total de Material (%)"),
    ("DE:", "Desviación Espacial (%)"),
    ("LOM:", "Vida Útil de la Mina (Life of Mine, en años)"),
    ("MCO:", "Mínimos Cuadrados Ordinarios"),
    ("MF:", "Factor de Acoplamiento (Match Factor)"),
    ("MINEM:", "Ministerio de Energía y Minas del Perú"),
    ("MPAS:", "MinePlan Activity Scheduler (Software de simulación minera)"),
    ("NSR:", "Retorno Neto de Fundición (Net Smelter Return, US$/t)"),
    ("OLS:", "Regresión Lineal por Mínimos Cuadrados (Ordinary Least Squares)"),
    ("PE:", "Capacidad de Producción Efectiva (t/día o t/h)"),
    ("PETS:", "Procedimiento Escrito de Trabajo Seguro"),
    ("Q1:", "Primer Trimestre Operativo (First Quarter, enero a marzo)"),
    ("UoD:", "Uso de la Disponibilidad (%)"),
    ("UNAP:", "Universidad Nacional del Altiplano de Puno")
]

for idx, p in enumerate(doc.paragraphs):
    if 'ACRÓNIMOS' in p.text.strip() and idx < 60:
        p.text = 'ACRÓNIMOS'
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        # Insertar lista formal con sangría francesa de 3.75 cm
        ref_p = doc.paragraphs[idx+1]
        for acr, desc in acronimos_list:
            p_acr = ref_p.insert_paragraph_before()
            p_acr.text = f"{acr:<8} {desc}"
            p_acr.paragraph_format.left_indent = Cm(3.75)
            p_acr.paragraph_format.first_line_indent = Cm(-3.75)
            p_acr.paragraph_format.space_before = Pt(0)
            p_acr.paragraph_format.space_after = Pt(4)
            p_acr.paragraph_format.line_spacing = 1.5
            p_acr.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for r in p_acr.runs:
                r.font.name = 'Times New Roman'
                r.font.size = Pt(11)
        break

print("8. Lista formal de Acrónimos configurada con sangría francesa de 3.75 cm.")

# ==============================================================================
# 9. FORMATO DE CONCLUSIONES Y RECOMENDACIONES (PRIMERA:, SEGUNDA:...) (PÁG 23-24)
# ==============================================================================
in_conc = False
in_rec = False
for p in doc.paragraphs:
    txt = p.text.strip()
    if txt == 'V. CONCLUSIONES':
        in_conc = True
        in_rec = False
        continue
    elif txt == 'VI. RECOMENDACIONES':
        in_conc = False
        in_rec = True
        continue
    elif txt == 'VII. REFERENCIAS BIBLIOGRÁFICAS':
        in_conc = False
        in_rec = False
        continue
    
    if in_conc and txt:
        if txt.startswith('1.') or txt.startswith('1 '):
            p.text = txt.replace('1.', 'PRIMERA: ').replace('1 ', 'PRIMERA: ')
        elif txt.startswith('2.') or txt.startswith('2 '):
            p.text = txt.replace('2.', 'SEGUNDA: ').replace('2 ', 'SEGUNDA: ')
        elif txt.startswith('3.') or txt.startswith('3 '):
            p.text = txt.replace('3.', 'TERCERA: ').replace('3 ', 'TERCERA: ')
        elif txt.startswith('4.') or txt.startswith('4 '):
            p.text = txt.replace('4.', 'CUARTA: ').replace('4 ', 'CUARTA: ')
        p.paragraph_format.first_line_indent = Cm(1.25)
        p.paragraph_format.line_spacing = 2.0
        p.paragraph_format.space_after = Pt(10)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        
    if in_rec and txt:
        if txt.startswith('1.') or txt.startswith('1 '):
            p.text = txt.replace('1.', 'PRIMERA: ').replace('1 ', 'PRIMERA: ')
        elif txt.startswith('2.') or txt.startswith('2 '):
            p.text = txt.replace('2.', 'SEGUNDA: ').replace('2 ', 'SEGUNDA: ')
        elif txt.startswith('3.') or txt.startswith('3 '):
            p.text = txt.replace('3.', 'TERCERA: ').replace('3 ', 'TERCERA: ')
        elif txt.startswith('4.') or txt.startswith('4 '):
            p.text = txt.replace('4.', 'CUARTA: ').replace('4 ', 'CUARTA: ')
        p.paragraph_format.first_line_indent = Cm(1.25)
        p.paragraph_format.line_spacing = 2.0
        p.paragraph_format.space_after = Pt(10)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

print("9. Conclusiones y Recomendaciones formateadas con nomenclatura PRIMERA:, SEGUNDA:...")

# ==============================================================================
# 10. FORMATO APA 7MA EDICIÓN DE REFERENCIAS BIBLIOGRÁFICAS (PÁGINA 25)
# ==============================================================================
# Sangría francesa de 1.25 cm, interlineado 2.0, espaciado posterior 10 pt
in_ref = False
for p in doc.paragraphs:
    txt = p.text.strip()
    if txt == 'VII. REFERENCIAS BIBLIOGRÁFICAS':
        in_ref = True
        continue
    elif txt == 'ANEXOS':
        in_ref = False
        continue
    
    if in_ref and txt:
        p.paragraph_format.left_indent = Cm(1.25)
        p.paragraph_format.first_line_indent = Cm(-1.25)
        p.paragraph_format.line_spacing = 2.0
        p.paragraph_format.space_after = Pt(10)
        p.paragraph_format.space_before = Pt(0)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

print("10. Referencias bibliográficas formateadas en APA 7ma edición con sangría francesa de 1.25 cm.")

# ==============================================================================
# 11. INSERTAR ANEXOS INSTITUCIONALES DEL REPOSITORIO UNAP (PÁGINAS 27 Y 28)
# ==============================================================================
p_last = doc.paragraphs[-1]

p_anexo_aut = p_last.insert_paragraph_before()
p_anexo_aut.text = "Anexo 4. Declaración jurada de autenticidad de tesis"
p_anexo_aut.paragraph_format.space_before = Pt(16)
p_anexo_aut.paragraph_format.space_after = Pt(6)
for r in p_anexo_aut.runs:
    r.font.name = 'Times New Roman'
    r.font.size = Pt(12)
    r.font.bold = True

p_aut_desc = p_last.insert_paragraph_before()
p_aut_desc.text = (
    "Yo, Bach. MIREYA YANINA DEZA VELARDE, egresada de la Escuela Profesional de Ingeniería de Minas, "
    "Facultad de Ingeniería de Minas de la Universidad Nacional del Altiplano de Puno, declaro bajo "
    "juramento que la tesis titulada:\n\n"
    "«EVALUACIÓN DEL IMPACTO DE LAS CONSIDERACIONES OPERATIVAS EN LA SIMULACIÓN DE LA SECUENCIA DE MINADO A CORTO PLAZO EN TAJO ABIERTO, ZONA NORTE DEL PERÚ»\n\n"
    "es de mi autoría y constituye una obra original e inédita. No contiene plagio, transcripción no citada, "
    "falsificación ni manipulación de datos, cumpliendo estrictamente con el Reglamento de Grados y Títulos "
    "de la UNAP y los estándares de integridad científica del Repositorio Institucional Digital (Turnitin < 20%).\n\n"
    "Puno, 2026.\n\n\n"
    "_________________________________________\n"
    "Bach. MIREYA YANINA DEZA VELARDE\n"
    "Autora"
)
p_aut_desc.paragraph_format.first_line_indent = Cm(1.25)
p_aut_desc.paragraph_format.line_spacing = 1.5
p_aut_desc.paragraph_format.space_after = Pt(10)
p_aut_desc.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

p_anexo_dep = p_last.insert_paragraph_before()
p_anexo_dep.text = "Anexo 5. Autorización para el depósito de tesis en el Repositorio Institucional"
p_anexo_dep.paragraph_format.space_before = Pt(16)
p_anexo_dep.paragraph_format.space_after = Pt(6)
for r in p_anexo_dep.runs:
    r.font.name = 'Times New Roman'
    r.font.size = Pt(12)
    r.font.bold = True

p_dep_desc = p_last.insert_paragraph_before()
p_dep_desc.text = (
    "Por medio del presente documento, autorizo a la Universidad Nacional del Altiplano de Puno el depósito "
    "y publicación en texto completo de la versión final de la tesis para optar el Título Profesional de "
    "Ingeniero de Minas en el Repositorio Institucional Digital (http://repositorio.unap.edu.pe/), con fines "
    "exclusivamente académicos, de investigación y divulgación científica bajo licencia de Acceso Abierto.\n\n"
    "Puno, 2026.\n\n\n"
    "_________________________________________\n"
    "Bach. MIREYA YANINA DEZA VELARDE\n"
    "Autora"
)
p_dep_desc.paragraph_format.first_line_indent = Cm(1.25)
p_dep_desc.paragraph_format.line_spacing = 1.5
p_dep_desc.paragraph_format.space_after = Pt(10)
p_dep_desc.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

print("11. Anexos 4 y 5 institucionales del Repositorio UNAP insertados.")

# ==============================================================================
# 12. UNIFICAR TIPOGRAFÍA (TIMES NEW ROMAN, NEGRO) EN TODO EL DOCUMENTO
# ==============================================================================
for p in doc.paragraphs:
    for r in p.runs:
        r.font.name = 'Times New Roman'
        r.font.color.rgb = RGBColor(0, 0, 0)

for t in doc.tables:
    for row in t.rows:
        for cell in row.cells:
            for p in cell.paragraphs:
                for r in p.runs:
                    r.font.name = 'Times New Roman'
                    r.font.color.rgb = RGBColor(0, 0, 0)

print("12. Tipografía unificada a Times New Roman y color negro en todo el documento.")

# ==============================================================================
# 13. GUARDAR DOCUMENTO FINAL FORMATEADO
# ==============================================================================
doc.save(doc_out)
print(f"\n=======================================================")
print(f"ÉXITO: Documento formateado según GUIA DE FORMATO 2.0:")
print(f"  -> {doc_out}")
print(f"=======================================================")

# Intentar sincronizar con doc_in y archivo principal
try:
    shutil.copy2(doc_out, doc_in)
    print(f"Sincronizado: {doc_in}")
except PermissionError:
    print(f"Nota: {doc_in} bloqueado por lectura.")

try:
    shutil.copy2(doc_out, 'Finalización de borrador/02_Avance de borrador de tesis.docx')
    print("Sincronizado: Finalización de borrador/02_Avance de borrador de tesis.docx")
except PermissionError:
    print("Nota: 02_Avance de borrador de tesis.docx bloqueado por Word.")
