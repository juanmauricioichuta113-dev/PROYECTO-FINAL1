/* =====================================================
    SimuCrisis — script.js
    Proyecto Final de Programación Web I
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MENÚ HAMBURGUESA RESPONSIVO
    // ==========================================
    const hamburger = document.getElementById("hamburger");
    const mainNav = document.getElementById("mainNav");

    if (hamburger && mainNav) {
        hamburger.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            hamburger.classList.toggle("open");
        });

        // Cerrar menú al hacer clic en un enlace (ideal para móviles)
        const navLinks = mainNav.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
                hamburger.classList.remove("open");
                
                // Actualizar clase activa visual
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            });
        });
    }

    // ==========================================
    // 2. SISTEMA DE PESTAÑAS (TABS)
    // ==========================================
    const tabs = document.querySelectorAll(".sim-tab");
    const panels = document.querySelectorAll(".sim-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetTab = tab.getAttribute("data-tab");

            // Alternar estado activo en botones de pestañas
            tabs.forEach(t => t.classList.remove("active"));
            tab.add("active");

            // Alternar visibilidad de paneles
            panels.forEach(panel => {
                if (panel.id === `panel-${targetTab}`) {
                    panel.classList.add("active");
                } else {
                    panel.classList.remove("active");
                }
            });
        });
    });

    // ==========================================
    // 3. SIMULADOR A: RESERVA DE CARBURANTE
    // ==========================================
    const btnCombustible = document.getElementById("btnCombustible");
    if (btnCombustible) {
        btnCombustible.addEventListener("click", calcularCombustible);
    }

    function calcularCombustible() {
        // Inputs
        const resInicial = parseFloat(document.getElementById("reservaInicial").value);
        const consDiario = parseFloat(document.getElementById("consumoDiario").value);
        const reabastecimiento = parseFloat(document.getElementById("reabastecimiento").value);
        const nivCritico = parseFloat(document.getElementById("nivelCritico").value);
        
        // Limpiar errores previos
        limpiarErrores(["reservaInicial", "consumoDiario", "reabastecimiento", "nivelCritico"]);

        let valid = true;

        // Validaciones minuciosas
        if (isNaN(resInicial) || resInicial <= 0) { mostrarError("reservaInicial", "Ingrese una reserva válida mayor a 0."); valid = false; }
        if (isNaN(consDiario) || consDiario <= 0) { mostrarError("consumoDiario", "Ingrese un consumo válido mayor a 0."); valid = false; }
        if (isNaN(reabastecimiento) || reabastecimiento < 0) { mostrarError("reabastecimiento", "El reabastecimiento no puede ser negativo."); valid = false; }
        if (isNaN(nivCritico) || nivCritico < 0) { mostrarError("nivelCritico", "El nivel crítico no puede ser negativo."); valid = false; }
        
        if (resInicial <= nivCritico) {
            mostrarError("reservaInicial", "La reserva inicial debe ser mayor al nivel crítico.");
            valid = false;
        }

        if (!valid) return;

        const resultadoCol = document.getElementById("resultadoCombustible");
        
        // Modelo matemático dinámico (Simulación día por día)
        let dias = 0;
        let reservaActual = resInicial;
        const balanceDiario = reabastecimiento - consDiario;

        if (balanceDiario >= 0) {
            // Caso donde el reabastecimiento es igual o mayor al consumo
            resultadoCol.innerHTML = `
                <div class="result-header">
                    <h4>Análisis de Abastecimiento</h4>
                    <span class="status-badge status-normal">Estable</span>
                </div>
                <div class="result-body">
                    <p>La estación se encuentra en un estado <strong>Sostenible</strong>. El reabastecimiento diario (${reabastecimiento} L) cubre o supera el consumo diario (${consDiario} L), impidiendo que la reserva descienda al nivel crítico.</p>
                </div>
            `;
            return;
        }

        // Iteración matemática para determinar el día exacto del colapso
        while (reservaActual > nivCritico && dias < 365) {
            reservaActual += balanceDiario; // Restará litros neto debido al flujo negativo
            dias++;
        }

        // Determinar nivel de severidad para pintar la alerta contextual
        let statusClass = "status-warning";
        let statusText = "Advertencia";
        if (dias <= 3) {
            statusClass = "status-critical";
            statusText = "Crítico";
        } else if (dias > 10) {
            statusClass = "status-normal";
            statusText = "Aceptable";
        }

        resultadoCol.innerHTML = `
            <div class="result-header">
                <h4>Análisis de Abastecimiento</h4>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="result-body" style="display: flex; flex-direction: column; gap: 16px;">
                <p>Al ritmo de consumo actual, la reserva caerá por debajo del nivel crítico en aproximadamente <strong>${dias} días</strong>.</p>
                <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid var(--border)">
                    <small style="display:block; color: var(--text-secondary)">Déficit neto diario:</small>
                    <span style="color: var(--danger); font-weight: bold;">${Math.abs(balanceDiario)} Litros/día</span>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 4. SIMULADOR B: PRECIOS DE ALIMENTOS
    // ==========================================
    const btnAgregarProducto = document.getElementById("btnAgregarProducto");
    const btnAlimentos = document.getElementById("btnAlimentos");
    const productosList = document.getElementById("productosList");
    let productoIndex = 1;

    if (btnAgregarProducto) {
        btnAgregarProducto.addEventListener("click", () => {
            const newRow = document.createElement("div");
            newRow.className = "producto-row";
            newRow.setAttribute("data-index", productoIndex);
            newRow.innerHTML = `
                <div class="producto-header">
                    <span>Producto ${productoIndex + 1}</span>
                    <button type="button" class="btn-remove-producto" onclick="eliminarProducto(this)">✕</button>
                </div>
                <div class="producto-fields">
                    <div class="field-group">
                        <label>Nombre del producto</label>
                        <input type="text" class="prod-nombre" placeholder="Ej: Papa" />
                    </div>
                    <div class="field-row-2">
                        <div class="field-group">
                            <label>Precio anterior (Bs)</label>
                            <input type="number" class="prod-precio-ant" placeholder="Ej: 7" min="0" step="0.01" />
                        </div>
                        <div class="field-group">
                            <label>Precio actual (Bs)</label>
                            <input type="number" class="prod-precio-act" placeholder="Ej: 10" min="0" step="0.01" />
                        </div>
                    </div>
                    <div class="field-row-2">
                        <div class="field-group">
                            <label>Cantidad por semana</label>
                            <input type="number" class="prod-cantidad" placeholder="Ej: 2" min="1" />
                        </div>
                        <div class="field-group">
                            <label>Número de semanas</label>
                            <input type="number" class="prod-semanas" placeholder="Ej: 4" min="1" />
                        </div>
                    </div>
                </div>
            `;
            productosList.appendChild(newRow);
            productoIndex++;
        });
    }

    if (btnAlimentos) {
        btnAlimentos.addEventListener("click", calcularAlimentos);
    }

    function calcularAlimentos() {
        const rows = document.querySelectorAll(".producto-row");
        let totalGastoAnterior = 0;
        let totalGastoActual = 0;
        let erroresEncontrados = false;

        rows.forEach(row => {
            const inputNombre = row.querySelector(".prod-nombre");
            const inputAnt = row.querySelector(".prod-precio-ant");
            const inputAct = row.querySelector(".prod-precio-act");
            const inputCant = row.querySelector(".prod-cantidad");
            const inputSem = row.querySelector(".prod-semanas");

            // Resetear estilos de error previos
            [inputNombre, inputAnt, inputAct, inputCant, inputSem].forEach(i => i.classList.remove("error-input"));

            const nombre = inputNombre.value.trim();
            const pAnt = parseFloat(inputAnt.value);
            const pAct = parseFloat(inputAct.value);
            const cant = parseFloat(inputCant.value);
            const sem = parseInt(inputSem.value);

            if (!nombre || isNaN(pAnt) || pAnt <= 0 || isNaN(pAct) || pAct <= 0 || isNaN(cant) || cant <= 0 || isNaN(sem) || sem <= 0) {
                // Marcar inputs conflictivos visualmente
                if (!nombre) inputNombre.classList.add("error-input");
                if (isNaN(pAnt) || pAnt <= 0) inputAnt.classList.add("error-input");
                if (isNaN(pAct) || pAct <= 0) inputAct.classList.add("error-input");
                if (isNaN(cant) || cant <= 0) inputCant.classList.add("error-input");
                if (isNaN(sem) || sem <= 0) inputSem.classList.add("error-input");
                erroresEncontrados = true;
            } else {
                totalGastoAnterior += (pAnt * cant * sem);
                totalGastoActual += (pAct * cant * sem);
            }
        });

        if (erroresEncontrados) {
            alert("Por favor rellene todos los campos de los productos con valores numéricos positivos.");
            return;
        }

        const diferenciaGasto = totalGastoActual - totalGastoAnterior;
        const inflacionCanasta = ((totalGastoActual - totalGastoAnterior) / totalGastoAnterior) * 100;

        let statusClass = "status-normal";
        let statusText = "Estable";
        if (inflacionCanasta > 30) {
            statusClass = "status-critical";
            statusText = "Impacto Alto";
        } else if (inflacionCanasta > 10) {
            statusClass = "status-warning";
            statusText = "Moderado";
        }

        const resultadoCol = document.getElementById("resultadoAlimentos");
        resultadoCol.innerHTML = `
            <div class="result-header">
                <h4>Pérdida del Poder Adquisitivo</h4>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="result-body" style="display:flex; flex-direction:column; gap:14px;">
                <p>El incremento global ponderado en tu cesta simulada es del <strong>${inflacionCanasta.toFixed(1)}%</strong>.</p>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    <div style="background:rgba(255,255,255,0.02); padding:10px; border-radius:6px; border:1px solid var(--border)">
                        <small style="color:var(--text-secondary)">Gasto Anterior</small>
                        <div style="font-weight:bold; font-size:1.1rem">${totalGastoAnterior.toFixed(2)} Bs</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.02); padding:10px; border-radius:6px; border:1px solid var(--border)">
                        <small style="color:var(--text-secondary)">Gasto Actual</small>
                        <div style="font-weight:bold; font-size:1.1rem">${totalGastoActual.toFixed(2)} Bs</div>
                    </div>
                </div>
                <div style="background:var(--accent-dim); border:1px solid rgba(245,200,66,0.3); padding:12px; border-radius:8px; text-align:center;">
                    <small style="color:var(--accent); display:block; text-transform:uppercase; font-size:0.75rem; font-weight:700;">Sobrecosto Mensual Requerido</small>
                    <span style="font-size:1.5rem; font-weight:800; color:var(--text-primary)">+ ${diferenciaGasto.toFixed(2)} Bs</span>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 5. SIMULADOR C: COSTO DE TRANSPORTE
    // ==========================================
    const btnTransporte = document.getElementById("btnTransporte");
    if (btnTransporte) {
        btnTransporte.addEventListener("click", calcularTransporte);
    }

    function calcularTransporte() {
        const distNormal = parseFloat(document.getElementById("distNormal").value);
        const distDesvio = parseFloat(document.getElementById("distDesvio").value);
        const costoPorKm = parseFloat(document.getElementById("costoPorKm").value);
        const viajesSemana = parseInt(document.getElementById("viajesSemana").value);

        limpiarErrores(["distNormal", "distDesvio", "costoPorKm", "viajesSemana"]);
        let valid = true;

        if (isNaN(distNormal) || distNormal <= 0) { mostrarError("distNormal", "Ingrese una distancia válida."); valid = false; }
        if (isNaN(distDesvio) || distDesvio <= 0) { mostrarError("distDesvio", "Ingrese una distancia válida."); valid = false; }
        if (isNaN(costoPorKm) || costoPorKm <= 0) { mostrarError("costoPorKm", "Ingrese un precio/km válido."); valid = false; }
        if (isNaN(viajesSemana) || viajesSemana <= 0) { mostrarError("viajesSemana", "Mínimo 1 viaje."); valid = false; }

        if (distDesvio < distNormal) {
            mostrarError("distDesvio", "La distancia con desvío debe ser igual o mayor a la normal.");
            valid = false;
        }

        if (!valid) return;

        // Fórmulas matemáticas básicas del modelo de transporte
        const costoNormalSemana = distNormal * costoPorKm * viajesSemana;
        const costoDesvioSemana = distDesvio * costoPorKm * viajesSemana;
        const sobrecostoSemana = costoDesvioSemana - costoNormalSemana;
        const sobrecostoMensual = sobrecostoSemana * 4;

        let statusClass = "status-normal";
        let statusText = "Leve";
        if (sobrecostoMensual > 150) {
            statusClass = "status-critical";
            statusText = "Impacto Severo";
        } else if (sobrecostoMensual > 50) {
            statusClass = "status-warning";
            statusText = "Moderado";
        }

        const resultadoCol = document.getElementById("resultadoTransporte");
        resultadoCol.innerHTML = `
            <div class="result-header">
                <h4>Sobrecosto Logístico</h4>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="result-body" style="display:flex; flex-direction:column; gap:14px;">
                <p>El bloqueo o desvío operacional incrementa el recorrido en un <strong>${(((distDesvio - distNormal) / distNormal) * 100).toFixed(0)}%</strong> por viaje.</p>
                <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:6px; border:1px solid var(--border)">
                    <small style="color:var(--text-secondary); display:block">Impacto Semanal:</small>
                    <strong style="font-size:1.1rem; color:var(--warning)">+ ${sobrecostoSemana.toFixed(2)} Bs / semana</strong>
                </div>
                <div style="background:rgba(66, 135, 245, 0.15); border:1px solid rgba(66, 135, 245, 0.4); padding:12px; border-radius:8px; text-align:center;">
                    <small style="color:#6ea4f5; display:block; text-transform:uppercase; font-size:0.75rem; font-weight:700;">Proyección de Pérdida Mensual</small>
                    <span style="font-size:1.5rem; font-weight:800;">${sobrecostoMensual.toFixed(2)} Bs</span>
                </div>
            </div>
        `;
    }

    // ==========================================
    // 6. ANIMACIÓN DE NÚMEROS (CONTADORES HERO)
    // ==========================================
    const stats = document.querySelectorAll(".stat-num");
    stats.forEach(stat => {
        const target = +stat.getAttribute("data-target");
        const speed = 40; // Menor número = más rápido
        const updateCount = () => {
            const count = +stat.innerText;
            const inc = Math.ceil(target / speed);
            if (count < target) {
                stat.innerText = count + inc > target ? target : count + inc;
                setTimeout(updateCount, 30);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });

    // ==========================================
    // HELPER FUNCTIONS (Validación y errores)
    // ==========================================
    function mostrarError(idElemento, mensaje) {
        const input = document.getElementById(idElemento);
        const errSpan = document.getElementById(`err-${idElemento}`);
        if (input) input.classList.add("error-input");
        if (errSpan) errSpan.textContent = mensaje;
    }

    function limpiarErrores(listaIds) {
        listaIds.forEach(id => {
            const input = document.getElementById(id);
            const errSpan = document.getElementById(`err-${id}`);
            if (input) input.classList.remove("error-input");
            if (errSpan) errSpan.textContent = "";
        });
    }
});

// ==========================================
// 7. ELIMINACIÓN DE PRODUCTO DINÁMICO (Scope global necesario para onclick inline)
// ==========================================
window.eliminarProducto = function(button) {
    const row = button.closest(".producto-row");
    if (row) {
        row.remove();
    }
};

// ==========================================
// 8. CARGA AUTOMÁTICA DE CASOS DE ESTUDIO
// ==========================================
window.cargarCaso = function(casoTipo) {
    // Redirección y activación visual de los simuladores correspondientes
    const tabs = document.querySelectorAll(".sim-tab");
    const panels = document.querySelectorAll(".sim-panel");

    if (casoTipo === "combustible1") {
        activarPestana("combustible", tabs, panels);
        document.getElementById("reservaInicial").value = 10000;
        document.getElementById("consumoDiario").value = 1200;
        document.getElementById("reabastecimiento").value = 300;
        document.getElementById("nivelCritico").value = 2000;
        document.getElementById("btnCombustible").click();
    } 
    else if (casoTipo === "alimentos1") {
        activarPestana("alimentos", tabs, panels);
        // Limpiar lista y restablecerla con los datos del Caso 2
        const lista = document.getElementById("productosList");
        lista.innerHTML = ""; 
        
        const datosCaso = [
            { nombre: "Arroz", ant: 8, act: 11, cant: 3, sem: 4 },
            { nombre: "Papa", ant: 7, act: 10, cant: 2, sem: 4 },
            { nombre: "Aceite", ant: 12, act: 18, cant: 1, sem: 4 }
        ];

        datosCaso.forEach((prod, index) => {
            const row = document.createElement("div");
            row.className = "producto-row";
            row.setAttribute("data-index", index);
            row.innerHTML = `
                <div class="producto-header">
                    <span>Producto: ${prod.nombre}</span>
                    <button type="button" class="btn-remove-producto" onclick="eliminarProducto(this)" ${index === 0 ? 'style="display:none"' : ''}>✕</button>
                </div>
                <div class="producto-fields">
                    <div class="field-group">
                        <label>Nombre del producto</label>
                        <input type="text" class="prod-nombre" value="${prod.nombre}" />
                    </div>
                    <div class="field-row-2">
                        <div class="field-group">
                            <label>Precio anterior (Bs)</label>
                            <input type="number" class="prod-precio-ant" value="${prod.ant}" step="0.01" />
                        </div>
                        <div class="field-group">
                            <label>Precio actual (Bs)</label>
                            <input type="number" class="prod-precio-act" value="${prod.act}" step="0.01" />
                        </div>
                    </div>
                    <div class="field-row-2">
                        <div class="field-group">
                            <label>Cantidad por semana</label>
                            <input type="number" class="prod-cantidad" value="${prod.cant}" />
                        </div>
                        <div class="field-group">
                            <label>Número de semanas</label>
                            <input type="number" class="prod-semanas" value="${prod.sem}" />
                        </div>
                    </div>
                </div>
            `;
            lista.appendChild(row);
        });
        document.getElementById("btnAlimentos").click();
    } 
    else if (casoTipo === "transporte1") {
        activarPestana("transporte", tabs, panels);
        document.getElementById("distNormal").value = 10;
        document.getElementById("distDesvio").value = 16;
        document.getElementById("costoPorKm").value = 2;
        document.getElementById("viajesSemana").value = 5;
        document.getElementById("btnTransporte").click();
    }

    // Scroll suave hasta la vista del simulador para apreciar el resultado cargado
    document.getElementById("simuladores").scrollIntoView({ behavior: "smooth" });
};

function activarPestana(tipo, tabs, panels) {
    tabs.forEach(t => {
        if (t.getAttribute("data-tab") === tipo) t.classList.add("active");
        else t.classList.remove("active");
    });
    panels.forEach(p => {
        if (p.id === `panel-${tipo}`) p.classList.add("active");
        else p.classList.remove("active");
    });
}

// ==========================================
// 9. REINICIO DE FORMULARIOS (FUNCIONES LIMPIAR)
// ==========================================
window.limpiarCombustible = function() {
    const resCol = document.getElementById("resultadoCombustible");
    resCol.innerHTML = `
        <div class="result-placeholder">
            <span class="placeholder-icon">⛽</span>
            <p>Ingresa los datos y presiona <strong>Calcular</strong> para ver el análisis de reserva.</p>
        </div>
    `;
    const inputs = document.getElementById("formCombustible").querySelectorAll("input");
    inputs.forEach(i => { i.value = ""; i.classList.remove("error-input"); });
    const errors = document.getElementById("formCombustible").querySelectorAll(".field-error");
    errors.forEach(e => e.textContent = "");
};

window.limpiarAlimentos = function() {
    const resCol = document.getElementById("resultadoAlimentos");
    resCol.innerHTML = `
        <div class="result-placeholder">
            <span class="placeholder-icon">🛒</span>
            <p>Ingresa tus productos y presiona <strong>Calcular</strong> para ver el impacto económico.</p>
        </div>
    `;
    const lista = document.getElementById("productosList");
    lista.innerHTML = `
        <div class="producto-row" data-index="0">
            <div class="producto-header">
                <span>Producto 1</span>
                <button type="button" class="btn-remove-producto" onclick="eliminarProducto(this)" style="display:none">✕</button>
            </div>
            <div class="producto-fields">
                <div class="field-group">
                    <label>Nombre del producto</label>
                    <input type="text" class="prod-nombre" placeholder="Ej: Arroz" />
                </div>
                <div class="field-row-2">
                    <div class="field-group">
                        <label>Precio anterior (Bs)</label>
                        <input type="number" class="prod-precio-ant" placeholder="Ej: 8" min="0" step="0.01" />
                    </div>
                    <div class="field-group">
                        <label>Precio actual (Bs)</label>
                        <input type="number" class="prod-precio-act" placeholder="Ej: 11" min="0" step="0.01" />
                    </div>
                </div>
                <div class="field-row-2">
                    <div class="field-group">
                        <label>Cantidad por semana</label>
                        <input type="number" class="prod-cantidad" placeholder="Ej: 3" min="1" />
                    </div>
                    <div class="field-group">
                        <label>Número de semanas</label>
                        <input type="number" class="prod-semanas" placeholder="Ej: 4" min="1" />
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.limpiarTransporte = function() {
    const resCol = document.getElementById("resultadoTransporte");
    resCol.innerHTML = `
        <div class="result-placeholder">
            <span class="placeholder-icon">🚌</span>
            <p>Ingresa las distancias y presiona <strong>Calcular</strong> para ver el costo adicional.</p>
        </div>
    `;
    const inputs = document.getElementById("formTransporte").querySelectorAll("input");
    inputs.forEach(i => { i.value = ""; i.classList.remove("error-input"); });
    const errors = document.getElementById("formTransporte").querySelectorAll(".field-error");
    errors.forEach(e => e.textContent = "");
};