import { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.jpg";
import { 
  Layers, 
  LogIn, 
  ArrowRight, 
  Laptop, 
  Monitor, 
  Printer, 
  Tablet, 
  Projector, 
  Network, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  ShieldCheck, 
  ArrowLeftRight, 
  BarChart3, 
  ExternalLink,
  Check,
  ChevronRight,
  Clock,
  Sparkles
} from "lucide-react";

export default function Landing() {
  const [selectedActor, setSelectedActor] = useState("admin");

  // Actores del Sistema (Sección 5 del Caso Práctico Integrador)
  const actores = {
    admin: {
      titulo: "Administrador",
      responsabilidad: "Responsable de administrar la información del sistema.",
      funciones: [
        "Gestionar usuarios (RF-01 a RF-04)",
        "Gestionar equipos (RF-05 a RF-08)",
        "Consultar reportes (RF-13 a RF-17)",
        "Supervisar préstamos (RN-09)"
      ]
    },
    tecnologia: {
      titulo: "Responsable de Tecnología",
      responsabilidad: "Responsable de la asignación y control de los equipos tecnológicos.",
      funciones: [
        "Registrar equipos tecnológicos (RF-05)",
        "Aprobar préstamos de equipos (RF-09)",
        "Registrar devoluciones con observación (RF-10, RN-10)",
        "Consultar inventario en tiempo real (RF-07)"
      ]
    },
    colaborador: {
      titulo: "Colaborador",
      responsabilidad: "Usuario que solicita equipos tecnológicos para sus actividades.",
      funciones: [
        "Solicitar préstamos de equipos",
        "Consultar historial de préstamos (RF-11)",
        "Consultar disponibilidad de activos (RF-07)"
      ]
    }
  };

  // Familias de Activos Tecnológicos (Sección 1 del PDF)
  const activos = [
    { nombre: "Laptops", icono: Laptop },
    { nombre: "Computadoras de escritorio", icono: Cpu },
    { nombre: "Monitores", icono: Monitor },
    { nombre: "Impresoras", icono: Printer },
    { nombre: "Tablets", icono: Tablet },
    { nombre: "Proyectores multimedia", icono: Projector },
    { nombre: "Equipos de red", icono: Network }
  ];

  // Inconvenientes Actuales (Sección 1 del PDF)
  const inconvenientes = [
    "Pérdida de información en registros no centralizados.",
    "Duplicidad de registros en hojas de cálculo.",
    "Falta de control de préstamos y devoluciones.",
    "Desconocimiento de la ubicación física de los equipos.",
    "Dificultad para conocer la disponibilidad real de activos.",
    "Ausencia de indicadores para la toma de decisiones.",
    "Procesos lentos para la asignación y retorno de equipos."
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* 1. NAVEGACIÓN INSTITUCIONAL */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoImg} 
              alt="TechAsset Logo" 
              className="w-10 h-10 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform bg-white" 
            />
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                Tech<span className="text-cyan-600">Asset</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Innovatech Solutions S.A.C.
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#problematica" className="hover:text-blue-600 transition">Presentación</a>
            <a href="#actores" className="hover:text-blue-600 transition">Actores</a>
            <a href="#alcance" className="hover:text-blue-600 transition">Alcance Funcional</a>
            <a href="#dashboard" className="hover:text-blue-600 transition">Dashboard</a>
          </nav>

          <Link to="/login">
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all inline-flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              <span>Acceder al Sistema</span>
            </button>
          </Link>
        </div>
      </header>

      {/* 2. PRESENTACIÓN INSTITUCIONAL & PROPÓSITO */}
      <main className="flex-1">
        <section className="pt-16 pb-14 sm:pt-20 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/70">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Caso Práctico Integrador &bull; Construcción de Software</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
              TechAsset: Sistema de Gestión de Inventario y Préstamo de{" "}
              <span className="text-blue-600">Equipos Tecnológicos</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              La empresa <strong>Innovatech Solutions S.A.C.</strong> es una organización dedicada al desarrollo de soluciones tecnológicas con más de 500 colaboradores en diversas áreas funcionales. 
              TechAsset nace por iniciativa de la Gerencia de Tecnología para administrar el inventario tecnológico institucional y controlar el préstamo de equipos.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 hover:shadow-blue-600/35 transition-all inline-flex items-center justify-center gap-2.5">
                  <LogIn className="w-4 h-4" />
                  <span>Acceder al Sistema (Login)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link to="/dashboard" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-300 shadow-2xs transition inline-flex items-center justify-center gap-2">
                  <BarChart3 className="w-4 h-4 text-slate-500" />
                  <span>Ver Dashboard Operativo</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. ACTIVOS TECNOLÓGICOS DEL CASO PRÁCTICO */}
        <section className="py-12 bg-white border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-6">
              Activos Tecnológicos de Innovatech Solutions S.A.C.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {activos.map((act) => {
                const IconComponent = act.icono;
                return (
                  <div key={act.nombre} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">
                      {act.nombre}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. PROBLEMÁTICA ACTUAL VS PROPÓSITO DE LA SOLUCIÓN */}
        <section id="problematica" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Situación Actual
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Inconvenientes del Registro Manual y Hojas de Cálculo
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Dificultades operativas identificadas que motivaron el desarrollo de TechAsset.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inconvenientes.map((inc, index) => (
                <div key={index} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                  <div className="p-1 rounded bg-red-50 text-red-600 mt-0.5 shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 leading-relaxed">
                    {inc}
                  </span>
                </div>
              ))}

              <div className="p-4 rounded-xl bg-blue-600 text-white flex items-start gap-3 shadow-sm md:col-span-2">
                <div className="p-1 rounded bg-blue-700 text-white mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-200">Propósito de TechAsset</h4>
                  <p className="text-xs text-blue-50 mt-1 leading-relaxed">
                    Administrar el inventario tecnológico institucional y controlar el préstamo de equipos a los colaboradores de Innovatech Solutions S.A.C., garantizando trazabilidad y soporte a la toma de decisiones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ACTORES DEL SISTEMA (SECCIÓN 5 DEL PDF) */}
        <section id="actores" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Actores del Sistema
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Roles y Responsabilidades Institucionales
              </h2>
            </div>

            {/* Selector de Actores (DCU - ISO 9241-210) */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setSelectedActor("admin")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedActor === "admin"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Administrador
                </button>
                <button
                  onClick={() => setSelectedActor("tecnologia")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedActor === "tecnologia"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Responsable de Tecnología
                </button>
                <button
                  onClick={() => setSelectedActor("colaborador")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedActor === "colaborador"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Colaborador
                </button>
              </div>
            </div>

            {/* Ficha del Actor Seleccionado */}
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {actores[selectedActor].titulo}
              </h3>
              <p className="text-xs text-blue-600 font-medium mb-4">
                {actores[selectedActor].responsabilidad}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Funciones Asignadas:
              </h4>
              <ul className="space-y-2">
                {actores[selectedActor].funciones.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. ALCANCE FUNCIONAL (SECCIÓN 4 DEL PDF) */}
        <section id="alcance" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Alcance Funcional
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Módulos del Sistema TechAsset
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Módulo 1 */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Gestión de Usuarios</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                  <li>&bull; Registrar usuarios</li>
                  <li>&bull; Modificar usuarios</li>
                  <li>&bull; Consultar usuarios</li>
                  <li>&bull; Deshabilitar usuarios</li>
                </ul>
              </div>

              {/* Módulo 2 */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-3">
                  <Laptop className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Gestión de Equipos</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                  <li>&bull; Registrar equipos tecnológicos</li>
                  <li>&bull; Modificar equipos</li>
                  <li>&bull; Consultar inventario</li>
                  <li>&bull; Actualizar estado del equipo</li>
                </ul>
              </div>

              {/* Módulo 3 */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold mb-3">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Gestión de Préstamos</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                  <li>&bull; Registrar préstamos</li>
                  <li>&bull; Registrar devoluciones</li>
                  <li>&bull; Consultar historial</li>
                  <li>&bull; Consultar préstamos activos</li>
                </ul>
              </div>

              {/* Módulo 4 */}
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mb-3">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Gestión de Reportes</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                  <li>&bull; Visualizar indicadores</li>
                  <li>&bull; Consultar equipos disponibles</li>
                  <li>&bull; Consultar equipos prestados</li>
                  <li>&bull; Préstamos por área / Historial</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DASHBOARD MÍNIMO REQUERIDO (SECCIÓN 10 DEL PDF) */}
        <section id="dashboard" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Dashboard Mínimo Requerido (Sección 10)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Indicadores Clave del Sistema
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-bold uppercase text-slate-500">Total de equipos</p>
                <p className="text-2xl font-black text-slate-900 mt-1">120</p>
                <p className="text-[11px] text-slate-500 mt-1">Equipos registrados en el sistema</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-bold uppercase text-slate-500">Equipos disponibles</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">85</p>
                <p className="text-[11px] text-slate-500 mt-1">Equipos listos para préstamo</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-bold uppercase text-slate-500">Equipos prestados</p>
                <p className="text-2xl font-black text-blue-600 mt-1">28</p>
                <p className="text-[11px] text-slate-500 mt-1">Equipos actualmente asignados</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-bold uppercase text-slate-500">Equipos en mantenimiento</p>
                <p className="text-2xl font-black text-amber-600 mt-1">7</p>
                <p className="text-[11px] text-slate-500 mt-1">Equipos fuera de servicio</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-bold uppercase text-slate-500">Total de préstamos</p>
                <p className="text-2xl font-black text-purple-600 mt-1">42</p>
                <p className="text-[11px] text-slate-500 mt-1">Cantidad de préstamos registrados</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[11px] font-bold uppercase text-slate-500">Área con mayor uso</p>
                <p className="text-lg font-black text-indigo-600 mt-1">Desarrollo TI</p>
                <p className="text-[11px] text-slate-500 mt-1">Área que registra más préstamos</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. LLAMADO FINAL A INICIAR SESIÓN */}
        <section className="py-14 bg-blue-600 text-white text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Acceso Institucional a TechAsset
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm mb-6">
              Plataforma para Innovatech Solutions S.A.C. &bull; Construcción de Software 2026.
            </p>
            <Link to="/login">
              <button className="px-7 py-3 rounded-xl bg-white text-blue-600 hover:bg-slate-50 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Ingresar al Sistema (Login)</span>
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* 9. PIE DE PÁGINA */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="TechAsset Logo" 
              className="w-8 h-8 object-contain rounded-lg shadow-2xs bg-white" 
            />
            <div>
              <p className="font-bold text-slate-800 text-xs">
                Tech<span className="text-cyan-600">Asset</span> &bull; Innovatech Solutions S.A.C.
              </p>
              <p className="text-slate-400 text-[10px]">Gestión Institucional de Inventario y Préstamos</p>
            </div>
          </div>
          <div className="flex gap-6 font-medium">
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
            <Link to="/equipos" className="hover:text-blue-600 transition">Equipos</Link>
            <Link to="/prestamos" className="hover:text-blue-600 transition">Préstamos</Link>
            <a href="http://localhost:5153/swagger" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">Swagger API</a>
          </div>
          <p className="text-slate-400">
            Caso Práctico Integrador &bull; Semanas 01–12
          </p>
        </div>
      </footer>
    </div>
  );
}
