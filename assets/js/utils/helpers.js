// Utilidades y funciones helper para el Sistema OTEC

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
function formatNumber(num) {
    return new Intl.NumberFormat('es-CL').format(num);
}

/**
 * Formatea un número como moneda chilena
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada como moneda
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Formatea un porcentaje
 * @param {number} num - Número a formatear como porcentaje
 * @param {number} decimals - Cantidad de decimales (default: 1)
 * @returns {string} Porcentaje formateado
 */
function formatPercent(num, decimals = 1) {
    return num.toFixed(decimals) + '%';
}

/**
 * Calcula el tiempo transcurrido desde una fecha
 * @param {Date} date - Fecha desde la cual calcular
 * @returns {string} Texto descriptivo del tiempo transcurrido
 */
function timeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // diferencia en segundos

    if (diff < 60) return 'Hace menos de un minuto';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
    if (diff < 604800) return `Hace ${Math.floor(diff / 86400)} días`;
    return date.toLocaleDateString('es-CL');
}

/**
 * Formatea una fecha en formato español
 * @param {Date|string} date - Fecha a formatear
 * @param {boolean} includeTime - Si se debe incluir la hora
 * @returns {string} Fecha formateada
 */
function formatDate(date, includeTime = false) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }

    return d.toLocaleDateString('es-CL', options);
}

/**
 * Obtiene el color de clase CSS basado en un valor numérico
 * @param {number} value - Valor a evaluar
 * @param {string} type - Tipo de evaluación ('trend', 'status', etc.)
 * @returns {string} Nombre de la clase CSS
 */
function getColorClass(value, type = 'trend') {
    if (type === 'trend') {
        if (value > 0) return 'text-green-600';
        if (value < 0) return 'text-red-500';
        return 'text-gray-500';
    }
    return 'text-gray-500';
}

/**
 * Genera un icono de tendencia basado en el valor
 * @param {number} value - Valor a evaluar
 * @returns {string} Nombre del icono Material Symbols
 */
function getTrendIcon(value) {
    if (value > 0) return 'trending_up';
    if (value < 0) return 'trending_down';
    return 'trending_flat';
}

/**
 * Anima un número desde 0 hasta el valor final
 * @param {HTMLElement} element - Elemento donde mostrar el número
 * @param {number} end - Valor final
 * @param {number} duration - Duración de la animación en ms
 * @param {Function} formatter - Función para formatear el número (opcional)
 */
function animateNumber(element, end, duration = 1000, formatter = null) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;

        element.textContent = formatter ? formatter(current) : Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatter ? formatter(end) : end;
        }
    }

    requestAnimationFrame(update);
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info, warning)
 * @param {number} duration - Duración en ms
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all transform translate-x-0 ${getNotificationClass(type)}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remover después de la duración
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

/**
 * Obtiene la clase CSS para el tipo de notificación
 * @param {string} type - Tipo de notificación
 * @returns {string} Clase CSS
 */
function getNotificationClass(type) {
    const classes = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    return classes[type] || classes.info;
}

/**
 * Simula una descarga de archivo
 * @param {string} filename - Nombre del archivo
 * @param {string} content - Contenido del archivo
 * @param {string} mimeType - Tipo MIME
 */
function downloadFile(filename, content, mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Obtiene parámetros de la URL
 * @param {string} param - Nombre del parámetro
 * @returns {string|null} Valor del parámetro
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Debounce function para optimizar eventos frecuentes
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Guarda datos en localStorage
 * @param {string} key - Clave
 * @param {*} value - Valor a guardar
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

/**
 * Recupera datos de localStorage
 * @param {string} key - Clave
 * @returns {*} Valor recuperado
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}
