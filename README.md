⚡ SimuCrisis — Simulador de Abastecimiento y Precios Proyecto Final de Programación Web I Simulador web interactivo sobre crisis económica en Bolivia
________________________________________
📋 Descripción SimuCrisis es una página web interactiva educativa que permite simular y calcular el impacto de problemas reales como el desabastecimiento de carburantes, el alza de precios en la canasta básica y el aumento del costo de transporte por bloqueos o desvíos. El proyecto no tiene posición política; su finalidad es educativa y analítica, usando modelos matemáticos simples para comprender cómo estos factores afectan a familias y comunidades.
________________________________________
🎯 Objetivo General Diseñar y desarrollar una página web interactiva con HTML5, CSS3 y JavaScript que permita simular situaciones reales de abastecimiento, precios y transporte, aplicando buenas prácticas de diseño y programación básica.
________________________________________
🧪 Simuladores incluidos ⛽ Simulador A — Reserva de Carburante Calcula cuántos días durará la reserva de una estación de servicio. Fórmula: Reserva final = reserva inicial + reabastecimiento − consumo Dato Descripción Reserva inicial Litros disponibles al inicio Consumo diario Litros despachados por día Reabastecimiento Litros recibidos por día Nivel crítico Umbral mínimo de alerta
________________________________________
🛒 Simulador B — Precios de Alimentos Calcula el impacto del alza de precios en el gasto familiar mensual. Fórmula: % de aumento = ((precio actual − precio anterior) / precio anterior) × 100 Dato Descripción Nombre del producto Ej: Arroz, Papa, Aceite Precio anterior (Bs) Precio antes del alza Precio actual (Bs) Precio actual en el mercado Cantidad por semana Unidades consumidas Número de semanas Para calcular gasto mensual
________________________________________
🚌 Simulador C — Costo de Transporte Estima el gasto adicional por desvíos o bloqueos de carretera. Fórmula: Costo adicional = (distancia con desvío − distancia normal) × costo/km Dato Descripción Distancia normal (km) Recorrido habitual Distancia con desvío (km) Recorrido por bloqueo Costo por km (Bs) Tarifa aplicada Viajes por semana Frecuencia del trayecto
________________________________________
📁 Estructura del proyecto proyecto-web-crisis/ │ ├── index.html ← Página principal (HTML5 semántico) │ ├── css/ │ └── estilos.css ← Estilos, diseño responsivo, variables │ ├── js/ │ └── script.js ← Lógica de cálculos, DOM, validaciones │ ├── img/ │ └── (imágenes del proyecto) │ └── README.md ← Este archivo
________________________________________
🧾 Casos de estudio incluidos
Simulador Datos principales Resultado esperado
1 Carburante 10,000 L / consumo 1,200 / reabast. 300 / crítico 2,000 Nivel crítico ~día 9 2 Alimentos Arroz 8→11 Bs, Papa 7→10 Bs, Aceite 12→18 Bs Aumento mensual visible 3 Transporte 10 km → 16 km / 2 Bs/km / 5 viajes/sem +60 Bs/semana
________________________________________
🛠️ Tecnologías utilizadas Tecnología Uso HTML5 Estructura semántica (header, nav, main, section, footer) CSS3 Estilos, variables, flexbox, grid, media queries JavaScript (ES6+) Cálculos, validaciones, eventos DOM Captura de datos y actualización dinámica de resultados Google Fonts Tipografías Syne + DM Sans Git Control de versiones GitHub Pages / Netlify Publicación en la web
________________________________________
✅ Requisitos técnicos cubiertos • [x] HTML5 semántico con etiquetas header, nav, main, section, article, footer • [x] CSS externo en archivo separado (css/estilos.css) • [x] JavaScript externo en archivo separado (js/script.js) • [x] Uso del DOM para capturar datos y mostrar resultados • [x] Formularios con inputs, validaciones y botón de limpiar • [x] Diseño responsivo con media queries (mobile, tablet, desktop) • [x] Paleta de colores coherente con el tema • [x] Tipografía legible y bien contrastada • [x] Resultados mostrados en pantalla (no en consola) • [x] Mensajes de alerta dinámica según el nivel de riesgo • [x] Casos de estudio con datos reales para verificar el funcionamiento • [x] Código ordenado y comentado • [x] Organización en carpetas separadas
________________________________________
🚀 Cómo ejecutar el proyecto
1.	Clona el repositorio:
2.	git clone https://github.com/tu-usuario/proyecto-web-crisis.git
3.	Abre la carpeta del proyecto:
4.	cd proyecto-web-crisis
5.	Abre index.html directamente en tu navegador, o usa una extensión como Live Server en VS Code. No requiere instalación de dependencias ni servidor backend.
________________________________________
🌐 Publicación La página está publicada en: 🔗 https://tu-usuario.github.io/proyecto-web-crisis
________________________________________
📊 Criterios de evaluación cubiertos Criterio Puntaje Contexto del problema presentado 5 pts Estructura HTML5 semántica 8 pts CSS externo aplicado correctamente 8 pts Paleta de colores coherente y legible 5 pts Diseño responsivo para diferentes pantallas 8 pts JavaScript para cálculos 10 pts DOM para capturar y mostrar datos 10 pts Formularios funcionales y claros 7 pts Resultados visibles en pantalla 7 pts Validaciones básicas de datos 5 pts Casos de estudio incluidos 8 pts Organización en carpetas 5 pts Código ordenado y comentado 5 pts README.md con descripción 4 pts Total posible 105 pts
________________________________________
👤 Créditos Materia: Programación Web I Título del proyecto: SimuCrisis — Simulador de Abastecimiento y Precios Enlace de la página web:  https://juanmauricioichuta113-dev.github.io/PROYECTO-FINAL1/
 Enlace del repositorio Git: https://github.com/juanmauricioichuta113-dev/PROYECTO-FINAL1.git 
________________________________________
Hecho con HTML5, CSS3 y JavaScript puro · Sin frameworks · Sin librerías externas

