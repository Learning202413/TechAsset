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
  Sparkles,
  Users,
  Workflow,
  ExternalLink,
  QrCode,
  Search,
  Check,
  Clock,
  AlertCircle,
  Server,
  Building2,
  FileCheck,
  UserCheck,
  Zap,
  Info
} from "lucide-react";

export default function Landing() {
  const [activeTab, setActiveTab] = useState("admin");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT & SYSTEM STATUS BANNER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-blue-800/40 py-2.5 px-4 text-xs font-medium text-blue-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">TechAsset Enterprise Portal v1.0</span>
            <span className="text-blue-400 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Innovatech Solutions S.A.C. &bull; Gestión de 500+ Activos TI</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="bg-blue-800/60 border border-blue-600/40 text-blue-100 px-2.5 py-0.5 rounded-full font-semibold">
              ISO 9241-210 (DCU) & WCAG 2.1 AA
            </span>
            <a 
              href="http://localhost:5153/swagger" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-300 hover:text-white flex items-center gap-1 transition"
            >
              <span>Swagger API REST</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER & ENTERPRISE NAVIGATION */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                TechAsset <span className="text-blue-500 text-xs px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 font-bold uppercase">Pro</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400 tracking-wider block">
                INNOVATECH SOLUTIONS S.A.C.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a href="#mockup" className="hover:text-blue-400 transition-colors">Dashboard UI</a>
            <a href="#personas" className="hover:text-blue-400 transition-colors">DCU & Personas</a>
            <a href="#norman" className="hover:text-blue-400 transition-colors">Principios de Norman</a>
            <a href="#shneiderman" className="hover:text-blue-400 transition-colors">Reglas Shneiderman</a>
            <a href="#modulos" className="hover:text-blue-400 transition-colors">Módulos & Reglas</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION WITH RICH VISUAL TECH IMAGERY & DASHBOARD MOCKUP */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Sistema Institucional de Gestión y Trazabilidad de TI &bull; Semanas 01-12</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Gestión Inteligente de Inventario y Préstamo de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Equipos Tecnológicos
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Plataforma centralizada para más de 500 colaboradores en Innovatech Solutions S.A.C. Erradica la duplicidad de hojas de cálculo, asegura la trazabilidad patrimonial en tiempo real y optimiza las asignaciones operativas bajo estándares internacionales de usabilidad.
          </p>

          {/* Primary Action Group */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2.5">
                <LogIn className="w-5 h-5" />
                <span>Acceder al Sistema (Login)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-base border border-slate-700 shadow-lg transition inline-flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Explorar Dashboard Demo</span>
              </button>
            </Link>

            <a
              href="#personas"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-slate-800/50 text-slate-300 font-medium text-sm border border-slate-800 transition inline-flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Ver Personas & DCU</span>
            </a>
          </div>

          {/* REAL TECH PHOTOGRAPHY SHOWCASE (UNSPLASH) */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Card 1: Datacenter */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80" 
                  alt="Infraestructura de Servidores y Datacenter" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-600/90 text-white backdrop-blur-md">
                    <Server className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide uppercase">Infraestructura TI Central</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1.5">Arquitectura Multicapa Limpia</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Backend ASP.NET Core y persistencia relacional con PostgreSQL. Integridad referencial que impide huérfanos o inconsistencias (RN-06).
                </p>
              </div>
            </div>

            {/* Card 2: Laptops & Hardware */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80" 
                  alt="Equipos tecnológicos y laptops de alto rendimiento" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-600/90 text-white backdrop-blur-md">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide uppercase">Parque Tecnológico Activo</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1.5">Control de Ciclo de Vida</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Laptops, workstations, monitores y switches con código patrimonial único (RN-07) y auditoría de estado operativo permanente.
                </p>
              </div>
            </div>

            {/* Card 3: Modern Workspace */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Entorno de trabajo moderno y colaborativo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-600/90 text-white backdrop-blur-md">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide uppercase">Operaciones Híbridas 500+</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1.5">Asignación Nominal a Colaboradores</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Préstamos transparentes vinculados a colaboradores reales (RN-05). Máximo un préstamo activo por activo para evitar duplicidades (RN-01).
                </p>
              </div>
            </div>
          </div>

          {/* HIGH-FIDELITY PRODUCT UI MOCKUP OF TECHASSET DASHBOARD */}
          <div id="mockup" className="mt-16 text-left">
            <div className="relative mx-auto max-w-5xl">
              {/* macOS Window Chrome */}
              <div className="rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl shadow-blue-900/20 overflow-hidden">
                {/* Titlebar */}
                <div className="h-11 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/90 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block"></span>
                    <span className="ml-3 text-xs font-mono font-medium text-slate-400 hidden sm:inline">
                      TechAsset Enterprise Portal - Dashboard Operativo
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      PostgreSQL Online
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                      v1.0.0-prod
                    </span>
                  </div>
                </div>

                {/* Mockup Internal Navigation & KPIs */}
                <div className="p-6 bg-slate-950/95 space-y-6">
                  {/* Top Bar inside mockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>Panel de Control & Indicadores Clave</span>
                        <span className="text-xs font-normal text-slate-400 bg-slate-800/70 px-2 py-0.5 rounded border border-slate-700">
                          Sincronizado cada 10s
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Innovatech Solutions S.A.C. &bull; Sede Central San Isidro
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input 
                          type="text" 
                          readOnly 
                          value="Filtrar por código patrimonial..." 
                          className="bg-slate-900 border border-slate-800 text-xs text-slate-400 pl-8 pr-3 py-1.5 rounded-lg w-48 sm:w-56 focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                          alt="Carlos Mendoza" 
                          className="w-7 h-7 rounded-full object-cover border border-blue-500"
                        />
                        <span className="text-xs font-semibold text-slate-300 hidden md:inline">C. Mendoza (Admin)</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Real KPI Pills */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Activos Totales</span>
                        <Laptop className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-black text-white">120</div>
                      <div className="text-[11px] text-blue-400 font-medium mt-1">100% inventariados (RN-07)</div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Disponibles</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl font-black text-emerald-400">85</div>
                      <div className="text-[11px] text-emerald-500 font-medium mt-1">Listos para entrega (RN-02)</div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>En Préstamo</span>
                        <ArrowLeftRight className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="text-2xl font-black text-indigo-400">28</div>
                      <div className="text-[11px] text-indigo-400 font-medium mt-1">Con colaborador (RN-05)</div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>En Mantenimiento</span>
                        <Clock className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-black text-amber-400">7</div>
                      <div className="text-[11px] text-amber-500 font-medium mt-1">Bloqueo automático (RN-02)</div>
                    </div>
                  </div>

                  {/* Realistic Table Preview */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                    <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Monitoreo de Activos y Préstamos Recientes (RF-17)
                      </span>
                      <span className="text-xs text-blue-400 font-semibold cursor-pointer hover:underline">
                        Ver los 120 registros &rarr;
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                          <tr>
                            <th className="py-2.5 px-4 font-semibold">Código Patrimonial</th>
                            <th className="py-2.5 px-4 font-semibold">Equipo / Modelo</th>
                            <th className="py-2.5 px-4 font-semibold">Categoría</th>
                            <th className="py-2.5 px-4 font-semibold">Asignatario / Ubicación</th>
                            <th className="py-2.5 px-4 font-semibold">Estado Operativo</th>
                            <th className="py-2.5 px-4 font-semibold text-right">Retorno Previsto</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                          <tr className="hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4 font-bold text-blue-400">INV-LP-001</td>
                            <td className="py-3 px-4 font-sans font-medium text-white">MacBook Pro 16" M3 Max 36GB</td>
                            <td className="py-3 px-4 font-sans">Laptop</td>
                            <td className="py-3 px-4 font-sans flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center">SV</span>
                              <span>Sofía Valenzuela (Soporte TI)</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 text-[10px] font-sans font-bold">
                                En Préstamo
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-slate-400 font-sans">24 Nov 2026</td>
                          </tr>

                          <tr className="hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4 font-bold text-blue-400">INV-LP-002</td>
                            <td className="py-3 px-4 font-sans font-medium text-white">Dell Latitude 5540 i7 32GB</td>
                            <td className="py-3 px-4 font-sans">Laptop</td>
                            <td className="py-3 px-4 font-sans flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center">JP</span>
                              <span>Juan Pérez (Desarrollo)</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 text-[10px] font-sans font-bold">
                                En Préstamo
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-slate-400 font-sans">22 Nov 2026</td>
                          </tr>

                          <tr className="hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4 font-bold text-emerald-400">INV-DS-014</td>
                            <td className="py-3 px-4 font-sans font-medium text-white">Lenovo ThinkCentre M70q Tiny</td>
                            <td className="py-3 px-4 font-sans">Desktop</td>
                            <td className="py-3 px-4 font-sans text-slate-400">Almacén Central TI (Rack A-3)</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-[10px] font-sans font-bold">
                                Disponible
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-emerald-400 font-sans">Inmediato</td>
                          </tr>

                          <tr className="hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4 font-bold text-amber-400">INV-MN-004</td>
                            <td className="py-3 px-4 font-sans font-medium text-white">Dell UltraSharp 27" 4K USB-C</td>
                            <td className="py-3 px-4 font-sans">Monitor</td>
                            <td className="py-3 px-4 font-sans text-slate-400">Laboratorio de Calidad</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 text-[10px] font-sans font-bold">
                                Mantenimiento
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-amber-400 font-sans">En diagnóstico</td>
                          </tr>

                          <tr className="hover:bg-slate-800/40 transition">
                            <td className="py-3 px-4 font-bold text-emerald-400">INV-PR-008</td>
                            <td className="py-3 px-4 font-sans font-medium text-white">Epson PowerLite L530U Láser</td>
                            <td className="py-3 px-4 font-sans">Proyector</td>
                            <td className="py-3 px-4 font-sans text-slate-400">Auditorio Principal</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-[10px] font-sans font-bold">
                                Disponible
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-emerald-400 font-sans">Inmediato</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING GLASSMORPHISM CARDS */}
              {/* Floating Card 1: Top Right */}
              <div className="hidden lg:block absolute -top-6 -right-8 max-w-xs bg-slate-900/90 backdrop-blur-xl border border-blue-500/40 p-4 rounded-2xl shadow-2xl shadow-blue-900/50 animate-float">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                      Préstamo Aprobado (RN-01, RN-05)
                    </span>
                    <p className="text-xs font-bold text-white mt-0.5">MacBook Pro M3 asignado a Sofía V.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Acta digital generada con entrega física validada.</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2: Bottom Left */}
              <div className="hidden lg:block absolute -bottom-8 -left-8 max-w-xs bg-slate-900/90 backdrop-blur-xl border border-indigo-500/40 p-4 rounded-2xl shadow-2xl shadow-indigo-900/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block">
                      Mapeo Físico a Digital (RN-07)
                    </span>
                    <p className="text-xs font-bold text-white mt-0.5">Mapeo QR: INV-MN-004 escaneado</p>
                    <p className="text-[11px] text-slate-400 mt-1">Sincronización instantánea con PostgreSQL.</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Bottom Right */}
              <div className="hidden lg:block absolute -bottom-6 right-12 max-w-xs bg-slate-900/90 backdrop-blur-xl border border-purple-500/40 p-3.5 rounded-2xl shadow-2xl shadow-purple-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-300 block">Inspección Obligatoria</span>
                    <p className="text-xs font-bold text-white">Devolución con registro físico (RN-10)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REAL WORLD TRUST STATS BANNER */}
          <div className="mt-20 pt-12 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div>
              <p className="text-4xl lg:text-5xl font-black text-white">500+</p>
              <p className="text-xs uppercase font-bold text-blue-400 mt-1.5 tracking-wider">Colaboradores Activos</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Innovatech Solutions S.A.C.</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black text-emerald-400">100%</p>
              <p className="text-xs uppercase font-bold text-emerald-400 mt-1.5 tracking-wider">Trazabilidad de Préstamos</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Reglas RN-01 a RN-05 garantizadas</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black text-indigo-400">7</p>
              <p className="text-xs uppercase font-bold text-indigo-400 mt-1.5 tracking-wider">Familias de Equipos</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Laptops, Desktops, Red, Monitores</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black text-cyan-400">0</p>
              <p className="text-xs uppercase font-bold text-cyan-400 mt-1.5 tracking-wider">Registros Duplicados</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Unicidad estricta RN-07 y RN-08</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. USER-CENTERED DESIGN (DCU / ISO 9241-210) & USER PERSONAS SECTION */}
      <section id="personas" className="py-24 bg-slate-950 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Diseño Centrado en el Usuario &bull; ISO 9241-210
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Arquetipos y Personas Reales de Innovatech Solutions
            </h2>
            <p className="text-slate-400 mt-3 text-base leading-relaxed">
              La norma internacional ISO 9241-210 exige diseñar a partir de la comprensión empírica de los usuarios, sus objetivos y sus entornos de trabajo. TechAsset fue modelado meticulosamente en base a las 3 personas clave del sistema.
            </p>
          </div>

          {/* Interactive Persona Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl inline-flex gap-2">
              <button 
                onClick={() => setActiveTab("admin")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === "admin" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Carlos Mendoza (Admin TI)</span>
              </button>
              <button 
                onClick={() => setActiveTab("soporte")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === "soporte" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Sofía Valenzuela (Soporte TI)</span>
              </button>
              <button 
                onClick={() => setActiveTab("colaborador")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === "colaborador" 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Juan Pérez (Colaborador)</span>
              </button>
            </div>
          </div>

          {/* 3 User Personas Deep Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PERSONA 1: Carlos Mendoza (Admin TI) */}
            <div className={`rounded-3xl border p-7 transition-all duration-300 flex flex-col justify-between ${
              activeTab === "admin" 
                ? "bg-slate-900/90 border-blue-500 ring-2 ring-blue-500/30 shadow-2xl shadow-blue-900/30" 
                : "bg-slate-900/50 border-slate-800 opacity-80 hover:opacity-100"
            }`}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                    alt="Carlos Mendoza - Administrador de Sistemas" 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">Carlos Mendoza Ramos</h3>
                    <p className="text-xs font-semibold text-blue-400">38 años &bull; Administrador de Sistemas</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Área de Tecnología &bull; 12 años en TI</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
                    <span className="font-bold text-slate-300 block mb-1 uppercase text-[10px] tracking-wider text-rose-400">
                      Dolores y Fricciones Previas
                    </span>
                    <ul className="text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                      <li>Pérdida de trazabilidad con más de 14 hojas Excel desarticuladas y desactualizadas.</li>
                      <li>Imposibilidad de auditar bajas de equipos o justificar compras ante gerencia.</li>
                      <li>Riesgo constante de eliminación accidental de registros con historial patrimonial.</li>
                    </ul>
                  </div>

                  <div className="bg-blue-950/40 border border-blue-800/50 p-3.5 rounded-xl">
                    <span className="font-bold text-blue-300 block mb-1 uppercase text-[10px] tracking-wider">
                      Solución TechAsset (RF & RN)
                    </span>
                    <ul className="text-slate-300 space-y-1.5 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span><strong>RF-01 a RF-04:</strong> Control central de colaboradores con soft-delete preventivo (RN-09).</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span><strong>RN-06 & RN-07:</strong> Código patrimonial único e imposibilidad de eliminar equipos con historial previo.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span><strong>RF-13 a RF-16:</strong> 6 KPIs dinámicos, ranking de uso de activos y demanda por área en tiempo real.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Credenciales demo disponibles</span>
                <Link to="/login" className="text-blue-400 font-bold hover:underline flex items-center gap-1">
                  Probar perfil &rarr;
                </Link>
              </div>
            </div>

            {/* PERSONA 2: Sofía Valenzuela (Soporte TI) */}
            <div className={`rounded-3xl border p-7 transition-all duration-300 flex flex-col justify-between ${
              activeTab === "soporte" 
                ? "bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/30 shadow-2xl shadow-indigo-900/30" 
                : "bg-slate-900/50 border-slate-800 opacity-80 hover:opacity-100"
            }`}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                    alt="Sofía Valenzuela - Soporte TI" 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">Sofía Valenzuela</h3>
                    <p className="text-xs font-semibold text-indigo-400">29 años &bull; Responsable de Soporte TI</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Operaciones & Despacho de TI &bull; Turno Diario</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
                    <span className="font-bold text-slate-300 block mb-1 uppercase text-[10px] tracking-wider text-rose-400">
                      Dolores y Fricciones Previas
                    </span>
                    <ul className="text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                      <li>Filas y demoras en ventanilla de soporte al buscar manualmente qué laptops estaban listas.</li>
                      <li>Préstamos accidentales de equipos en mantenimiento técnico o asignados a otros.</li>
                      <li>Retornos sin constancia del estado físico en que el usuario entregaba el bien.</li>
                    </ul>
                  </div>

                  <div className="bg-indigo-950/40 border border-indigo-800/50 p-3.5 rounded-xl">
                    <span className="font-bold text-indigo-300 block mb-1 uppercase text-[10px] tracking-wider">
                      Solución TechAsset (RF & RN)
                    </span>
                    <ul className="text-slate-300 space-y-1.5 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span><strong>RF-09 & RN-01, RN-02:</strong> Filtro reactivo que solo permite seleccionar activos "Disponibles".</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span><strong>RF-10 & RN-10:</strong> Inspección obligatoria al recepcionar devoluciones con registro de estado.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span><strong>RF-12 & RF-17:</strong> Consulta directa de préstamos vigentes con cálculo de retrasos.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Credenciales demo disponibles</span>
                <Link to="/login" className="text-indigo-400 font-bold hover:underline flex items-center gap-1">
                  Probar perfil &rarr;
                </Link>
              </div>
            </div>

            {/* PERSONA 3: Juan Pérez (Colaborador) */}
            <div className={`rounded-3xl border p-7 transition-all duration-300 flex flex-col justify-between ${
              activeTab === "colaborador" 
                ? "bg-slate-900/90 border-emerald-500 ring-2 ring-emerald-500/30 shadow-2xl shadow-emerald-900/30" 
                : "bg-slate-900/50 border-slate-800 opacity-80 hover:opacity-100"
            }`}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" 
                    alt="Juan Pérez - Colaborador" 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">Juan Pérez</h3>
                    <p className="text-xs font-semibold text-emerald-400">34 años &bull; Desarrollador Senior</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Área de Desarrollo de Software &bull; Modalidad Híbrida</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-xl">
                    <span className="font-bold text-slate-300 block mb-1 uppercase text-[10px] tracking-wider text-rose-400">
                      Dolores y Fricciones Previas
                    </span>
                    <ul className="text-slate-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                      <li>Incertidumbre sobre qué laptops o monitores de 27" estaban disponibles para proyectos.</li>
                      <li>Formatos físicos en papel que tardaban hasta 48 horas en autorizarse.</li>
                      <li>Falta de constancia digital sobre las fechas exactas de devolución estipuladas.</li>
                    </ul>
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-800/50 p-3.5 rounded-xl">
                    <span className="font-bold text-emerald-300 block mb-1 uppercase text-[10px] tracking-wider">
                      Solución TechAsset (RF & RN)
                    </span>
                    <ul className="text-slate-300 space-y-1.5 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>RF-07:</strong> Catálogo transparente de equipos con búsqueda predictiva por marca y tipo.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>RN-05 & RF-11:</strong> Asignación nominal inmediata vinculada a su correo corporativo unívoco.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Shneiderman #4 & #8:</strong> Proceso sin fricción mental, confirmación visual instantánea.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Credenciales demo disponibles</span>
                <Link to="/login" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                  Probar perfil &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DONALD NORMAN'S DESIGN PRINCIPLES IN ACTION */}
      <section id="norman" className="py-24 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Ingeniería Cognitiva &bull; Donald Norman
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Principios de Donald Norman en la Arquitectura TechAsset
            </h2>
            <p className="text-slate-400 mt-3 text-base leading-relaxed">
              Diseño enfocado en erradicar las fallas del modelo conceptual del usuario mediante el cierre sistemático de las brechas de ejecución y evaluación, affordances claros y mapeo natural.
            </p>
          </div>

          {/* 5.1 GULF OF EXECUTION & GULF OF EVALUATION (Brecha de Ejecución y Evaluación) */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 mb-16 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-600 text-white">
                <Workflow className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Brecha de Ejecución y Brecha de Evaluación (Norman's Gulfs)
                </h3>
                <p className="text-xs text-slate-400">
                  Transformación fluida del objetivo mental del usuario en acción concreta y confirmación visual inmediata del nuevo estado del sistema.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative group hover:border-purple-500/50 transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                    Fase 1
                  </span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Intención Cognitiva</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  El operador necesita asignar la laptop <code className="text-purple-300">INV-LP-001</code> a Sofía Valenzuela para su turno.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900/90 border border-blue-500/40 p-5 rounded-2xl relative group hover:border-blue-500 transition ring-1 ring-blue-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                    Fase 2: Ejecución
                  </span>
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Cierre de Brecha de Ejecución</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Botón primario destacado, formulario chunked y selector filtrado que <strong>solo lista equipos Disponibles</strong> (RN-02). Cero fricción.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative group hover:border-indigo-500/50 transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                    Fase 3: Transacción
                  </span>
                  <Server className="w-4 h-4 text-indigo-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Procesamiento Backend</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ASP.NET Core valida RN-01 (sin duplicidad de préstamo) y RN-05. Actualiza PostgreSQL atómicamente.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-900/90 border border-emerald-500/40 p-5 rounded-2xl relative group hover:border-emerald-500 transition ring-1 ring-emerald-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Fase 4: Evaluación
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Cierre de Brecha de Evaluación</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Badge cambia instantáneamente a "En Préstamo", toast de confirmación y el Dashboard actualiza el KPI a 28 sin recargar la página.
                </p>
              </div>
            </div>
          </div>

          {/* 5.2 NATURAL MAPPING: PHYSICAL ASSET TAG TO DIGITAL DATABASE RECORD */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Visual Physical Tag */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/70 border border-blue-800 px-3 py-1 rounded-full">
                  Mundo Físico (Placa Patrimonial Anodizada)
                </span>
                <span className="text-xs font-mono text-slate-500">Etiqueta ID #4921</span>
              </div>

              {/* Physical Tag Mockup Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-slate-900 border-2 border-slate-400 shadow-2xl relative">
                <div className="flex items-center justify-between border-b-2 border-slate-400/60 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                      IA
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-tight leading-none">INNOVATECH SOLUTIONS S.A.C.</p>
                      <p className="text-[9px] font-semibold text-slate-600">ACTIVO FIJO CORPORATIVO &bull; TI</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                    PATRIMONIO OFICIAL
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Código Patrimonial Único (RN-07)</span>
                    <span className="text-2xl font-mono font-black tracking-wider text-slate-950">INV-LP-001</span>
                    <p className="text-xs font-medium text-slate-700 mt-1">Apple MacBook Pro 16" M3 Max</p>
                    <p className="text-[10px] text-slate-500 font-mono">SERIE: C02G40L3MD6M &bull; CAT: LAPTOP</p>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-300 shadow-sm text-center">
                    <QrCode className="w-16 h-16 text-slate-900 mx-auto" />
                    <span className="text-[9px] font-mono font-bold text-slate-600 mt-1 block">ESCANEAR TI</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-400/40 flex items-center justify-between text-[10px] text-slate-600 font-medium">
                  <span>Adquisición: 15/01/2026</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verificado en Almacén
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <Info className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Norman: "El orden espacial y los identificadores físicos deben mapear 1:1 con el modelo digital."</span>
              </div>
            </div>

            {/* Digital Entity Record (PostgreSQL / Entity Framework) */}
            <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-3 py-1 rounded-full">
                    Mundo Digital (Entidad Relacional TechAsset)
                  </span>
                  <span className="text-xs font-mono text-emerald-400">PostgreSQL JSON Entity</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Mapeo Natural Bidireccional</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Cada componente de la interfaz y cada endpoint REST refleja fielmente el estado físico del equipo, sin intermediarios abstractos que confundan al personal de TI.
                </p>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto space-y-1">
                  <p className="text-slate-500">// GET /api/equipos/INV-LP-001</p>
                  <p className="text-blue-400">&#123;</p>
                  <p className="pl-4"><span className="text-indigo-400">"id"</span>: <span className="text-amber-300">"9f8a31b2-4d1a-4c28-98e3-b1d7f4e91234"</span>,</p>
                  <p className="pl-4"><span className="text-indigo-400">"codigoPatrimonial"</span>: <span className="text-amber-300">"INV-LP-001"</span>, <span className="text-slate-500">// Mapeo unívoco (RN-07)</span></p>
                  <p className="pl-4"><span className="text-indigo-400">"nombre"</span>: <span className="text-amber-300">"MacBook Pro 16\" M3 Max"</span>,</p>
                  <p className="pl-4"><span className="text-indigo-400">"categoria"</span>: <span className="text-amber-300">"Laptop"</span>,</p>
                  <p className="pl-4"><span className="text-indigo-400">"estadoOperativo"</span>: <span className="text-emerald-400">"Prestado"</span>,</p>
                  <p className="pl-4"><span className="text-indigo-400">"prestamoActivoId"</span>: <span className="text-amber-300">"PR-2026-089"</span>,</p>
                  <p className="pl-4"><span className="text-indigo-400">"colaboradorAsignado"</span>: <span className="text-amber-300">"Sofía Valenzuela"</span></p>
                  <p className="text-blue-400">&#125;</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Sincronización API en milisegundos</span>
                <span className="text-emerald-400 font-bold">Consistencia Transaccional ACID</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEN SHNEIDERMAN'S 8 GOLDEN RULES OF INTERFACE DESIGN */}
      <section id="shneiderman" className="py-24 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Estándares de Interacción &bull; Ben Shneiderman
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Las 8 Reglas de Oro de Shneiderman Aplicadas en TechAsset
            </h2>
            <p className="text-slate-400 mt-3 text-base leading-relaxed">
              Cada pantalla, botón y validación del sistema respeta los principios fundamentales de diseño de interacción formulados por Ben Shneiderman para maximizar la eficacia del usuario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Rule 1 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">Regla 1</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Consistencia Visual</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jerarquía tipográfica unificada, misma paleta semántica (azul=acción, verde=éxito, rojo=alerta) y componentes reutilizables en toda la SPA.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider">Regla 2</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Usabilidad Universal</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Navegación 100% por teclado, etiquetas <code className="text-indigo-300">htmlFor</code> enlazadas, soporte para lectores de pantalla y WCAG 2.1 AA.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">Regla 3</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Feedback Informativo</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spinners reactivos en botones durante envíos, banners <code className="text-emerald-300">FormMessage</code> y badges dinámicos según el estado del activo.
              </p>
            </div>

            {/* Rule 4 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">Regla 4</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Cierre de Diálogos</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Al registrar un préstamo o devolución, el sistema muestra una confirmación explícita indicando la culminación exitosa de la tarea.
              </p>
            </div>

            {/* Rule 5 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">Regla 5</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Prevención de Errores</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Los selectores restringen equipos en mantenimiento o baja (RN-02, RN-03) y validan correos corporativos antes de la llamada a la API (RN-08).
              </p>
            </div>

            {/* Rule 6 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Regla 6</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Fácil Reversión</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Soft-delete de colaboradores para habilitar/deshabilitar según necesidad (RF-04) y diálogos de advertencia previa a cualquier acción crítica.
              </p>
            </div>

            {/* Rule 7 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Workflow className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">Regla 7</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Usuario en Control</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enlaces de retorno "Volver", cancelación de modales con Escape y navegación directa sin recargas forzadas ni callejones sin salida.
              </p>
            </div>

            {/* Rule 8 */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-wider">Regla 8</span>
              <h4 className="text-base font-bold text-white mt-1 mb-2">Carga de Memoria Baja</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chunking de información, autocompletado y botones de 1 clic para cargar perfiles demo en Login sin necesidad de recordar contraseñas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SYSTEM MODULES & REQUIREMENTS ALIGNMENT (RF-01 a RF-17 & RN-01 a RN-10) */}
      <section id="modulos" className="py-24 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block">
              Cobertura Funcional Completa
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Módulos y Reglas de Negocio Implementadas
            </h2>
            <p className="text-slate-400 mt-3 text-base leading-relaxed">
              Solución 100% verificada que cumple con los 17 Requerimientos Funcionales y las 10 Reglas de Negocio del informe técnico integrador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Module 1: Inventario */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-7 hover:border-blue-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Inventario Tecnológico</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                Registro estandarizado de laptops, workstations, monitores y proyectores con validación de código patrimonial unívoco (RN-07).
              </p>
              <div className="space-y-2 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RF-05 a RF-08: Ciclo completo de activos</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RN-06: Bloqueo de borrado con préstamos</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RF-14: Clasificación por 4 estados operativos</span>
                </div>
              </div>
            </div>

            {/* Module 2: Préstamos */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-7 hover:border-indigo-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Préstamos & Devoluciones</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                Asignación controlada a colaboradores registrados (RN-05). Imposibilidad técnica de prestar activos no disponibles (RN-02, RN-03).
              </p>
              <div className="space-y-2 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RN-01: Validación de préstamo único activo</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RN-04 & RN-10: Devolución con inspección física</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RF-11 & RF-12: Historial y préstamos vigentes</span>
                </div>
              </div>
            </div>

            {/* Module 3: Dashboard */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-7 hover:border-emerald-500/50 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dashboard Operativo</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                Tablero analítico con los 6 indicadores clave en tiempo real exigidos en la Sección 10 del solucionario institucional.
              </p>
              <div className="space-y-2 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RF-13: 6 Métricas clave en tiempo real</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RF-15: Ranking de activos más solicitados</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RF-16: Distribución porcentual por área</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENTERPRISE CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-800/40 border border-blue-600/30 px-3.5 py-1 rounded-full inline-block mb-4">
            Innovatech Solutions S.A.C.
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Comenzá a gestionar el inventario patrimonial con excelencia
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Iniciá sesión con tus credenciales institucionales o utilizá cualquiera de los 3 perfiles demo con un solo clic para evaluar la plataforma.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-blue-900 font-extrabold text-base hover:bg-blue-50 shadow-2xl transition inline-flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                <LogIn className="w-5 h-5 text-blue-700" />
                <span>Acceder al Portal (Login)</span>
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="w-full sm:w-auto px-7 py-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-base border border-blue-500/40 shadow-lg transition inline-flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-300" />
                <span>Ver Dashboard Completo</span>
              </button>
            </Link>

            <a
              href="http://localhost:5153/swagger"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-transparent hover:bg-blue-950/40 text-blue-200 font-medium text-sm border border-blue-600/30 transition inline-flex items-center justify-center gap-2"
            >
              <span>Swagger API REST</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. COMPREHENSIVE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-white text-base">TechAsset &bull; Innovatech Solutions S.A.C.</p>
              <p className="text-xs text-slate-500">Curso: Construcción de Software &bull; Semanas 01 a 12</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <Link to="/login" className="hover:text-white transition">Acceso al Sistema</Link>
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <a href="#personas" className="hover:text-white transition">Personas DCU</a>
            <a href="#norman" className="hover:text-white transition">Principios Norman</a>
            <a href="http://localhost:5153/swagger" target="_blank" rel="noreferrer" className="hover:text-white transition">API Swagger</a>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">API PostgreSQL :5153 Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
