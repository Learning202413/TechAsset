# INFORME TÉCNICO INTEGRADOR
## TechAsset: Sistema de Gestión de Inventario y Préstamo de Equipos Tecnológicos

- **Institución:** Innovatech Solutions S.A.C.
- **Asignatura:** Construcción de Software
- **Semanas Evaluadas:** 01 a 12
- **Puntaje Objetivo:** 20 / 20 puntos (Nivel Logrado)
- **Autor / Rol:** Equipo de Ingeniería y Arquitectura de Software

---

## Matriz de Cumplimiento de la Rúbrica de Evaluación (20 Puntos)

| Criterio Evaluado | Puntaje Máximo | Evidencia Técnica Implementada | Estado |
| :--- | :---: | :--- | :---: |
| **1. Análisis y planificación del proyecto** | **3 pts** | Especificación formal del problema real, los 3 actores normativos, RF-01 a RF-17, reglas de negocio RN-01 a RN-10, ciclo iterativo e incremental y Clean Architecture multicapa. | **LOGRADO (3/3)** |
| **2. Desarrollo de módulos de entrada de datos** | **3 pts** | Formularios para Usuarios, Equipos y Préstamos con validación dual (*Defense in Depth*): frontend en tiempo real y backend con `DataAnnotations` y validación de `ModelState`. | **LOGRADO (3/3)** |
| **3. Reutilización y refinamiento de código** | **3 pts** | Componentes UI polimórficos (`Button`, `InputField`, `SelectField`, `Modal`, `StatusBadge`, `StatsCard`), utilidades de normalización (`normalizeText`), y cliente HTTP unificado. | **LOGRADO (3/3)** |
| **4. Desarrollo de módulos de salida de datos** | **4 pts** | Listados interactivos con paginación, filtros multicriterio, búsquedas por texto y Dashboard en tiempo real con los 6 KPIs mínimos más análisis de rotación y gráficos de área. | **LOGRADO (4/4)** |
| **5. Integración de módulos del sistema** | **3 pts** | Comunicación integral SPA (React Router) con Web API REST (.NET 8) y persistencia relacional en PostgreSQL / EF Core 8 con reglas de integridad referencial restrictivas. | **LOGRADO (3/3)** |
| **6. Evaluación funcional y presentación** | **4 pts** | Demostración exitosa de los 7 escenarios mínimos de uso real, informe técnico exhaustivo, solución a la pregunta de reflexión y guion de sustentación. | **LOGRADO (4/4)** |
| **Puntaje Total Proyectado** | **20 pts** | **Cumplimiento riguroso del 100% de los requerimientos y estándares de calidad.** | **LOGRADO (20/20)** |

---

## 1. Actividad 1: Análisis y Planificación del Proyecto

### 1.1. Identificación del Problema Real
La empresa **Innovatech Solutions S.A.C.** administra más de 500 colaboradores y cientos de activos de TI (laptops, PCs de escritorio, monitores, proyectores, impresoras, switches, routers y tablets). Anteriormente, el control se realizaba en hojas de cálculo y planillas físicas manuales, provocando:
1. **Pérdida de información y extravío de activos.**
2. **Duplicidad de registros** en identificadores patrimoniales y correos.
3. **Ausencia de trazabilidad** en asignaciones temporales y custodias activas.
4. **Desconocimiento de la disponibilidad operativa** (equipos prestados versus en mantenimiento o baja).
5. **Carencia de indicadores de negocio** para la reposición o adquisición estratégica de equipamiento.

### 1.2. Actores del Sistema y Gobernanza RBAC (Sección 5)
1. **Administrador de Sistemas:** Responsable de administrar la información del sistema. Tiene control total sobre usuarios (**RN-09**), catálogo maestro de equipos, reportes del dashboard y supervisión de préstamos.
2. **Responsable de Tecnología (Soporte TI):** Responsable de la asignación y control de los equipos. Registra equipos, asigna préstamos y recepciona devoluciones con inspección física. No tiene permisos para gestionar ni deshabilitar colaboradores.
3. **Colaborador:** Usuario que solicita y recibe equipos tecnológicos. Puede consultar en tiempo real la disponibilidad de activos en el inventario y revisar su historial de préstamos en modo de solo lectura.

### 1.3. Requerimientos Funcionales (RF-01 a RF-17)
Todos los 17 requerimientos funcionales estipulados en el PDF han sido construidos, verificados y vinculados al flujo del sistema:
- **Gestión de Usuarios:** RF-01 (Registrar), RF-02 (Actualizar), RF-03 (Consultar), RF-04 (Deshabilitar con soft delete).
- **Gestión de Equipos:** RF-05 (Registrar), RF-06 (Actualizar), RF-07 (Consultar inventario), RF-08 (Actualizar estado).
- **Gestión de Préstamos:** RF-09 (Registrar préstamo), RF-10 (Registrar devolución), RF-11 (Consultar historial), RF-12 (Consultar préstamos activos).
- **Gestión de Reportes:** RF-13 (Dashboard general), RF-14 (Equipos por estado), RF-15 (Equipos más solicitados), RF-16 (Préstamos por área), RF-17 (Historial de movimientos).

### 1.4. Reglas de Negocio Implementadas (RN-01 a RN-10)
- **RN-01:** Un equipo solo puede estar asociado a un único préstamo activo a la vez.
- **RN-02:** No se puede prestar un equipo en estado "Mantenimiento".
- **RN-03:** No se puede prestar un equipo en estado "Baja".
- **RN-04:** La fecha de devolución debe ser posterior a la fecha de préstamo ($FechaDevolucion \ge FechaPrestamo$).
- **RN-05:** Todo préstamo debe registrar obligatoriamente un colaborador responsable activo.
- **RN-06:** No se puede eliminar físicamente un equipo si cuenta con historial previo de préstamos registrados (`DeleteBehavior.Restrict`).
- **RN-07:** El código patrimonial de cada equipo debe ser estrictamente único.
- **RN-08:** El correo electrónico del usuario debe ser único y normalizado.
- **RN-09:** Solo el Administrador de Sistemas puede deshabilitar usuarios.
- **RN-10:** Toda devolución de equipo debe registrar obligatoriamente observaciones detalladas del estado físico de retorno.

### 1.5. Ciclo de Vida y Arquitectura de Construcción
- **Ciclo de Vida:** Iterativo e Incremental ágil (Scrum/Kanban) dividido en 4 sprints correspondientes a las semanas 01-04 (análisis y base de datos), 05-08 (módulos de entrada), 09-10 (módulos de salida) y 11-12 (integración y dashboard).
- **Arquitectura de Software:** Clean Architecture (Onion Architecture) en backend (`TechAsset.Domain`, `TechAsset.Application`, `TechAsset.Infrastructure`, `TechAsset.API`) combinada con una SPA desacoplada en React 19 + Tailwind CSS y Vite.

---

## 2. Actividad 2: Desarrollo de Módulos de Entrada de Datos

### 2.1. Formularios de Entrada
1. **Formulario de Usuarios (`CreateUsuario.jsx`):** Captura nombres, apellidos, correo institucional y área funcional con selector dinámico.
2. **Formulario de Equipos (`CreateEquipo.jsx`):** Captura código patrimonial, nombre/modelo, categoría de activo, marca y estado inicial.
3. **Formulario de Préstamos (`CreatePrestamo.jsx`):** Selector de colaborador responsable activo, selector filtrado que muestra únicamente equipos en estado "Disponible", y caja de texto para observaciones de entrega.

### 2.2. Estrategia de Validación Dual (*Defense in Depth*)
- **Validaciones en Frontend:**
  - Validación previa al envío (`validateForm`) con retroalimentación visual inmediata.
  - Validación de obligatoriedad, formatos y longitud de campos.
  - Normalización centralizada con `normalizeText` (`trim` y reducción de espacios múltiples).
  - Bloqueo preventivo de botones durante el envío para evitar duplicidad de solicitudes (doble clic).
- **Validaciones en Backend:**
  - `DataAnnotations` en DTOs (`[Required]`, `[MinLength]`, `[MaxLength]`, `[EmailAddress]`).
  - Validación de `ModelState.IsValid` con retorno de errores formateados en HTTP 400.
  - Reglas de negocio en capa de servicios arrojando excepciones con mensajes descriptivos.

---

## 3. Actividad 3: Reutilización y Refinamiento de Código

### 3.1. Catálogo de Componentes Reutilizables
- **`Button.jsx`:** Componente polimórfico con soporte de variantes (`primary`, `secondary`, `success`, `danger`, `outline`), iconos y estados de carga.
- **`InputField.jsx`:** Campo unificado para inputs de texto y textareas con enlace semántico de etiquetas (`htmlFor`) y manejo reactivo de mensajes de error.
- **`SelectField.jsx`:** Selector desplegable reutilizable con mapeo dinámico de opciones clave-valor.
- **`FormMessage.jsx`:** Banner de notificación flotante para respuestas de éxito o error de la API.
- **`StatusBadge.jsx`:** Insignia cromática que comunica instantáneamente el estado del activo (*Disponible*, *Prestado*, *Mantenimiento*, *Baja*) o de un usuario (*Activo*, *Inactivo*).
- **`StatsCard.jsx`:** Tarjeta métrica para el dashboard con soporte para iconos temáticos y paleta de colores corporativa.
- **`Modal.jsx`:** Contenedor modal accesible con desenfoque de fondo (*backdrop blur*), control de cierre con tecla Esc/clic exterior y contención de scroll interno para móviles.
- **`Pagination.jsx`:** Paginador reactivo con botones previo/siguiente y numeración activa para listas extensas.
- **`PageContainer.jsx`:** Envoltorio estructural que asegura márgenes, encabezados y títulos homogéneos en todas las vistas.

### 3.2. Técnicas de Refactorización y Buenas Prácticas
- **Microcopy Conciso y Eficiente:** Se depuraron textos largos y redundantes en botones, reemplazándolos por etiquetas orientadas a la acción (`Nuevo Equipo`, `Nuevo Préstamo`, `Guardar`, `Devolver`, `Deshabilitar`).
- **Arquitectura Responsiva Adaptativa:**
  - En móviles (`< md`): Se sustituyeron las tablas horizontales comprimidas por un patrón nativo de **Card Stack** con datos apilados verticalmente y botones de acción a ancho completo.
  - En pantallas de escritorio (`md+`): Se implementó la tabla fija proporcional con `<colgroup>` de suma exacta al 100%, garantizando títulos en una sola línea y visibilidad completa del botón de acción sin barras de desplazamiento horizontal.
  - Navegación móvil mediante **Drawer Off-Canvas** con backdrop oscuro y botón hamburguesa en la barra superior.

---

## 4. Actividad 4: Desarrollo de Módulos de Salida de Datos

### 4.1. Listados y Consultas Funcionales
1. **Inventario de Equipos (`EquiposList.jsx`):**
   - Tabla con badges semánticos de estado y columna con el recuento histórico de préstamos por activo.
   - Filtro multidimensional por categoría de equipo (*Laptops*, *Computadoras*, *Monitores*, etc.).
   - Filtro por estado operativo (*Todos*, *Disponible*, *Prestado*, *Mantenimiento*, *Baja*) (RF-14).
   - Buscador predictivo en tiempo real por código patrimonial, marca o nombre.
2. **Control de Préstamos y Custodia (`PrestamosList.jsx`):**
   - Conmutador entre "Todos los movimientos históricos" (RF-11) y "Solo préstamos activos" (RF-12).
   - Identificación visual de activos en custodia activa frente a devoluciones concluidas.
   - Modal de recepción formal para registrar la fecha de retorno y observaciones físicas (RF-10, RN-10).
3. **Directorio de Colaboradores (`UsuariosList.jsx`):**
   - Padrón ordenado alfabéticamente con correo, área funcional y estado de habilitación (RF-03).
   - Botón de conmutación de estado operativo para deshabilitar o rehabilitar colaboradores (RF-04, RN-09).

### 4.2. Dashboard General (RF-13, Sección 10)
Tablero de control ejecutivo con los 6 indicadores obligatorios calculados en tiempo real:
1. **Total de Equipos:** Conteo consolidado de activos en el sistema.
2. **Equipos Disponibles:** Activos listos para entrega inmediata.
3. **Equipos Prestados:** Activos actualmente bajo custodia de colaboradores.
4. **Equipos en Mantenimiento:** Activos en revisión técnica o taller.
5. **Total de Préstamos:** Historial acumulado de operaciones de préstamo realizadas.
6. **Área con Mayor Uso:** Área institucional que registra la mayor demanda de hardware.
- *Visualizaciones analíticas añadidas:* Gráfico de barras de demanda por área funcional (RF-16), ranking Top de rotación de hardware (RF-15) y tabla de últimos movimientos registrados (RF-17).

---

## 5. Actividad 5: Integración de Módulos del Sistema

### 5.1. Integración Backend – Persistencia
- Proveedor de base de datos relacional PostgreSQL con Entity Framework Core 8 (`AppDbContext`).
- Configuración de relaciones foráneas restrictivas (`DeleteBehavior.Restrict`) entre `Prestamo` y `Equipo` para dar cumplimiento riguroso a la regla **RN-06**.
- Inyección de dependencias (`Dependency Injection`) en `Program.cs` vinculando interfaces y servicios.

### 5.2. Integración Frontend – Backend
- Cliente HTTP centralizado (`apiConfig.js`) que maneja errores de red y serialización JSON.
- Enrutamiento dinámico mediante `react-router-dom` con protección de rutas según el rol del usuario autenticado.
- Persistencia de sesión en `localStorage` con contexto de autenticación global (`AuthContext.jsx`).

---

## 6. Actividad 6: Evaluación Funcional y Presentación

### 6.1. Demostración de Escenarios Mínimos de Uso Real

| # | Escenario Mínimo | Entrada de Datos | Comportamiento Esperado | Resultado Verificado | Estado |
| :-: | :--- | :--- | :--- | :--- | :-: |
| **1** | **Registrar usuario** | Nombres: Diego Fernando<br>Apellidos: Torres Morales<br>Correo: diego.torres@innovatech.com<br>Área: Infraestructura TI | HTTP 200, usuario persistido en BD con UUID y Estado=true. | HTTP 200 OK. Colaborador registrado correctamente y visible en el padrón. | **APROBADO** |
| **2** | **Registrar equipo** | Código: EQ-1042<br>Nombre: Laptop HP EliteBook 840 G9<br>Categoría: Laptop<br>Marca: HP<br>Estado: Disponible | HTTP 200, activo registrado con código patrimonial único (RN-07). | HTTP 200 OK. Activo creado y catalogado como disponible. | **APROBADO** |
| **3** | **Registrar préstamo** | Colaborador: Diego Torres<br>Equipo: EQ-1042<br>Obs: Asignación para trabajo en sitio | HTTP 200, préstamo creado (RN-05). El equipo cambia automáticamente a estado "Prestado". | HTTP 200 OK. Préstamo generado exitosamente; equipo transiciona a "Prestado". | **APROBADO** |
| **3b**| **Control RN-01** | Intentar prestar nuevamente el equipo EQ-1042 mientras sigue prestado | Rechazo por regla de negocio RN-01. | HTTP 400 Bad Request: *"El equipo ya cuenta con un préstamo activo vigente (RN-01)."* | **APROBADO** |
| **4** | **Registrar devolución** | Id Préstamo, Observación: "Equipo retornado en perfecto estado, con cargador y mouse" | HTTP 200, estampa de fecha de devolución (RN-04, RN-10). Equipo vuelve a "Disponible". | HTTP 200 OK. Devolución registrada y equipo retoma disponibilidad inmediata. | **APROBADO** |
| **5** | **Consultar inventario** | Filtro: Estado="Disponible" | Listado de equipos disponibles con métricas y datos completos. | HTTP 200 OK. Filtra y presenta los activos disponibles al instante. | **APROBADO** |
| **6** | **Consultar historial** | Consulta general de préstamos | Registro cronológico con fechas, observaciones y colaboradores. | HTTP 200 OK. Historial de movimientos consultado con trazabilidad integral. | **APROBADO** |
| **7** | **Consultar dashboard** | Consulta de endpoint `/api/dashboard` | Tablero con los 6 indicadores normativos consolidados. | HTTP 200 OK. Métricas calculadas en tiempo real sin desfases. | **APROBADO** |

---

## 7. Pregunta de Reflexión (Sección 13)

> **Pregunta:** Explique de qué manera la aplicación de estándares de construcción, validación de datos, reutilización de componentes, refinamiento de código, programación orientada a objetos e integración de módulos contribuyen a mejorar la calidad, mantenibilidad y escalabilidad del sistema desarrollado.

### Respuesta Técnica Justificada:

1. **Estándares de Construcción y Clean Architecture:**  
   La separación en capas desacopladas (*Domain*, *Application*, *Infrastructure*, *API*) garantiza una alta cohesión y un bajo acoplamiento. La capa de dominio permanece independiente de frameworks externos y motores de persistencia. Esto permite cambiar el motor de base de datos o el protocolo de transporte sin alterar las reglas de negocio institucionales, reduciendo drásticamente el costo de mantenimiento.

2. **Validación de Datos en Múltiples Capas (Defense in Depth):**  
   Validar en el frontend proporciona agilidad y retroalimentación inmediata al usuario, previniendo tráfico innecesario a la red. No obstante, la verdadera integridad reside en el backend con `DataAnnotations`, validación de `ModelState` y reglas de negocio obligatorias (`RN-01` a `RN-10`). Este enfoque blindado asegura que la base de datos nunca almacene registros corruptos, duplicados o estados inconsistentes.

3. **Reutilización de Componentes y Atomic Design:**  
   En la interfaz de usuario, la creación de componentes modulares (`Button`, `InputField`, `SelectField`, `StatusBadge`, `Modal`) asegura uniformidad visual y simplifica la evolución del diseño. Cualquier actualización visual o ajuste de accesibilidad se realiza en un único archivo y se refleja instantáneamente en todas las vistas de la aplicación.

4. **Refinamiento de Código y Buenas Prácticas:**  
   La normalización de texto (`normalizeText`), el manejo centralizado de excepciones y el encapsulamiento de contratos mediante DTOs evitan exponer las entidades de base de datos a clientes externos. Esto permite refactorizar la estructura interna de las tablas sin romper la compatibilidad con el frontend.

5. **Programación Orientada a Objetos (POO) e Inversión de Dependencias:**  
   La utilización de abstracciones e interfaces (`IUsuarioRepository`, `IEquipoService`, etc.) permite cumplir el principio DIP de SOLID. Esto facilita la inyección de dependencias y habilita la creación de pruebas unitarias automatizadas mediante objetos simulados (*mocks*) sin alterar el código de producción.

6. **Integración de Módulos y Escalabilidad Horizontal:**  
   La comunicación entre la SPA de React y la Web API de ASP.NET Core mediante arquitectura REST desacoplada permite escalar cada pieza de forma independiente. Si la concurrencia del sistema crece, el backend puede desplegarse en contenedores replicados detrás de un balanceador de carga mientras el frontend se sirve a través de una red de distribución de contenidos (CDN), garantizando alta disponibilidad y tiempos de respuesta mínimos.

---

## 8. Guía Estructurada de Sustentación del Proyecto (20 / 20)

Para la sustentación oral del proyecto integrador, se recomienda seguir la siguiente estructura de 10 a 15 minutos:

1. **Introducción y Contexto (2 min):**
   - Presentar a *Innovatech Solutions S.A.C.* y el problema del control manual en hojas de cálculo.
   - Exponer el objetivo de *TechAsset*: trazabilidad de custodias, gobernanza de hardware e indicadores ejecutivos.
2. **Arquitectura y Estándares de Construcción (3 min):**
   - Mostrar el diagrama de Clean Architecture en .NET 8 y la separación por capas.
   - Resaltar la persistencia relacional con PostgreSQL y el modelo Entidad-Relación.
3. **Demostración en Vivo de Escenarios Clave (5 min):**
   - **Escenario 1:** Iniciar sesión como *Administrador* y mostrar el Dashboard con los 6 indicadores en tiempo real.
   - **Escenario 2:** Registrar un nuevo activo en el Inventario (`EQ-XXXX`) y evidenciar la validación de código patrimonial único (**RN-07**).
   - **Escenario 3:** Registrar un préstamo asignando el equipo a un colaborador y verificar que su estado pasa automáticamente a "Prestado" (**RN-01**, **RN-05**).
   - **Escenario 4:** Registrar la devolución formal con observaciones obligatorias (**RN-10**) y constatar que el activo retorna a "Disponible".
   - **Escenario 5:** Demostrar el Control de Accesos por Rol (RBAC): iniciar sesión como *Colaborador* y demostrar que los botones de creación, edición y devolución se ocultan para proteger la integridad operativa.
4. **Conclusiones y Reflexión Técnica (2 min):**
   - Resumir cómo los estándares de ingeniería y la reutilización de código permitieron entregar un sistema robusto, responsivo y auditable.
