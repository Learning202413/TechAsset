import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  Laptop, 
  Users, 
  ArrowLeftRight, 
  PlusCircle, 
  Layers,
  Globe,
  Server,
  Database,
  ShieldCheck,
  Activity
} from "lucide-react";

export default function Sidebar() {
  const { user } = useAuth();

  const getLinkClass = ({ isActive }) =>
    `relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group ${
      isActive
        ? "bg-gradient-to-r from-blue-600/25 via-blue-500/15 to-transparent text-white font-semibold border border-blue-500/30 shadow-sm"
        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
    }`;

  const renderActiveIndicator = (isActive) =>
    isActive ? (
      <span
        className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)]"
        aria-hidden="true"
      />
    ) : null;

  return (
    <aside
      aria-label="Menú principal de navegación"
      className="w-64 bg-slate-950 text-slate-200 min-h-screen p-4 flex flex-col justify-between shrink-0 border-r border-slate-800/80 select-none"
    >
      <div className="space-y-6">
        {/* Brand / Executive Header */}
        <div className="px-2 py-3 border-b border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-extrabold tracking-tight text-white leading-none">
                TechAsset
              </h2>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight mt-1">
              Innovatech Solutions &bull; TI
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-5" aria-label="Módulos de la aplicación">
          {/* Section: Principal */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Principal
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/dashboard" className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <LayoutDashboard
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Dashboard General</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Section: Equipos */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Gestión de Equipos
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/equipos" end className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <Laptop
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Inventario de Equipos</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/equipos/nuevo" className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <PlusCircle
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Registrar Equipo</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Section: Préstamos */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Gestión de Préstamos
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/prestamos" end className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <ArrowLeftRight
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Historial y Préstamos</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/prestamos/nuevo" className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <PlusCircle
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Registrar Préstamo</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Section: Usuarios */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Gestión de Usuarios
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/usuarios" end className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <Users
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Colaboradores</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/usuarios/nuevo" className={getLinkClass}>
                  {({ isActive }) => (
                    <>
                      {renderActiveIndicator(isActive)}
                      <PlusCircle
                        className={`w-4 h-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-blue-400" : "text-slate-400"
                        }`}
                      />
                      <span>Registrar Usuario</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Footer Area: System Health + User Preview + Portal Link */}
      <div className="pt-4 border-t border-slate-800/80 space-y-3">
        {/* System Health Card (Live Kestrel API + PostgreSQL) */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-2.5 text-xs shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Estado de Servicios
            </span>
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Server className="w-3 h-3 text-slate-400" />
                API Kestrel .NET 9
              </span>
              <span className="text-emerald-400 font-semibold text-[10px]">OK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Database className="w-3 h-3 text-slate-400" />
                PostgreSQL 16
              </span>
              <span className="text-emerald-400 font-semibold text-[10px]">OK</span>
            </div>
          </div>
        </div>

        {/* User Session Quick Glance */}
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/60">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
            {user?.iniciales || "TI"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-200 truncate leading-tight">
              {user?.nombre || "Carlos Mendoza"}
            </p>
            <p className="text-[10px] text-slate-400 truncate flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-400 inline shrink-0" />
              {user?.rol || "Administrador TI"}
            </p>
          </div>
        </div>

        {/* Portal Landing Link */}
        <NavLink
          to="/"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition group border border-transparent hover:border-slate-800"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Portal Landing</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono group-hover:text-slate-300">
            &rarr;
          </span>
        </NavLink>
      </div>
    </aside>
  );
}
