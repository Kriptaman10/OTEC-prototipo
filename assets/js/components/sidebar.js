// Componente Sidebar - Gestión de navegación

/**
 * Inicializa el sidebar y gestiona el estado activo de navegación
 */
function initSidebar() {
    const currentPage = getCurrentPage();
    highlightActivePage(currentPage);
}

/**
 * Obtiene la página actual basándose en la URL
 * @returns {string} Nombre de la página actual
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();

    // Mapeo de archivos a páginas
    const pageMap = {
        'dashboard.html': 'inicio',
        'reportes.html': 'reportes',
        'solicitudes-listado.html': 'solicitudes',
        'solicitudes-nueva.html': 'solicitudes',
        'solicitudes-detalle.html': 'solicitudes',
        'relatores-listado.html': 'relatores',
        'relatores-detalle.html': 'relatores',
        'empresas-listado.html': 'empresas',
        'empresas-detalle.html': 'empresas',
        'configuracion.html': 'ajustes'
    };

    return pageMap[filename] || 'inicio';
}

/**
 * Resalta el link activo en el sidebar
 * @param {string} activePage - Nombre de la página activa
 */
function highlightActivePage(activePage) {
    const sidebarNav = document.getElementById('sidebar-nav');
    if (!sidebarNav) return;

    const links = sidebarNav.querySelectorAll('a[data-page]');

    links.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        const icon = link.querySelector('.material-symbols-outlined');
        const text = link.querySelector('span:last-child');

        if (linkPage === activePage) {
            // Activar link
            link.className = 'flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg border-l-4 border-primary';
            if (text) text.classList.add('font-bold');
            if (icon) icon.style.fontVariationSettings = "'FILL' 1";
        } else {
            // Desactivar link
            link.className = 'flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors';
            if (text) {
                text.classList.remove('font-bold');
                text.classList.add('font-medium');
            }
            if (icon) icon.style.fontVariationSettings = "'FILL' 0";
        }
    });
}

/**
 * Navega a una página específica
 * @param {string} page - Nombre del archivo de destino
 */
function navigateTo(page) {
    window.location.href = page;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSidebar);
