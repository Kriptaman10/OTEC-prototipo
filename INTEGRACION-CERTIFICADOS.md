# Integración de Certificados - Resumen

## Archivos Creados
- `pages/certificados.html` - Vista principal de gestión de certificados

## Archivos Modificados
- `index.html` - Agregado link "Certificados" al menú lateral
- `pages/dashboard.html` - Agregado link "Certificados" al menú lateral
- `pages/solicitudes-listado.html` - Agregado link "Certificados" al menú lateral
- `pages/relatores-listado.html` - Agregado link "Certificados" al menú lateral
- `pages/empresas-listado.html` - Agregado link "Certificados" al menú lateral
- `pages/empresas-detalle.html` - Agregado link "Certificados" al menú lateral
- `pages/solicitudes-detalle.html` - Agregado link "Certificados" a la navegación superior
- `pages/relatores-detalle.html` - Agregado link "Certificados" al menú lateral

## Archivos Sin Modificar (páginas placeholder sin sidebar)
- `pages/reportes.html` - Página placeholder sin menú de navegación
- `pages/configuracion.html` - Página placeholder sin menú de navegación
- `pages/solicitudes-nueva.html` - Formulario sin menú lateral

## Funcionalidades Implementadas
- Vista principal de certificados con tabla de cursos finalizados
- Cards de estadísticas KPI (Total Generados, Pendientes, Enviados, Cursos Finalizados)
- Barra de filtros (búsqueda, estado, curso, fecha)
- Tabla de datos con información de cursos y estados de certificados
- Paginación de la tabla
- Modal de participantes con lista de aprobados/reprobados
- Selección de participantes para generación de certificados
- Integración completa con el sistema de navegación existente

## Íconos Utilizados
- `verified` - Material Symbol para el link de Certificados en el menú

## Cómo Probar
1. Abrir `index.html` en navegador (o usar GitHub Pages)
2. Iniciar sesión con las credenciales del sistema
3. Hacer clic en "Certificados" en el menú lateral
4. Verificar que se carga `pages/certificados.html`
5. Revisar las estadísticas KPI en la parte superior
6. Probar los filtros de búsqueda
7. Hacer clic en el icono de ojo (visibility) en cualquier curso
8. Verificar que se abre el modal de participantes
9. Probar "Seleccionar todos los aprobados"
10. Probar cerrar modal (X o clic fuera)
11. Verificar navegación desde otras páginas

## Estructura de la Vista de Certificados

```
certificados.html
├── Sidebar (consistente con otras páginas)
├── Header
│   ├── Breadcrumbs
│   ├── Título y descripción
│   └── Botón "Generar Certificados"
├── KPI Stats (4 cards)
│   ├── Total Generados
│   ├── Pendientes
│   ├── Enviados este Mes
│   └── Cursos Finalizados
├── Filtros
│   ├── Búsqueda por texto
│   ├── Filtro por estado
│   ├── Filtro por curso
│   └── Filtro por fecha
├── Tabla de Cursos
│   ├── Columnas: #, Curso, Código SENCE, Fecha, Part., Aprobados, Estado, Acciones
│   └── Paginación
└── Modal Participantes
    ├── Resumen (Total, Aprobados, Reprobados)
    ├── Lista de participantes con checkboxes
    └── Botones de acción
```

## Notas Técnicas
- Los datos son estáticos/mock para el prototipo
- El botón "Generar Certificados" muestra el modal pero no tiene backend
- Los estilos son consistentes con Tailwind CSS del resto del prototipo
- Se usa el script `sidebar.js` existente para el manejo del menú activo
- Modal implementado con CSS classes (`active`) y JavaScript vanilla

## Estados de Certificados
- **Pendiente** (amarillo): Curso finalizado, certificados aún no generados
- **Generado** (azul): Certificados creados, pendientes de envío
- **Enviado** (verde): Certificados enviados a participantes
