# INFORME TÉCNICO INTEGRADOR
## TechAsset: Sistema de Gestión de Inventario y Préstamo de Equipos Tecnológicos

- **Institución:** Innovatech Solutions S.A.C.
- **Curso:** Construcción de Software
- **Semanas Evaluadas:** 01 a 12
- **Autor / Rol:** Equipo de Ingeniería y Arquitectura de Software

---

## 1. Actividad 1: Análisis y Planificación del Proyecto

### 1.1. Identificación del Problema
La empresa *Innovatech Solutions S.A.C.* cuenta con más de 500 colaboradores y cientos de activos de TI (laptops, PCs de escritorio, monitores, proyectores, impresoras, switches, routers y tablets). Anteriormente, el control se realizaba en hojas de cálculo no centralizadas y planillas físicas, acarreando:
1. **Pérdida de información y extravío de activos.**
2. **Duplicidad de registros** y falta de unicidad en identificadores patrimoniales y correos.
3. **Ausencia de trazabilidad** en asignaciones temporales y préstamos activos.
4. **Desconocimiento de la disponibilidad operativa** (equipos prestados versus en mantenimiento/baja).
5. **Carencia de métricas e indicadores de negocio** para la reposición o adquisición estratégica de equipamiento.

### 1.2. Actores del Sistema
- **Administrador de Sistemas:** Responsable de la configuración global, gestión integral de usuarios (incluyendo deshabilitación/habilitación), inventario maestro de equipos y supervisión de reportes ejecutivos.
- **Responsable de Tecnología (Soporte TI):** Responsable de registrar activos, asignar préstamos a colaboradores, recepcionar devoluciones con inspección física y actualizar el estado de los equipos.
- **Colaborador:** Usuario institucional beneficiario que solicita equipos tecnológicos para sus funciones laborales y consulta su disponibilidad.

### 1.3. Requerimientos Funcionales (RF)
| Código | Requerimiento Funcional | Estado de Implementación |
| :--- | :--- | :--- |
| **RF-01** | Registrar usuarios con validación de datos personales y área. | Implementado y Verificado |
| **RF-02** | Actualizar usuarios registrados en el sistema. | Implementado y Verificado |
| **RF-03** | Consultar usuarios registrados y realizar búsquedas por texto. | Implementado y Verificado |
| **RF-04** | Deshabilitar usuarios (soft delete) impidiendo nuevos préstamos. | Implementado y Verificado |
| **RF-05** | Registrar equipos tecnológicos con código patrimonial único. | Implementado y Verificado |
| **RF-06** | Actualizar características de equipos tecnológicos. | Implementado y Verificado |
| **RF-07** | Consultar inventario de equipos con filtros multicriterio. | Implementado y Verificado |
| **RF-08** | Actualizar estado operativo del equipo (Disponible, Prestado, Mantenimiento, Baja). | Implementado y Verificado |
| **RF-09** | Registrar préstamo de equipo vinculando colaborador y activo. | Implementado y Verificado |
| **RF-10** | Registrar devolución de equipo registrando observaciones del estado de retorno. | Implementado y Verificado |
| **RF-11** | Consultar historial cronológico completo de préstamos y movimientos. | Implementado y Verificado |
| **RF-12** | Consultar préstamos activos vigentes. | Implementado y Verificado |
| **RF-13** | Visualizar dashboard general con 6 indicadores clave en tiempo real. | Implementado y Verificado |
| **RF-14** | Consultar y clasificar equipos por estado operativo. | Implementado y Verificado |
| **RF-15** | Consultar ranking de equipos más utilizados en préstamos. | Implementado y Verificado |
| **RF-16** | Consultar distribución de préstamos agrupados por área funcional. | Implementado y Verificado |
| **RF-17** | Consultar historial reciente de movimientos con detalles de fechas y responsables. | Implementado y Verificado |

### 1.4. Reglas de Negocio (RN)
- **RN-01:** Un equipo solo puede estar asociado a un único préstamo activo a la vez. No se permite duplicar préstamos concurrentes sobre un mismo activo.
- **RN-02:** No se puede prestar un equipo que se encuentre en estado **“Mantenimiento”**.
- **RN-03:** No se puede prestar un equipo que se encuentre en estado **“Baja”**.
- **RN-04:** La fecha de devolución debe ser posterior a la fecha de préstamo ($FechaDevolucion \ge FechaPrestamo$).
- **RN-05:** Todo préstamo debe registrar obligatoriamente un usuario colaborador responsable activo.
- **RN-06:** No se puede eliminar físicamente un equipo si cuenta con historial previo de préstamos registrados (integridad referencial restrictiva).
- **RN-07:** El código patrimonial de cada equipo debe ser estrictamente único a nivel de sistema y base de datos.
- **RN-08:** El correo electrónico del usuario debe ser único y normalizado (lowercase/trim).
- **RN-09:** Solo el Administrador de Sistemas puede deshabilitar usuarios.
- **RN-10:** Toda devolución de equipo debe registrar obligatoriamente observaciones detalladas del estado físico en que se entrega el activo.

### 1.5. Ciclo de Vida Seleccionado
Se seleccionó un **Ciclo de Vida Iterativo e Incremental ágil (Scrum/Kanban)**, distribuido en sprints que emulan las semanas del solucionario modelo:
1. **Iteración 1 (Semanas 01–04):** Análisis, modelado de dominio, arquitectura multicapa limpia y persistencia relacional base con EF Core y PostgreSQL.
2. **Iteración 2 (Semanas 05–08):** Módulos de entrada de datos, componentes UI atómicos reutilizables, validaciones cruzadas frontend/backend y normalización.
3. **Iteración 3 (Semanas 09–10):** Módulos de salida de datos, consultas dinámicas, filtros y badges de estado.
4. **Iteración 4 (Semanas 11–12):** Integración integral SPA con React Router, tablero de control (Dashboard) y pruebas funcionales de extremo a extremo.

### 1.6. Estándares de Construcción de Software Aplicados
- **Clean Architecture (Arquitectura Limpia):** Inversión de dependencias donde el Dominio y la Aplicación no dependen de la infraestructura ni de bases de datos externas.
- **Principios SOLID:** Responsabilidad única (SRP) en servicios y controladores; Principio Abierto/Cerrado (OCP) e Inversión de Dependencias (DIP) mediante interfaces (`IUsuarioRepository`, `IEquipoRepository`, `IPrestamoRepository`).
- **Separación de Responsabilidades Frontend (Container-Presentational Pattern):** Componentes visuales puros (`Button`, `InputField`, `StatusBadge`, `StatsCard`) desacoplados de páginas contenedoras de estado (`Dashboard`, `EquiposList`, `PrestamosList`).
- **Defensive Programming & Fail-Fast:** Validación inmediata de precondiciones y restricciones de negocio en servicios de aplicación antes de impactar el almacenamiento.

---

## 2. Actividad 2: Desarrollo de Módulos de Entrada de Datos

### 2.1. Formularios Implementados
1. **Formulario de Usuarios (`CreateUsuario.jsx`):** Captura nombres, apellidos, correo institucional y selección de área funcional.
2. **Formulario de Equipos (`CreateEquipo.jsx`):** Captura código patrimonial, marca, nombre/modelo, categoría (Laptop, Proyector, Monitor, etc.) y estado inicial.
3. **Formulario de Préstamos (`CreatePrestamo.jsx`):** Selector de colaborador activo, selector dinámico filtrado que muestra únicamente equipos en estado "Disponible", y observaciones de entrega.

### 2.2. Validaciones Frontend
- Validación en tiempo real y previa al envío (`validateForm`).
- Control de obligatoriedad, longitudes mínimas/máximas y expresiones regulares para correos electrónicos.
- Limpieza y normalización de cadenas mediante la función `normalizeText` (`trim` y reducción de espacios múltiples).
- Mensajería visual con bordes de alerta y textos de ayuda específicos por campo.

### 2.3. Validaciones Backend
- Atributos formales `System.ComponentModel.DataAnnotations` en DTOs (`[Required]`, `[MinLength]`, `[MaxLength]`, `[EmailAddress]`).
- Verificación de `ModelState.IsValid` en los controladores REST con respuestas HTTP 400 estructuradas:
  ```json
  {
    "success": false,
    "message": "Datos de equipo inválidos.",
    "errors": { "CodigoPatrimonial": ["El código patrimonial es obligatorio."] }
  }
  ```
- Validación de reglas de negocio en la capa de servicios (`UsuarioService`, `EquipoService`, `PrestamoService`), controlando excepciones con mensajes descriptivos.

---

## 3. Actividad 3: Reutilización y Refinamiento de Código

### 3.1. Componentes Reutilizables Construidos
- `Button.jsx`: Botón polimórfico con variantes (`primary`, `secondary`, `success`, `danger`, `outline`), soporte para estados de carga e iconos.
- `InputField.jsx`: Campo de texto y área de texto unificado, con enlace accesible a etiquetas (`htmlFor`) y contenedor de error reactivo.
- `SelectField.jsx`: Lista desplegable con opción vacía por defecto y renderizado dinámico de pares clave-valor.
- `FormMessage.jsx`: Alerta flotante estandarizada para notificaciones de éxito o error.
- `StatusBadge.jsx`: Indicador visual con código de colores según el estado operativo del activo o el estado activo/inactivo del usuario.
- `StatsCard.jsx`: Tarjeta métrica de indicador con soporte para iconos temáticos y paleta cromática semántica.
- `PageContainer.jsx`: Envoltorio estructural que estandariza encabezados de página, subtítulos, barras de acciones y contenedor visual.
- `Modal.jsx`: Ventana modal accesible con fondo desenfocado para acciones contextuales (como registrar devoluciones o modificar estados).

### 3.2. Técnicas de Refactorización y Buenas Prácticas
- **Normalización Centralizada:** Utilidad `normalizeText.js` consumida en todos los formularios para garantizar consistencia antes de la persistencia.
- **Cliente HTTP Estandarizado:** Módulo `apiConfig.js` que centraliza la URL base (`http://localhost:5153/api`) y procesa respuestas y excepciones de forma uniforme con `handleApiResponse`.
- **Eliminación de Código Duplicado:** Mapeos de entidades a DTOs encapsulados en métodos de servicio.

---

## 4. Actividad 4: Desarrollo de Módulos de Salida de Datos

### 4.1. Consultas y Reportes Funcionales
1. **Inventario de Equipos (`EquiposList.jsx`):**
   - Tabla interactiva con badges de estado.
   - Filtro reactivo por categoría de equipo.
   - Filtro reactivo por estado operativo (RF-14).
   - Buscador predictivo por código patrimonial, marca o descripción.
2. **Historial y Préstamos Activos (`PrestamosList.jsx`):**
   - Vista conmutada entre "Todos los movimientos históricos" (RF-11) y "Solo préstamos activos" (RF-12).
   - Formateo legible de fechas de préstamo y devolución con indicación de préstamos vigentes.
3. **Padrón de Colaboradores (`UsuariosList.jsx`):**
   - Listado alfabético por apellidos y nombres con correo y área funcional (RF-03).
   - Acciones de activación y desactivación de acceso (RF-04, RN-09).

### 4.2. Dashboard General de Indicadores (RF-13, Sección 10)
Tablero ejecutivo con los 6 indicadores obligatorios calculados dinámicamente:
1. **Total de Equipos:** Recuento total de activos registrados en el sistema.
2. **Equipos Disponibles:** Activos listos para ser asignados en préstamo.
3. **Equipos Prestados:** Activos en posesión actual de colaboradores.
4. **Equipos en Mantenimiento:** Activos fuera de servicio en revisión técnica.
5. **Total de Préstamos:** Historial acumulado de operaciones de préstamo realizadas.
6. **Área con Mayor Uso:** Área funcional con mayor índice de solicitud de activos.
- Adicionalmente, incluye el gráfico de barras por área (RF-16), ranking de equipos más solicitados (RF-15) y tabla de últimos movimientos (RF-17).

---

## 5. Actividad 5: Integración de Módulos del Sistema

### 5.1. Integración Backend – Base de Datos
- Conexión configurada en `appsettings.json` mediante el proveedor `Npgsql.EntityFrameworkCore.PostgreSQL`.
- Migración automatizada `InitialCreate` con creación de claves foráneas con comportamiento `OnDelete(DeleteBehavior.Restrict)` para asegurar RN-06.
- Inyección de dependencias registrada en `Program.cs` enlazando contratos con implementaciones:
  ```csharp
  builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
  builder.Services.AddScoped<IUsuarioService, UsuarioService>();
  builder.Services.AddScoped<IEquipoRepository, EquipoRepository>();
  builder.Services.AddScoped<IEquipoService, EquipoService>();
  builder.Services.AddScoped<IPrestamoRepository, PrestamoRepository>();
  builder.Services.AddScoped<IPrestamoService, PrestamoService>();
  builder.Services.AddScoped<IDashboardService, DashboardService>();
  ```

### 5.2. Integración Frontend SPA – Backend
- Configuración de política CORS `AllowFrontend` habilitando comunicación irrestricta en desarrollo.
- Navegación cliente mediante `react-router-dom` con rutas dinámicas:
  - `/` &rarr; Dashboard General
  - `/equipos` &rarr; Listado de inventario
  - `/equipos/nuevo` &rarr; Formulario de registro de equipo
  - `/prestamos` &rarr; Listado de préstamos y devoluciones
  - `/prestamos/nuevo` &rarr; Formulario de asignación de préstamo
  - `/usuarios` &rarr; Listado de colaboradores
  - `/usuarios/nuevo` &rarr; Formulario de registro de usuario

---

## 6. Actividad 6: Evaluación Funcional del Sistema

### 6.1. Demostración de Escenarios Mínimos

| # | Escenario Mínimo | Entrada de Datos | Comportamiento Esperado | Resultado Obtenido | Estado |
| :-: | :--- | :--- | :--- | :--- | :-: |
| **1** | **Registrar usuario** | Nombres: Diego Fernando<br>Apellidos: Torres Morales<br>Correo: diego.torres@innovatech.com<br>Área: Infraestructura TI | HTTP 200, usuario creado en BD con Id UUID y Estado=true. | HTTP 200 OK. Usuario registrado correctamente en PostgreSQL con ID generado. | **APROBADO** |
| **2** | **Registrar equipo** | Código: EQ-1042<br>Nombre: Laptop HP EliteBook 840 G9<br>Categoría: Laptop<br>Marca: HP<br>Estado: Disponible | HTTP 200, activo registrado con código patrimonial único (RN-07). | HTTP 200 OK. Activo creado y visible en inventario. | **APROBADO** |
| **3** | **Registrar préstamo** | Colaborador: Diego Torres<br>Equipo: EQ-1042<br>Obs: Asignación para trabajo en sitio | HTTP 200, préstamo creado (RN-05). Estado del equipo cambia automáticamente a "Prestado". | HTTP 200 OK. Préstamo generado. Equipo transiciona a "Prestado". | **APROBADO** |
| **3b**| **Validación RN-01** | Intentar prestar nuevamente el equipo EQ-1042 mientras está prestado | HTTP 400 Bad Request, rechazo por regla de negocio RN-01. | HTTP 400 Bad Request: *"El equipo ya cuenta con un préstamo activo vigente (RN-01)."* | **APROBADO** |
| **4** | **Registrar devolución** | Id Préstamo, Observación: "Equipo retornado en perfecto estado, con cargador y mouse" | HTTP 200, registro de `FechaDevolucion` (RN-04, RN-10). Equipo vuelve a "Disponible". | HTTP 200 OK. Devolución registrada y equipo retoma estado "Disponible". | **APROBADO** |
| **5** | **Consultar inventario** | Filtro: Estado="Disponible" | Listado de equipos disponibles con datos completos y conteo de préstamos. | HTTP 200 OK. Se listan 5 equipos disponibles con sus métricas. | **APROBADO** |
| **6** | **Consultar historial** | Consulta general de préstamos | Registro cronológico con fecha, observaciones y responsable. | HTTP 200 OK. Retorna historial completo con datos relacionales. | **APROBADO** |
| **7** | **Consultar dashboard** | Consulta de endpoint `/api/dashboard` | Indicadores de total equipos, disponibles, prestados, mantenimiento, total préstamos y área top. | HTTP 200 OK. KPIs sincronizados en tiempo real: Total=6, Disp=5, Mantenimiento=1, Préstamos=1. | **APROBADO** |

---

## 7. Pregunta de Reflexión (Sección 13)

> **Pregunta:** Explique de qué manera la aplicación de estándares de construcción, validación de datos, reutilización de componentes, refinamiento de código, programación orientada a objetos e integración de módulos contribuyen a mejorar la calidad, mantenibilidad y escalabilidad del sistema desarrollado.

### Respuesta Técnica:

1. **Estándares de Construcción y Clean Architecture:**  
   Al separar la solución en capas bien definidas (*Domain*, *Application*, *Infrastructure*, *API*), el sistema logra una baja tasa de acoplamiento y una alta cohesión. La capa de dominio permanece agnóstica de frameworks o librerías de persistencia, lo que permite modificar el motor de base de datos o el protocolo de comunicación sin alterar las reglas de negocio. Esto reduce drásticamente el costo de mantenimiento a mediano y largo plazo.

2. **Validación de Datos en Múltiples Capas (Defense in Depth):**  
   Validar en el frontend proporciona una experiencia de usuario inmediata y fluida, evitando viajes innecesarios a la red cuando los datos son defectuosos. Sin embargo, la verdadera seguridad y consistencia reside en el backend mediante `DataAnnotations`, validación de `ModelState` y reglas de negocio obligatorias (`RN-01` a `RN-10`). Esto protege la base de datos contra registros corruptos, correos duplicados o estados inconsistentes de inventario.

3. **Reutilización de Componentes y Atomic Design:**  
   En el frontend, la creación de componentes independientes (`Button`, `InputField`, `SelectField`, `StatusBadge`, `Modal`) asegura uniformidad visual en toda la plataforma y minimiza la duplicación de código. Cualquier ajuste de diseño o corrección de accesibilidad se realiza en un solo lugar y se propaga automáticamente a todas las pantallas.

4. **Refinamiento de Código y Buenas Prácticas:**  
   La normalización de cadenas (`normalizeText`), el manejo centralizado de excepciones y el encapsulamiento de contratos mediante DTOs evitan exponer las entidades internas del dominio. Esto permite evolucionar las estructuras relacionales de la base de datos sin romper los contratos consumidos por las aplicaciones cliente.

5. **Programación Orientada a Objetos (POO):**  
   El uso de encapsulamiento, polimorfismo e interfaces (`IUsuarioRepository`, `IEquipoService`, etc.) permite aplicar el Principio de Inversión de Dependencias (DIP). Esto habilita la sustitución de implementaciones (por ejemplo, para pruebas unitarias con mocks) sin alterar el comportamiento de las clases consumidoras.

6. **Integración de Módulos y Escalabilidad:**  
   La integración fluida entre la SPA de React y la Web API de ASP.NET Core mediante una arquitectura REST desacoplada permite escalar cada componente de manera independiente. Si la concurrencia del sistema crece, el backend puede desplegarse en contenedores replicados detrás de un balanceador de carga mientras el frontend se distribuye a través de una red CDN, asegurando alta disponibilidad y rendimiento óptimo.
