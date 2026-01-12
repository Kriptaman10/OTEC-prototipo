// Componente Tabla de Solicitudes - Renderizado y Paginación

let currentPage = 1;
const itemsPerPage = 5;
let filteredSolicitudes = [];
let totalPages = 1;

/**
 * Renderiza la tabla de solicitudes con paginación
 * @param {Array} solicitudes - Array de solicitudes a mostrar
 */
function renderTablaSolicitudes(solicitudes) {
    filteredSolicitudes = solicitudes;
    totalPages = Math.ceil(filteredSolicitudes.length / itemsPerPage);

    // Si la página actual es mayor que el total de páginas, volver a la primera
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = 1;
    }

    renderCurrentPage();
    renderPaginationInfo();
    renderPaginationButtons();
}

/**
 * Renderiza la página actual de solicitudes
 */
function renderCurrentPage() {
    const tbody = document.getElementById('tabla-solicitudes-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Calcular índices de inicio y fin
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredSolicitudes.length);

    // Obtener solicitudes de la página actual
    const currentSolicitudes = filteredSolicitudes.slice(startIndex, endIndex);

    // Si no hay resultados
    if (currentSolicitudes.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td colspan="8" class="px-4 py-8 text-center text-secondary">
                <div class="flex flex-col items-center gap-3">
                    <span class="material-symbols-outlined text-[48px] text-slate-300">search_off</span>
                    <p class="text-sm font-medium">No se encontraron solicitudes que coincidan con los filtros</p>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
        return;
    }

    // Renderizar cada solicitud
    currentSolicitudes.forEach(solicitud => {
        const tr = createSolicitudRow(solicitud);
        tbody.appendChild(tr);
    });
}

/**
 * Crea una fila de la tabla para una solicitud
 * @param {Object} solicitud - Datos de la solicitud
 * @returns {HTMLElement} Elemento tr con la fila
 */
function createSolicitudRow(solicitud) {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition-colors group';
    tr.setAttribute('data-solicitud-id', solicitud.id);

    // Obtener configuración del estado
    const estadoConfig = solicitudesData.estados[solicitud.estado] || {};
    const avatarColor = solicitudesData.avatarColors[solicitud.solicitante.color] || 'bg-gray-100 text-gray-700';

    tr.innerHTML = `
        <td class="px-4 py-3 text-sm font-semibold text-slate-900">#${solicitud.id}</td>
        <td class="px-4 py-3 text-sm text-secondary">${formatDateShort(solicitud.fecha)}</td>
        <td class="px-4 py-3 text-sm font-medium text-slate-900">${solicitud.empresa}</td>
        <td class="px-4 py-3 text-sm text-secondary">${solicitud.centroGestion}</td>
        <td class="px-4 py-3 text-sm text-slate-900">${solicitud.nombreCurso}</td>
        <td class="px-4 py-3 text-sm text-secondary">
            <div class="flex items-center gap-2">
                <div class="${avatarColor} size-6 rounded-full flex items-center justify-center text-[10px] font-bold">
                    ${solicitud.solicitante.iniciales}
                </div>
                <span>${solicitud.solicitante.nombre}</span>
            </div>
        </td>
        <td class="px-4 py-3 whitespace-nowrap">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${estadoConfig.bgColor} ${estadoConfig.textColor} border ${estadoConfig.borderColor}">
                ${estadoConfig.label || solicitud.estado}
            </span>
        </td>
        <td class="px-4 py-3">
            <div class="flex items-center justify-center gap-1">
                <button class="btn-ver-solicitud p-1.5 text-secondary hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                        title="Ver detalles"
                        data-id="${solicitud.id}">
                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                </button>
                <button class="btn-editar-solicitud p-1.5 text-primary hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                        data-id="${solicitud.id}">
                    <span class="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button class="btn-eliminar-solicitud p-1.5 text-danger hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar (Admin)"
                        data-id="${solicitud.id}">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
            </div>
        </td>
    `;

    return tr;
}

/**
 * Formatea una fecha en formato corto
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada (DD/MM/YYYY)
 */
function formatDateShort(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

/**
 * Renderiza la información de paginación
 */
function renderPaginationInfo() {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, filteredSolicitudes.length);
    const total = filteredSolicitudes.length;

    const startEl = document.getElementById('showing-start');
    const endEl = document.getElementById('showing-end');
    const totalEl = document.getElementById('showing-total');

    if (startEl) startEl.textContent = total > 0 ? startIndex : 0;
    if (endEl) endEl.textContent = total > 0 ? endIndex : 0;
    if (totalEl) totalEl.textContent = total;
}

/**
 * Renderiza los botones de paginación
 */
function renderPaginationButtons() {
    const prevBtn = document.getElementById('btn-prev-page');
    const nextBtn = document.getElementById('btn-next-page');
    const numbersContainer = document.getElementById('pagination-numbers');

    // Deshabilitar/habilitar botones
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Renderizar números de página
    if (numbersContainer) {
        numbersContainer.innerHTML = '';

        // Calcular qué páginas mostrar (máximo 5)
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);

        // Ajustar si estamos cerca del final
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = i === currentPage
                ? 'size-8 flex items-center justify-center rounded-lg bg-primary text-white text-[13px] font-bold shadow-sm'
                : 'size-8 flex items-center justify-center rounded-lg text-secondary text-[13px] font-medium hover:bg-slate-100 transition-colors';
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => goToPage(i));
            numbersContainer.appendChild(pageBtn);
        }
    }
}

/**
 * Navega a una página específica
 * @param {number} page - Número de página
 */
function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderCurrentPage();
    renderPaginationInfo();
    renderPaginationButtons();
}

/**
 * Navega a la página anterior
 */
function previousPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

/**
 * Navega a la página siguiente
 */
function nextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

/**
 * Inicializa los event listeners de paginación
 */
function initPagination() {
    const prevBtn = document.getElementById('btn-prev-page');
    const nextBtn = document.getElementById('btn-next-page');

    if (prevBtn) {
        prevBtn.addEventListener('click', previousPage);
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', nextPage);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initPagination);
