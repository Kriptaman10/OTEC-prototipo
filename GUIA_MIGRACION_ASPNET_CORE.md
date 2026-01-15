# GUÍA COMPLETA DE MIGRACIÓN - OTEC PROTOTIPO A ASP.NET CORE C#

## TABLA DE CONTENIDOS
1. [Información General del Proyecto](#1-información-general-del-proyecto)
2. [Arquitectura y Estructura](#2-arquitectura-y-estructura)
3. [Sistema de Diseño y Estilos](#3-sistema-de-diseño-y-estilos)
4. [Vistas HTML - Análisis Detallado](#4-vistas-html-análisis-detallado)
5. [Modelos de Datos Necesarios](#5-modelos-de-datos-necesarios)
6. [Controladores y Rutas](#6-controladores-y-rutas)
7. [Componentes Reutilizables](#7-componentes-reutilizables)
8. [JavaScript y Funcionalidad del Cliente](#8-javascript-y-funcionalidad-del-cliente)
9. [Autenticación y Seguridad](#9-autenticación-y-seguridad)
10. [Instrucciones de Migración](#10-instrucciones-de-migración)

---

## 1. INFORMACIÓN GENERAL DEL PROYECTO

### 1.1 Descripción
Sistema de Gestión Corporativa para Organismos Técnicos de Capacitación (OTEC). Es una aplicación web administrativa para gestionar solicitudes de cursos, relatores, empresas clientes y reportes.

### 1.2 Tecnologías Actuales (HTML)
- **Framework CSS**: Tailwind CSS (vía CDN)
- **Fuentes**: Google Fonts - Inter (400, 500, 600, 700, 800, 900)
- **Iconos**: Material Symbols Outlined
- **JavaScript**: Vanilla JavaScript (sin frameworks)
- **Almacenamiento**: LocalStorage para datos mock
- **Responsive**: Mobile-first design con Tailwind

### 1.3 Tecnologías Objetivo (ASP.NET Core)
- **Framework**: ASP.NET Core 8.0 (o superior)
- **Patrón**: MVC (Model-View-Controller)
- **Motor de Vistas**: Razor Pages
- **ORM**: Entity Framework Core
- **Base de Datos**: SQL Server
- **Autenticación**: ASP.NET Core Identity
- **CSS**: Mantener Tailwind CSS
- **JavaScript**: Mantener funcionalidad vanilla JS + integrar con Razor

---

## 2. ARQUITECTURA Y ESTRUCTURA

### 2.1 Estructura de Carpetas Actual (HTML)
```
OTEC-prototipo/
├── index.html                      # Landing/Login inicial
├── login.html                      # Página de inicio de sesión
├── pages/
│   ├── dashboard.html              # Dashboard principal
│   ├── solicitudes-listado.html    # Listado de solicitudes
│   ├── solicitudes-nueva.html      # Formulario nueva solicitud
│   ├── solicitudes-detalle.html    # Detalle de solicitud con cotización
│   ├── relatores-listado.html      # Gestión de relatores
│   ├── empresas-listado.html       # Gestión de empresas
│   ├── reportes.html               # Panel de reportes/analytics
│   └── configuracion.html          # Configuración (placeholder)
├── assets/
│   ├── css/
│   │   └── global.css              # Estilos globales y utilidades
│   └── js/
│       ├── components/
│       │   ├── sidebar.js          # Navegación lateral
│       │   ├── tabla-solicitudes.js
│       │   ├── tabs.js
│       │   └── filters.js
│       ├── data/
│       │   ├── solicitudes-mock.js # Datos de ejemplo
│       │   └── dashboard-mock.js
│       ├── utils/
│       │   └── helpers.js          # Funciones auxiliares
│       └── pages/
│           ├── solicitudes-listado.js
│           └── dashboard.js
```

### 2.2 Estructura Propuesta (ASP.NET Core)
```
OTEC.Web/
├── Controllers/
│   ├── HomeController.cs
│   ├── SolicitudesController.cs
│   ├── RelatoresController.cs
│   ├── EmpresasController.cs
│   ├── ReportesController.cs
│   └── AccountController.cs
├── Models/
│   ├── Solicitud.cs
│   ├── Relator.cs
│   ├── Empresa.cs
│   ├── Participante.cs
│   ├── Cotizacion.cs
│   └── ViewModels/
│       ├── SolicitudListViewModel.cs
│       ├── SolicitudDetalleViewModel.cs
│       └── DashboardViewModel.cs
├── Views/
│   ├── Shared/
│   │   ├── _Layout.cshtml
│   │   ├── _Sidebar.cshtml
│   │   ├── _Header.cshtml
│   │   └── Components/
│   │       ├── EstadoBadge.cshtml
│   │       └── TablaPaginada.cshtml
│   ├── Home/
│   │   ├── Index.cshtml (Dashboard)
│   │   └── Login.cshtml
│   ├── Solicitudes/
│   │   ├── Index.cshtml (Listado)
│   │   ├── Nueva.cshtml (Formulario)
│   │   └── Detalle.cshtml
│   ├── Relatores/
│   │   └── Index.cshtml
│   ├── Empresas/
│   │   └── Index.cshtml
│   └── Reportes/
│       └── Index.cshtml
├── Data/
│   ├── ApplicationDbContext.cs
│   └── Migrations/
├── Services/
│   ├── ISolicitudService.cs
│   ├── SolicitudService.cs
│   ├── IRelatorService.cs
│   └── RelatorService.cs
└── wwwroot/
    ├── css/
    │   └── global.css
    ├── js/
    │   ├── site.js
    │   └── components/
    └── lib/
        └── tailwindcss/
```

---

## 3. SISTEMA DE DISEÑO Y ESTILOS

### 3.1 Paleta de Colores
```css
:root {
    /* Colores Principales */
    --primary: #136dec;          /* Azul principal (botones, enlaces, highlights) */
    --primary-hover: #105bc4;    /* Azul hover */
    --primary-light: #2563EB;    /* Variante clara (algunas vistas) */

    /* Fondos */
    --background-light: #f6f7f8; /* Fondo claro principal */
    --background-dark: #101822;  /* Fondo oscuro (dark mode) */
    --card-light: #ffffff;       /* Fondo de tarjetas */
    --card-dark: #1a2432;        /* Tarjetas dark mode */

    /* Textos */
    --text-main: #111418;        /* Texto principal oscuro */
    --text-secondary: #617289;   /* Texto secundario/subtítulos */

    /* Bordes */
    --border-color: #dbdee6;     /* Color de bordes */
    --border-dark: #f0f2f4;      /* Borde sutil */

    /* Estados */
    --success: #10B981;          /* Verde éxito */
    --warning: #F59E0B;          /* Amarillo advertencia */
    --danger: #EF4444;           /* Rojo error/peligro */
    --info: #3B82F6;             /* Azul información */
}
```

### 3.2 Tipografía
- **Familia**: 'Inter', sans-serif
- **Pesos utilizados**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)
- **Tamaños**:
  - Títulos H1: `text-2xl` o `text-3xl` (24px-30px) con `font-black`
  - Títulos H2: `text-xl` o `text-2xl` (20px-24px) con `font-bold`
  - Subtítulos: `text-sm` o `text-base` con `font-semibold`
  - Cuerpo: `text-sm` o `text-base` (14px-16px)
  - Labels: `text-xs` con `font-bold uppercase tracking-wider`
  - Pequeño: `text-[10px]` o `text-[11px]`

### 3.3 Espaciado y Layout
- **Padding contenedores**: `p-6 md:p-8` (24px-32px)
- **Gap entre elementos**: `gap-4` o `gap-6` (16px-24px)
- **Bordes redondeados**: `rounded-lg` (0.5rem) o `rounded-xl` (0.75rem)
- **Sombras**: `shadow-sm` para tarjetas, `shadow-md` para elevación

### 3.4 Componentes Comunes

#### 3.4.1 Badges de Estado
Utilizados para mostrar estados de solicitudes, disponibilidad de relatores, etc.

**Estados de Solicitud**:
```html
<!-- Evaluación OTIC -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase">
    <span class="size-1.5 rounded-full bg-blue-600"></span>
    EN EVALUACIÓN OTIC
</span>

<!-- Rechazada OTIC -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase">
    <span class="size-1.5 rounded-full bg-red-600"></span>
    RECHAZADA OTIC
</span>

<!-- En Coordinación -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">
    <span class="size-1.5 rounded-full bg-amber-600"></span>
    EN COORDINACIÓN
</span>

<!-- Finalizada -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">
    <span class="size-1.5 rounded-full bg-green-600"></span>
    FINALIZADA
</span>
```

**Patrón para ASP.NET Core (ViewComponent)**:
```csharp
// Models/EstadoBadge.cs
public enum EstadoSolicitud
{
    EvaluacionOtic,
    RechazadaOtic,
    DerivadaTercero,
    EnCoordinacion,
    ListaEjecucion,
    Finalizada,
    Cerrada
}

// ViewComponents/EstadoBadgeViewComponent.cs
public class EstadoBadgeViewComponent : ViewComponent
{
    public IViewComponentResult Invoke(EstadoSolicitud estado, string? texto = null)
    {
        var config = GetEstadoConfig(estado);
        return View(config);
    }

    private EstadoBadgeConfig GetEstadoConfig(EstadoSolicitud estado)
    {
        return estado switch
        {
            EstadoSolicitud.EvaluacionOtic => new EstadoBadgeConfig
            {
                BgColor = "bg-blue-100",
                TextColor = "text-blue-700",
                DotColor = "bg-blue-600",
                Texto = "EN EVALUACIÓN OTIC"
            },
            EstadoSolicitud.RechazadaOtic => new EstadoBadgeConfig
            {
                BgColor = "bg-red-100",
                TextColor = "text-red-700",
                DotColor = "bg-red-600",
                Texto = "RECHAZADA OTIC"
            },
            // ... resto de estados
        };
    }
}
```

#### 3.4.2 Botones
```html
<!-- Botón Primario -->
<button class="flex items-center justify-center gap-2 px-4 h-10 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-bold text-sm shadow-sm">
    <span class="material-symbols-outlined text-[18px]">add</span>
    <span>Nuevo</span>
</button>

<!-- Botón Secundario -->
<button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium">
    Cancelar
</button>

<!-- Botón Peligro -->
<button class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-bold">
    <span class="material-symbols-outlined text-[20px]">delete</span>
    Eliminar
</button>

<!-- Botón Icono Solo -->
<button class="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-primary transition-colors">
    <span class="material-symbols-outlined text-[20px]">edit</span>
</button>
```

#### 3.4.3 Inputs y Forms
```html
<!-- Input de Texto Estándar -->
<div class="flex flex-col gap-2">
    <label class="text-sm font-medium text-[#111418]">
        Nombre Completo <span class="text-red-500">*</span>
    </label>
    <input
        type="text"
        class="w-full rounded-lg border border-[#dbe0e6] bg-white text-[#111418] h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
        placeholder="Ej. Juan Pérez"
        required
    />
</div>

<!-- Select/Dropdown -->
<div class="flex flex-col gap-2">
    <label class="text-sm font-medium text-[#111418]">
        Tipo de Capacitación <span class="text-red-500">*</span>
    </label>
    <div class="relative">
        <select class="w-full appearance-none rounded-lg border border-[#dbe0e6] bg-white text-[#111418] h-12 px-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer">
            <option disabled selected value="">Seleccione tipo</option>
            <option value="curso_normal">Curso Normal</option>
            <option value="curso_precontrato">Curso Precontrato</option>
        </select>
        <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">expand_more</span>
    </div>
</div>
```

#### 3.4.4 Tarjetas/Cards
```html
<!-- Card Estándar -->
<div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 class="font-bold text-[#111418]">Título de la Tarjeta</h3>
    </div>
    <div class="p-6">
        <!-- Contenido -->
    </div>
</div>

<!-- Card Estadística -->
<div class="bg-white p-6 rounded-xl border border-[#dbdee6] shadow-sm">
    <div class="flex items-center justify-between">
        <div>
            <p class="text-xs text-[#616e89] font-semibold uppercase tracking-wider">Solicitudes Activas</p>
            <h4 class="text-3xl font-black text-[#111418] mt-2">24</h4>
        </div>
        <div class="size-12 rounded-lg bg-blue-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary text-[28px]">assignment</span>
        </div>
    </div>
</div>
```

---

## 4. VISTAS HTML - ANÁLISIS DETALLADO

### 4.1 LOGIN.HTML

#### 4.1.1 Descripción
Página de inicio de sesión del sistema. Formulario simple con validación de email y contraseña.

#### 4.1.2 Estructura HTML
```html
<body class="bg-gray-50">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <!-- Logo y Título -->
            <div class="text-center mb-8">
                <div class="size-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-primary text-[40px]">school</span>
                </div>
                <h1 class="text-2xl font-black">Sistema de Gestión OTEC</h1>
                <p class="text-sm text-gray-600 mt-1">Ingrese sus credenciales para continuar</p>
            </div>

            <!-- Formulario -->
            <form id="loginForm">
                <!-- Email -->
                <div class="mb-4">
                    <label class="block text-sm font-semibold mb-2">Correo Electrónico</label>
                    <input type="email" id="email" class="..." required />
                </div>

                <!-- Password -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold mb-2">Contraseña</label>
                    <input type="password" id="password" class="..." required />
                </div>

                <!-- Botón -->
                <button type="submit" class="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold">
                    Iniciar Sesión
                </button>
            </form>

            <!-- Footer -->
            <p class="text-center text-xs text-gray-500 mt-6">
                Sistema OTEC v2.4.1 - ISO 9001:2015
            </p>
        </div>
    </div>
</body>
```

#### 4.1.3 Funcionalidad JavaScript
```javascript
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación simple (mock)
    if (email && password) {
        // Guardar sesión en localStorage
        const sesion = {
            email: email,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('sesion', JSON.stringify(sesion));

        // Redirigir al dashboard
        window.location.href = 'index.html';
    } else {
        alert('Por favor complete todos los campos');
    }
});
```

#### 4.1.4 Migración a ASP.NET Core

**Controlador (AccountController.cs)**:
```csharp
public class AccountController : Controller
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;

    public AccountController(
        SignInManager<ApplicationUser> signInManager,
        UserManager<ApplicationUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult Login(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;

        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(
                model.Email,
                model.Password,
                model.RememberMe,
                lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return RedirectToLocal(returnUrl);
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Credenciales inválidas");
                return View(model);
            }
        }

        return View(model);
    }

    private IActionResult RedirectToLocal(string? returnUrl)
    {
        if (Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        else
        {
            return RedirectToAction("Index", "Home");
        }
    }
}
```

**ViewModel (LoginViewModel.cs)**:
```csharp
public class LoginViewModel
{
    [Required(ErrorMessage = "El email es requerido")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    [Display(Name = "Correo Electrónico")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "La contraseña es requerida")]
    [DataType(DataType.Password)]
    [Display(Name = "Contraseña")]
    public string Password { get; set; } = string.Empty;

    [Display(Name = "Recordarme")]
    public bool RememberMe { get; set; }
}
```

**Vista Razor (Views/Account/Login.cshtml)**:
```cshtml
@model LoginViewModel
@{
    ViewData["Title"] = "Iniciar Sesión";
    Layout = null;
}

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Sistema OTEC</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
</head>
<body class="bg-gray-50 font-['Inter']">
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <div class="text-center mb-8">
                <div class="size-16 mx-auto bg-[#136dec]/10 rounded-2xl flex items-center justify-center mb-4">
                    <span class="material-symbols-outlined text-[#136dec] text-[40px]">school</span>
                </div>
                <h1 class="text-2xl font-black">Sistema de Gestión OTEC</h1>
                <p class="text-sm text-gray-600 mt-1">Ingrese sus credenciales para continuar</p>
            </div>

            <form asp-action="Login" asp-controller="Account" method="post">
                <div asp-validation-summary="All" class="text-red-600 text-sm mb-4"></div>

                <div class="mb-4">
                    <label asp-for="Email" class="block text-sm font-semibold mb-2"></label>
                    <input asp-for="Email" class="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#136dec]/20 focus:border-[#136dec] outline-none" />
                    <span asp-validation-for="Email" class="text-red-600 text-xs mt-1"></span>
                </div>

                <div class="mb-6">
                    <label asp-for="Password" class="block text-sm font-semibold mb-2"></label>
                    <input asp-for="Password" class="w-full h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#136dec]/20 focus:border-[#136dec] outline-none" />
                    <span asp-validation-for="Password" class="text-red-600 text-xs mt-1"></span>
                </div>

                <button type="submit" class="w-full h-12 bg-[#136dec] hover:bg-[#105bc4] text-white rounded-lg font-bold transition-colors">
                    Iniciar Sesión
                </button>
            </form>

            <p class="text-center text-xs text-gray-500 mt-6">
                Sistema OTEC v2.4.1 - ISO 9001:2015
            </p>
        </div>
    </div>

    @section Scripts {
        <partial name="_ValidationScriptsPartial" />
    }
</body>
</html>
```

---

### 4.2 INDEX.HTML / DASHBOARD.HTML

#### 4.2.1 Descripción
Dashboard principal del sistema. Muestra resumen de estadísticas, accesos rápidos y notificaciones.

#### 4.2.2 Componentes Principales
1. **Sidebar de Navegación** (componente reutilizable)
2. **Header con saludo y reloj**
3. **Tarjetas de acceso rápido** (4 tarjetas)
4. **Estadísticas generales** (4 KPIs)
5. **Actividad reciente** (lista)
6. **Notificaciones** (3 tipos: warning, info, success)
7. **Footer con estado del sistema**

#### 4.2.3 Estructura HTML Completa
```html
<body class="bg-background-light">
    <div class="flex h-screen overflow-hidden">
        <!-- SIDEBAR (componente reutilizable - ver sección 7.1) -->
        <aside class="w-64 bg-white border-r">
            <!-- Contenido del sidebar -->
        </aside>

        <!-- MAIN CONTENT -->
        <main class="flex-1 flex flex-col overflow-y-auto">
            <!-- HEADER CON GRADIENTE -->
            <header class="bg-gradient-to-r from-primary to-blue-600 p-8 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-black mb-2">Bienvenido, Admin OTEC</h2>
                        <p class="text-blue-100 text-sm">Hoy es <span id="current-date"></span></p>
                    </div>
                    <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                        <span class="material-symbols-outlined text-[20px]">schedule</span>
                        <span id="current-time" class="text-sm font-semibold"></span>
                    </div>
                </div>
            </header>

            <!-- CONTENIDO -->
            <div class="p-8 space-y-6">
                <!-- ACCESOS RÁPIDOS -->
                <div>
                    <h3 class="text-lg font-bold mb-4">Accesos Rápidos</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Tarjeta Nueva Solicitud -->
                        <a href="pages/solicitudes-nueva.html" class="group bg-white p-6 rounded-xl border hover:border-primary transition-all">
                            <div class="flex items-center gap-4">
                                <div class="size-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <span class="material-symbols-outlined text-primary group-hover:text-white text-[28px]">add_circle</span>
                                </div>
                                <div>
                                    <p class="text-sm font-bold">Nueva Solicitud</p>
                                    <p class="text-xs text-gray-600">Crear solicitud</p>
                                </div>
                            </div>
                        </a>
                        <!-- ... 3 tarjetas más similares -->
                    </div>
                </div>

                <!-- ESTADÍSTICAS -->
                <div>
                    <h3 class="text-lg font-bold mb-4">Resumen General</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- KPI Solicitudes Activas -->
                        <div class="bg-white p-6 rounded-xl border shadow-sm">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xs text-gray-600 font-semibold uppercase">Solicitudes Activas</p>
                                    <h4 class="text-3xl font-black mt-2">24</h4>
                                </div>
                                <div class="size-12 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <span class="material-symbols-outlined text-primary text-[28px]">assignment</span>
                                </div>
                            </div>
                        </div>
                        <!-- ... 3 KPIs más -->
                    </div>
                </div>

                <!-- ACTIVIDAD RECIENTE Y NOTIFICACIONES -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Actividad Reciente -->
                    <div class="bg-white p-6 rounded-xl border shadow-sm">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-base font-bold">Actividad Reciente</h3>
                            <a href="pages/solicitudes-listado.html" class="text-xs text-primary font-semibold hover:underline">Ver todas</a>
                        </div>
                        <div class="space-y-3">
                            <!-- Items de actividad -->
                        </div>
                    </div>

                    <!-- Notificaciones -->
                    <div class="bg-white p-6 rounded-xl border shadow-sm">
                        <!-- Contenido notificaciones -->
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script src="assets/js/components/sidebar.js"></script>
    <script>
        // Update date and time
        function updateDateTime() {
            const now = new Date();
            const dateStr = now.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('current-date').textContent = dateStr;

            const timeStr = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            document.getElementById('current-time').textContent = timeStr;
        }

        updateDateTime();
        setInterval(updateDateTime, 1000);
    </script>
</body>
```

#### 4.2.4 Migración a ASP.NET Core

**Controlador (HomeController.cs)**:
```csharp
public class HomeController : Controller
{
    private readonly ISolicitudService _solicitudService;
    private readonly IRelatorService _relatorService;
    private readonly IEmpresaService _empresaService;

    public HomeController(
        ISolicitudService solicitudService,
        IRelatorService relatorService,
        IEmpresaService empresaService)
    {
        _solicitudService = solicitudService;
        _relatorService = relatorService;
        _empresaService = empresaService;
    }

    [Authorize]
    public async Task<IActionResult> Index()
    {
        var viewModel = new DashboardViewModel
        {
            SolicitudesActivas = await _solicitudService.ContarActivasAsync(),
            RelatoresDisponibles = await _relatorService.ContarDisponiblesAsync(),
            EmpresasActivas = await _empresaService.ContarActivasAsync(),
            CursosEsteMes = await _solicitudService.ContarCursosDelMesAsync(),
            ActividadReciente = await _solicitudService.ObtenerActividadRecienteAsync(3),
            Notificaciones = await ObtenerNotificacionesAsync()
        };

        return View(viewModel);
    }

    private async Task<List<NotificacionViewModel>> ObtenerNotificacionesAsync()
    {
        return new List<NotificacionViewModel>
        {
            new NotificacionViewModel
            {
                Tipo = TipoNotificacion.Warning,
                Titulo = "5 solicitudes pendientes de asignación",
                Descripcion = "Requieren atención inmediata",
                Icono = "warning"
            },
            // ... más notificaciones
        };
    }
}
```

**ViewModel (DashboardViewModel.cs)**:
```csharp
public class DashboardViewModel
{
    public int SolicitudesActivas { get; set; }
    public int RelatoresDisponibles { get; set; }
    public int EmpresasActivas { get; set; }
    public int CursosEsteMes { get; set; }
    public List<ActividadRecienteViewModel> ActividadReciente { get; set; } = new();
    public List<NotificacionViewModel> Notificaciones { get; set; } = new();
}

public class ActividadRecienteViewModel
{
    public string Titulo { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Icono { get; set; } = string.Empty;
    public string ColorIcono { get; set; } = "primary";
    public DateTime Fecha { get; set; }
}

public enum TipoNotificacion
{
    Info,
    Warning,
    Success,
    Error
}

public class NotificacionViewModel
{
    public TipoNotificacion Tipo { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public string Icono { get; set; } = string.Empty;
}
```

**Vista Razor (Views/Home/Index.cshtml)**:
```cshtml
@model DashboardViewModel
@{
    ViewData["Title"] = "Dashboard";
}

<!-- Header con Gradiente -->
<header class="bg-gradient-to-r from-[#136dec] to-blue-600 p-8 text-white">
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-3xl font-black mb-2">Bienvenido, @User.Identity?.Name</h2>
            <p class="text-blue-100 text-sm">Hoy es <span id="current-date"></span></p>
        </div>
        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <span class="material-symbols-outlined text-[20px]">schedule</span>
            <span id="current-time" class="text-sm font-semibold"></span>
        </div>
    </div>
</header>

<!-- Contenido -->
<div class="p-8 space-y-6">
    <!-- Accesos Rápidos -->
    <div>
        <h3 class="text-lg font-bold mb-4">Accesos Rápidos</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a asp-controller="Solicitudes" asp-action="Nueva" class="group bg-white p-6 rounded-xl border hover:border-[#136dec] transition-all">
                <div class="flex items-center gap-4">
                    <div class="size-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-[#136dec] transition-colors">
                        <span class="material-symbols-outlined text-[#136dec] group-hover:text-white text-[28px]">add_circle</span>
                    </div>
                    <div>
                        <p class="text-sm font-bold">Nueva Solicitud</p>
                        <p class="text-xs text-gray-600">Crear solicitud</p>
                    </div>
                </div>
            </a>
            <!-- ... más tarjetas -->
        </div>
    </div>

    <!-- Estadísticas -->
    <div>
        <h3 class="text-lg font-bold mb-4">Resumen General</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-6 rounded-xl border shadow-sm">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-xs text-gray-600 font-semibold uppercase">Solicitudes Activas</p>
                        <h4 class="text-3xl font-black mt-2">@Model.SolicitudesActivas</h4>
                    </div>
                    <div class="size-12 rounded-lg bg-blue-50 flex items-center justify-center">
                        <span class="material-symbols-outlined text-[#136dec] text-[28px]">assignment</span>
                    </div>
                </div>
            </div>
            <!-- ... más KPIs usando @Model.RelatoresDisponibles, etc. -->
        </div>
    </div>

    <!-- Actividad Reciente -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-xl border shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-bold">Actividad Reciente</h3>
                <a asp-controller="Solicitudes" asp-action="Index" class="text-xs text-[#136dec] font-semibold hover:underline">Ver todas</a>
            </div>
            <div class="space-y-3">
                @foreach (var actividad in Model.ActividadReciente)
                {
                    <div class="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div class="size-10 rounded-lg bg-@(actividad.ColorIcono)-50 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-@(actividad.ColorIcono) text-[20px]">@actividad.Icono</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold truncate">@actividad.Titulo</p>
                            <p class="text-xs text-gray-600">@actividad.Fecha.ToRelativeTime()</p>
                        </div>
                    </div>
                }
            </div>
        </div>

        <!-- Notificaciones -->
        <div class="bg-white p-6 rounded-xl border shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-bold">Notificaciones</h3>
                <span class="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">@Model.Notificaciones.Count</span>
            </div>
            <div class="space-y-3">
                @foreach (var notif in Model.Notificaciones)
                {
                    var colorClass = notif.Tipo switch
                    {
                        TipoNotificacion.Warning => "amber",
                        TipoNotificacion.Info => "blue",
                        TipoNotificacion.Success => "green",
                        _ => "gray"
                    };

                    <div class="flex items-start gap-3 p-3 bg-@(colorClass)-50 border border-@(colorClass)-200 rounded-lg">
                        <span class="material-symbols-outlined text-@(colorClass)-600 text-[20px] mt-0.5">@notif.Icono</span>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-semibold">@notif.Titulo</p>
                            <p class="text-xs text-gray-600 mt-1">@notif.Descripcion</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
</div>

@section Scripts {
    <script>
        function updateDateTime() {
            const now = new Date();
            const dateStr = now.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('current-date').textContent = dateStr;

            const timeStr = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            document.getElementById('current-time').textContent = timeStr;
        }

        updateDateTime();
        setInterval(updateDateTime, 1000);
    </script>
}
```

---

### 4.3 SOLICITUDES-LISTADO.HTML

#### 4.3.1 Descripción
Listado de todas las solicitudes con filtros avanzados, búsqueda, paginación y acciones.

#### 4.3.2 Funcionalidades Clave
- Filtros: Búsqueda por texto, estado, coordinador, fecha
- Tabla con columnas: ID, Fecha, Empresa, Centro Gestión, Nombre Curso, Solicitante, Estado, Acciones
- Paginación
- Acciones por fila: Ver, Editar, Eliminar
- Estados con badges de colores
- Modal de confirmación para eliminar

#### 4.3.3 Estructura de la Tabla
```html
<div class="bg-white rounded-xl border shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[1100px]">
            <thead>
                <tr class="bg-slate-50 border-b">
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase">ID</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase">Fecha</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase">Empresa</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase">Centro Gestión</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase">Nombre Curso</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase">Solicitante</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase w-[180px]">Estado</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-secondary uppercase text-center">Acciones</th>
                </tr>
            </thead>
            <tbody id="tabla-solicitudes-body">
                <!-- Filas generadas por JS -->
            </tbody>
        </table>
    </div>

    <!-- Paginación -->
    <div class="flex items-center justify-between px-6 py-4 border-t bg-slate-50/50">
        <div class="text-[13px] text-secondary">
            Mostrando <span class="font-semibold" id="showing-start">1</span> a
            <span class="font-semibold" id="showing-end">10</span> de
            <span class="font-semibold" id="showing-total">50</span> resultados
        </div>
        <div class="flex items-center gap-1.5">
            <button id="btn-prev-page" class="px-3 py-1.5 rounded-lg border bg-white">Anterior</button>
            <div id="pagination-numbers"></div>
            <button id="btn-next-page" class="px-3 py-1.5 rounded-lg border bg-white">Siguiente</button>
        </div>
    </div>
</div>
```

#### 4.3.4 Estructura de Filtros
```html
<div class="bg-white p-4 rounded-xl border shadow-sm">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Búsqueda -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Buscar</label>
            <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-[18px]">search</span>
                <input
                    id="filter-search"
                    type="text"
                    placeholder="ID, Empresa, Curso..."
                    class="w-full h-9 pl-9 pr-4 rounded-lg border bg-gray-50 text-[13px] focus:ring-1 focus:ring-primary"
                />
            </div>
        </div>

        <!-- Estado -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Estado</label>
            <select id="filter-estado" class="h-9 px-3 rounded-lg border bg-gray-50 text-[13px]">
                <option value="">Todos los Estados</option>
                <option value="evaluacion_otic">En Evaluación OTIC</option>
                <option value="rechazada_otic">Rechazada por OTIC</option>
                <option value="derivada_tercero">Derivada a Tercero</option>
                <option value="en_coordinacion">En Coordinación</option>
                <option value="lista_ejecucion">Lista para Ejecución</option>
                <option value="finalizada">Finalizada</option>
                <option value="cerrada">Cerrada</option>
            </select>
        </div>

        <!-- Coordinador -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Coordinador Asignado</label>
            <select id="filter-coordinador" class="h-9 px-3 rounded-lg border bg-gray-50 text-[13px]">
                <option value="">Todos los Coordinadores</option>
                <option value="Andrés Silva">Andrés Silva</option>
                <option value="Beatriz Luna">Beatriz Luna</option>
                <option value="Carlos Méndez">Carlos Méndez</option>
                <option value="Daniela Rivas">Daniela Rivas</option>
            </select>
        </div>

        <!-- Fecha -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Fecha</label>
            <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-[18px]">calendar_today</span>
                <input
                    id="filter-fecha"
                    type="date"
                    class="w-full h-9 pl-9 pr-4 rounded-lg border bg-gray-50 text-[13px]"
                />
            </div>
        </div>
    </div>
</div>
```

#### 4.3.5 Datos Mock (solicitudes-mock.js)
```javascript
const mockSolicitudes = [
    {
        id: 1001,
        fecha: "2024-12-15",
        empresa: "Minería del Norte S.A.",
        centroGestion: "CC-2024-MN01",
        nombreCurso: "Seguridad en Altura - Nivel Básico",
        solicitante: "María González",
        coordinador: "Andrés Silva",
        estado: "evaluacion_otic",
        participantes: 25,
        modalidad: "presencial"
    },
    {
        id: 1002,
        fecha: "2024-12-14",
        empresa: "Constructora Horizonte Ltda.",
        centroGestion: "CC-2024-CH05",
        nombreCurso: "Uso de Andamios Certificado",
        solicitante: "Pedro Sánchez",
        coordinador: "Beatriz Luna",
        estado: "en_coordinacion",
        participantes: 15,
        modalidad: "presencial"
    },
    // ... más solicitudes
];
```

#### 4.3.6 Lógica de Renderizado (tabla-solicitudes.js)
```javascript
function renderTable(data) {
    const tbody = document.getElementById('tabla-solicitudes-body');

    if (!data || data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                    No se encontraron solicitudes
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = data.map(solicitud => `
        <tr class="hover:bg-blue-50/30 transition-colors border-b border-gray-100">
            <td class="px-4 py-3 text-xs font-mono text-gray-500">#${String(solicitud.id).padStart(4, '0')}</td>
            <td class="px-4 py-3 text-xs">${formatDate(solicitud.fecha)}</td>
            <td class="px-4 py-3 text-xs font-medium">${solicitud.empresa}</td>
            <td class="px-4 py-3 text-xs text-gray-600">${solicitud.centroGestion}</td>
            <td class="px-4 py-3 text-xs">${solicitud.nombreCurso}</td>
            <td class="px-4 py-3 text-xs">${solicitud.solicitante}</td>
            <td class="px-4 py-3">
                ${getEstadoBadge(solicitud.estado)}
            </td>
            <td class="px-4 py-3">
                <div class="flex items-center justify-center gap-1">
                    <button onclick="verSolicitud(${solicitud.id})" class="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-primary" title="Ver detalle">
                        <span class="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                    <button onclick="editarSolicitud(${solicitud.id})" class="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-primary" title="Editar">
                        <span class="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onclick="eliminarSolicitud(${solicitud.id})" class="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600" title="Eliminar">
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getEstadoBadge(estado) {
    const badges = {
        evaluacion_otic: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase"><span class="size-1.5 rounded-full bg-blue-600"></span>EN EVALUACIÓN OTIC</span>',
        rechazada_otic: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase"><span class="size-1.5 rounded-full bg-red-600"></span>RECHAZADA OTIC</span>',
        derivada_tercero: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold uppercase"><span class="size-1.5 rounded-full bg-gray-600"></span>DERIVADA A TERCERO</span>',
        en_coordinacion: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase"><span class="size-1.5 rounded-full bg-amber-600"></span>EN COORDINACIÓN</span>',
        lista_ejecucion: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase"><span class="size-1.5 rounded-full bg-purple-600"></span>LISTA PARA EJECUCIÓN</span>',
        finalizada: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase"><span class="size-1.5 rounded-full bg-green-600"></span>FINALIZADA</span>',
        cerrada: '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase"><span class="size-1.5 rounded-full bg-slate-600"></span>CERRADA</span>',
    };
    return badges[estado] || '';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}
```

#### 4.3.7 Filtrado y Búsqueda
```javascript
let currentData = [...mockSolicitudes];
let filteredData = [...mockSolicitudes];
let currentPage = 1;
const itemsPerPage = 10;

// Búsqueda con debounce
let searchTimeout;
document.getElementById('filter-search').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();
        applyFilters();
    }, 300);
});

// Filtros por select
document.getElementById('filter-estado').addEventListener('change', applyFilters);
document.getElementById('filter-coordinador').addEventListener('change', applyFilters);
document.getElementById('filter-fecha').addEventListener('change', applyFilters);

function applyFilters() {
    const searchTerm = document.getElementById('filter-search').value.toLowerCase().trim();
    const estadoFilter = document.getElementById('filter-estado').value;
    const coordinadorFilter = document.getElementById('filter-coordinador').value;
    const fechaFilter = document.getElementById('filter-fecha').value;

    filteredData = currentData.filter(solicitud => {
        // Búsqueda por texto
        const matchesSearch = !searchTerm ||
            solicitud.id.toString().includes(searchTerm) ||
            solicitud.empresa.toLowerCase().includes(searchTerm) ||
            solicitud.nombreCurso.toLowerCase().includes(searchTerm) ||
            solicitud.solicitante.toLowerCase().includes(searchTerm);

        // Filtro por estado
        const matchesEstado = !estadoFilter || solicitud.estado === estadoFilter;

        // Filtro por coordinador
        const matchesCoordinador = !coordinadorFilter || solicitud.coordinador === coordinadorFilter;

        // Filtro por fecha
        const matchesFecha = !fechaFilter || solicitud.fecha === fechaFilter;

        return matchesSearch && matchesEstado && matchesCoordinador && matchesFecha;
    });

    currentPage = 1;
    renderPagination();
    renderCurrentPage();
}
```

#### 4.3.8 Paginación
```javascript
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationNumbers = document.getElementById('pagination-numbers');

    paginationNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage
            ? 'px-3 py-1.5 rounded-lg bg-primary text-white font-bold text-[13px]'
            : 'px-3 py-1.5 rounded-lg border bg-white text-[13px] hover:bg-gray-50';
        button.addEventListener('click', () => {
            currentPage = i;
            renderCurrentPage();
            renderPagination();
        });
        paginationNumbers.appendChild(button);
    }

    // Update buttons state
    document.getElementById('btn-prev-page').disabled = currentPage === 1;
    document.getElementById('btn-next-page').disabled = currentPage === totalPages;
}

function renderCurrentPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);

    renderTable(pageData);

    // Update pagination info
    document.getElementById('showing-start').textContent = start + 1;
    document.getElementById('showing-end').textContent = Math.min(end, filteredData.length);
    document.getElementById('showing-total').textContent = filteredData.length;
}
```

#### 4.3.9 Migración a ASP.NET Core

**Controlador (SolicitudesController.cs)**:
```csharp
public class SolicitudesController : Controller
{
    private readonly ISolicitudService _solicitudService;
    private readonly IEmpresaService _empresaService;

    public SolicitudesController(
        ISolicitudService solicitudService,
        IEmpresaService empresaService)
    {
        _solicitudService = solicitudService;
        _empresaService = empresaService;
    }

    [HttpGet]
    public async Task<IActionResult> Index(
        string? busqueda,
        EstadoSolicitud? estado,
        int? coordinadorId,
        DateTime? fecha,
        int pagina = 1,
        int tamanoPagina = 10)
    {
        var filtros = new FiltrosSolicitud
        {
            Busqueda = busqueda,
            Estado = estado,
            CoordinadorId = coordinadorId,
            Fecha = fecha,
            Pagina = pagina,
            TamanoPagina = tamanoPagina
        };

        var resultado = await _solicitudService.ObtenerConFiltrosAsync(filtros);

        var viewModel = new SolicitudListViewModel
        {
            Solicitudes = resultado.Items,
            TotalPaginas = resultado.TotalPaginas,
            PaginaActual = pagina,
            TotalItems = resultado.TotalItems,
            Coordinadores = await _solicitudService.ObtenerCoordinadoresAsync(),
            Filtros = filtros
        };

        return View(viewModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Eliminar(int id)
    {
        await _solicitudService.EliminarAsync(id);
        return RedirectToAction(nameof(Index));
    }
}
```

**ViewModel (SolicitudListViewModel.cs)**:
```csharp
public class SolicitudListViewModel
{
    public List<SolicitudDto> Solicitudes { get; set; } = new();
    public int TotalPaginas { get; set; }
    public int PaginaActual { get; set; }
    public int TotalItems { get; set; }
    public List<CoordinadorDto> Coordinadores { get; set; } = new();
    public FiltrosSolicitud Filtros { get; set; } = new();
}

public class SolicitudDto
{
    public int Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Empresa { get; set; } = string.Empty;
    public string CentroGestion { get; set; } = string.Empty;
    public string NombreCurso { get; set; } = string.Empty;
    public string Solicitante { get; set; } = string.Empty;
    public string Coordinador { get; set; } = string.Empty;
    public EstadoSolicitud Estado { get; set; }
    public int Participantes { get; set; }
    public string Modalidad { get; set; } = string.Empty;
}

public class FiltrosSolicitud
{
    public string? Busqueda { get; set; }
    public EstadoSolicitud? Estado { get; set; }
    public int? CoordinadorId { get; set; }
    public DateTime? Fecha { get; set; }
    public int Pagina { get; set; } = 1;
    public int TamanoPagina { get; set; } = 10;
}
```

**Vista Razor (Views/Solicitudes/Index.cshtml)** - PARCIAL:
```cshtml
@model SolicitudListViewModel
@{
    ViewData["Title"] = "Solicitudes";
}

<!-- Filtros -->
<div class="bg-white p-4 rounded-xl border shadow-sm">
    <form asp-action="Index" method="get" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Búsqueda -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Buscar</label>
            <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500 text-[18px]">search</span>
                <input
                    name="busqueda"
                    value="@Model.Filtros.Busqueda"
                    type="text"
                    placeholder="ID, Empresa, Curso..."
                    class="w-full h-9 pl-9 pr-4 rounded-lg border bg-gray-50 text-[13px]"
                />
            </div>
        </div>

        <!-- Estado -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Estado</label>
            <select name="estado" class="h-9 px-3 rounded-lg border bg-gray-50 text-[13px]">
                <option value="">Todos los Estados</option>
                @foreach (EstadoSolicitud estado in Enum.GetValues(typeof(EstadoSolicitud)))
                {
                    <option value="@estado" selected="@(Model.Filtros.Estado == estado)">
                        @estado.ToDisplayName()
                    </option>
                }
            </select>
        </div>

        <!-- Coordinador -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Coordinador</label>
            <select name="coordinadorId" class="h-9 px-3 rounded-lg border bg-gray-50 text-[13px]">
                <option value="">Todos</option>
                @foreach (var coordinador in Model.Coordinadores)
                {
                    <option value="@coordinador.Id" selected="@(Model.Filtros.CoordinadorId == coordinador.Id)">
                        @coordinador.Nombre
                    </option>
                }
            </select>
        </div>

        <!-- Fecha -->
        <div class="flex flex-col gap-1.5">
            <label class="text-[11px] font-bold uppercase text-gray-700">Fecha</label>
            <input
                name="fecha"
                value="@Model.Filtros.Fecha?.ToString("yyyy-MM-dd")"
                type="date"
                class="h-9 px-3 rounded-lg border bg-gray-50 text-[13px]"
            />
        </div>

        <div class="flex items-end">
            <button type="submit" class="h-9 px-4 bg-[#136dec] text-white rounded-lg text-[13px] font-bold">
                Filtrar
            </button>
        </div>
    </form>
</div>

<!-- Tabla -->
<div class="bg-white rounded-xl border shadow-sm overflow-hidden mt-6">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50 border-b">
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase">ID</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase">Fecha</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase">Empresa</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase">Centro Gestión</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase">Nombre Curso</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase">Solicitante</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase">Estado</th>
                    <th class="px-4 py-3 text-[11px] font-bold text-gray-600 uppercase text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach (var solicitud in Model.Solicitudes)
                {
                    <tr class="hover:bg-blue-50/30 transition-colors border-b">
                        <td class="px-4 py-3 text-xs font-mono text-gray-500">#@solicitud.Id.ToString().PadLeft(4, '0')</td>
                        <td class="px-4 py-3 text-xs">@solicitud.Fecha.ToString("dd MMM yyyy")</td>
                        <td class="px-4 py-3 text-xs font-medium">@solicitud.Empresa</td>
                        <td class="px-4 py-3 text-xs text-gray-600">@solicitud.CentroGestion</td>
                        <td class="px-4 py-3 text-xs">@solicitud.NombreCurso</td>
                        <td class="px-4 py-3 text-xs">@solicitud.Solicitante</td>
                        <td class="px-4 py-3">
                            @await Component.InvokeAsync("EstadoBadge", new { estado = solicitud.Estado })
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center justify-center gap-1">
                                <a asp-action="Detalle" asp-route-id="@solicitud.Id" class="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-[#136dec]" title="Ver detalle">
                                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                                </a>
                                <a asp-action="Editar" asp-route-id="@solicitud.Id" class="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-[#136dec]" title="Editar">
                                    <span class="material-symbols-outlined text-[18px]">edit</span>
                                </a>
                                <button onclick="confirmarEliminar(@solicitud.Id)" class="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600" title="Eliminar">
                                    <span class="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>

    <!-- Paginación -->
    <div class="flex items-center justify-between px-6 py-4 border-t bg-slate-50/50">
        <div class="text-[13px] text-gray-600">
            Mostrando <span class="font-semibold">@((Model.PaginaActual - 1) * 10 + 1)</span> a
            <span class="font-semibold">@Math.Min(Model.PaginaActual * 10, Model.TotalItems)</span> de
            <span class="font-semibold">@Model.TotalItems</span> resultados
        </div>
        <div class="flex items-center gap-1.5">
            @if (Model.PaginaActual > 1)
            {
                <a asp-action="Index" asp-all-route-data="@GetRouteDataWithPage(Model.PaginaActual - 1)"
                   class="px-3 py-1.5 rounded-lg border bg-white text-[13px]">
                    Anterior
                </a>
            }

            @for (int i = 1; i <= Model.TotalPaginas; i++)
            {
                <a asp-action="Index" asp-all-route-data="@GetRouteDataWithPage(i)"
                   class="@(i == Model.PaginaActual ? "px-3 py-1.5 rounded-lg bg-[#136dec] text-white font-bold text-[13px]" : "px-3 py-1.5 rounded-lg border bg-white text-[13px]")">
                    @i
                </a>
            }

            @if (Model.PaginaActual < Model.TotalPaginas)
            {
                <a asp-action="Index" asp-all-route-data="@GetRouteDataWithPage(Model.PaginaActual + 1)"
                   class="px-3 py-1.5 rounded-lg border bg-white text-[13px]">
                    Siguiente
                </a>
            }
        </div>
    </div>
</div>

@section Scripts {
    <script>
        function confirmarEliminar(id) {
            if (confirm('¿Está seguro de eliminar esta solicitud?')) {
                fetch('@Url.Action("Eliminar")', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'RequestVerificationToken': '@GetAntiForgeryToken()'
                    },
                    body: `id=${id}`
                }).then(() => {
                    window.location.reload();
                });
            }
        }
    </script>
}

@functions {
    private RouteValueDictionary GetRouteDataWithPage(int pagina)
    {
        return new RouteValueDictionary
        {
            { "pagina", pagina },
            { "busqueda", Model.Filtros.Busqueda },
            { "estado", Model.Filtros.Estado },
            { "coordinadorId", Model.Filtros.CoordinadorId },
            { "fecha", Model.Filtros.Fecha?.ToString("yyyy-MM-dd") }
        };
    }
}
```

---

## 5. MODELOS DE DATOS NECESARIOS

### 5.1 Modelo Solicitud
```csharp
public class Solicitud
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string NombreSolicitante { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string EmailSolicitante { get; set; } = string.Empty;

    public int EmpresaId { get; set; }
    public Empresa Empresa { get; set; } = null!;

    [Required]
    [MaxLength(50)]
    public string CentroGestion { get; set; } = string.Empty;

    [Required]
    [MaxLength(300)]
    public string NombreCurso { get; set; } = string.Empty;

    [Required]
    public TipoCapacitacion TipoCapacitacion { get; set; }

    [Required]
    public Modalidad Modalidad { get; set; }

    [Range(4, 200)]
    public int CantidadHoras { get; set; }

    [Range(5, 100)]
    public int CantidadParticipantes { get; set; }

    [Required]
    public DateTime FechaInicio { get; set; }

    [Required]
    public DateTime FechaTermino { get; set; }

    [MaxLength(100)]
    public string? Horario { get; set; }

    public string? ServiciosSolicitados { get; set; } // JSON serializado

    [MaxLength(255)]
    public string? NombreArchivoParticipantes { get; set; }

    public byte[]? ArchivoParticipantes { get; set; }

    [Required]
    public EstadoSolicitud Estado { get; set; }

    public int? CoordinadorId { get; set; }
    public Usuario? Coordinador { get; set; }

    public int? RelatorId { get; set; }
    public Relator? Relator { get; set; }

    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaUltimaModificacion { get; set; }

    // Navegación
    public ICollection<Participante> Participantes { get; set; } = new List<Participante>();
    public Cotizacion? Cotizacion { get; set; }
    public ICollection<HistorialSolicitud> Historial { get; set; } = new List<HistorialSolicitud>();
}

public enum TipoCapacitacion
{
    [Display(Name = "Curso Normal")]
    CursoNormal,

    [Display(Name = "Curso Precontrato")]
    CursoPrecontrato
}

public enum Modalidad
{
    [Display(Name = "Presencial (In-Company)")]
    Presencial,

    [Display(Name = "E-Learning Sincrónico")]
    Sincronico,

    [Display(Name = "E-Learning Asincrónico")]
    Asincronico,

    [Display(Name = "A Distancia")]
    Distancia
}

public enum EstadoSolicitud
{
    [Display(Name = "En Evaluación OTIC")]
    EvaluacionOtic,

    [Display(Name = "Rechazada por OTIC")]
    RechazadaOtic,

    [Display(Name = "Derivada a Tercero")]
    DerivadaTercero,

    [Display(Name = "En Coordinación")]
    EnCoordinacion,

    [Display(Name = "Lista para Ejecución")]
    ListaEjecucion,

    [Display(Name = "Finalizada")]
    Finalizada,

    [Display(Name = "Cerrada")]
    Cerrada
}
```

### 5.2 Modelo Empresa
```csharp
public class Empresa
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string RazonSocial { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Rut { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? CentroGestionPrincipal { get; set; }

    [MaxLength(100)]
    public string? IndustriaRubro { get; set; }

    public int SolicitudesActivas { get; set; }

    public bool Activa { get; set; } = true;

    public DateTime FechaCreacion { get; set; }

    // Navegación
    public ICollection<Solicitud> Solicitudes { get; set; } = new List<Solicitud>();
}
```

### 5.3 Modelo Relator
```csharp
public class Relator
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string NombreCompleto { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Phone]
    [MaxLength(20)]
    public string Telefono { get; set; } = string.Empty;

    public string Especialidades { get; set; } = string.Empty; // JSON array serializado

    [Range(0, 1000000)]
    public decimal TarifaPorHora { get; set; }

    public int CursosDictados { get; set; }

    [Required]
    public DisponibilidadRelator Disponibilidad { get; set; }

    [Required]
    public EstadoRelator Estado { get; set; }

    public DateTime FechaCreacion { get; set; }

    // Navegación
    public ICollection<Solicitud> SolicitudesAsignadas { get; set; } = new List<Solicitud>();
}

public enum DisponibilidadRelator
{
    [Display(Name = "Disponible")]
    Disponible,

    [Display(Name = "En Curso")]
    EnCurso,

    [Display(Name = "Vacaciones")]
    Vacaciones,

    [Display(Name = "No Disponible")]
    NoDisponible
}

public enum EstadoRelator
{
    [Display(Name = "Activo")]
    Activo,

    [Display(Name = "Inactivo")]
    Inactivo
}
```

### 5.4 Modelo Participante
```csharp
public class Participante
{
    public int Id { get; set; }

    public int SolicitudId { get; set; }
    public Solicitud Solicitud { get; set; } = null!;

    [Required]
    [MaxLength(200)]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Rut { get; set; } = string.Empty;

    [EmailAddress]
    [MaxLength(100)]
    public string? Email { get; set; }

    public int? Edad { get; set; }

    [MaxLength(100)]
    public string? Cargo { get; set; }

    public bool ValidacionExitosa { get; set; }

    [MaxLength(500)]
    public string? ErrorValidacion { get; set; }
}
```

### 5.5 Modelo Cotización
```csharp
public class Cotizacion
{
    public int Id { get; set; }

    public int SolicitudId { get; set; }
    public Solicitud Solicitud { get; set; } = null!;

    public int RelatorId { get; set; }
    public Relator Relator { get; set; } = null!;

    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorHoraUF { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal CostosLogistica { get; set; }

    [Column(TypeName = "decimal(5,2)")]
    public decimal PorcentajeMargen { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal PrecioTotal { get; set; }

    public DateTime FechaCreacion { get; set; }

    public bool Enviada { get; set; }

    public DateTime? FechaEnvio { get; set; }
}
```

### 5.6 Modelo Historial
```csharp
public class HistorialSolicitud
{
    public int Id { get; set; }

    public int SolicitudId { get; set; }
    public Solicitud Solicitud { get; set; } = null!;

    [Required]
    [MaxLength(200)]
    public string Titulo { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descripcion { get; set; }

    [Required]
    public TipoEventoHistorial TipoEvento { get; set; }

    public DateTime FechaEvento { get; set; }

    public int? UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }
}

public enum TipoEventoHistorial
{
    SolicitudRecibida,
    RelatorAsignado,
    CotizacionEnviada,
    EstadoCambiado,
    Observacion
}
```

---

## 6. CONTROLADORES Y RUTAS

### 6.1 SolicitudesController - Métodos Completos

```csharp
[Authorize]
public class SolicitudesController : Controller
{
    private readonly ISolicitudService _solicitudService;
    private readonly IEmpresaService _empresaService;
    private readonly IRelatorService _relatorService;
    private readonly IWebHostEnvironment _environment;

    public SolicitudesController(
        ISolicitudService solicitudService,
        IEmpresaService empresaService,
        IRelatorService relatorService,
        IWebHostEnvironment environment)
    {
        _solicitudService = solicitudService;
        _empresaService = empresaService;
        _relatorService = relatorService;
        _environment = environment;
    }

    // GET: /Solicitudes
    [HttpGet]
    public async Task<IActionResult> Index(
        string? busqueda,
        EstadoSolicitud? estado,
        int? coordinadorId,
        DateTime? fecha,
        int pagina = 1)
    {
        var filtros = new FiltrosSolicitud
        {
            Busqueda = busqueda,
            Estado = estado,
            CoordinadorId = coordinadorId,
            Fecha = fecha,
            Pagina = pagina,
            TamanoPagina = 10
        };

        var resultado = await _solicitudService.ObtenerConFiltrosAsync(filtros);

        var viewModel = new SolicitudListViewModel
        {
            Solicitudes = resultado.Items,
            TotalPaginas = resultado.TotalPaginas,
            PaginaActual = pagina,
            TotalItems = resultado.TotalItems,
            Coordinadores = await _solicitudService.ObtenerCoordinadoresAsync(),
            Filtros = filtros
        };

        return View(viewModel);
    }

    // GET: /Solicitudes/Nueva
    [HttpGet]
    public async Task<IActionResult> Nueva()
    {
        var viewModel = new SolicitudNuevaViewModel
        {
            Empresas = await _empresaService.ObtenerTodasAsync()
        };

        return View(viewModel);
    }

    // POST: /Solicitudes/Nueva
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Nueva(
        SolicitudNuevaViewModel model,
        IFormFile? archivoParticipantes)
    {
        if (!ModelState.IsValid)
        {
            model.Empresas = await _empresaService.ObtenerTodasAsync();
            return View(model);
        }

        byte[]? archivoBytes = null;
        string? nombreArchivo = null;

        if (archivoParticipantes != null && archivoParticipantes.Length > 0)
        {
            // Validate file
            var allowedExtensions = new[] { ".xlsx", ".xls", ".csv" };
            var extension = Path.GetExtension(archivoParticipantes.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
            {
                ModelState.AddModelError("archivoParticipantes", "Formato de archivo no válido");
                model.Empresas = await _empresaService.ObtenerTodasAsync();
                return View(model);
            }

            if (archivoParticipantes.Length > 5 * 1024 * 1024) // 5MB
            {
                ModelState.AddModelError("archivoParticipantes", "El archivo excede el tamaño máximo de 5MB");
                model.Empresas = await _empresaService.ObtenerTodasAsync();
                return View(model);
            }

            // Read file to byte array
            using var memoryStream = new MemoryStream();
            await archivoParticipantes.CopyToAsync(memoryStream);
            archivoBytes = memoryStream.ToArray();
            nombreArchivo = archivoParticipantes.FileName;
        }

        var solicitud = new Solicitud
        {
            NombreSolicitante = model.NombreSolicitante,
            EmailSolicitante = model.EmailSolicitante,
            EmpresaId = model.EmpresaId,
            CentroGestion = model.CentroGestion,
            NombreCurso = model.NombreCurso,
            TipoCapacitacion = model.TipoCapacitacion,
            Modalidad = model.Modalidad,
            CantidadHoras = model.CantidadHoras,
            CantidadParticipantes = model.CantidadParticipantes,
            FechaInicio = model.FechaInicio,
            FechaTermino = model.FechaTermino,
            Horario = model.Horario,
            ServiciosSolicitados = model.ServiciosSolicitados != null
                ? JsonSerializer.Serialize(model.ServiciosSolicitados)
                : null,
            ArchivoParticipantes = archivoBytes,
            NombreArchivoParticipantes = nombreArchivo,
            Estado = EstadoSolicitud.EvaluacionOtic,
            FechaCreacion = DateTime.Now
        };

        await _solicitudService.CrearAsync(solicitud);

        TempData["Success"] = "Solicitud creada exitosamente";
        return RedirectToAction(nameof(Index));
    }

    // GET: /Solicitudes/Detalle/5
    [HttpGet]
    public async Task<IActionResult> Detalle(int id)
    {
        var solicitud = await _solicitudService.ObtenerPorIdAsync(id);

        if (solicitud == null)
        {
            return NotFound();
        }

        var viewModel = new SolicitudDetalleViewModel
        {
            Solicitud = solicitud,
            Relatores = await _relatorService.ObtenerActivosAsync(),
            Historial = await _solicitudService.ObtenerHistorialAsync(id)
        };

        return View(viewModel);
    }

    // POST: /Solicitudes/GuardarCotizacion
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> GuardarCotizacion(int solicitudId, CotizacionDto cotizacion)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        await _solicitudService.GuardarCotizacionAsync(solicitudId, cotizacion);

        TempData["Success"] = "Cotización guardada exitosamente";
        return RedirectToAction(nameof(Detalle), new { id = solicitudId });
    }

    // POST: /Solicitudes/EnviarCotizacion
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EnviarCotizacion(int solicitudId)
    {
        await _solicitudService.EnviarCotizacionAsync(solicitudId);

        TempData["Success"] = "Cotización enviada por email exitosamente";
        return RedirectToAction(nameof(Detalle), new { id = solicitudId });
    }

    // POST: /Solicitudes/Eliminar
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Eliminar(int id)
    {
        await _solicitudService.EliminarAsync(id);

        TempData["Success"] = "Solicitud eliminada exitosamente";
        return RedirectToAction(nameof(Index));
    }

    // GET: /Solicitudes/DescargarPlantilla
    [HttpGet]
    public IActionResult DescargarPlantilla()
    {
        var csv = "Nombre,RUT,Email,Edad,Cargo\n" +
                  "Juan Pérez,12.345.678-9,juan.perez@empresa.cl,35,Supervisor\n" +
                  "María González,98.765.432-1,maria.gonzalez@empresa.cl,28,Técnico";

        var bytes = Encoding.UTF8.GetBytes(csv);
        return File(bytes, "text/csv", "Plantilla_Participantes_OTEC.csv");
    }
}
```

---

Debido al límite de tokens, el documento ha sido creado hasta este punto. Continuaré en la siguiente parte con:

7. Componentes Reutilizables
8. JavaScript y Funcionalidad del Cliente
9. Autenticación y Seguridad
10. Instrucciones de Migración

¿Deseas que continúe con el resto del documento?
