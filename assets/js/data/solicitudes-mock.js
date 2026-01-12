// Mock data para Solicitudes - Sistema OTEC

const solicitudesData = {
    // Array de 20 solicitudes con datos completos
    solicitudes: [
        {
            id: 1024,
            fecha: '2023-10-12',
            empresa: 'TechCorp SpA',
            centroGestion: 'Centro Santiago',
            nombreCurso: 'Liderazgo Efectivo',
            solicitante: {
                nombre: 'Juan Pérez',
                iniciales: 'JP',
                color: 'blue'
            },
            modalidad: 'Presencial',
            estado: 'evaluacion_otic',
            coordinador: 'Andrés Silva'
        },
        {
            id: 1023,
            fecha: '2023-10-11',
            empresa: 'Minera Los Andes',
            centroGestion: 'Planta Norte',
            nombreCurso: 'Seguridad Nivel 1',
            solicitante: {
                nombre: 'María González',
                iniciales: 'MG',
                color: 'purple'
            },
            modalidad: 'Online',
            estado: 'rechazada_otic',
            coordinador: 'Beatriz Luna'
        },
        {
            id: 1022,
            fecha: '2023-10-10',
            empresa: 'Constructora Vial',
            centroGestion: 'Casa Matriz',
            nombreCurso: 'Manejo Maquinaria',
            solicitante: {
                nombre: 'Carlos Ruiz',
                iniciales: 'CR',
                color: 'amber'
            },
            modalidad: 'Presencial',
            estado: 'en_coordinacion',
            coordinador: 'Carlos Méndez'
        },
        {
            id: 1021,
            fecha: '2023-10-09',
            empresa: 'Retail Global SA',
            centroGestion: 'Zona Sur',
            nombreCurso: 'Excel Avanzado',
            solicitante: {
                nombre: 'Ana López',
                iniciales: 'AL',
                color: 'emerald'
            },
            modalidad: 'Online',
            estado: 'lista_ejecucion',
            coordinador: 'Daniela Rivas'
        },
        {
            id: 1020,
            fecha: '2023-10-08',
            empresa: 'Consultora Delta',
            centroGestion: 'Santiago Prov.',
            nombreCurso: 'Gestión del Tiempo',
            solicitante: {
                nombre: 'Roberto Bravo',
                iniciales: 'RB',
                color: 'slate'
            },
            modalidad: 'Híbrido',
            estado: 'finalizada',
            coordinador: 'Andrés Silva'
        },
        {
            id: 1019,
            fecha: '2023-10-05',
            empresa: 'Inversiones S.A.',
            centroGestion: 'Sucursal Viña',
            nombreCurso: 'Contabilidad Básica',
            solicitante: {
                nombre: 'Felipe Martínez',
                iniciales: 'FM',
                color: 'cyan'
            },
            modalidad: 'Presencial',
            estado: 'derivada_tercero',
            coordinador: 'Beatriz Luna'
        },
        {
            id: 1018,
            fecha: '2023-10-04',
            empresa: 'Clínica Salud Integral',
            centroGestion: 'Centro Médico',
            nombreCurso: 'Primeros Auxilios',
            solicitante: {
                nombre: 'Patricia Soto',
                iniciales: 'PS',
                color: 'pink'
            },
            modalidad: 'Presencial',
            estado: 'evaluacion_otic',
            coordinador: 'Carlos Méndez'
        },
        {
            id: 1017,
            fecha: '2023-10-03',
            empresa: 'Agroindustrias del Sur',
            centroGestion: 'Planta Procesadora',
            nombreCurso: 'Manipulación Alimentos',
            solicitante: {
                nombre: 'Diego Vargas',
                iniciales: 'DV',
                color: 'green'
            },
            modalidad: 'Presencial',
            estado: 'en_coordinacion',
            coordinador: 'Daniela Rivas'
        },
        {
            id: 1016,
            fecha: '2023-10-02',
            empresa: 'Logística Express',
            centroGestion: 'Centro Distribución',
            nombreCurso: 'Gestión Inventarios',
            solicitante: {
                nombre: 'Lorena Castro',
                iniciales: 'LC',
                color: 'indigo'
            },
            modalidad: 'Online',
            estado: 'lista_ejecucion',
            coordinador: 'Andrés Silva'
        },
        {
            id: 1015,
            fecha: '2023-10-01',
            empresa: 'Banco Capital',
            centroGestion: 'Sucursal Centro',
            nombreCurso: 'Atención al Cliente',
            solicitante: {
                nombre: 'Sergio Muñoz',
                iniciales: 'SM',
                color: 'red'
            },
            modalidad: 'Híbrido',
            estado: 'cerrada',
            coordinador: 'Beatriz Luna'
        },
        {
            id: 1014,
            fecha: '2023-09-28',
            empresa: 'Inmobiliaria Horizonte',
            centroGestion: 'Oficina Comercial',
            nombreCurso: 'Ventas Efectivas',
            solicitante: {
                nombre: 'Camila Reyes',
                iniciales: 'CR',
                color: 'orange'
            },
            modalidad: 'Online',
            estado: 'evaluacion_otic',
            coordinador: 'Carlos Méndez'
        },
        {
            id: 1013,
            fecha: '2023-09-27',
            empresa: 'Transportes del Norte',
            centroGestion: 'Base Operaciones',
            nombreCurso: 'Conducción Defensiva',
            solicitante: {
                nombre: 'Rodrigo Parra',
                iniciales: 'RP',
                color: 'teal'
            },
            modalidad: 'Presencial',
            estado: 'rechazada_otic',
            coordinador: 'Daniela Rivas'
        },
        {
            id: 1012,
            fecha: '2023-09-26',
            empresa: 'Educación Premium',
            centroGestion: 'Campus Principal',
            nombreCurso: 'Metodologías Ágiles',
            solicitante: {
                nombre: 'Valentina Rojas',
                iniciales: 'VR',
                color: 'violet'
            },
            modalidad: 'Online',
            estado: 'finalizada',
            coordinador: 'Andrés Silva'
        },
        {
            id: 1011,
            fecha: '2023-09-25',
            empresa: 'Energía Renovable Chile',
            centroGestion: 'Planta Solar',
            nombreCurso: 'Mantenimiento Paneles',
            solicitante: {
                nombre: 'Javier Torres',
                iniciales: 'JT',
                color: 'yellow'
            },
            modalidad: 'Presencial',
            estado: 'en_coordinacion',
            coordinador: 'Beatriz Luna'
        },
        {
            id: 1010,
            fecha: '2023-09-24',
            empresa: 'Hotel Cinco Estrellas',
            centroGestion: 'Sede Principal',
            nombreCurso: 'Protocolo y Etiqueta',
            solicitante: {
                nombre: 'Francisca Díaz',
                iniciales: 'FD',
                color: 'rose'
            },
            modalidad: 'Presencial',
            estado: 'lista_ejecucion',
            coordinador: 'Carlos Méndez'
        },
        {
            id: 1009,
            fecha: '2023-09-22',
            empresa: 'Industrias Metálicas',
            centroGestion: 'Fábrica Central',
            nombreCurso: 'Soldadura Básica',
            solicitante: {
                nombre: 'Andrés Fuentes',
                iniciales: 'AF',
                color: 'gray'
            },
            modalidad: 'Presencial',
            estado: 'derivada_tercero',
            coordinador: 'Daniela Rivas'
        },
        {
            id: 1008,
            fecha: '2023-09-21',
            empresa: 'Telecomunicaciones Mobile',
            centroGestion: 'Call Center',
            nombreCurso: 'Comunicación Efectiva',
            solicitante: {
                nombre: 'Mónica Herrera',
                iniciales: 'MH',
                color: 'lime'
            },
            modalidad: 'Online',
            estado: 'evaluacion_otic',
            coordinador: 'Andrés Silva'
        },
        {
            id: 1007,
            fecha: '2023-09-20',
            empresa: 'Farmacéutica BioMed',
            centroGestion: 'Laboratorio',
            nombreCurso: 'Control de Calidad',
            solicitante: {
                nombre: 'Ricardo Campos',
                iniciales: 'RC',
                color: 'sky'
            },
            modalidad: 'Presencial',
            estado: 'finalizada',
            coordinador: 'Beatriz Luna'
        },
        {
            id: 1006,
            fecha: '2023-09-19',
            empresa: 'Servicios Integrales',
            centroGestion: 'Oficina Regional',
            nombreCurso: 'Trabajo en Equipo',
            solicitante: {
                nombre: 'Isabel Morales',
                iniciales: 'IM',
                color: 'fuchsia'
            },
            modalidad: 'Híbrido',
            estado: 'cerrada',
            coordinador: 'Carlos Méndez'
        },
        {
            id: 1005,
            fecha: '2023-09-18',
            empresa: 'Automotriz Premium',
            centroGestion: 'Concesionaria',
            nombreCurso: 'Técnicas de Negociación',
            solicitante: {
                nombre: 'Pablo Navarro',
                iniciales: 'PN',
                color: 'amber'
            },
            modalidad: 'Online',
            estado: 'lista_ejecucion',
            coordinador: 'Daniela Rivas'
        }
    ],

    // Coordinadores disponibles
    coordinadores: [
        { id: 1, nombre: 'Andrés Silva' },
        { id: 2, nombre: 'Beatriz Luna' },
        { id: 3, nombre: 'Carlos Méndez' },
        { id: 4, nombre: 'Daniela Rivas' }
    ],

    // Estados disponibles con configuración de colores
    estados: {
        evaluacion_otic: {
            label: 'En Evaluación OTIC',
            bgColor: 'bg-blue-50',
            textColor: 'text-primary',
            borderColor: 'border-blue-100'
        },
        rechazada_otic: {
            label: 'Rechazada por OTIC',
            bgColor: 'bg-red-50',
            textColor: 'text-danger',
            borderColor: 'border-red-100'
        },
        derivada_tercero: {
            label: 'Derivada a Tercero',
            bgColor: 'bg-cyan-50',
            textColor: 'text-cyan-700',
            borderColor: 'border-cyan-100'
        },
        en_coordinacion: {
            label: 'En Coordinación',
            bgColor: 'bg-amber-50',
            textColor: 'text-warning',
            borderColor: 'border-amber-100'
        },
        lista_ejecucion: {
            label: 'Lista para Ejecución',
            bgColor: 'bg-emerald-50',
            textColor: 'text-success',
            borderColor: 'border-emerald-100'
        },
        finalizada: {
            label: 'Finalizada',
            bgColor: 'bg-slate-100',
            textColor: 'text-slate-600',
            borderColor: 'border-slate-200'
        },
        cerrada: {
            label: 'Cerrada',
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-600',
            borderColor: 'border-gray-200'
        }
    },

    // Configuración de colores para avatares
    avatarColors: {
        blue: 'bg-blue-100 text-primary',
        purple: 'bg-purple-100 text-purple-700',
        amber: 'bg-amber-100 text-amber-700',
        emerald: 'bg-emerald-100 text-emerald-700',
        slate: 'bg-slate-100 text-slate-700',
        cyan: 'bg-cyan-100 text-cyan-700',
        pink: 'bg-pink-100 text-pink-700',
        green: 'bg-green-100 text-green-700',
        indigo: 'bg-indigo-100 text-indigo-700',
        red: 'bg-red-100 text-red-700',
        orange: 'bg-orange-100 text-orange-700',
        teal: 'bg-teal-100 text-teal-700',
        violet: 'bg-violet-100 text-violet-700',
        yellow: 'bg-yellow-100 text-yellow-700',
        rose: 'bg-rose-100 text-rose-700',
        gray: 'bg-gray-100 text-gray-700',
        lime: 'bg-lime-100 text-lime-700',
        sky: 'bg-sky-100 text-sky-700',
        fuchsia: 'bg-fuchsia-100 text-fuchsia-700'
    }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = solicitudesData;
}
