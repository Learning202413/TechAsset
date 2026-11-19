import { Link } from "react-router-dom";
import { 
  Layers, 
  LogIn, 
  ArrowRight, 
  ShieldCheck, 
  Laptop, 
  ArrowLeftRight, 
  BarChart3, 
  CheckCircle2, 
  Sparkles,
  Users,
  Eye,
  Workflow,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import Button from "../components/Button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header & Navigation (Shneiderman: Consistency & Universal Usability) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                TechAsset
              </span>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
                Innovatech Solutions S.A.C.
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#caracteristicas" className="hover:text-blue-600 transition">Características</a>
            <a href="#modulos" className="hover:text-blue-600 transition">Módulos</a>
            <a href="#estandares" className="hover:text-blue-600 transition">Estándares UX</a>
            <a href="#impacto" className="hover:text-blue-600 transition">Impacto Institucional</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* The Login Button explicitly requested by the user */}
            <Link to="/login">
              <Button variant="primary" className="!px-5 !py-2.5 shadow-sm hover:shadow transition">
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Norman: Clear Signifiers, Affordance & Conceptual Model) */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {/* Status Chip (Nielsen #1: Visibility of System Status) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sistema Operativo Institucional &bull; Versión 1.0.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Gestión Inteligente de Inventario y Préstamo de{" "}
            <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">
              Equipos Tecnológicos
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Plataforma centralizada para más de 500 colaboradores. Erradica la duplicidad de hojas de cálculo, asegura la trazabilidad patrimonial en tiempo real y optimiza las asignaciones de TI.
          </p>

          {/* Primary Action Group */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                <span>Acceder al Sistema (Login)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-base border border-slate-300 shadow-sm transition inline-flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                <span>Explorar Dashboard Demo</span>
              </button>
            </Link>
          </div>

          {/* Real-world trust counters */}
          <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900">500+</p>
              <p className="text-xs uppercase font-bold text-slate-500 mt-1 tracking-wider">Colaboradores Activos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-extrabold text-blue-600">100%</p>
              <p className="text-xs uppercase font-bold text-slate-500 mt-1 tracking-wider">Trazabilidad de Préstamos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-extrabold text-slate-900">7</p>
              <p className="text-xs uppercase font-bold text-slate-500 mt-1 tracking-wider">Familias de Activos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-extrabold text-emerald-600">0</p>
              <p className="text-xs uppercase font-bold text-slate-500 mt-1 tracking-wider">Registros Duplicados</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Modules & Problem Solving (Nielsen #2: Real World Match) */}
      <section id="modulos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Módulos Integrados
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Diseñado para Resolver las Fricciones Operativas Reales
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Alineado estrictamente a los 17 Requerimientos Funcionales y 10 Reglas de Negocio del caso práctico integrador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Inventario */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Inventario Tecnológico</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Registro estandarizado de laptops, desktops, monitores y equipos de red con código patrimonial único (RN-07) y control de estados operativos (RF-05 a RF-08).
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Búsqueda predictiva y filtros multicriterio</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Prevención de eliminación si tiene historial (RN-06)</li>
              </ul>
            </div>

            {/* Card 2: Préstamos */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Préstamos y Devoluciones</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Asignación inmediata de equipos a colaboradores responsables (RN-05). Control estricto de disponibilidad: no permite prestar en mantenimiento ni baja (RN-02, RN-03).
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Validación de préstamo único activo (RN-01)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Inspección obligatoria al devolver (RN-10)</li>
              </ul>
            </div>

            {/* Card 3: Dashboard */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Dashboard Ejecutivo</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                6 Indicadores clave calculados en tiempo real (RF-13): total de activos, disponibles, prestados, en mantenimiento, total de préstamos y área con mayor demanda.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Distribución porcentual por área funcional (RF-16)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ranking de equipos más utilizados (RF-15)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UX & Usability Architecture (Nielsen, Shneiderman, Norman, Usability) */}
      <section id="estandares" className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              Fundamentos de Ingeniería de Usabilidad
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Diseño Centrado en el Usuario (UCD) y Reglas de Oro
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Implementación rigurosa de los marcos teóricos de interacción humano-computador (HCI) para una experiencia corporativa sin fricciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Nielsen */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 w-fit mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Heurísticas de Nielsen</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visibilidad del estado del sistema con spinners y badges (#1), correspondencia con el mundo real (#2), prevención de errores con validación reactiva (#5) y reconocimiento antes que recuerdo (#6).
              </p>
            </div>

            {/* Shneiderman */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 w-fit mb-4">
                <Workflow className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Reglas de Shneiderman</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consistencia visual estricta en formularios, feedback informativo instantáneo, diseño de diálogos que indican cierre de tareas y reducción de carga en la memoria de trabajo con botones de demostración.
              </p>
            </div>

            {/* Donald Norman */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600 w-fit mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Principios de Norman</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Affordances claros en botones e inputs, signifiers inequívocos para ver contraseñas y acciones destructivas, mapping intuitivo y restricciones físicas (constraints) que impiden estados inválidos.
              </p>
            </div>

            {/* Architecture of Information */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 w-fit mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Arquitectura de Info (IA)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jerarquía visual L1/L2 predecible, menú lateral persistente con estados activos claros, agrupaciones semánticas por módulo y navegación sin recargas forzadas (SPA pura).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Institutional Impact & CTA Banner */}
      <section id="impacto" className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            ¿Listo para gestionar el inventario tecnológico institucional?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Iniciá sesión con tus credenciales corporativas o utilizá uno de los perfiles de demostración para evaluar el sistema en tiempo real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <button className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-extrabold hover:bg-blue-50 shadow-lg transition inline-flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                Ir a Iniciar Sesión
              </button>
            </Link>
            <a
              href="http://localhost:5153/swagger"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold border border-blue-500 transition inline-flex items-center gap-2 text-sm"
            >
              <span>Documentación Swagger API</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Footer (Nielsen #10: Help and Documentation) */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white">TechAsset &bull; Innovatech Solutions S.A.C.</p>
              <p className="text-xs text-slate-500">Curso: Construcción de Software &bull; Solución Semanas 01-12</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link to="/login" className="hover:text-white transition">Acceso al Sistema</Link>
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <a href="http://localhost:5153/swagger" target="_blank" rel="noreferrer" className="hover:text-white transition">API Swagger</a>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>API Online :5153</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
