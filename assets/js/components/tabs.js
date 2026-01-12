// Componente Tabs - Gestión de pestañas Power BI

let activeTab = 'operaciones';

/**
 * Inicializa el sistema de pestañas
 */
function initTabs() {
    const tabs = document.querySelectorAll('.powerbi-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

/**
 * Cambia a una pestaña específica
 * @param {string} tabName - Nombre de la pestaña
 */
function switchTab(tabName) {
    if (activeTab === tabName) return;

    const tabs = document.querySelectorAll('.powerbi-tab');

    // Actualizar estado visual de las pestañas
    tabs.forEach(tab => {
        const isActive = tab.getAttribute('data-tab') === tabName;

        if (isActive) {
            // Activar tab
            tab.className = 'powerbi-tab border-b-2 border-primary text-primary py-4 text-sm font-bold flex items-center gap-2';
        } else {
            // Desactivar tab
            tab.className = 'powerbi-tab border-b-2 border-transparent text-[#616e89] hover:text-[#111318] dark:hover:text-white py-4 text-sm font-bold transition-colors';
        }
    });

    activeTab = tabName;

    // Cargar contenido de la pestaña
    loadTabContent(tabName);

    // Disparar evento
    const event = new CustomEvent('tabChanged', { detail: { tab: tabName } });
    document.dispatchEvent(event);
}

/**
 * Carga el contenido de una pestaña
 * @param {string} tabName - Nombre de la pestaña
 */
function loadTabContent(tabName) {
    const contentContainer = document.getElementById('dashboard-content');
    if (!contentContainer) return;

    // Por ahora solo mostramos un mensaje
    // En una implementación real, aquí se cargarían datos específicos para cada tab
    console.log(`Cargando contenido de pestaña: ${tabName}`);

    // Mostrar notificación
    const messages = {
        operaciones: 'Mostrando vista de Operaciones',
        sla: 'Mostrando vista de Tiempos SLA',
        recursos: 'Mostrando vista de Recursos',
        comercial: 'Mostrando vista Comercial'
    };

    showNotification(messages[tabName] || 'Cambiando vista', 'info', 2000);

    // Aplicar animación de transición
    contentContainer.style.opacity = '0.5';
    setTimeout(() => {
        contentContainer.style.opacity = '1';
    }, 200);
}

/**
 * Obtiene la pestaña activa actual
 * @returns {string} Nombre de la pestaña activa
 */
function getActiveTab() {
    return activeTab;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTabs);
