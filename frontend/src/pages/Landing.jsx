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
  ExternalLink,
  QrCode,
  Shield,
  Check
} from "lucide-react";

export default function Landing() {
  const [activePersona, setActivePersona] = useState(0);

  const roles = [
    {
      titulo: "Jefe de TI",
      nombre: "Carlos Mendoza",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      beneficio: "Control patrimonial total sin hojas de cálculo desincronizadas y KPIs en tiempo real (RF-13, RN-06)."
    },
    {
      titulo: "Soporte Técnico",
      nombre: "Sofía Valenzuela",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      beneficio: "Despacho en ventanilla en menos de 15 segundos con bloqueo automático de equipos no aptos (RN-01..03, RN-10)."
    },
    {
      titulo: "Colaborador",
      nombre: "Juan Pérez",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      beneficio: "Recepción transparente de hardware con constancia digital unívoca ligada a su correo corporativo (RN-05, RN-08)."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* 1. MINIMAL INSTITUTIONAL HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo & Corporate Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 block leading-none">
                TechAsset
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                Innovatech Solutions
              </span>
            </div>
          </Link>

          {/* Simple Clean Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#como-funciona" className="hover:text-blue-600 transition">Flujo de Trabajo</a>
            <a href="#roles" className="hover:text-blue-600 transition">Perfiles DCU</a>
            <a href="#modulos" className="hover:text-blue-600 transition">Módulos</a>
            <a 
              href="http://localhost:5153/swagger" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-400 hover:text-slate-700 flex items-center gap-1 transition"
            >
              <span>API Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          {/* Direct Login Button (Prominent Signifier) */}
          <Link to="/login">
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all inline-flex items-center gap-2">
              <LogIn className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </button>
          </Link>
        </div>
      </header>

      {/* 2. HERO: FOCUSED VALUE PROPOSITION (MINIMIZING COGNITIVE OVERLOAD) */}
      <main className="flex-1">
        <section className="pt-16 pb-14 sm:pt-20 sm:pb-16 text-center max-w-4xl mx-auto px-6">
          {/* Subtle status indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sistema Institucional de Activos TI &bull; v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Control inteligente de hardware y préstamos,{" "}
            <span className="text-blue-600">sin fricción.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Plataforma centralizada para más de 500 colaboradores en Innovatech Solutions S.A.C. 
            Trazabilidad en tiempo real, erradicación de hojas de cálculo y asignaciones en menos de 15 segundos.
          </p>

          {/* Primary Action Group */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all inline-flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Acceder al Sistema (Login)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>

            <Link to="/dashboard" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-300 shadow-2xs transition inline-flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-500" />
                <span>Explorar Dashboard Demo</span>
              </button>
            </Link>
          </div>

          {/* Consolidated Trust Metrics (Chunking - Shneiderman #8) */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 max-w-lg mx-auto text-center">
            <div>
              <p className="text-2xl font-black text-slate-900">500+</p>
              <p className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Colaboradores</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">100%</p>
              <p className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Trazabilidad</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600">&lt; 15s</p>
              <p className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Despacho</p>
            </div>
          </div>
        </section>

        {/* 3. SIMPLIFIED LIVE ACTIVITY PREVIEW (BRIDGING NORMAN'S GULF OF EVALUATION) */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Minimal App Titlebar */}
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="ml-2 font-mono font-semibold text-slate-600 text-[11px]">
                  TechAsset Dashboard en Vivo &bull; PostgreSQL
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                120 Activos Registrados
              </span>
            </div>

            {/* 3 Clear State Transition Cards (Norman's Conceptual Model) */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                    Disponible para Entrega
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">MacBook Pro 16" M3</h4>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">INV-LP-001</p>
                </div>
                <p className="text-xs text-slate-500 mt-3 border-t border-slate-200/60 pt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Listo para ventanilla (RN-02)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                    En Préstamo Activo
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">Dell Latitude 5540 i7</h4>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">INV-LP-002</p>
                </div>
                <p className="text-xs text-slate-600 mt-3 border-t border-blue-100 pt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                  Custodia: <strong>Sofía Valenzuela</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
                    En Mantenimiento
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">Monitor Dell UltraSharp 27"</h4>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">INV-MN-004</p>
                </div>
                <p className="text-xs text-amber-700 mt-3 border-t border-amber-100 pt-2 flex items-center gap-1.5 font-medium">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  Bloqueo preventivo (RN-03)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WORKFLOW: 3 STEPS INSTEAD OF 4 (PROGRESSIVE DISCLOSURE) */}
        <section id="como-funciona" className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Mapeo Natural & Interacción
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
              Flujo operativo sin fricción técnica
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  01
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Identificación Física</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cada activo lleva su placa patrimonial única (RN-07) como <code>INV-LP-001</code>, vinculada 1:1 con la base de datos.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  02
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Entrega Preventiva</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  El sistema bloquea equipos no disponibles. La asignación se registra al colaborador en segundos (RN-01, RN-05).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  03
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Inspección de Retorno</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Revisión obligatoria del estado físico del hardware al devolver (RN-10), restaurando su disponibilidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. USER PERSONAS SECTION (DCU / ISO 9241-210) - CONCISE & INTUITIVE */}
        <section id="roles" className="py-16 max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Diseño Centrado en el Usuario &bull; ISO 9241-210
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
              Adaptado a cada perfil institucional
            </h2>
          </div>

          {/* Clean Segmented Controls */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              {roles.map((r, i) => (
                <button
                  key={r.titulo}
                  onClick={() => setActivePersona(i)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activePersona === i
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {r.titulo}
                </button>
              ))}
            </div>
          </div>

          {/* Persona Card */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-6">
            <img 
              src={roles[activePersona].foto} 
              alt={roles[activePersona].nombre} 
              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-base">{roles[activePersona].nombre}</h3>
                <span className="text-xs text-slate-400">&bull;</span>
                <span className="text-xs font-semibold text-blue-600">{roles[activePersona].titulo}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {roles[activePersona].beneficio}
              </p>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION BANNER */}
        <section className="bg-blue-600 text-white py-14 px-6 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              ¿Listo para ordenar los activos de TI?
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm mt-2 mb-6">
              Ingresá al portal institucional con cualquiera de las cuentas de demostración.
            </p>
            <Link to="/login">
              <button className="px-6 py-3 rounded-xl bg-white text-blue-600 hover:bg-slate-50 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Acceder a TechAsset Ahora</span>
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* 7. CLEAN FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-slate-700">
            TechAsset &bull; Innovatech Solutions S.A.C.
          </p>
          <div className="flex gap-6 font-medium">
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
            <Link to="/equipos" className="hover:text-blue-600 transition">Equipos</Link>
            <Link to="/prestamos" className="hover:text-blue-600 transition">Préstamos</Link>
          </div>
          <p className="text-slate-400">
            ISO 9241-210 &bull; WCAG 2.1 AA
          </p>
        </div>
      </footer>
    </div>
  );
}
