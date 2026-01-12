// Solicitudes Listado - Lógica principal

let allSolicitudes = [];
let currentFilters = {
    search: '',
    estado: '',
    coordinador: '',
    fecha: ''
};

let searchTimeout = null;
let solicitudToDelete = null;

/**
 * Inicializa el listado de solicitudes
 */
function initSolicitudesListado() {
    allSolicitudes = [...solicitudesData.solicitudes];

    setupFilters();
    setupActions();
    applyFilters();
}

/**
 * Configura los filtros
 */
function setupFilters() {
    // Búsqueda con debounce
    const searchInput = document.getElementById('filter-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = e.target.value.trim().toLowerCase();
                applyFilters();
            }, 300);
        });
    }

    // Filtro de estado
    const estadoSelect = document.getElementById('filter-estado');
    if (estadoSelect) {
        estadoSelect.addEventListener('change', (e) => {
            currentFilters.estado = e.target.value;
            applyFilters();
        });
    }

    // Filtro de coordinador
    const coordinadorSelect = document.getElementById('filter-coordinador');
    if (coordinadorSelect) {
        coordinadorSelect.addEventListener('change', (e) => {
            currentFilters.coordinador = e.target.value;
            applyFilters();
        });
    }

    // Filtro de fecha
    const fechaInput = document.getElementById('filter-fecha');
    if (fechaInput) {
        fechaInput.addEventListener('change', (e) => {
            currentFilters.fecha = e.target.value;
            applyFilters();
        });
    }
}

/**
 * Aplica los filtros acumulativos
 */
function applyFilters() {
    let filtered = [...allSolicitudes];

    // Filtro de búsqueda (ID, Empresa, Curso)
    if (currentFilters.search) {
        filtered = filtered.filter(sol => {
            const searchStr = currentFilters.search;
            return (
                sol.id.toString().includes(searchStr) ||
                sol.empresa.toLowerCase().includes(searchStr) ||
                sol.nombreCurso.toLowerCase().includes(searchStr)
            );
        });
    }

    // Filtro de estado
    if (currentFilters.estado) {
        filtered = filtered.filter(sol => sol.estado === currentFilters.estado);
    }

    // Filtro de coordinador
    if (currentFilters.coordinador) {
        filtered = filtered.filter(sol => sol.coordinador === currentFilters.coordinador);
    }

    // Filtro de fecha
    if (currentFilters.fecha) {
        filtered = filtered.filter(sol => sol.fecha === currentFilters.fecha);
    }

    // Renderizar tabla con resultados filtrados
    renderTablaSolicitudes(filtered);
}

/**
 * Configura las acciones de los botones
 */
function setupActions() {
    // Botón Nueva Solicitud
    const btnNueva = document.getElementById('btn-nueva-solicitud');
    if (btnNueva) {
        btnNueva.addEventListener('click', () => {
            window.location.href = 'solicitudes-nueva.html';
        });
    }

    // Delegación de eventos para botones de acción en la tabla
    const tbody = document.getElementById('tabla-solicitudes-body');
    if (tbody) {
        tbody.addEventListener('click', handleTableAction);
    }

    // Modal de eliminación
    setupDeleteModal();
}

/**
 * Maneja las acciones de los botones en la tabla
 * @param {Event} e - Evento de click
 */
function handleTableAction(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    const id = parseInt(btn.getAttribute('data-id'));
    if (!id) return;

    if (btn.classList.contains('btn-ver-solicitud')) {
        verSolicitud(id);
    } else if (btn.classList.contains('btn-editar-solicitud')) {
        editarSolicitud(id);
    } else if (btn.classList.contains('btn-eliminar-solicitud')) {
        confirmarEliminarSolicitud(id);
    }
}

/**
 * Navega a la vista de detalle de una solicitud
 * @param {number} id - ID de la solicitud
 */
function verSolicitud(id) {
    window.location.href = `solicitudes-detalle.html?id=${id}`;
}

/**
 * Abre modal de edición (función en desarrollo)
 * @param {number} id - ID de la solicitud
 */
function editarSolicitud(id) {
    showNotification('Función de edición en desarrollo', 'info', 2500);
}

/**
 * Confirma la eliminación de una solicitud
 * @param {number} id - ID de la solicitud
 */
function confirmarEliminarSolicitud(id) {
    solicitudToDelete = id;

    const solicitud = allSolicitudes.find(s => s.id === id);
    const mensaje = `¿Está seguro de eliminar la solicitud #${id}${solicitud ? ' - ' + solicitud.nombreCurso : ''}?`;

    const mensajeEl = document.getElementById('modal-eliminar-mensaje');
    if (mensajeEl) {
        mensajeEl.textContent = mensaje;
    }

    openDeleteModal();
}

/**
 * Elimina una solicitud
 */
function eliminarSolicitud() {
    if (!solicitudToDelete) return;

    // Eliminar de allSolicitudes
    const index = allSolicitudes.findIndex(s => s.id === solicitudToDelete);
    if (index > -1) {
        allSolicitudes.splice(index, 1);
    }

    // Cerrar modal
    closeDeleteModal();

    // Aplicar filtros para actualizar la tabla
    applyFilters();

    // Mostrar notificación
    showNotification(`Solicitud #${solicitudToDelete} eliminada correctamente`, 'success', 2500);

    // Limpiar
    solicitudToDelete = null;
}

/**
 * Configura el modal de eliminación
 */
function setupDeleteModal() {
    const modal = document.getElementById('modal-eliminar');
    const btnCancelar = document.getElementById('modal-eliminar-cancelar');
    const btnConfirmar = document.getElementById('modal-eliminar-confirmar');

    if (btnCancelar) {
        btnCancelar.addEventListener('click', closeDeleteModal);
    }

    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', eliminarSolicitud);
    }

    // Cerrar al hacer click fuera del contenido
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeDeleteModal();
            }
        });
    }

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeDeleteModal();
        }
    });
}

/**
 * Abre el modal de eliminación
 */
function openDeleteModal() {
    const modal = document.getElementById('modal-eliminar');
    if (modal) {
        modal.classList.remove('hidden');
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Cierra el modal de eliminación
 */
function closeDeleteModal() {
    const modal = document.getElementById('modal-eliminar');
    if (modal) {
        modal.classList.add('hidden');
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
    solicitudToDelete = null;
}

/**
 * Exporta los filtros actuales a CSV
 */
function exportarResultados() {
    showNotification('Exportando resultados...', 'info', 1500);

    setTimeout(() => {
        const csv = generateSolicitudesCSV();
        downloadFile('solicitudes.csv', csv, 'text/csv');
        showNotification('Archivo CSV descargado', 'success', 2000);
    }, 1000);
}

/**
 * Genera CSV con las solicitudes filtradas
 * @returns {string} Contenido CSV
 */
function generateSolicitudesCSV() {
    let csv = 'ID,Fecha,Empresa,Centro Gestión,Curso,Solicitante,Estado,Coordinador\n';

    const solicitudes = filteredSolicitudes || allSolicitudes;

    solicitudes.forEach(sol => {
        const estadoLabel = solicitudesData.estados[sol.estado]?.label || sol.estado;
        csv += `${sol.id},"${sol.fecha}","${sol.empresa}","${sol.centroGestion}","${sol.nombreCurso}","${sol.solicitante.nombre}","${estadoLabel}","${sol.coordinador}"\n`;
    });

    return csv;
}

/**
 * Limpia todos los filtros
 */
function limpiarFiltros() {
    // Limpiar inputs
    const searchInput = document.getElementById('filter-search');
    const estadoSelect = document.getElementById('filter-estado');
    const coordinadorSelect = document.getElementById('filter-coordinador');
    const fechaInput = document.getElementById('filter-fecha');

    if (searchInput) searchInput.value = '';
    if (estadoSelect) estadoSelect.value = '';
    if (coordinadorSelect) coordinadorSelect.value = '';
    if (fechaInput) fechaInput.value = '';

    // Resetear filtros
    currentFilters = {
        search: '',
        estado: '',
        coordinador: '',
        fecha: ''
    };

    // Aplicar (mostrará todos)
    applyFilters();

    showNotification('Filtros limpiados', 'info', 1500);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSolicitudesListado);
