import { useState } from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/logo-icon.png";
import { 
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
  Check, 
  Sparkles,
  Building2,
  Wrench,
  Search,
  Shield
} from "lucide-react";

export default function Landing() {
  const [selectedRole, setSelectedRole] = useState("admin");

  // Perfiles de Usuario y Beneficios de Negocio (Enfoque de Valor - Nielsen / Norman)
  const perfiles = {
    admin: {
      titulo: "Directivos y Administradores TI",
      descripcion: "Visibilidad ejecutiva, auditoría patrimonial y control de accesos para la toma estratégica de decisiones.",
      beneficios: [
        "Dashboard ejecutivo con indicadores de demanda y rotación de activos en tiempo real",
        "Supervisión integral de custodias y cumplimiento formal de devoluciones",
        "Gestión centralizada de cuentas de usuario y control de accesos institucionales",
        "Trazabilidad histórica blindada contra pérdidas patrimoniales y auditorías externas"
      ]
    },
    tecnologia: {
      titulo: "Gestores de Almacén y Soporte TI",
      descripcion: "Operatividad ágil para catalogar inventario, despachar préstamos y validar retornos físicos sin fricción.",
      beneficios: [
        "Registro inmediato de activos con validación automática de códigos patrimoniales",
        "Despacho y asignación de custodias en segundos con comprobación de disponibilidad",
        "Recepción formal de equipos con inspección física y registro de observaciones",
        "Control dinámico del ciclo de vida operativo (Disponible, Prestado, Mantenimiento)"
      ]
    },
    colaborador: {
      titulo: "Colaboradores de Innovatech Solutions",
      descripcion: "Transparencia y agilidad para acceder al equipamiento tecnológico necesario para sus proyectos.",
      beneficios: [
        "Consulta en tiempo real de la disponibilidad de equipos en el catálogo institucional",
        "Historial transparente y detallado de los activos asignados bajo su responsabilidad",
        "Proceso formal, ágil y seguro que respalda la entrega y devolución del equipamiento"
      ]
    }
  };

  // Familias de Activos Tecnológicos Monitoreados
  const activos = [
    { nombre: "Laptops", icono: Laptop },
    { nombre: "Computadoras de escritorio", icono: Cpu },
    { nombre: "Monitores", icono: Monitor },
    { nombre: "Impresoras", icono: Printer },
    { nombre: "Tablets", icono: Tablet },
    { nombre: "Proyectores multimedia", icono: Projector },
    { nombre: "Equipos de red", icono: Network }
  ];

  // Pilares de la Solución vs Limitaciones de Hojas de Cálculo
  const soluciones = [
    {
      problema: "Registros dispersos en hojas de cálculo propensas a errores",
      solucion: "Base de datos centralizada con integridad referencial e historial inmutable.",
      icono: DatabaseIcon
    },
    {
      problema: "Desconocimiento de la ubicación física y responsable del equipo",
      solucion: "Trazabilidad de custodia 100% identificada por colaborador y área funcional.",
      icono: Search
    },
    {
      problema: "Falta de inspección formal y daño no registrado en retornos",
      solucion: "Registro formal de devolución con observaciones de estado y condición física.",
      icono: Wrench
    },
    {
      problema: "Pérdida accidental o eliminación no autorizada de activos",
      solucion: "Reglas estrictas de auditoría que impiden eliminar equipos con préstamos previos.",
      icono: Shield
    }
  ];

  function DatabaseIcon(props) {
    return <Building2 {...props} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* 1. NAVEGACIÓN INSTITUCIONAL */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform border border-slate-200">
              <img 
                src={logoIcon} 
                alt="TechAsset Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
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
            <a href="#solucion" className="hover:text-blue-600 transition">Solución</a>
            <a href="#capacidades" className="hover:text-blue-600 transition">Capacidades</a>
            <a href="#perfiles" className="hover:text-blue-600 transition">Perfiles</a>
            <a href="#indicadores" className="hover:text-blue-600 transition">Indicadores</a>
          </nav>

          <Link to="/login">
            <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer">
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>
          </Link>
        </div>
      </header>

      {/* 2. HERO SECTION ORIENTADA A PROPUESTA DE VALOR */}
      <main className="flex-1">
        <section className="pt-16 pb-14 sm:pt-20 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/70">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Plataforma Corporativa de Gestión y Trazabilidad de TI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
              Control patrimonial inteligente y trazabilidad en tiempo real para{" "}
              <span className="text-blue-600">activos tecnológicos</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Centralizá el parque de equipos de <strong>Innovatech Solutions S.A.C.</strong>, gestioná asignaciones en segundos y garantizá la custodia formal de hardware con una plataforma moderna, ágil y auditable.
            </p>

            <div className="mt-8 flex items-center justify-center">
              <Link to="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 hover:shadow-blue-600/35 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer">
                  <LogIn className="w-4 h-4" />
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. PARQUE TECNOLÓGICO CENTRALIZADO */}
        <section className="py-12 bg-white border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-6">
              Control Unificado para Todo el Equipamiento Tecnológico Institucional
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

        {/* 4. DEL CAOS MANUAL A LA CERTEZA PATRIMONIAL */}
        <section id="solucion" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Transformación Operativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Del Descontrol Manual a la Certeza Patrimonial
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Descubrí cómo TechAsset reemplaza las hojas de cálculo dispersas por un flujo operativo automatizado y trazable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soluciones.map((item, index) => {
                const IconComp = item.icono;
                return (
                  <div key={index} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="text-xs text-red-600 font-semibold line-through">
                        {item.problema}
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 pt-1 text-slate-800 text-xs sm:text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.solucion}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCIA ADAPTADA POR PERFIL (REEMPLAZA ACTORES Y ROLES ACADÉMICOS) */}
        <section id="perfiles" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Experiencia Centrada en las Personas
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Diseñado a la Medida de Cada Rol Institucional
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Herramientas intuitivas concebidas para optimizar el trabajo diario en cada área de Innovatech Solutions.
              </p>
            </div>

            {/* Selector de Perfil */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedRole("admin")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedRole === "admin"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Directivos TI
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("tecnologia")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedRole === "tecnologia"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Gestión y Almacén
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("colaborador")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    selectedRole === "colaborador"
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Colaboradores
                </button>
              </div>
            </div>

            {/* Ficha de Valor del Perfil Seleccionado */}
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  {perfiles[selectedRole].titulo}
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium mb-6 leading-relaxed">
                {perfiles[selectedRole].descripcion}
              </p>

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Beneficios Operativos Destacados:
              </h4>
              <ul className="space-y-3">
                {perfiles[selectedRole].beneficios.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. CAPACIDADES CENTRALES DE LA PLATAFORMA (REEMPLAZA LISTAS CRUD DE ALCANCE) */}
        <section id="capacidades" className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Capacidades de la Plataforma
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Soluciones Integrales para la Gestión de Hardware
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Un ecosistema robusto diseñado para responder a las exigencias operativas y de seguridad institucional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Módulo 1 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3 border border-blue-100">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Inventario de Equipos</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Catálogo centralizado con códigos patrimoniales únicos, filtrado multidimensional por categoría y control estricto de disponibilidad operativa.
                </p>
              </div>

              {/* Módulo 2 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-3 border border-indigo-100">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Control de Préstamos</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trazabilidad de custodia punta a punta: despacho en segundos, registro formal de devoluciones e inspección física obligatoria.
                </p>
              </div>

              {/* Módulo 3 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3 border border-purple-100">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Colaboradores y Usuarios</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Directorio corporativo vinculado a áreas funcionales, facilitando la auditoría de asignaciones y la gestión segura de accesos.
                </p>
              </div>

              {/* Módulo 4 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3 border border-emerald-100">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">Métricas y Decisiones</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Indicadores ejecutivos de rotación de hardware, análisis de demanda departamental acumulada y estado de capacidad en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. INDICADORES Y CERTEZA OPERATIVA */}
        <section id="indicadores" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Gobernanza Tecnológica
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Impacto Operativo Comprobado
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Métricas de valor que garantizan la eficiencia del departamento de TI de Innovatech Solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-3xl font-black text-blue-600">100%</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Trazabilidad de Custodia</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Sin activos sin responsable</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-3xl font-black text-emerald-600">&lt; 30s</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Tiempo de Asignación</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Despacho ágil en almacén</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-3xl font-black text-indigo-600">0</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Registros Duplicados</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Base relacional centralizada</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-3xl font-black text-amber-600">100%</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Auditoría Garantizada</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Inspección física en retornos</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. LLAMADO FINAL A LA ACCIÓN */}
        <section className="py-16 bg-blue-600 text-white text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Comenzá a gestionar los activos de Innovatech Solutions hoy mismo
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm mb-8 leading-relaxed">
              Plataforma institucional de control patrimonial, préstamos de hardware y toma de decisiones.
            </p>
            <Link to="/login">
              <button className="px-8 py-3.5 rounded-xl bg-white text-blue-600 hover:bg-slate-50 font-bold text-sm shadow-lg shadow-blue-900/30 transition-all inline-flex items-center gap-2.5 cursor-pointer">
                <LogIn className="w-4 h-4" />
                <span>Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* 9. PIE DE PÁGINA CORPORATIVO */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 border border-slate-200 shadow-2xs">
              <img 
                src={logoIcon} 
                alt="TechAsset Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
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
            <Link to="/usuarios" className="hover:text-blue-600 transition">Colaboradores</Link>
          </div>
          <p className="text-slate-400">
            Control Institucional de TI &bull; Innovatech Solutions S.A.C.
          </p>
        </div>
      </footer>
    </div>
  );
}
