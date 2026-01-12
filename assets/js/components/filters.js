// Componente Filters - Gestión de filtros dropdown

let currentFilters = {
    rango: '30',
    region: 'todas',
    estado: 'activos'
};

/**
 * Inicializa los filtros dropdown
 */
function initFilters() {
    setupFilterDropdown('filter-rango', 'filtros.rangos', 'rango', 'Rango: ');
    setupFilterDropdown('filter-region', 'filtros.regiones', 'region', 'Región: ');
    setupFilterDropdown('filter-estado', 'filtros.estados', 'estado', 'Estado: ');
}

/**
 * Configura un dropdown de filtro
 * @param {string} elementId - ID del elemento filtro
 * @param {string} dataPath - Ruta a los datos en dashboardData
 * @param {string} filterKey - Clave del filtro en currentFilters
 * @param {string} prefix - Prefijo para mostrar en el texto
 */
function setupFilterDropdown(elementId, dataPath, filterKey, prefix) {
    const filterElement = document.getElementById(elementId);
    if (!filterElement) return;

    let isOpen = false;
    let dropdownMenu = null;

    // Click en el filtro
    filterElement.addEventListener('click', (e) => {
        e.stopPropagation();

        // Cerrar otros dropdowns
        closeAllDropdowns();

        if (!isOpen) {
            // Crear y mostrar dropdown
            dropdownMenu = createDropdownMenu(dataPath, filterKey, prefix, elementId);
            filterElement.appendChild(dropdownMenu);
            isOpen = true;

            // Añadir listener para cerrar al hacer click fuera
            setTimeout(() => {
                document.addEventListener('click', closeDropdownHandler);
            }, 10);
        }
    });

    function closeDropdownHandler() {
        if (dropdownMenu && dropdownMenu.parentElement) {
            dropdownMenu.parentElement.removeChild(dropdownMenu);
        }
        isOpen = false;
        document.removeEventListener('click', closeDropdownHandler);
    }
}

/**
 * Crea el menú dropdown
 * @param {string} dataPath - Ruta a los datos
 * @param {string} filterKey - Clave del filtro
 * @param {string} prefix - Prefijo del texto
 * @param {string} elementId - ID del elemento
 * @returns {HTMLElement} Elemento del menú dropdown
 */
function createDropdownMenu(dataPath, filterKey, prefix, elementId) {
    const menu = document.createElement('div');
    menu.className = 'absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-[#dbdee6] dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]';
    menu.onclick = (e) => e.stopPropagation();

    // Obtener opciones desde dashboardData
    const options = getNestedProperty(dashboardData, dataPath) || [];

    // Crear items del menú
    options.forEach(option => {
        const item = document.createElement('div');
        item.className = 'px-4 py-2 text-sm text-[#111318] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors';
        item.textContent = option.label;

        // Marcar seleccionado
        if (option.value === currentFilters[filterKey]) {
            item.className += ' bg-primary/10 text-primary font-bold';
        }

        // Click en opción
        item.addEventListener('click', () => {
            selectFilterOption(filterKey, option.value, option.label, prefix, elementId);
            menu.parentElement.removeChild(menu);
        });

        menu.appendChild(item);
    });

    return menu;
}

/**
 * Selecciona una opción de filtro
 * @param {string} filterKey - Clave del filtro
 * @param {string} value - Valor seleccionado
 * @param {string} label - Etiqueta a mostrar
 * @param {string} prefix - Prefijo del texto
 * @param {string} elementId - ID del elemento
 */
function selectFilterOption(filterKey, value, label, prefix, elementId) {
    currentFilters[filterKey] = value;

    // Actualizar texto del filtro
    const textElement = document.getElementById(`${elementId}-text`);
    if (textElement) {
        textElement.textContent = prefix + label;
    }

    // Disparar evento de cambio de filtro
    onFilterChange();
}

/**
 * Cierra todos los dropdowns abiertos
 */
function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.absolute.top-full');
    dropdowns.forEach(dropdown => {
        if (dropdown.parentElement) {
            dropdown.parentElement.removeChild(dropdown);
        }
    });
}

/**
 * Callback cuando cambian los filtros
 */
function onFilterChange() {
    console.log('Filtros actualizados:', currentFilters);

    // Aquí se puede implementar la lógica para filtrar datos
    // Por ahora solo mostramos una notificación
    showNotification('Filtros aplicados correctamente', 'success', 2000);

    // Guardar filtros en localStorage
    saveToStorage('dashboard-filters', currentFilters);

    // Trigger custom event para que otros componentes puedan reaccionar
    const event = new CustomEvent('filtersChanged', { detail: currentFilters });
    document.dispatchEvent(event);
}

/**
 * Obtiene una propiedad anidada de un objeto
 * @param {Object} obj - Objeto
 * @param {string} path - Ruta a la propiedad (ej: 'filtros.rangos')
 * @returns {*} Valor de la propiedad
 */
function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

/**
 * Carga filtros guardados
 */
function loadSavedFilters() {
    const saved = getFromStorage('dashboard-filters');
    if (saved) {
        currentFilters = { ...currentFilters, ...saved };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadSavedFilters();
    initFilters();
});

// Cerrar dropdowns al hacer scroll
window.addEventListener('scroll', closeAllDropdowns);
