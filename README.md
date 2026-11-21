# TechAsset: Sistema de Gestión de Inventario y Préstamo de Equipos Tecnológicos

> **Asignatura:** Construcción de Software  
> **Organización:** Innovatech Solutions S.A.C.  
> **Arquitectura:** Clean Architecture (Onion Architecture) + React SPA  
> **Tecnologías:** ASP.NET Core 8, Entity Framework Core 8, PostgreSQL, React, Vite, Tailwind CSS  

---

## 1. Visión General del Proyecto

**TechAsset** es una solución integral desarrollada para la empresa *Innovatech Solutions S.A.C.* con el propósito de erradicar la pérdida de información, inconsistencias y falta de trazabilidad en el préstamo de activos tecnológicos (laptops, desktops, monitores, impresoras, tablets, proyectores y equipos de red) a más de 500 colaboradores.

El sistema sigue estrictamente la arquitectura, convenciones y patrones de construcción de software aplicados a lo largo de las semanas 03 a 12 de las guías de laboratorio del curso:

1. **Separación de Responsabilidades y Capas Limpias (Clean Architecture):**
   - `TechAsset.Domain`: Entidades puras del dominio (`Usuario`, `Equipo`, `Prestamo`).
   - `TechAsset.Application`: Contratos (`Interfaces`), lógica de negocio (`Services`), modelos de transferencia (`DTOs`) y validaciones formales con DataAnnotations.
   - `TechAsset.Infrastructure`: Contexto de base de datos (`AppDbContext`), configuración de relaciones y mapeo relacional con EF Core 8 sobre PostgreSQL, implementación de repositorios concretos y migraciones.
   - `TechAsset.API`: Controladores REST (`UsuariosController`, `EquiposController`, `PrestamosController`, `DashboardController`), políticas CORS, inyección de dependencias (`Program.cs`) y documentación interactiva Swagger/OpenAPI.
2. **Frontend SPA Modular (React + Vite + Tailwind CSS):**
   - Arquitectura basada en componentes reutilizables (`Button`, `InputField`, `SelectField`, `FormMessage`, `StatusBadge`, `PageContainer`, `Modal`, `StatsCard`).
   - Layout persistente con navegación empresarial (`Sidebar`, `Header`, `MainLayout`).
   - Enrutamiento dinámico mediante `react-router-dom`.
   - Servicios de comunicación HTTP centralizados con control y normalización de datos (`normalizeText`).

---

## 2. Estructura del Repositorio

```text
TechAsset/
├── backend/
│   ├── TechAsset.sln
│   ├── TechAsset.Domain/
│   │   └── Entities/
│   │       ├── Usuario.cs
│   │       ├── Equipo.cs
│   │       └── Prestamo.cs
│   ├── TechAsset.Application/
│   │   ├── DTOs/
│   │   │   ├── UsuarioDtos.cs
│   │   │   ├── EquipoDtos.cs
│   │   │   ├── PrestamoDtos.cs
│   │   │   └── DashboardStatsDto.cs
│   │   ├── Interfaces/
│   │   │   ├── IUsuarioRepository.cs & IUsuarioService.cs
│   │   │   ├── IEquipoRepository.cs & IEquipoService.cs
│   │   │   ├── IPrestamoRepository.cs & IPrestamoService.cs
│   │   │   └── IDashboardService.cs
│   │   └── Services/
│   │       ├── UsuarioService.cs
│   │       ├── EquipoService.cs
│   │       ├── PrestamoService.cs
│   │       └── DashboardService.cs
│   ├── TechAsset.Infrastructure/
│   │   ├── Data/
│   │   │   └── AppDbContext.cs
│   │   ├── Repositories/
│   │   │   ├── UsuarioRepository.cs
│   │   │   ├── EquipoRepository.cs
│   │   │   └── PrestamoRepository.cs
│   │   └── Migrations/
│   └── TechAsset.API/
│       ├── Controllers/
│       │   ├── UsuariosController.cs
│       │   ├── EquiposController.cs
│       │   ├── PrestamosController.cs
│       │   └── DashboardController.cs
│       ├── Properties/
│       │   └── launchSettings.json (Port 5153)
│       ├── Program.cs
│       └── appsettings.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── SelectField.jsx
│   │   │   ├── FormMessage.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EquiposList.jsx
│   │   │   ├── CreateEquipo.jsx
│   │   │   ├── PrestamosList.jsx
│   │   │   ├── CreatePrestamo.jsx
│   │   │   ├── UsuariosList.jsx
│   │   │   └── CreateUsuario.jsx
│   │   ├── services/
│   │   │   ├── apiConfig.js
│   │   │   ├── usuarioService.js
│   │   │   ├── equipoService.js
│   │   │   ├── prestamoService.js
│   │   │   └── dashboardService.js
│   │   ├── utils/
│   │   │   └── normalizeText.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── INFORME_TECNICO.md
└── README.md
```

---

## 3. Requisitos Previos

- **.NET SDK 8.0** o superior.
- **Node.js v18+** y **npm**.
- **PostgreSQL 14+** (configurado en el puerto `5433` o `5432`, base de datos `TechAssetDB`).

---

## 4. Instrucciones de Ejecución

### 4.1. Base de Datos (PostgreSQL)
Asegúrese de que el servidor PostgreSQL se encuentre activo. La cadena de conexión predeterminada configurada en `backend/TechAsset.API/appsettings.json` es:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5433;Database=TechAssetDB;Username=postgres;Password=1234"
}
```
*Las migraciones y datos semilla de prueba se aplican automáticamente al iniciar la API.*

### 4.2. Ejecución del Backend (.NET 8)
Abra una terminal y ejecute:
```powershell
cd backend\TechAsset.API
dotnet run --launch-profile http
```
- API en ejecución: `http://localhost:5153`
- Documentación Swagger: `http://localhost:5153/swagger`

### 4.3. Ejecución del Frontend (React + Vite)
Abra una segunda terminal y ejecute:
```powershell
cd frontend
npm install
npm run dev
```
- Aplicación web SPA disponible en: `http://localhost:5173`

---

## 5. Documentación Académica Formal (PDF)

El proyecto cuenta con dos documentos técnicos exhaustivos preparados según las especificaciones y rúbrica de evaluación del Caso Práctico Integrador:

1. **[DOCUMENTO_DE_ANALISIS.md](file:///c:/Users/cjazz/Documents/2026-II/Construccion%20de%20Software/TechAsset/DOCUMENTO_DE_ANALISIS.md)**:
   - Análisis y diagnóstico del problema real en *Innovatech Solutions S.A.C.*
   - Definición de los 3 actores normativos y matriz de Control de Accesos por Rol (RBAC).
   - Especificación formal de requerimientos funcionales (RF-01 a RF-17) y reglas de negocio (RN-01 a RN-10).
   - Modelo de datos referencial con diagrama Entidad-Relación y diccionario de datos.
   - Justificación del ciclo de vida iterativo e incremental y estándares de construcción.

2. **[INFORME_TECNICO.md](file:///c:/Users/cjazz/Documents/2026-II/Construccion%20de%20Software/TechAsset/INFORME_TECNICO.md)**:
   - Matriz de correspondencia con la Rúbrica de Evaluación (20/20 puntos).
   - Catálogo de componentes reutilizables y técnicas de refinamiento aplicadas.
   - Detalle de módulos de salida y Dashboard ejecutivo con los 6 indicadores normativos.
   - Resultados verificados de los 7 escenarios mínimos de uso real.
   - Respuesta técnica fundamentada a la Pregunta de Reflexión (Sección 13).
   - Guía estructurada para la sustentación y defensa del proyecto ante el docente evaluador.
