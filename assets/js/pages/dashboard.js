// Dashboard - Lógica principal

/**
 * Inicializa el dashboard
 */
function initDashboard() {
    renderKPIs();
    renderChart();
    renderClientesTable();
    setupActions();
    updateSyncTime();

    // Actualizar tiempo de sincronización cada minuto
    setInterval(updateSyncTime, 60000);
}

/**
 * Renderiza los KPIs en las tarjetas
 */
function renderKPIs() {
    const { kpis } = dashboardData;

    // Servicios Ejecutados
    const serviciosEl = document.getElementById('kpi-servicios');
    const serviciosTrendEl = document.getElementById('kpi-servicios-trend');
    if (serviciosEl) {
        animateNumber(serviciosEl, kpis.serviciosEjecutados.valor, 1000, formatNumber);
    }
    if (serviciosTrendEl) {
        const change = kpis.serviciosEjecutados.cambio;
        const icon = getTrendIcon(change);
        const colorClass = getColorClass(change);
        serviciosTrendEl.className = `${colorClass} text-xs font-bold mb-1 flex items-center`;
        serviciosTrendEl.innerHTML = `
            <span class="material-symbols-outlined text-[14px]">${icon}</span> ${Math.abs(change)}%
        `;
    }

    // Capacidad Utilizada
    const capacidadEl = document.getElementById('kpi-capacidad');
    const capacidadMetaEl = document.getElementById('kpi-capacidad-meta');
    if (capacidadEl) {
        animateNumber(capacidadEl, kpis.capacidadUtilizada.valor, 1000, (n) => n.toFixed(1) + '%');
    }
    if (capacidadMetaEl) {
        capacidadMetaEl.textContent = `Meta: ${kpis.capacidadUtilizada.meta}%`;
    }

    // Tasa de Certificación
    const certificacionEl = document.getElementById('kpi-certificacion');
    if (certificacionEl) {
        animateNumber(certificacionEl, kpis.tasaCertificacion.valor, 1000, (n) => n.toFixed(1) + '%');
    }

    // NPS Alumnos
    const npsEl = document.getElementById('kpi-nps');
    const npsCategoriaEl = document.getElementById('kpi-nps-categoria');
    if (npsEl) {
        animateNumber(npsEl, kpis.npsAlumnos.valor, 1000, Math.round);
    }
    if (npsCategoriaEl) {
        npsCategoriaEl.textContent = kpis.npsAlumnos.categoria;
    }

    // Total Cursos
    const totalCursosEl = document.getElementById('total-cursos');
    if (totalCursosEl) {
        animateNumber(totalCursosEl, dashboardData.estadoCursos.total, 1000, Math.round);
    }
}

/**
 * Renderiza el gráfico de ejecución mensual
 */
function renderChart() {
    const chartContainer = document.getElementById('chart-ejecucion');
    if (!chartContainer) return;

    chartContainer.innerHTML = '';

    dashboardData.graficoEjecucion.forEach(data => {
        const barContainer = document.createElement('div');
        barContainer.className = 'flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end';

        // Calcular alturas
        const planificadoHeight = 100; // Base
        const ejecutadoHeight = (data.ejecutado / data.planificado) * 100;

        barContainer.innerHTML = `
            <div class="w-10 bg-primary/20 rounded-t-sm relative" style="height: ${planificadoHeight}%">
                <div class="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all group-hover:bg-primary/80" style="height: ${ejecutadoHeight}%"></div>
            </div>
            <span class="text-[10px] text-[#616e89]">${data.mes}</span>
        `;

        // Tooltip on hover
        barContainer.addEventListener('mouseenter', (e) => {
            showChartTooltip(e, data);
        });

        barContainer.addEventListener('mouseleave', hideChartTooltip);

        chartContainer.appendChild(barContainer);
    });
}

/**
 * Muestra tooltip en el gráfico
 * @param {Event} e - Evento del mouse
 * @param {Object} data - Datos del mes
 */
function showChartTooltip(e, data) {
    const tooltip = document.createElement('div');
    tooltip.id = 'chart-tooltip';
    tooltip.className = 'absolute bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg z-50';
    tooltip.innerHTML = `
        <div class="font-bold">${data.mes}</div>
        <div>Ejecutado: ${data.ejecutado}%</div>
        <div>Planificado: ${data.planificado}%</div>
    `;

    const rect = e.currentTarget.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 70) + 'px';

    document.body.appendChild(tooltip);
}

/**
 * Oculta tooltip del gráfico
 */
function hideChartTooltip() {
    const tooltip = document.getElementById('chart-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/**
 * Renderiza la tabla de clientes
 */
function renderClientesTable() {
    const tbody = document.getElementById('tabla-clientes');
    if (!tbody) return;

    tbody.innerHTML = '';

    dashboardData.topClientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors';

        const crecimientoClass = getColorClass(cliente.crecimiento);
        const crecimientoIcon = getTrendIcon(cliente.crecimiento);

        tr.innerHTML = `
            <td class="px-4 py-3 font-medium dark:text-white">${cliente.nombre}</td>
            <td class="px-4 py-3 text-[#616e89]">${formatNumber(cliente.servicios)}</td>
            <td class="px-4 py-3 text-[#616e89]">${formatCurrency(cliente.inversion)}</td>
            <td class="px-4 py-3 ${crecimientoClass} font-bold">${cliente.crecimiento > 0 ? '+' : ''}${cliente.crecimiento}%</td>
            <td class="px-4 py-3">
                <span class="px-2 py-0.5 rounded-full ${getStatusBadgeClass(cliente.statusColor)} text-[10px] font-bold">
                    ${cliente.status}
                </span>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

/**
 * Obtiene la clase CSS para el badge de status
 * @param {string} color - Color del status
 * @returns {string} Clase CSS
 */
function getStatusBadgeClass(color) {
    const classes = {
        primary: 'bg-primary/10 text-primary',
        gray: 'bg-gray-100 text-[#616e89]',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800'
    };
    return classes[color] || classes.gray;
}

/**
 * Configura las acciones de los botones
 */
function setupActions() {
    // Botón Actualizar datos
    const btnRefresh = document.getElementById('btn-refresh-data');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', refreshData);
    }

    // Botón Pantalla completa
    const btnFullscreen = document.getElementById('btn-fullscreen');
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', toggleFullscreen);
    }

    // Botón Más opciones
    const btnMore = document.getElementById('btn-more');
    if (btnMore) {
        btnMore.addEventListener('click', showMoreOptions);
    }

    // Botón Exportar Excel
    const btnExportExcel = document.getElementById('btn-export-excel');
    if (btnExportExcel) {
        btnExportExcel.addEventListener('click', exportToExcel);
    }

    // Botón Exportar PDF
    const btnExportPdf = document.getElementById('btn-export-pdf');
    if (btnExportPdf) {
        btnExportPdf.addEventListener('click', exportToPDF);
    }

    // Botón Compartir
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', shareReport);
    }

    // Botón Configuración
    const btnSettings = document.getElementById('btn-settings');
    if (btnSettings) {
        btnSettings.addEventListener('click', openSettings);
    }
}

/**
 * Actualiza los datos del dashboard
 */
function refreshData() {
    const icon = document.getElementById('refresh-icon');
    if (icon) {
        icon.style.animation = 'spin 1s linear';
        setTimeout(() => {
            icon.style.animation = '';
        }, 1000);
    }

    showNotification('Actualizando datos...', 'info', 1500);

    // Simular actualización
    setTimeout(() => {
        dashboardData.ultimaSincronizacion = new Date();
        updateSyncTime();
        showNotification('Datos actualizados correctamente', 'success', 2000);
    }, 1000);
}

/**
 * Actualiza el texto de última sincronización
 */
function updateSyncTime() {
    const syncText = document.getElementById('last-sync-text');
    if (syncText && dashboardData.ultimaSincronizacion) {
        syncText.textContent = `Última sincronización: ${timeAgo(dashboardData.ultimaSincronizacion)}`;
    }
}

/**
 * Alterna pantalla completa
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        showNotification('Modo pantalla completa activado', 'info', 2000);
    } else {
        document.exitFullscreen();
        showNotification('Modo pantalla completa desactivado', 'info', 2000);
    }
}

/**
 * Muestra más opciones
 */
function showMoreOptions() {
    showNotification('Menú de opciones - En desarrollo', 'info', 2000);
}

/**
 * Exporta a Excel
 */
function exportToExcel() {
    showNotification('Exportando a Excel...', 'info', 1500);

    setTimeout(() => {
        // Simular descarga
        const csvContent = generateCSV();
        downloadFile('dashboard-reporte.csv', csvContent, 'text/csv');
        showNotification('Archivo Excel descargado', 'success', 2000);
    }, 1000);
}

/**
 * Genera contenido CSV
 * @returns {string} Contenido CSV
 */
function generateCSV() {
    let csv = 'Cliente,Servicios,Inversión,Crecimiento,Status\n';

    dashboardData.topClientes.forEach(cliente => {
        csv += `"${cliente.nombre}",${cliente.servicios},${cliente.inversion},${cliente.crecimiento}%,${cliente.status}\n`;
    });

    return csv;
}

/**
 * Exporta a PDF
 */
function exportToPDF() {
    showNotification('Generando PDF...', 'info', 1500);

    setTimeout(() => {
        showNotification('Archivo PDF descargado', 'success', 2000);
    }, 1500);
}

/**
 * Comparte el reporte
 */
function shareReport() {
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: 'Dashboard OTEC',
            text: 'Reporte de Dashboard',
            url: url
        });
    } else {
        // Copiar al portapapeles
        navigator.clipboard.writeText(url);
        showNotification('Enlace copiado al portapapeles', 'success', 2000);
    }
}

/**
 * Abre configuración
 */
function openSettings() {
    showNotification('Configuración - En desarrollo', 'info', 2000);
}

// Añadir animación spin para el icono de refresh
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initDashboard);
