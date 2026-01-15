# GUÍA COMPLETA DE MIGRACIÓN - PARTE 2
## CONTINUACIÓN DE LA DOCUMENTACIÓN

---

## 7. COMPONENTES REUTILIZABLES

### 7.1 Sidebar de Navegación

#### 7.1.1 HTML Original (sidebar component)
```html
<aside class="w-64 bg-white dark:bg-[#1a202c] border-r border-[#dbdee6] flex flex-col shrink-0">
    <!-- Logo Header -->
    <div class="p-6">
        <div class="flex items-center gap-3">
            <div class="bg-primary rounded-lg p-2 text-white">
                <span class="material-symbols-outlined">analytics</span>
            </div>
            <div class="flex flex-col">
                <h1 class="text-[#111318] text-base font-bold leading-tight">Sistema OTEC</h1>
                <p class="text-[#616e89] text-xs font-normal">Gestión Corporativa</p>
            </div>
        </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-3 space-y-1" id="sidebar-nav">
        <a class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors"
           href="index.html"
           data-page="inicio">
            <span class="material-symbols-outlined text-[24px]">house</span>
            <span class="text-sm font-medium">Inicio</span>
        </a>

        <a class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors"
           href="pages/solicitudes-listado.html"
           data-page="solicitudes">
            <span class="material-symbols-outlined text-[24px]">assignment</span>
            <span class="text-sm font-medium">Solicitudes</span>
        </a>

        <a class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors"
           href="pages/relatores-listado.html"
           data-page="relatores">
            <span class="material-symbols-outlined text-[24px]">group</span>
            <span class="text-sm font-medium">Relatores</span>
        </a>

        <a class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors"
           href="pages/reportes.html"
           data-page="reportes">
            <span class="material-symbols-outlined text-[24px]">bar_chart</span>
            <span class="text-sm font-medium">Reportes</span>
        </a>

        <a class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors"
           href="pages/empresas-listado.html"
           data-page="empresas">
            <span class="material-symbols-outlined text-[24px]">business</span>
            <span class="text-sm font-medium">Empresas</span>
        </a>

        <!-- Sección Configuración -->
        <div class="pt-4 pb-2 px-3">
            <p class="text-[10px] uppercase tracking-wider text-[#616e89] font-bold">Configuración</p>
        </div>

        <a class="flex items-center gap-3 px-3 py-2 text-[#616e89] hover:bg-gray-100 rounded-lg transition-colors"
           href="pages/configuracion.html"
           data-page="ajustes">
            <span class="material-symbols-outlined text-[24px]">settings</span>
            <span class="text-sm font-medium">Ajustes</span>
        </a>
    </nav>

    <!-- User Section -->
    <div class="p-4 border-t border-[#dbdee6]">
        <div class="flex items-center gap-3 mb-3">
            <div class="size-10 rounded-full bg-cover bg-center bg-[#f0f1f4]"
                 style="background-image: url('...')"></div>
            <div class="flex flex-col flex-1">
                <p class="text-xs font-bold">Admin OTEC</p>
                <p class="text-[10px] text-[#616e89]" id="userEmail">admin@otec.cl</p>
            </div>
        </div>

        <button id="logoutBtn" class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium">
            <span class="material-symbols-outlined text-[20px]">logout</span>
            <span>Cerrar Sesión</span>
        </button>
    </div>
</aside>
```

#### 7.1.2 JavaScript para Active State (sidebar.js)
```javascript
// Marcar el ítem activo del sidebar
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('#sidebar-nav a[data-page]');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Remover clases activas
        link.classList.remove('bg-primary/10', 'text-primary', 'font-bold');
        link.classList.add('text-[#616e89]', 'font-medium');

        // Verificar si es la página actual
        if (currentPath.includes(href) ||
            (currentPath === '/' && href === 'index.html') ||
            (currentPath.includes('index.html') && href === 'index.html')) {

            link.classList.remove('text-[#616e89]', 'font-medium');
            link.classList.add('bg-primary/10', 'text-primary', 'font-bold');
        }
    });
});
```

#### 7.1.3 Migración a Partial View (Razor)

**Partial View: Views/Shared/_Sidebar.cshtml**
```cshtml
<aside class="w-64 bg-white dark:bg-[#1a202c] border-r border-[#dbdee6] flex flex-col shrink-0">
    <!-- Logo Header -->
    <div class="p-6">
        <div class="flex items-center gap-3">
            <div class="bg-[#136dec] rounded-lg p-2 text-white">
                <span class="material-symbols-outlined">analytics</span>
            </div>
            <div class="flex flex-col">
                <h1 class="text-[#111318] text-base font-bold leading-tight">Sistema OTEC</h1>
                <p class="text-[#616e89] text-xs font-normal">Gestión Corporativa</p>
            </div>
        </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-3 space-y-1">
        @{
            var currentController = ViewContext.RouteData.Values["controller"]?.ToString();
            var currentAction = ViewContext.RouteData.Values["action"]?.ToString();
        }

        <a asp-controller="Home" asp-action="Index"
           class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors @(IsActive("Home", "Index") ? "bg-[#136dec]/10 text-[#136dec] font-bold" : "text-[#616e89] hover:bg-gray-100 font-medium")">
            <span class="material-symbols-outlined text-[24px]">house</span>
            <span class="text-sm">Inicio</span>
        </a>

        <a asp-controller="Solicitudes" asp-action="Index"
           class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors @(IsActive("Solicitudes") ? "bg-[#136dec]/10 text-[#136dec] font-bold" : "text-[#616e89] hover:bg-gray-100 font-medium")">
            <span class="material-symbols-outlined text-[24px]">assignment</span>
            <span class="text-sm">Solicitudes</span>
        </a>

        <a asp-controller="Relatores" asp-action="Index"
           class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors @(IsActive("Relatores") ? "bg-[#136dec]/10 text-[#136dec] font-bold" : "text-[#616e89] hover:bg-gray-100 font-medium")">
            <span class="material-symbols-outlined text-[24px]">group</span>
            <span class="text-sm">Relatores</span>
        </a>

        <a asp-controller="Reportes" asp-action="Index"
           class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors @(IsActive("Reportes") ? "bg-[#136dec]/10 text-[#136dec] font-bold" : "text-[#616e89] hover:bg-gray-100 font-medium")">
            <span class="material-symbols-outlined text-[24px]">bar_chart</span>
            <span class="text-sm">Reportes</span>
        </a>

        <a asp-controller="Empresas" asp-action="Index"
           class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors @(IsActive("Empresas") ? "bg-[#136dec]/10 text-[#136dec] font-bold" : "text-[#616e89] hover:bg-gray-100 font-medium")">
            <span class="material-symbols-outlined text-[24px]">business</span>
            <span class="text-sm">Empresas</span>
        </a>

        <!-- Sección Configuración -->
        <div class="pt-4 pb-2 px-3">
            <p class="text-[10px] uppercase tracking-wider text-[#616e89] font-bold">Configuración</p>
        </div>

        <a asp-controller="Configuracion" asp-action="Index"
           class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors @(IsActive("Configuracion") ? "bg-[#136dec]/10 text-[#136dec] font-bold" : "text-[#616e89] hover:bg-gray-100 font-medium")">
            <span class="material-symbols-outlined text-[24px]">settings</span>
            <span class="text-sm">Ajustes</span>
        </a>
    </nav>

    <!-- User Section -->
    <div class="p-4 border-t border-[#dbdee6]">
        <div class="flex items-center gap-3 mb-3">
            <div class="size-10 rounded-full bg-[#f0f1f4] bg-cover bg-center"
                 style="background-image: url('https://ui-avatars.com/api/?name=@User.Identity!.Name&background=136dec&color=fff')"></div>
            <div class="flex flex-col flex-1">
                <p class="text-xs font-bold">@User.Identity!.Name</p>
                <p class="text-[10px] text-[#616e89]">@User.FindFirst(ClaimTypes.Email)?.Value</p>
            </div>
        </div>

        <form asp-controller="Account" asp-action="Logout" method="post" class="w-full">
            @Html.AntiForgeryToken()
            <button type="submit" class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium">
                <span class="material-symbols-outlined text-[20px]">logout</span>
                <span>Cerrar Sesión</span>
            </button>
        </form>
    </div>
</aside>

@functions {
    private bool IsActive(string controller, string? action = null)
    {
        var currentController = ViewContext.RouteData.Values["controller"]?.ToString();
        var currentAction = ViewContext.RouteData.Values["action"]?.ToString();

        if (action != null)
        {
            return string.Equals(currentController, controller, StringComparison.OrdinalIgnoreCase) &&
                   string.Equals(currentAction, action, StringComparison.OrdinalIgnoreCase);
        }

        return string.Equals(currentController, controller, StringComparison.OrdinalIgnoreCase);
    }
}
```

**Layout Principal: Views/Shared/_Layout.cshtml**
```cshtml
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Sistema OTEC</title>

    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="~/css/global.css" asp-append-version="true" />

    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#136dec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#111621",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-background-light font-['Inter'] antialiased">
    <div class="flex h-screen overflow-hidden">
        <!-- Sidebar -->
        <partial name="_Sidebar" />

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col overflow-y-auto">
            @RenderBody()
        </main>
    </div>

    <script src="~/js/site.js" asp-append-version="true"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

---

### 7.2 View Component para Estado Badge

#### 7.2.1 Implementación del ViewComponent

**EstadoBadgeViewComponent.cs**
```csharp
using Microsoft.AspNetCore.Mvc;

namespace OTEC.Web.ViewComponents
{
    public class EstadoBadgeViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(EstadoSolicitud estado)
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
                EstadoSolicitud.DerivadaTercero => new EstadoBadgeConfig
                {
                    BgColor = "bg-gray-100",
                    TextColor = "text-gray-700",
                    DotColor = "bg-gray-600",
                    Texto = "DERIVADA A TERCERO"
                },
                EstadoSolicitud.EnCoordinacion => new EstadoBadgeConfig
                {
                    BgColor = "bg-amber-100",
                    TextColor = "text-amber-700",
                    DotColor = "bg-amber-600",
                    Texto = "EN COORDINACIÓN"
                },
                EstadoSolicitud.ListaEjecucion => new EstadoBadgeConfig
                {
                    BgColor = "bg-purple-100",
                    TextColor = "text-purple-700",
                    DotColor = "bg-purple-600",
                    Texto = "LISTA PARA EJECUCIÓN"
                },
                EstadoSolicitud.Finalizada => new EstadoBadgeConfig
                {
                    BgColor = "bg-green-100",
                    TextColor = "text-green-700",
                    DotColor = "bg-green-600",
                    Texto = "FINALIZADA"
                },
                EstadoSolicitud.Cerrada => new EstadoBadgeConfig
                {
                    BgColor = "bg-slate-100",
                    TextColor = "text-slate-700",
                    DotColor = "bg-slate-600",
                    Texto = "CERRADA"
                },
                _ => throw new ArgumentOutOfRangeException(nameof(estado))
            };
        }
    }

    public class EstadoBadgeConfig
    {
        public string BgColor { get; set; } = string.Empty;
        public string TextColor { get; set; } = string.Empty;
        public string DotColor { get; set; } = string.Empty;
        public string Texto { get; set; } = string.Empty;
    }
}
```

**Vista: Views/Shared/Components/EstadoBadge/Default.cshtml**
```cshtml
@model EstadoBadgeConfig

<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full @Model.BgColor @Model.TextColor text-[10px] font-bold uppercase tracking-wide">
    <span class="size-1.5 rounded-full @Model.DotColor"></span>
    @Model.Texto
</span>
```

**Uso en las vistas:**
```cshtml
@await Component.InvokeAsync("EstadoBadge", new { estado = solicitud.Estado })
```

---

### 7.3 Tag Helpers Personalizados

#### 7.3.1 FormButtonTagHelper (para botones con loading state)

```csharp
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace OTEC.Web.TagHelpers
{
    [HtmlTargetElement("form-button")]
    public class FormButtonTagHelper : TagHelper
    {
        public string? Icon { get; set; }
        public string Text { get; set; } = "Enviar";
        public string LoadingText { get; set; } = "Enviando...";
        public string Type { get; set; } = "submit";
        public string Color { get; set; } = "primary"; // primary, danger, secondary

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "button";
            output.Attributes.SetAttribute("type", Type);

            var colorClasses = Color switch
            {
                "primary" => "bg-[#136dec] hover:bg-[#105bc4]",
                "danger" => "bg-red-600 hover:bg-red-700",
                "secondary" => "border border-gray-300 text-gray-700 hover:bg-gray-50",
                _ => "bg-[#136dec] hover:bg-[#105bc4]"
            };

            var textColor = Color == "secondary" ? "" : "text-white";

            output.Attributes.SetAttribute("class",
                $"px-6 py-3 rounded-lg text-sm font-bold {textColor} {colorClasses} shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed");

            var iconHtml = !string.IsNullOrEmpty(Icon)
                ? $"<span class='material-symbols-outlined text-lg'>{Icon}</span>"
                : "";

            output.Content.SetHtmlContent($@"
                <span class='submit-text'>{iconHtml}{Text}</span>
                <span class='submit-loader hidden'>
                    <span class='material-symbols-outlined text-lg animate-spin'>progress_activity</span>
                    {LoadingText}
                </span>
            ");
        }
    }
}
```

**Uso:**
```cshtml
<form-button icon="send" text="Enviar Solicitud" loading-text="Enviando..." />
```

---

## 8. JAVASCRIPT Y FUNCIONALIDAD DEL CLIENTE

### 8.1 Validación de Formularios en Tiempo Real

#### 8.1.1 Validadores JavaScript (para formulario Nueva Solicitud)

```javascript
// wwwroot/js/form-validation.js

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        this.initValidators();
    }

    initValidators() {
        // Nombre - mínimo 3 caracteres
        this.addValidator('name', (value) => {
            if (value.length < 3) {
                return 'El nombre debe tener al menos 3 caracteres';
            }
            return null;
        });

        // Email válido
        this.addValidator('email', (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Ingrese un correo electrónico válido';
            }
            return null;
        });

        // Centro de gestión - formato CC-XXXX-XXX
        this.addValidator('cost_center', (value) => {
            const ccRegex = /^CC-\d{4}-[A-Z0-9]{3}$/;
            if (!ccRegex.test(value)) {
                return 'Formato: CC-XXXX-XXX';
            }
            return null;
        });

        // Participantes - entre 5 y 100
        this.addValidator('participants', (value) => {
            const num = parseInt(value);
            if (num < 5 || num > 100) {
                return 'Debe ser entre 5 y 100 participantes';
            }
            return null;
        });

        // Fecha inicio - no puede ser pasada
        this.addValidator('start_date', (value) => {
            const today = new Date().toISOString().split('T')[0];
            if (value < today) {
                return 'No puede ser una fecha pasada';
            }
            return null;
        });

        // Fecha término - debe ser >= fecha inicio
        this.addValidator('end_date', (value) => {
            const startDate = document.getElementById('start_date').value;
            if (startDate && value < startDate) {
                return 'Debe ser mayor o igual a fecha inicio';
            }
            return null;
        });

        // Horas personalizadas - múltiplo de 4
        this.addValidator('custom_hours', (value) => {
            const num = parseInt(value);
            if (num % 4 !== 0) {
                return 'Debe ser múltiplo de 4';
            }
            return null;
        });
    }

    addValidator(fieldId, validatorFn) {
        const field = document.getElementById(fieldId);
        if (!field) return;

        field.addEventListener('blur', () => {
            const value = field.value.trim();
            const error = validatorFn(value);

            this.showError(fieldId, error);
        });

        field.addEventListener('input', () => {
            // Clear error on input
            this.showError(fieldId, null);
        });
    }

    showError(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(`${fieldId}Error`);

        if (!errorEl) return;

        if (errorMessage) {
            this.errors[fieldId] = errorMessage;
            field.classList.add('border-red-500');
            errorEl.textContent = errorMessage;
            errorEl.classList.remove('hidden');
        } else {
            delete this.errors[fieldId];
            field.classList.remove('border-red-500');
            errorEl.classList.add('hidden');
        }
    }

    validateAll() {
        let isValid = true;

        // Trigger blur on all fields to show errors
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            const event = new Event('blur');
            field.dispatchEvent(event);
        });

        return Object.keys(this.errors).length === 0;
    }
}
```

#### 8.1.2 Progress Bar (barra de progreso del formulario)

```javascript
// wwwroot/js/form-progress.js

class FormProgress {
    constructor(formId, progressBarId) {
        this.form = document.getElementById(formId);
        this.progressBar = document.getElementById(progressBarId);
        this.requiredFields = [];
        this.init();
    }

    init() {
        // Get all required fields
        this.requiredFields = Array.from(
            this.form.querySelectorAll('[required]')
        );

        // Add listeners
        this.form.addEventListener('input', () => this.update());
        this.form.addEventListener('change', () => this.update());

        // Initial update
        this.update();
    }

    update() {
        const completed = this.requiredFields.filter(field => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                return field.checked;
            }
            return field.value.trim() !== '';
        }).length;

        const total = this.requiredFields.length;
        const percentage = (completed / total) * 100;

        this.progressBar.style.width = `${percentage}%`;

        // Enable/disable submit button
        const submitBtn = this.form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = percentage < 100;
        }

        return percentage;
    }

    getPercentage() {
        return this.update();
    }
}
```

**Uso en la vista:**
```cshtml
@section Scripts {
    <script src="~/js/form-validation.js"></script>
    <script src="~/js/form-progress.js"></script>
    <script>
        const validator = new FormValidator('formSolicitud');
        const progress = new FormProgress('formSolicitud', 'progressBarFill');

        document.getElementById('formSolicitud').addEventListener('submit', function(e) {
            if (!validator.validateAll()) {
                e.preventDefault();
                alert('Por favor corrija los errores en el formulario');
            }
        });
    </script>
}
```

---

### 8.2 Auto-Save (guardado automático en LocalStorage)

```javascript
// wwwroot/js/form-autosave.js

class FormAutoSave {
    constructor(formId, storageKey, debounceMs = 1000) {
        this.form = document.getElementById(formId);
        this.storageKey = storageKey;
        this.debounceMs = debounceMs;
        this.saveTimeout = null;
        this.init();
    }

    init() {
        // Load saved data
        this.loadDraft();

        // Add listeners for auto-save
        this.form.addEventListener('input', () => this.scheduleSave());
        this.form.addEventListener('change', () => this.scheduleSave());

        // Clear on submit
        this.form.addEventListener('submit', () => this.clearDraft());
    }

    scheduleSave() {
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => this.saveDraft(), this.debounceMs);
    }

    saveDraft() {
        const formData = new FormData(this.form);
        const data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(data));
        console.log('Draft saved:', data);
    }

    loadDraft() {
        const savedData = localStorage.getItem(this.storageKey);
        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);

            Object.entries(data).forEach(([key, value]) => {
                const field = this.form.querySelector(`[name="${key}"]`);
                if (field) {
                    if (field.type === 'checkbox' || field.type === 'radio') {
                        field.checked = value === 'on' || value === true;
                    } else {
                        field.value = value;
                    }
                }
            });

            console.log('Draft loaded:', data);
        } catch (e) {
            console.error('Error loading draft:', e);
        }
    }

    clearDraft() {
        localStorage.removeItem(this.storageKey);
    }
}
```

**Uso:**
```javascript
const autoSave = new FormAutoSave('formSolicitud', 'otec_solicitud_draft', 1000);
```

---

### 8.3 Tabla con Filtrado y Paginación (Client-Side)

```javascript
// wwwroot/js/data-table.js

class DataTable {
    constructor(config) {
        this.data = config.data || [];
        this.filteredData = [...this.data];
        this.tableBodyId = config.tableBodyId;
        this.currentPage = 1;
        this.itemsPerPage = config.itemsPerPage || 10;
        this.filters = {};
        this.renderRow = config.renderRow;

        this.init();
    }

    init() {
        this.render();
    }

    setData(data) {
        this.data = data;
        this.applyFilters();
    }

    addFilter(name, filterFn) {
        this.filters[name] = filterFn;
    }

    applyFilters() {
        this.filteredData = this.data.filter(item => {
            return Object.values(this.filters).every(filterFn => filterFn(item));
        });

        this.currentPage = 1;
        this.render();
    }

    render() {
        const tbody = document.getElementById(this.tableBodyId);
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageData = this.filteredData.slice(start, end);

        if (pageData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="100" class="px-6 py-12 text-center text-gray-500">
                        No se encontraron resultados
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = pageData.map(item => this.renderRow(item)).join('');
        }

        this.renderPagination();
        this.updatePaginationInfo();
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const container = document.getElementById('pagination-numbers');

        if (!container) return;

        container.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.className = i === this.currentPage
                ? 'px-3 py-1.5 rounded-lg bg-[#136dec] text-white font-bold text-[13px]'
                : 'px-3 py-1.5 rounded-lg border bg-white text-[13px] hover:bg-gray-50';
            button.addEventListener('click', () => this.goToPage(i));
            container.appendChild(button);
        }

        // Update prev/next buttons
        const btnPrev = document.getElementById('btn-prev-page');
        const btnNext = document.getElementById('btn-next-page');

        if (btnPrev) btnPrev.disabled = this.currentPage === 1;
        if (btnNext) btnNext.disabled = this.currentPage === totalPages;
    }

    updatePaginationInfo() {
        const start = (this.currentPage - 1) * this.itemsPerPage + 1;
        const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
        const total = this.filteredData.length;

        const startEl = document.getElementById('showing-start');
        const endEl = document.getElementById('showing-end');
        const totalEl = document.getElementById('showing-total');

        if (startEl) startEl.textContent = start;
        if (endEl) endEl.textContent = end;
        if (totalEl) totalEl.textContent = total;
    }

    goToPage(page) {
        this.currentPage = page;
        this.render();
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.render();
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.render();
        }
    }
}
```

**Uso (ejemplo solicitudes):**
```javascript
const table = new DataTable({
    data: solicitudes,
    tableBodyId: 'tabla-solicitudes-body',
    itemsPerPage: 10,
    renderRow: (solicitud) => `
        <tr class="hover:bg-blue-50/30 transition-colors border-b">
            <td class="px-4 py-3 text-xs">#${String(solicitud.id).padStart(4, '0')}</td>
            <td class="px-4 py-3 text-xs">${solicitud.fecha}</td>
            <td class="px-4 py-3 text-xs font-medium">${solicitud.empresa}</td>
            <td class="px-4 py-3 text-xs">${solicitud.nombreCurso}</td>
            <td class="px-4 py-3">${getEstadoBadge(solicitud.estado)}</td>
            <td class="px-4 py-3">
                <div class="flex items-center gap-1">
                    <button onclick="verSolicitud(${solicitud.id})" class="p-1.5 hover:bg-gray-100 rounded">
                        <span class="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                </div>
            </td>
        </tr>
    `
});

// Add search filter
document.getElementById('filter-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    table.addFilter('search', (item) => {
        return !searchTerm ||
            item.id.toString().includes(searchTerm) ||
            item.empresa.toLowerCase().includes(searchTerm) ||
            item.nombreCurso.toLowerCase().includes(searchTerm);
    });
    table.applyFilters();
});

// Add estado filter
document.getElementById('filter-estado').addEventListener('change', (e) => {
    const estado = e.target.value;
    table.addFilter('estado', (item) => {
        return !estado || item.estado === estado;
    });
    table.applyFilters();
});
```

---

## 9. AUTENTICACIÓN Y SEGURIDAD

### 9.1 Configuración de ASP.NET Core Identity

**Program.cs:**
```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OTEC.Web.Data;
using OTEC.Web.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => {
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 8;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Cookie settings
builder.Services.ConfigureApplicationCookie(options => {
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/Logout";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.ExpireTimeSpan = TimeSpan.FromHours(8);
    options.SlidingExpiration = true;
});

// Application Services
builder.Services.AddScoped<ISolicitudService, SolicitudService>();
builder.Services.AddScoped<IRelatorService, RelatorService>();
builder.Services.AddScoped<IEmpresaService, EmpresaService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

### 9.2 ApplicationUser Model

```csharp
using Microsoft.AspNetCore.Identity;

namespace OTEC.Web.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string NombreCompleto { get; set; } = string.Empty;
        public DateTime FechaCreacion { get; set; }
        public bool Activo { get; set; } = true;
    }
}
```

### 9.3 Seeding Data Inicial

```csharp
public class DbInitializer
{
    public static async Task SeedAsync(
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        // Create roles
        string[] roles = { "Admin", "Coordinador", "Visualizador" };
        foreach (var roleName in roles)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        // Create admin user
        var adminEmail = "admin@otec.cl";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);

        if (adminUser == null)
        {
            adminUser = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                NombreCompleto = "Admin OTEC",
                EmailConfirmed = true,
                Activo = true,
                FechaCreacion = DateTime.Now
            };

            var result = await userManager.CreateAsync(adminUser, "Admin123!");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }

        // Seed empresas
        if (!context.Empresas.Any())
        {
            var empresas = new List<Empresa>
            {
                new Empresa { RazonSocial = "TechCorp SpA", Rut = "76.123.456-7", CentroGestionPrincipal = "CC-2024-TC1", IndustriaRubro = "Tecnología", Activa = true, FechaCreacion = DateTime.Now },
                new Empresa { RazonSocial = "Minera Los Andes", Rut = "81.234.567-8", CentroGestionPrincipal = "CC-2024-MLA", IndustriaRubro = "Minería", Activa = true, FechaCreacion = DateTime.Now },
                new Empresa { RazonSocial = "Constructora Horizonte", Rut = "92.345.678-9", CentroGestionPrincipal = "CC-2024-CHZ", IndustriaRubro = "Construcción", Activa = true, FechaCreacion = DateTime.Now },
            };

            context.Empresas.AddRange(empresas);
            await context.SaveChangesAsync();
        }
    }
}
```

**Llamar al Seed en Program.cs:**
```csharp
// Seed database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

        await context.Database.MigrateAsync();
        await DbInitializer.SeedAsync(context, userManager, roleManager);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the DB.");
    }
}
```

---

## 10. INSTRUCCIONES DE MIGRACIÓN

### 10.1 Orden de Migración Recomendado

**Paso 1: Configuración Inicial del Proyecto**
1. Crear proyecto ASP.NET Core MVC
2. Configurar Entity Framework Core + SQL Server
3. Configurar ASP.NET Core Identity
4. Instalar paquetes NuGet necesarios

**Paso 2: Modelos y Base de Datos**
1. Crear todos los modelos de dominio (Solicitud, Empresa, Relator, etc.)
2. Crear ApplicationDbContext
3. Crear y ejecutar migraciones iniciales
4. Configurar seeding de datos

**Paso 3: Servicios y Lógica de Negocio**
1. Crear interfaces de servicios (ISolicitudService, etc.)
2. Implementar servicios concretos
3. Registrar servicios en DI container

**Paso 4: Autenticación**
1. Migrar login.html a AccountController + vistas Razor
2. Configurar cookies y sesiones
3. Probar login/logout

**Paso 5: Layout y Componentes Compartidos**
1. Crear _Layout.cshtml
2. Migrar Sidebar a _Sidebar.cshtml partial
3. Copiar global.css a wwwroot/css/
4. Configurar Tailwind CSS

**Paso 6: Vistas Principales (en orden)**
1. Dashboard (Home/Index)
2. Listado de Solicitudes (Solicitudes/Index)
3. Nueva Solicitud (Solicitudes/Nueva)
4. Detalle de Solicitud (Solicitudes/Detalle)
5. Listado de Relatores (Relatores/Index)
6. Listado de Empresas (Empresas/Index)
7. Reportes (Reportes/Index)

**Paso 7: JavaScript y Funcionalidad Client-Side**
1. Migrar scripts de validación
2. Implementar progress bar
3. Configurar auto-save
4. Implementar data-table filtering/pagination

**Paso 8: Testing y Refinamiento**
1. Probar todas las vistas y flujos
2. Verificar validaciones
3. Optimizar consultas de base de datos
4. Ajustar estilos y responsividad

---

### 10.2 Comandos Útiles

**Crear el Proyecto:**
```bash
dotnet new mvc -n OTEC.Web
cd OTEC.Web
```

**Instalar Paquetes:**
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Identity.UI
```

**Migraciones:**
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

**Ejecutar el Proyecto:**
```bash
dotnet run
```

---

### 10.3 Estructura de Archivos Estáticos

**wwwroot/css/**
- global.css (copiar desde assets/css/global.css)

**wwwroot/js/**
- site.js (JavaScript global del sitio)
- form-validation.js
- form-progress.js
- form-autosave.js
- data-table.js

**wwwroot/lib/** (opcional si usas LibMan)
- Tailwind CSS (si decides no usar CDN)

---

### 10.4 Checklist de Migración

**Funcionalidad Core:**
- [ ] Login/Logout funcional
- [ ] Dashboard con estadísticas
- [ ] CRUD completo de Solicitudes
- [ ] Filtrado y búsqueda en listados
- [ ] Paginación
- [ ] Validación de formularios (server + client)
- [ ] Manejo de archivos Excel
- [ ] Estados de solicitud con badges
- [ ] Cotizaciones
- [ ] Historial de cambios

**UI/UX:**
- [ ] Sidebar con navegación activa
- [ ] Diseño responsive
- [ ] Estilos Tailwind CSS correctos
- [ ] Iconos Material Symbols
- [ ] Notificaciones/Toasts
- [ ] Modales de confirmación
- [ ] Loading states en botones
- [ ] Progress bar en formularios

**Seguridad:**
- [ ] Autenticación funcional
- [ ] Autorización por roles
- [ ] AntiForgeryToken en formularios POST
- [ ] Sanitización de inputs
- [ ] Prevención de SQL Injection (usar EF Core)
- [ ] Prevención de XSS

**Performance:**
- [ ] Consultas optimizadas (eager loading, paginación)
- [ ] Índices en base de datos
- [ ] Caching donde corresponda
- [ ] Compresión de respuestas
- [ ] Minificación de CSS/JS (en producción)

---

### 10.5 Mejoras Sugeridas (Post-Migración)

**Funcionalidades Adicionales:**
1. **Exportación de Reportes**: Excel, PDF
2. **Notificaciones Email**: Al crear solicitud, cambiar estado, enviar cotización
3. **Dashboard Avanzado**: Gráficos con Chart.js o similar
4. **Búsqueda Global**: Barra de búsqueda en header
5. **Filtros Avanzados**: Guardar filtros preferidos
6. **Auditoría Completa**: Registro de todos los cambios con usuario y timestamp
7. **API REST**: Para integración con otros sistemas
8. **Modo Oscuro**: Toggle dark/light theme

**Arquitectura:**
1. **Repository Pattern**: Abstraer acceso a datos
2. **Unit of Work**: Para transacciones complejas
3. **AutoMapper**: Para mapeo DTO <-> Entity
4. **MediatR**: Para CQRS pattern
5. **SignalR**: Para notificaciones en tiempo real

---

## 11. NOTAS FINALES IMPORTANTES

### 11.1 Diferencias Clave HTML vs Razor

**Navegación:**
- HTML: `<a href="pages/solicitudes.html">`
- Razor: `<a asp-controller="Solicitudes" asp-action="Index">`

**Formularios:**
- HTML: `<form id="myForm" onsubmit="handleSubmit()">`
- Razor: `<form asp-action="Create" method="post">`

**Datos Dinámicos:**
- HTML: `<span id="userName"><!-- JS lo rellena --></span>`
- Razor: `<span>@User.Identity.Name</span>`

**Iteración:**
- HTML: JavaScript con `data.forEach(item => { ... })`
- Razor: `@foreach (var item in Model.Items) { ... }`

**Condicionales:**
- HTML: JavaScript con `if (condition) { ... }`
- Razor: `@if (Model.Count > 0) { ... }`

### 11.2 Manejo de Estado

**LocalStorage (HTML) → Base de Datos + Session (ASP.NET)**
- Los datos mock en LocalStorage deben ser reemplazados por consultas a SQL Server
- La sesión de usuario se maneja con ASP.NET Identity, no con LocalStorage
- El auto-save puede seguir usando LocalStorage en el cliente como draft

### 11.3 Validación

**Client-Side:**
- Mantener validación JavaScript para UX inmediata
- Usar atributos HTML5 de validación

**Server-Side:**
- SIEMPRE validar en el servidor (ModelState)
- Usar Data Annotations en los modelos
- Validaciones personalizadas con IValidatableObject

### 11.4 Seguridad Crítica

**NUNCA confiar en el cliente:**
- Validar TODO en el servidor
- Escapar output para prevenir XSS
- Usar parámetros en consultas (EF Core lo hace automáticamente)
- Implementar CSRF protection (AntiForgeryToken)
- Sanitizar uploads de archivos

**Autenticación/Autorización:**
- Decorar controllers/actions con `[Authorize]`
- Verificar permisos antes de operaciones sensibles
- No exponer información sensible en respuestas

---

## FIN DE LA GUÍA

Esta guía proporciona una documentación completa para migrar el prototipo HTML/JavaScript a ASP.NET Core C#. Para cualquier vista adicional que no se haya cubierto en detalle, seguir los mismos patrones establecidos en los ejemplos.

**Contacto para consultas:**
- Documentar cualquier decisión arquitectónica que se tome
- Mantener nomenclatura consistente en español
- Comentar código complejo
- Escribir tests unitarios para servicios críticos

---

**Versión:** 1.0
**Fecha:** 2026-01-13
**Proyecto:** OTEC - Sistema de Gestión Corporativa
