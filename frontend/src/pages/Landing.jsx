import { useState } from "react";
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
  Users, 
  ExternalLink,
  QrCode,
  Search,
  Check,
  Server,
  Building2,
  FileCheck,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function Landing() {
  const [activeRole, setActiveRole] = useState("admin");

  const personas = {
    admin: {
      nombre: "Carlos Mendoza Ramos",
      cargo: "Jefe de Infraestructura & TI",
      edad: "38 años",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      frase: "Antes perdíamos horas cruzando 14 archivos Excel para saber dónde estaba cada laptop. TechAsset nos dio control patrimonial absoluto.",
      desafio: "Descontrol patrimonial, equipos duplicados en inventario y falta de métricas consolidadas para gerencia.",
      solucion: "Dashboard ejecutivo en tiempo real (RF-13), protección contra borrado accidental (RN-06) y distribución porcentual de activos por área (RF-16)."
    },
    soporte: {
      nombre: "Sofía Valenzuela",
      cargo: "Especialista de Soporte Técnico",
      edad: "29 años",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      frase: "En la ventanilla de soporte cada segundo cuenta. Ahora el sistema solo me muestra equipos disponibles y el registro toma menos de 15 segundos.",
      desafio: "Entregar por error laptops que estaban en mantenimiento y devoluciones sin registro del estado físico del hardware.",
      solucion: "Filtrado automático de disponibilidad (RN-01 a RN-03) e inspección técnica obligatoria con observaciones en cada retorno (RN-10)."
    },
    colaborador: {
      nombre: "Juan Pérez",
      cargo: "Líder Técnico de Desarrollo",
      edad: "34 años",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      frase: "Solicitar una laptop para un nuevo desarrollador antes tomaba 48 horas de papeleos. Hoy la asignación es inmediata y transparente.",
      desafio: "Falta de visibilidad sobre qué equipos estaban libres y retrasos burocráticos para iniciar proyectos.",
      solucion: "Asignación nominal unívoca a su correo corporativo (RN-05, RN-08) y constancia digital instantánea de entrega."
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 border-b border-slate-800 py-2 px-4 text-xs font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-white">Innovatech Solutions S.A.C.</span>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-slate-400">Plataforma Institucional de Gestión y Trazabilidad de Activos TI</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>ISO 9241-210 &bull; WCAG 2.1 AA</span>
            </span>
            <a 
              href="http://localhost:5153/swagger" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold transition"
            >
              <span>Swagger REST API</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                TechAsset
              </span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                Enterprise Portal
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#soluciones" className="hover:text-blue-600 transition">Soluciones</a>
            <a href="#como-funciona" className="hover:text-blue-600 transition">Cómo Funciona</a>
            <a href="#roles" className="hover:text-blue-600 transition">Diseñado por Rol</a>
            <a href="#metricas" className="hover:text-blue-600 transition">Métricas</a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Acceder al Sistema</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-gradient-to-b from-slate-50/60 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Gestión Inteligente de Inventario y Préstamos &bull; Versión 1.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.12]">
            El control inteligente de activos TI que tu equipo{" "}
            <span className="text-blue-600">realmente necesita.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Plataforma centralizada para más de 500 colaboradores en Innovatech Solutions S.A.C. 
            Eliminá las hojas de cálculo desactualizadas, agilizá las entregas en ventanilla y asegurá la trazabilidad patrimonial en tiempo real.
          </p>

          {/* Primary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all inline-flex items-center justify-center gap-2.5">
                <LogIn className="w-5 h-5" />
                <span>Ingresar al Sistema (Login)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-300 shadow-xs transition inline-flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                <span>Explorar Dashboard Demo</span>
              </button>
            </Link>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-14 pt-10 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-slate-900">500+</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Colaboradores Activos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-blue-600">100%</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Trazabilidad de Activos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-slate-900">0</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Registros Duplicados</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-emerald-600">&lt; 15s</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Registro de Préstamo</p>
            </div>
          </div>

          {/* 4. REAL PRODUCT INTERFACE PREVIEW (LIGHT CLEAN DESKTOP UI) */}
          <div className="mt-16 text-left max-w-5xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40 overflow-hidden">
              {/* Browser Chrome Header */}
              <div className="h-11 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                  <div className="ml-4 px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-mono text-slate-500 flex items-center gap-2">
                    <span className="text-emerald-500">🔒</span>
                    <span>app.innovatech.com/dashboard</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    API Kestrel Online
                  </span>
                </div>
              </div>

              {/* Inside Dashboard Application Screen */}
              <div className="p-6 bg-slate-50/50">
                {/* Micro KPI Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Activos Totales</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">120</p>
                    <span className="text-[10px] text-blue-600 font-semibold">100% inventariados</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Disponibles</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">85</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Listos para entrega</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">En Préstamo</p>
                    <p className="text-2xl font-black text-blue-600 mt-1">28</p>
                    <span className="text-[10px] text-blue-600 font-semibold">Asignados activos</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mantenimiento</p>
                    <p className="text-2xl font-black text-amber-600 mt-1">7</p>
                    <span className="text-[10px] text-amber-600 font-semibold">Bloqueo preventivo</span>
                  </div>
                </div>

                {/* Table Simulation */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Inventario de Equipos en Tiempo Real</span>
                    <span className="text-blue-600 font-medium">PostgreSQL Relacional</span>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">MacBook Pro 16" M3 Max</p>
                          <p className="text-slate-500 font-mono text-[11px]">INV-LP-001 &bull; Serie: C02G4589MD6R</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-600 hidden sm:inline">Colaborador: <strong>Sofía Valenzuela</strong></span>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          En Préstamo
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                          <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Dell Latitude 5540 i7 32GB</p>
                          <p className="text-slate-500 font-mono text-[11px]">INV-LP-002 &bull; Serie: 8JK9NM2</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-600 hidden sm:inline">Colaborador: <strong>Juan Pérez</strong></span>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          En Préstamo
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                          <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Lenovo ThinkPad T14s Gen 4</p>
                          <p className="text-slate-500 font-mono text-[11px]">INV-LP-005 &bull; Serie: PF3B901</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-600 hidden sm:inline">Ubicación: <strong>Almacén Central TI</strong></span>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Disponible
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. USER PERSONAS SECTION (DCU / ISO 9241-210) */}
      <section id="roles" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Diseño Centrado en el Usuario &bull; ISO 9241-210
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Pensado para la realidad operativa de tu organización
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Identificamos a los actores clave de Innovatech Solutions para diseñar una experiencia adaptada a sus objetivos y tareas cotidianas.
            </p>

            {/* Persona Switcher Tabs */}
            <div className="mt-8 inline-flex p-1.5 bg-slate-200/80 rounded-xl max-w-md w-full justify-between">
              <button
                onClick={() => setActiveRole("admin")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeRole === "admin"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Admin de TI
              </button>
              <button
                onClick={() => setActiveRole("soporte")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeRole === "soporte"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Soporte TI
              </button>
              <button
                onClick={() => setActiveRole("colaborador")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeRole === "colaborador"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Colaborador
              </button>
            </div>
          </div>

          {/* Active Persona Profile Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-blue-100 shadow-sm">
                <img 
                  src={personas[activeRole].foto} 
                  alt={personas[activeRole].nombre} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{personas[activeRole].nombre}</h3>
                    <p className="text-sm font-semibold text-blue-600">{personas[activeRole].cargo} &bull; {personas[activeRole].edad}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold border border-slate-200 w-fit mx-auto md:mx-0">
                    Perfil Clave DCU
                  </span>
                </div>

                <blockquote className="italic text-slate-600 text-sm border-l-2 border-blue-500 pl-3 my-4">
                  "{personas[activeRole].frase}"
                </blockquote>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 text-left">
                  <div className="bg-red-50/60 p-4 rounded-xl border border-red-100">
                    <p className="text-xs font-bold text-red-700 uppercase tracking-wide">Fricción o Problema Previo</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{personas[activeRole].desafio}</p>
                  </div>
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Solución Implementada</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{personas[activeRole].solucion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (NORMAN'S NATURAL MAPPING & WORKFLOW) */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Mapeo Natural & Flujo de Interacción
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              De la placa física del activo al registro digital en 4 pasos
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Diseño que cierra la brecha entre la intención del usuario y la respuesta del sistema sin curvas de aprendizaje complejas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-105 transition">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Placa Patrimonial Única</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada equipo físico cuenta con su código alfanumérico estandarizado (RN-07) como <code>INV-LP-001</code>, eliminando ambigüedades.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-105 transition">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Validación Preventiva</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                El sistema restringe la selección únicamente a activos disponibles. No permite prestar equipos en reparación o baja (RN-02, RN-03).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-105 transition">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Asignación Nominal</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                En ventanilla se asocia el equipo directamente al colaborador responsable y su área funcional en menos de 15 segundos (RN-05).
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition group">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-lg mb-5 group-hover:scale-105 transition">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Inspección de Retorno</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Al devolver el equipo es obligatorio registrar el estado físico del hardware (RN-10), restaurando su disponibilidad patrimonial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ENTERPRISE MODULES & SOLUCIONES */}
      <section id="soluciones" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Arquitectura de Información
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Módulos diseñados para resolver fricciones reales
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Integración completa entre inventario, préstamos, usuarios y reportes ejecutivos bajo Clean Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Inventario Tecnológico</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Control de laptops, desktops, monitores y proyectores con búsqueda facetada por marca, serie y estado operativo.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Búsqueda multicriterio instantánea</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Protección de borrado si registra historial (RN-06)</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Préstamos y Retornos</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Despacho ágil en ventanilla con validación automática de préstamos activos e inspección de retorno documentada.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Un solo préstamo activo por activo (RN-01)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Auditoría física de devolución (RN-10)</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Dashboard Ejecutivo</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Indicadores clave calculados en tiempo real: disponibilidad porcentual, distribución por área y ranking de demanda.
              </p>
              <ul className="text-xs text-slate-500 space-y-2 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 6 KPIs clave en vivo (RF-13)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Demanda porcentual por área (RF-16)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Empezá a gestionar los activos tecnológicos de Innovatech
          </h2>
          <p className="text-blue-100 text-base max-w-xl mx-auto mb-8">
            Accedé al portal corporativo y probá el flujo de préstamos en vivo con cualquiera de los 3 perfiles precargados.
          </p>
          <Link to="/login">
            <button className="px-8 py-4 rounded-xl bg-white text-blue-600 hover:bg-slate-100 font-extrabold text-base shadow-xl transition-all inline-flex items-center gap-2.5">
              <LogIn className="w-5 h-5" />
              <span>Acceder a TechAsset Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">TechAsset Enterprise Portal</p>
              <p className="text-slate-500">Innovatech Solutions S.A.C. &bull; Construcción de Software</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <Link to="/login" className="hover:text-white transition">Iniciar Sesión</Link>
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link to="/equipos" className="hover:text-white transition">Inventario</Link>
            <Link to="/prestamos" className="hover:text-white transition">Préstamos</Link>
            <a href="http://localhost:5153/swagger" target="_blank" rel="noreferrer" className="hover:text-white transition">Swagger API</a>
          </div>

          <p className="text-slate-600">
            &copy; 2026 Innovatech Solutions S.A.C. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
