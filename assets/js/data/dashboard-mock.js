// Mock data for Dashboard - Sistema OTEC
const dashboardData = {
    // KPIs principales
    kpis: {
        serviciosEjecutados: {
            valor: 1284,
            cambio: 12, // Porcentaje de cambio vs mes anterior
            tendencia: 'up' // up, down, neutral
        },
        capacidadUtilizada: {
            valor: 84.2,
            meta: 85,
            unidad: '%'
        },
        tasaCertificacion: {
            valor: 96.5,
            unidad: '%'
        },
        npsAlumnos: {
            valor: 72,
            categoria: 'Excelente' // Excelente: >70, Bueno: 50-70, Regular: 30-50, Malo: <30
        }
    },

    // Datos para gráfico de ejecución mensual
    graficoEjecucion: [
        { mes: 'Ene', ejecutado: 85, planificado: 100 },
        { mes: 'Feb', ejecutado: 90, planificado: 100 },
        { mes: 'Mar', ejecutado: 70, planificado: 100 },
        { mes: 'Abr', ejecutado: 100, planificado: 100 },
        { mes: 'May', ejecutado: 80, planificado: 100 }
    ],

    // Estado de cursos
    estadoCursos: {
        total: 450,
        distribucion: {
            enCurso: 65, // porcentaje
            pendientes: 25,
            cerrados: 10
        }
    },

    // Top 5 clientes por volumen
    topClientes: [
        {
            id: 1,
            nombre: 'Minería del Norte S.A.',
            servicios: 145,
            inversion: 45200000,
            crecimiento: 12,
            status: 'Premium',
            statusColor: 'primary'
        },
        {
            id: 2,
            nombre: 'Constructora Horizonte',
            servicios: 98,
            inversion: 28150000,
            crecimiento: 8,
            status: 'Premium',
            statusColor: 'primary'
        },
        {
            id: 3,
            nombre: 'Logística Regional Ltda.',
            servicios: 72,
            inversion: 12400000,
            crecimiento: -3,
            status: 'Regular',
            statusColor: 'gray'
        },
        {
            id: 4,
            nombre: 'Tecnología e Innovación SpA',
            servicios: 64,
            inversion: 18900000,
            crecimiento: 15,
            status: 'Premium',
            statusColor: 'primary'
        },
        {
            id: 5,
            nombre: 'Salud Integral Chile',
            servicios: 58,
            inversion: 9750000,
            crecimiento: 5,
            status: 'Regular',
            statusColor: 'gray'
        }
    ],

    // Opciones para filtros
    filtros: {
        rangos: [
            { value: '7', label: 'Últimos 7 días' },
            { value: '30', label: 'Últimos 30 días' },
            { value: '90', label: 'Últimos 90 días' },
            { value: 'mes-actual', label: 'Mes actual' },
            { value: 'trimestre', label: 'Este trimestre' },
            { value: 'anio', label: 'Este año' }
        ],
        regiones: [
            { value: 'todas', label: 'Todas' },
            { value: 'metropolitana', label: 'Región Metropolitana' },
            { value: 'valparaiso', label: 'Valparaíso' },
            { value: 'biobio', label: 'Biobío' },
            { value: 'antofagasta', label: 'Antofagasta' },
            { value: 'araucania', label: 'Araucanía' }
        ],
        estados: [
            { value: 'activos', label: 'Activos' },
            { value: 'pendientes', label: 'Pendientes' },
            { value: 'completados', label: 'Completados' },
            { value: 'cancelados', label: 'Cancelados' },
            { value: 'todos', label: 'Todos' }
        ]
    },

    // Metadata de sincronización
    ultimaSincronizacion: new Date(Date.now() - 5 * 60 * 1000), // Hace 5 minutos
    estado: 'online' // online, offline, syncing
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dashboardData;
}
